import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  const { method, url, ip } = req;

  // Log request
  console.log(`[${new Date().toISOString()}] ${method} ${url} - ${ip}`);

  // Log response
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    
    const logMessage = `[${new Date().toISOString()}] ${method} ${url} - ${statusCode} - ${duration}ms`;
    
    if (statusCode >= 400) {
      console.error(logMessage);
    } else {
      console.log(logMessage);
    }
  });

  next();
};