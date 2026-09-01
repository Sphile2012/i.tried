import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface AuthenticatedRequest {
  user: {
    userId: string;
    email: string;
  };
}

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  /**
   * Create a new payment
   */
  @Post()
  async createPayment(
    @Request() req: AuthenticatedRequest,
    @Body()
    body: {
      amount: number;
      currency?: string;
      paymentMethod?: string;
      metadata?: any;
    },
  ) {
    return this.paymentService.createPayment({
      userId: req.user.userId,
      ...body,
    });
  }

  /**
   * Get all payments for current user
   */
  @Get()
  async getUserPayments(
    @Request() req: AuthenticatedRequest,
    @Query('status') status?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.paymentService.getUserPayments(req.user.userId, {
      status,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
    });
  }

  /**
   * Get payment statistics for current user
   */
  @Get('stats')
  async getPaymentStats(@Request() req: AuthenticatedRequest) {
    return this.paymentService.getUserPaymentStats(req.user.userId);
  }

  /**
   * Get current user's active subscription
   */
  @Get('subscription/active')
  async getActiveSubscription(@Request() req: AuthenticatedRequest) {
    return this.paymentService.getActiveSubscription(req.user.userId);
  }

  /**
   * Cancel current user's subscription
   */
  @Post('subscription/cancel')
  async cancelSubscription(@Request() req: AuthenticatedRequest) {
    return this.paymentService.cancelSubscription(req.user.userId);
  }

  /**
   * Check if user has access to paid content
   */
  @Get('access/paid-content')
  async hasAccessToPaidContent(@Request() req: AuthenticatedRequest) {
    const hasAccess = await this.paymentService.hasAccessToPaidContent(
      req.user.userId,
    );
    return { hasAccess };
  }

  /**
   * Check if user can access a specific lesson
   */
  @Get('access/lesson/:lessonId')
  async canAccessLesson(@Request() req: AuthenticatedRequest, @Param('lessonId') lessonId: string) {
    const canAccess = await this.paymentService.canAccessLesson(
      req.user.userId,
      lessonId,
    );
    return { canAccess };
  }

  /**
   * Get payment by ID
   */
  @Get(':id')
  async getPaymentById(@Param('id') id: string) {
    return this.paymentService.getPaymentById(id);
  }

  /**
   * Get payment receipt
   */
  @Get(':id/receipt')
  async getPaymentReceipt(@Param('id') id: string) {
    return this.paymentService.getPaymentReceipt(id);
  }

  /**
   * Update payment status (admin only - should add admin guard)
   */
  @Patch(':id/status')
  async updatePaymentStatus(
    @Param('id') id: string,
    @Body()
    body: {
      status: string;
      transactionId?: string;
      metadata?: any;
    },
  ) {
    return this.paymentService.updatePaymentStatus(id, body.status, {
      transactionId: body.transactionId,
      metadata: body.metadata,
    });
  }

  /**
   * Refund a payment (admin only - should add admin guard)
   */
  @Post(':id/refund')
  async refundPayment(
    @Param('id') id: string,
    @Body() body: { reason?: string },
  ) {
    return this.paymentService.refundPayment(id, body.reason);
  }

  /**
   * PayFast ITN (Instant Transaction Notification) webhook
   * This endpoint should not require authentication as it's called by PayFast
   */
  @Post('payfast/notify')
  @HttpCode(HttpStatus.OK)
  async payfastNotification(@Body() body: any) {
    return this.paymentService.processPayFastNotification(body);
  }
}
