/**
 * Payment Service
 * Handles PayFast integration and payment processing
 */

import crypto from 'crypto';
import axios from 'axios';
import { supabase } from '../index.js';
import { logger } from '../utils/logger.js';
import { EmailService } from './emailService.js';

interface PayFastData {
  merchant_id: string;
  merchant_key: string;
  amount: string;
  item_name: string;
  m_payment_id: string;
  pf_payment_id?: string;
  status?: string;
  amount_gross?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  signature?: string;
}

interface ProcessPaymentResult {
  success: boolean;
  payment?: any;
  error?: string;
}

interface GeneratePayFastUrlParams {
  paymentId: string;
  userId: string;
  amount: number;
  planId: string;
  isUpgrade?: boolean;
}

export class PaymentService {
  private emailService: EmailService;
  private payFastMerchantId: string;
  private payFastMerchantKey: string;
  private payFastPassphrase: string;
  private isSandbox: boolean;

  constructor() {
    this.emailService = new EmailService();
    this.payFastMerchantId = process.env.PAYFAST_MERCHANT_ID || '';
    this.payFastMerchantKey = process.env.PAYFAST_MERCHANT_KEY || '';
    this.payFastPassphrase = process.env.PAYFAST_PASSPHRASE || '';
    this.isSandbox = process.env.PAYFAST_SANDBOX === 'true';
  }

  /**
   * Verify PayFast signature
   */
  async verifyPayFastSignature(data: any, receivedSignature: string): Promise<boolean> {
    try {
      // Sort parameters alphabetically
      const sortedData = Object.keys(data)
        .filter(key => !key.startsWith('_'))
        .sort()
        .reduce((obj, key) => {
          obj[key] = data[key];
          return obj;
        }, {} as Record<string, string>);

      // Create parameter string
      const paramString = Object.entries(sortedData)
        .map(([key, value]) => `${key}=${encodeURIComponent(value).replace(/%20/g, '+')}`)
        .join('&');

      // Add passphrase if configured
      const stringToSign = this.payFastPassphrase 
        ? paramString + '&passphrase=' + encodeURIComponent(this.payFastPassphrase).replace(/%20/g, '+')
        : paramString;

      // Generate MD5 hash
      const md5Hash = crypto.createHash('md5').update(stringToSign).digest('hex');
      
      return md5Hash === receivedSignature;
    } catch (error) {
      logger.error('Error verifying PayFast signature', { error });
      return false;
    }
  }

