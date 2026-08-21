import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  /**
   * Register a new user
   */
  async register(registerDto: RegisterDto) {
    const { email, password, fullName, username } = registerDto;

    // Check if user already exists
    const existingUser = await this.prisma.profile.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.profile.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        username,
        role: 'STUDENT',
        subscriptionStatus: 'FREE',
        trialStatus: 'NONE',
      },
    });

    // Create user settings
    await this.prisma.userSettings.create({
      data: {
        userId: user.id,
      },
    });

    // Generate JWT token
    const token = this.generateToken(user.id);

    return {
      user: this.sanitizeUser(user),
      token,
    };
  }

  /**
   * Login user
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.prisma.profile.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = this.generateToken(user.id);

    // Update last activity
    await this.prisma.profile.update({
      where: { id: user.id },
      data: { lastActivityAt: new Date() },
    });

    return {
      user: this.sanitizeUser(user),
      token,
    };
  }

  /**
   * Validate user for local strategy (login)
   */
  async validateUserForLocal(email: string, password: string) {
    const user = await this.prisma.profile.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return this.sanitizeUser(user);
  }

  /**
   * Validate user for JWT strategy
   */
  async validateUser(userId: string) {
    const user = await this.prisma.profile.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.sanitizeUser(user);
  }

  /**
   * Generate JWT token
   */
  private generateToken(userId: string): string {
    const payload = { sub: userId };
    return this.jwtService.sign(payload);
  }

  /**
   * Remove sensitive data from user
   */
  private sanitizeUser(user: any) {
    const { password, ...result } = user;
    return result;
  }

  /**
   * Forgot password - send reset email
   */
  async forgotPassword(email: string) {
    const user = await this.prisma.profile.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if user exists
      return { message: 'If the email exists, a reset link has been sent' };
    }

    // Generate reset token (implement with your email service)
    const resetToken = this.generateToken(user.id);

    // TODO: Send email with reset link
    // await this.emailService.sendPasswordReset(email, resetToken);

    return { message: 'If the email exists, a reset link has been sent' };
  }

  /**
   * Reset password
   */
  async resetPassword(token: string, newPassword: string) {
    try {
      const payload = this.jwtService.verify(token);
      const userId = payload.sub;

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await this.prisma.profile.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      return { message: 'Password reset successful' };
    } catch (error) {
      throw new BadRequestException('Invalid or expired reset token');
    }
  }

  /**
   * Get user profile
   */
  async getProfile(userId: string) {
    const user = await this.prisma.profile.findUnique({
      where: { id: userId },
      include: {
        userSettings: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.sanitizeUser(user);
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, updateData: any) {
    const allowedFields = ['fullName', 'username', 'avatarUrl', 'bio', 'timezone', 'language', 'darkMode'];
    const dataToUpdate = {};

    Object.keys(updateData).forEach(key => {
      if (allowedFields.includes(key)) {
        dataToUpdate[key] = updateData[key];
      }
    });

    return this.prisma.profile.update({
      where: { id: userId },
      data: dataToUpdate,
    });
  }

  /**
   * Delete user account
   */
  async deleteAccount(userId: string) {
    // Soft delete
    await this.prisma.profile.update({
      where: { id: userId },
      data: { deletedAt: new Date() },
    });

    return { message: 'Account deleted successfully' };
  }
}