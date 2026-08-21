/**
 * Infinite Code - Backend API Server
 * 
 * This server handles:
 * - PayFast payment webhooks
 * - Email notifications
 * - Certificate generation
 * - Code submission judging
 * - Subscription management
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import winston from 'winston';
import paymentRoutes from './routes/payments.js';
import emailRoutes from './routes/emails.js';
import certificateRoutes from './routes/certificates.js';
import challengeRoutes from './routes/challenges.js';
import subscriptionRoutes from './routes/subscriptions.js';
import { errorHandler } from './middleware/errorHandler.js';
import { rateLimiter } from './middleware/rateLimiter.js';

// Load environment variables
dotenv.config();

// Configure logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  logger.error('Missing Supabase credentials in environment variables');
  process.exit(1);
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use(rateLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
  });
});

// API routes
app.use('/api/payments', paymentRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Infinite Code backend server started on port ${PORT}`);
  logger.info(`📡 Health check: http://localhost:${PORT}/health`);
  logger.info(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;