  /**
   * Process payment from PayFast webhook
   */
  async processPayment(data: PayFastData): Promise<ProcessPaymentResult> {
    try {
      const { pf_payment_id, m_payment_id, amount, status, email } = data;

      if (!pf_payment_id || !m_payment_id) {
        return { success: false, error: 'Missing payment identifiers' };
      }

      // Get user ID from payment reference (format: IC-{userId}-{plan}-{timestamp})
      const userId = this.extractUserIdFromRef(m_payment_id);
      if (!userId) {
        return { success: false, error: 'Invalid payment reference' };
      }

      // Check if payment already processed
      const { data: existingPayment } = await supabase
        .from('payments')
        .select('*')
        .eq('payfast_payment_id', pf_payment_id)
        .single();

      if (existingPayment && existingPayment.status === 'completed') {
        return { success: true, payment: existingPayment, error: 'Payment already processed' };
      }

      // Update or create payment record
      let payment;
      if (existingPayment) {
        const { data: updated, error } = await supabase
          .from('payments')
          .update({
            status: status === 'COMPLETE' ? 'completed' : 'failed',
            completed_at: status === 'COMPLETE' ? new Date().toISOString() : null,
            payfast_payment_id: pf_payment_id,
            amount: parseFloat(amount),
          })
          .eq('id', existingPayment.id)
          .select()
          .single();

        if (error) throw error;
        payment = updated;
      } else {
        const { data: created, error } = await supabase
          .from('payments')
          .insert({
            user_id: userId,
            amount: parseFloat(amount),
            currency: 'ZAR',
            status: status === 'COMPLETE' ? 'completed' : 'failed',
            payfast_payment_id: pf_payment_id,
            payfast_merchant_id: this.payFastMerchantId,
            m_payment_id: m_payment_id,
            completed_at: status === 'COMPLETE' ? new Date().toISOString() : null,
            initiated_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (error) throw error;
        payment = created;
      }

      // If payment completed, activate subscription
      if (status === 'COMPLETE') {
        await this.activateSubscription(userId, payment);
        
        // Send confirmation email
        const user = await this.getUserDetails(userId);
        if (user) {
          await this.emailService.sendPaymentConfirmation({
            to: user.email,
            name: user.full_name || user.email,
            amount: parseFloat(amount),
            paymentId: payment.id,
            receiptNumber: payment.receipt_number,
          });
        }
      }

      return { success: true, payment };
    } catch (error) {
      logger.error('Error processing payment', { error });
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Complete payment
   */
  async completePayment(data: any): Promise<void> {
    try {
      const { m_payment_id, pf_payment_id, amount_gross, email } = data;
      const userId = this.extractUserIdFromRef(m_payment_id);

      if (!userId) return;

      // Update payment
      await supabase
        .from('payments')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          payfast_payment_id: pf_payment_id,
          amount: parseFloat(amount_gross || '0'),
        })
        .eq('m_payment_id', m_payment_id);

      // Activate subscription
      await this.activateSubscription(userId, null);

      // Send email
      const user = await this.getUserDetails(userId);
      if (user) {
        await this.emailService.sendPaymentConfirmation({
          to: user.email,
          name: user.full_name || user.email,
          amount: parseFloat(amount_gross || '0'),
        });
      }
    } catch (error) {
      logger.error('Error completing payment', { error });
    }
  }

  /**
   * Fail payment
   */
  async failPayment(data: any): Promise<void> {
    try {
      const { m_payment_id, pf_payment_id } = data;

      await supabase
        .from('payments')
        .update({
          status: 'failed',
          payfast_payment_id: pf_payment_id,
          error_message: 'Payment failed',
        })
        .eq('m_payment_id', m_payment_id);

      // Check if this was for a trial
      const userId = this.extractUserIdFromRef(m_payment_id);
      if (userId) {
        // End trial if payment failed
        await supabase
          .from('profiles')
          .update({
            subscription_status: 'free',
            trial_status: 'expired',
          })
          .eq('id', userId);
      }
    } catch (error) {
      logger.error('Error failing payment', { error });
    }
  }

  /**
   * Mark payment as pending
   */
  async pendingPayment(data: any): Promise<void> {
    try {
      const { m_payment_id, pf_payment_id } = data;

      await supabase
        .from('payments')
        .update({
          status: 'pending',
          payfast_payment_id: pf_payment_id,
        })
        .eq('m_payment_id', m_payment_id);
    } catch (error) {
      logger.error('Error marking payment as pending', { error });
    }
  }

  /**
   * Generate PayFast payment URL
   */
  async generatePayFastUrl(params: GeneratePayFastUrlParams): Promise<string> {
    const { paymentId, userId, amount, planId, isUpgrade } = params;

    // Get user details
    const { data: user } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', userId)
      .single();

    // Get plan details
    const { data: plan } = await supabase
      .from('subscription_plans')
      .select('name, price')
      .eq('id', planId)
      .single();

    const firstName = user?.full_name?.split(' ')[0] || '';
    const lastName = user?.full_name?.split(' ').slice(1).join(' ') || '';
    const itemName = isUpgrade 
      ? `Upgrade to ${plan?.name || 'Premium'} - Infinite Code`
      : `${plan?.name || 'Premium'} Monthly Subscription - Infinite Code`;

    // Build PayFast parameters
    const payFastParams = new URLSearchParams({
      merchant_id: this.payFastMerchantId,
      merchant_key: this.payFastMerchantKey,
      return_url: `${process.env.FRONTEND_URL}/subscription?status=success&plan=${planId}`,
      cancel_url: `${process.env.FRONTEND_URL}/subscription?status=cancelled&plan=${planId}`,
      notify_url: `${process.env.BACKEND_URL}/api/payments/payfast/itn`,
      name_first: firstName,
      name_last: lastName,
      email_address: user?.email || '',
      amount: amount.toFixed(2),
      item_name: itemName,
      m_payment_id: paymentId,
      currency: 'ZAR',
      recurring_type: '1', // Subscription
    });

    // Generate signature
    const paramString = payFastParams.toString();
    const stringToSign = this.payFastPassphrase
      ? paramString + '&passphrase=' + this.payFastPassphrase
      : paramString;
    const signature = crypto.createHash('md5').update(stringToSign).digest('hex');

    payFastParams.append('signature', signature);

    const baseUrl = this.isSandbox
      ? 'https://sandbox.payfast.co.za/eng/process'
      : 'https://www.payfast.co.za/eng/process';

    return `${baseUrl}?${payFastParams.toString()}`;
  }

  /**
   * Activate subscription after successful payment
   */
  private async activateSubscription(userId: string, payment: any): Promise<void> {
    try {
      // Get plan from payment or user's pending subscription
      const { data: pendingSubscription } = await supabase
        .from('subscriptions')
        .select('plan_id')
        .eq('user_id', userId)
        .eq('status', 'trial')
        .single();

      if (!pendingSubscription) {
        logger.warn('No pending subscription found for user', { userId });
        return;
      }

      // Update subscription
      await supabase
        .from('subscriptions')
        .update({
          status: 'premium', // or 'pro' based on plan
          current_period_start: new Date().toISOString(),
          current_period_end: this.calculateNextBillingDate(),
          last_payment_date: new Date().toISOString(),
          last_payment_amount: payment?.amount || 0,
          trial_used: true,
          trial_ends_at: null,
        })
        .eq('user_id', userId)
        .eq('status', 'trial');

      // Update user profile
      await supabase
        .from('profiles')
        .update({
          subscription_status: 'premium',
          subscription_plan: pendingSubscription.plan_id,
          trial_status: 'converted',
          subscription_expires_at: this.calculateNextBillingDate(),
        })
        .eq('id', userId);

      // Create notification
      await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          type: 'subscription',
          title: 'Subscription Activated!',
          message: 'Your Infinite Code Premium subscription is now active. Enjoy unlimited access to all courses and features!',
          action_url: '/lessons',
        });

    } catch (error) {
      logger.error('Error activating subscription', { error });
    }
  }

  /**
   * Extract user ID from payment reference
   * Format: IC-{userId}-{plan}-{timestamp}
   */
  private extractUserIdFromRef(ref: string): string | null {
    try {
      const parts = ref.split('-');
      if (parts.length >= 2) {
        return parts[1];
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Get user details
   */
  private async getUserDetails(userId: string) {
    const { data } = await supabase
      .from('profiles')
      .select('email, full_name')
      .eq('id', userId)
      .single();
    return data;
  }

  /**
   * Calculate next billing date
   */
  private calculateNextBillingDate(): string {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toISOString();
  }
}