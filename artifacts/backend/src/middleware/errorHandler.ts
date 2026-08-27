/**
 * Error Handler Middleware (Legacy)
 *
 * This file previously contained Express.js error handling middleware.
 * Error handling is now done through NestJS exception filters.
 *
 * This file is kept as a stub to avoid breaking imports.
 */

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = null;