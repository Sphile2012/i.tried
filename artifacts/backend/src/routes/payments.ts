/**
 * PayFast Payment Webhook Handler
 * 
 * Handles payment notifications from PayFast and updates subscription status
 */

import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { supabase } from '../index.js';
import { logger } from '../utils/logger.js';
import { PaymentService } from '../services/paymentService.js';

const router = Router();
const paymentService = new PaymentService();

// PayFast webhook endpoint
router.post('/payfast/webhook', async (req: Request, res: Response) => {
  try {
    // Get the signature from the request
    const signature = req.headers['x-payfast-signature'] as string;
    
    if (!signature) {
      logger.warn('Missing PayFast signature in webhook');
      return res.status(400).json({ error: 'Missing signature' });
    }

    // Verify the signature
    const isValid = await paymentService.verifyPayFastSignature(req.body, signature);
    
    if (!isValid) {
      logger.error('Invalid PayFast signature');
      return res.status(403).json({ error: 'Invalid signature' });
    }

    // Process the payment
    const result = await paymentService.processPayment(req.body);

    if (result.success) {
      logger.info('Payment processed successfully', { 
        paymentId: result.payment?.id,
        userId: result.payment?.user_id,
        amount: result.payment?.amount 
      });
      
      // Send success response
      return res.status(200).json({ 
        status: 'success',
        message: 'Payment processed' 
      });
    } else {
      logger.error('Payment processing failed', { error: result.error });
      return res.status(400).json({ 
        status: 'error',
        message: result.error 
      });
    }
  } catch (error) {
    logger.error('Error processing PayFast webhook', { error });
    return res.status(500).json({ 
      status: 'error',
      message: 'Internal server error' 
    });
  }
});

// PayFast ITN (Instant Transaction Notification) endpoint
router.post('/payfast/itn', async (req: Request, res: Response) => {
  try {
    // PayFast sends form data for ITN
    const data = req.body;
    
    // Log the ITN for debugging
    logger.info('Received PayFast ITN', { 
      merchant_id: data.merchant_id,
      payment_id: data.pf_payment_id,
      status: data.status,
      amount: data.amount_gross
    });

    // Process based on status
    const status = data.status;
    
    if (status === 'COMPLETE') {
      // Payment completed successfully
      await paymentService.completePayment(data);
    } else if (status === 'FAILED') {
      // Payment failed
      await paymentService.failPayment(data);
    } else if (status === 'PENDING') {
      // Payment is pending
      await paymentService.pendingPayment(data);
    }

    // Respond to PayFast
    res.status(200).send('OK');
  } catch (error) {
    logger.error('Error processing PayFast ITN', { error });
    res.status(500).send('ERROR');
  }
});

// Get payment status
router.get('/payments/:paymentId', async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.params;
    
    const { data: payment, error } = await supabase
      .from('payments')
      .select('*, profiles(full_name, email)')
      .eq('id', paymentId)
      .single();

    if (error || !payment) {
      return res.status(404).json({ 
        error: 'Payment not found' 
      });
    }

    res.json({
      success: true,
      data: payment
    });
  } catch (error) {
    logger.error('Error fetching payment', { error });
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Create payment intent
router.post('/payments/create', async (req: Request, res: Response) => {
  try {
    const { userId, planId, amount } = req.body;

    if (!userId || !planId || !amount) {
      return res.status(400).json({ 
        error: 'Missing required fields: userId, planId, amount' 
      });
    }

    // Create payment record
    const { data: payment, error } = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        subscription_id: null, // Will be linked after payment
        amount: amount,
        currency: 'ZAR',
        status: 'pending',
        initiated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Generate PayFast payment URL
    const payFastUrl = await paymentService.generatePayFastUrl({
      paymentId: payment.id,
      userId: userId,
      amount: amount,
      planId: planId,
    });

    res.json({
      success: true,
      paymentId: payment.id,
      redirectUrl: payFastUrl,
    });
  } catch (error) {
    logger.error('Error creating payment', { error });
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Cancel subscription
router.post('/subscriptions/:subscriptionId/cancel', async (req: Request, res: Response) => {
  try {
    const { subscriptionId } = req.params;
    const { reason } = req.body;

    // Update subscription
    const { error } = await supabase
      .from('subscriptions')
      .update({
        cancelled_at: new Date().toISOString(),
        cancel_reason: reason,
        cancel_at_period_end: true,
        status: 'cancelled',
      })
      .eq('id', subscriptionId);

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      message: 'Subscription cancelled successfully',
    });
  } catch (error) {
    logger.error('Error cancelling subscription', { error });
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Upgrade subscription
router.post('/subscriptions/:subscriptionId/upgrade', async (req: Request, res: Response) => {
  try {
    const { subscriptionId } = req.params;
    const { newPlanId, proratedAmount } = req.body;

    // Get current subscription
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('id', subscriptionId)
      .single();

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    // Create upgrade payment for difference
    const { data: payment } = await supabase
      .from('payments')
      .insert({
        user_id: subscription.user_id,
        subscription_id: subscriptionId,
        amount: proratedAmount,
        currency: 'ZAR',
        status: 'pending',
        initiated_at: new Date().toISOString(),
      })
      .select()
      .single();

    // Generate PayFast URL for upgrade payment
    const payFastUrl = await paymentService.generatePayFastUrl({
      paymentId: payment.id,
      userId: subscription.user_id,
      amount: proratedAmount,
      planId: newPlanId,
      isUpgrade: true,
    });

    res.json({
      success: true,
      paymentId: payment.id,
      redirectUrl: payFastUrl,
    });
  } catch (error) {
    logger.error('Error upgrading subscription', { error });
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

export default router;