import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { env } from './config/env';
import { Database } from './config/database';
import RedisClient from './config/redis';
import { configureCloudinary } from './config/cloudinary.config';
import { router } from './router';
import { SeoService } from './modules/seo/seo.service';
import { errorHandler } from './middleware/error.middleware';
import { requestLogger } from './middleware/logger.middleware';
import { activityLogger } from './middleware/activity.middleware';
import path from 'path';

async function bootstrap() {
  const app = express();

  // Connect to database
  await Database.connect();

  // Ensure all preset + category SEO records exist (idempotent)
  await SeoService.ensurePresetsExist().catch((err) =>
    console.warn('⚠  SEO preset seed failed (non-fatal):', err.message)
  );

  // Connect to Redis
  // await RedisClient.connect();
  // Connect to Redis — non-fatal, server runs without it
  try {
    await RedisClient.connect();
  } catch (error) {
    console.warn('⚠️ Redis unavailable — continuing without cache. Check REDIS_URL.');
  }

  // Configure Cloudinary
  configureCloudinary();

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }));

  // CORS configuration
  app.use(cors({
    origin: [env.WEB_URL, env.ADMIN_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  }));

  // Request parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

  // Compression
  app.use(compression());

  // Logging
  if (env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
  }
  app.use(requestLogger);
  app.use(activityLogger);

  // Static files for uploads
  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

  // API routes
  app.use('/api/v1', router);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: `Route ${req.method} ${req.url} not found`,
      timestamp: new Date().toISOString(),
    });
  });

  // Error handler
  app.use(errorHandler);

  // Start server
  const server = app.listen(env.PORT, () => {
    console.log('='.repeat(50));
    console.log(`🚀 Server running on http://localhost:${env.PORT}`);
    console.log(`📡 Health check: http://localhost:${env.PORT}/api/v1/health`);
    console.log(`🌍 Environment: ${env.NODE_ENV}`);
    console.log(`🔒 Allowed Origins: Web=${env.WEB_URL}, Admin=${env.ADMIN_URL}`);
    console.log(`📦 Database: Connected`);
    console.log(`💾 Redis: ${RedisClient.isHealthy() ? 'Connected' : 'Unavailable (cache disabled)'}`);
    console.log(`💾 Redis: Connected`);
    console.log('='.repeat(50));
  });

  // Graceful shutdown
  const shutdown = async (signal: string) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);

    server.close(async () => {
      await Database.disconnect();
      await RedisClient.disconnect();
      console.log('Server closed');
      process.exit(0);
    });

    setTimeout(() => {
      console.error('Forced shutdown after timeout');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

bootstrap().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});