# Infinite Code - NestJS Backend

Modern, scalable backend API built with NestJS, TypeScript, Prisma ORM, PostgreSQL, and Redis.

## Technology Stack

- Runtime: Node.js 18+
- Framework: NestJS 10
- Language: TypeScript 5
- Database: PostgreSQL 14+
- ORM: Prisma 5
- Cache: Redis 7
- Authentication: JWT (Passport)
- Validation: class-validator
- Rate Limiting: @nestjs/throttler
- Scheduling: @nestjs/schedule
- AI Integration: OpenAI API
- Payments: PayFast

## Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts           # Root module
├── prisma/                 # Database layer
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── auth/                   # Authentication
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── strategies/
│   ├── dto/
│   └── guards/
├── user/                   # User management
├── topic/                  # Topics (replaces courses)
├── quiz/                   # Quizzes
├── challenge/              # Coding challenges
├── payment/                # PayFast integration
├── certificate/            # Certificates (removed)
├── notification/           # Notifications
├── email/                  # Email service
└── ai/                     # AI Assistant
```

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis 7+
- npm or pnpm

### Installation

1. Clone repository
   ```bash
   cd artifacts/backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. Set up database
   ```bash
   # Create PostgreSQL database
   createdb infinite_code
   
   # Update DATABASE_URL in .env
   # Then run migrations
   npm run prisma:migrate
   
   # Generate Prisma client
   npm run prisma:generate
   
   # (Optional) Seed database
   npm run prisma:seed
   ```

5. Start Redis
   ```bash
   # macOS
   brew services start redis
   
   # Ubuntu
   sudo systemctl start redis-server
   
   # Or run directly
   redis-server
   ```

6. Start development server
   ```bash
   npm run start:dev
   ```

   Application will be available at http://localhost:3001

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login
- POST /api/auth/logout - Logout
- POST /api/auth/refresh - Refresh token
- POST /api/auth/forgot-password - Request password reset
- POST /api/auth/reset-password - Reset password

### Users
- GET /api/users/profile - Get user profile
- PATCH /api/users/profile - Update profile
- GET /api/users/progress - Get learning progress
- GET /api/users/achievements - Get achievements

### Topics
- GET /api/topics - List all topics
- GET /api/topics/:id - Get topic details
- GET /api/topics/:id/lessons - Get topic lessons
- POST /api/topics/:id/enroll - Enroll in topic

### Quizzes
- GET /api/quizzes/:id - Get quiz
- POST /api/quizzes/:id/attempt - Start quiz attempt
- POST /api/quizzes/:id/submit - Submit answers

### Challenges
- GET /api/challenges - List challenges
- GET /api/challenges/:id - Get challenge details
- POST /api/challenges/:id/submit - Submit code

### Payments
- POST /api/payments/create - Create payment
- POST /api/payments/payfast/itn - PayFast webhook
- GET /api/payments/history - Payment history

### Subscriptions
- POST /api/subscriptions/start-trial - Start free trial
- POST /api/subscriptions/cancel - Cancel subscription
- POST /api/subscriptions/upgrade - Upgrade plan

### AI Assistant
- POST /api/ai/chat - Chat with AI tutor
- POST /api/ai/explain - Explain code/concept
- POST /api/ai/debug - Debug code

## Database

### Prisma Commands

```bash
# Generate Prisma client
npm run prisma:generate

# Create and apply migration
npm run prisma:migrate

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Seed database
npm run prisma:seed

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

### Database Schema

The schema is defined in prisma/schema.prisma and includes:
- Users and Authentication
- Topics, Modules, Lessons
- Quizzes and Questions
- Coding Challenges
- Subscriptions and Payments
- Achievements and Badges
- Notifications
- Community Posts and Comments

## PayFast Integration

### Configuration

1. Register at https://www.payfast.co.za
2. Get Merchant ID and Key
3. Set passphrase in PayFast settings
4. Update .env:
   ```env
   PAYFAST_MERCHANT_ID=your_id
   PAYFAST_MERCHANT_KEY=your_key
   PAYFAST_PASSPHRASE=your_passphrase
   PAYFAST_SANDBOX=true
   ```

### Webhook Setup

For local development, use ngrok:
```bash
ngrok http 3001
```

Then set PayFast ITN URL:
```
https://your-subdomain.ngrok.io/api/payments/payfast/itn
```

### Test Payment

Use PayFast sandbox for testing. Test card details:
- Card: Any valid format
- Amount: R1.00 (minimum)

## AI Integration

### OpenAI Setup

1. Get API key from https://platform.openai.com/api-keys
2. Update .env:
   ```env
   OPENAI_API_KEY=sk-...
   OPENAI_MODEL=gpt-4
   ```

### AI Features

- Code Explanation: Explain C++ concepts and code
- Debugging Help: Identify and fix code errors
- Learning Recommendations: Personalized study paths
- Practice Questions: Generate custom quizzes

## Email Configuration

### Gmail (Development)

1. Enable 2FA on Google account
2. Generate App Password
3. Update .env:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ```

### Production

Use SendGrid, AWS SES, or similar service.

## Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e

# Run tests in watch mode
npm run test:watch
```

## Deployment

### Build for Production

```bash
npm run build
npm run start:prod
```

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./
EXPOSE 3001
CMD ["node", "dist/main.js"]
```

### Environment Variables (Production)

Set these in your hosting platform:
- NODE_ENV=production
- DATABASE_URL (connection string)
- REDIS_URL (connection string)
- JWT_SECRET (strong random string)
- All PayFast credentials
- OpenAI API key

### Recommended Platforms

- Railway - Easy PostgreSQL + Redis + Node.js
- Render - Good free tier
- AWS - ECS/Fargate for scaling
- DigitalOcean - App Platform

## Security

- JWT Authentication with refresh tokens
- Rate Limiting on all endpoints
- Input Validation with class-validator
- Helmet.js for security headers
- CORS configuration
- SQL Injection protection via Prisma
- XSS protection

## Monitoring

### Health Check

```bash
curl http://localhost:3001/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "version": "1.0.0"
}
```

### Logging

Logs are written to console and logs/ directory. Use Winston for structured logging.

## Contributing

1. Fork the repository
2. Create feature branch (git checkout -b feature/amazing-feature)
3. Commit changes (git commit -m 'Add amazing feature')
4. Push to branch (git push origin feature/amazing-feature)
5. Open Pull Request

## License

MIT License - see LICENSE file for details.

---

Built with NestJS, TypeScript, Prisma, PostgreSQL, and Redis