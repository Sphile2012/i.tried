import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new payment for a subscription or lesson purchase
   */
  async createPayment(data: {
    userId: string;
    amount: number;
    currency?: string;
    paymentMethod?: string;
    metadata?: any;
  }) {
    const payment = await this.prisma.payment.create({
      data: {
        userId: data.userId,
        amount: data.amount,
        currency: data.currency || 'ZAR',
        status: 'PENDING',
        paymentMethod: data.paymentMethod || 'CARD',
        metadata: JSON.stringify(data.metadata || {}),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    return payment;
  }

  /**
   * Get payment by ID
   */
  async getPaymentById(paymentId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${paymentId} not found`);
    }

    return payment;
  }

  /**
   * Get all payments for a user
   */
  async getUserPayments(userId: string, options?: {
    status?: string;
    limit?: number;
    offset?: number;
  }) {
    const where: any = { userId };
    
    if (options?.status) {
      where.status = options.status;
    }

    const [payments, total] = await Promise.all([
      this.prisma.payment.findMany({
        where,
        include: {
          user: true,
        },
        orderBy: { createdAt: 'desc' },
        take: options?.limit || 50,
        skip: options?.offset || 0,
      }),
      this.prisma.payment.count({ where }),
    ]);

    return {
      payments,
      total,
      limit: options?.limit || 50,
      offset: options?.offset || 0,
    };
  }

  /**
   * Update payment status
   */
  async updatePaymentStatus(
    paymentId: string,
    status: string,
    additionalData?: {
      transactionId?: string;
      metadata?: any;
    }
  ) {
    const updateData: any = {
      status,
      updatedAt: new Date(),
    };

    if (additionalData?.transactionId) {
      updateData.transactionId = additionalData.transactionId;
    }

    if (additionalData?.metadata) {
      updateData.metadata = JSON.stringify(additionalData.metadata);
    }

    const payment = await this.prisma.payment.update({
      where: { id: paymentId },
      data: updateData,
      include: {
        user: true,
      },
    });

    // If payment is completed, handle success
    if (status === 'COMPLETED') {
      await this.handleSuccessfulPayment(payment);
    }

    return payment;
  }

  /**
   * Handle successful payment and update related records
   */
  private async handleSuccessfulPayment(payment: any) {
    // Update user's subscription to PREMIUM
    const subscription = await this.prisma.subscription.findFirst({
      where: { userId: payment.userId },
      orderBy: { createdAt: 'desc' },
    });

    if (subscription) {
      await this.prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          status: 'PREMIUM',
        },
      });
    }
  }

  /**
   * Process PayFast payment notification (ITN)
   */
  async processPayFastNotification(data: any) {
    const {
      m_payment_id,
      pf_payment_id,
      payment_status,
    } = data;

    // Find payment by transaction ID
    const payment = await this.prisma.payment.findFirst({
      where: { id: m_payment_id },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    // Map PayFast status to our status
    let status: string;
    switch (payment_status) {
      case 'COMPLETE':
        status = 'COMPLETED';
        break;
      case 'FAILED':
        status = 'FAILED';
        break;
      case 'CANCELLED':
        status = 'FAILED';
        break;
      default:
        status = 'PENDING';
    }

    // Update payment
    return await this.updatePaymentStatus(payment.id, status, {
      transactionId: pf_payment_id,
      metadata: { payfast_data: data },
    });
  }

  /**
   * Get payment statistics for a user
   */
  async getUserPaymentStats(userId: string) {
    const [totalSpent, paymentCount, lastPayment] = await Promise.all([
      this.prisma.payment.aggregate({
        where: {
          userId,
          status: 'COMPLETED',
        },
        _sum: {
          amount: true,
        },
      }),
      this.prisma.payment.count({
        where: {
          userId,
          status: 'COMPLETED',
        },
      }),
      this.prisma.payment.findFirst({
        where: {
          userId,
          status: 'COMPLETED',
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    return {
      totalSpent: totalSpent._sum.amount || 0,
      paymentCount,
      lastPayment,
    };
  }

  /**
   * Check if user has access to paid lessons
   */
  async hasAccessToPaidContent(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return false;
    }

    // Check subscription via subscriptions table
    const subscription = await this.prisma.subscription.findFirst({
      where: {
        userId,
        status: { in: ['TRIAL', 'PREMIUM', 'PRO'] },
      },
    });

    return !!subscription;
  }

  /**
   * Verify user can access a specific lesson
   */
  async canAccessLesson(userId: string, lessonId: string): Promise<boolean> {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { isFree: true },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    // Free lessons are accessible to everyone
    if (lesson.isFree) {
      return true;
    }

    // Check if user has paid access
    return await this.hasAccessToPaidContent(userId);
  }

  /**
   * Get user's active subscription
   */
  async getActiveSubscription(userId: string) {
    const subscription = await this.prisma.subscription.findFirst({
      where: {
        userId,
        status: {
          in: ['TRIAL', 'PREMIUM', 'PRO'],
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return subscription;
  }

  /**
   * Cancel user subscription
   */
  async cancelSubscription(userId: string) {
    const subscription = await this.getActiveSubscription(userId);

    if (!subscription) {
      throw new BadRequestException('No active subscription found');
    }

    const updatedSubscription = await this.prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        cancelledAt: new Date(),
        status: 'CANCELLED',
      },
    });

    return updatedSubscription;
  }

  /**
   * Refund a payment
   */
  async refundPayment(paymentId: string, reason?: string) {
    const payment = await this.getPaymentById(paymentId);

    if (payment.status !== 'COMPLETED') {
      throw new BadRequestException('Only completed payments can be refunded');
    }

    return await this.updatePaymentStatus(paymentId, 'REFUNDED', {
      metadata: { refund_reason: reason },
    });
  }

  /**
   * Get payment receipt details
   */
  async getPaymentReceipt(paymentId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (payment.status !== 'COMPLETED') {
      throw new BadRequestException('Receipt is only available for completed payments');
    }

    return {
      receiptNumber: payment.transactionId || payment.id,
      invoiceNumber: payment.id,
      date: payment.createdAt,
      amount: payment.amount,
      currency: payment.currency,
      paymentMethod: payment.paymentMethod || 'N/A',
      user: payment.user,
    };
  }
}
