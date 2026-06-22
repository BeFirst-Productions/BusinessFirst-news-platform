import { Response } from 'express';

interface PaginationMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface ApiResponseData<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  metadata?: PaginationMetadata;
  timestamp: string;
}

export class ResponseUtil {
  static success<T>(
    res: Response,
    data: T,
    message: string = 'Operation successful',
    statusCode: number = 200,
    metadata?: PaginationMetadata
  ): void {
    const response: ApiResponseData<T> = {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    };

    if (metadata) {
      response.metadata = metadata;
    }

    res.status(statusCode).json(response);
  }

  static created<T>(res: Response, data: T, message: string = 'Created successfully'): void {
    this.success(res, data, message, 201);
  }

  static error(
    res: Response,
    message: string = 'Internal server error',
    statusCode: number = 500,
    error?: string
  ): void {
    const response: ApiResponseData = {
      success: false,
      message,
      timestamp: new Date().toISOString(),
    };

    if (error && process.env.NODE_ENV === 'development') {
      response.error = error;
    }

    res.status(statusCode).json(response);
  }

  static badRequest(res: Response, message: string = 'Bad request'): void {
    this.error(res, message, 400);
  }

  static unauthorized(res: Response, message: string = 'Unauthorized'): void {
    this.error(res, message, 401);
  }

  static forbidden(res: Response, message: string = 'Forbidden'): void {
    this.error(res, message, 403);
  }

  static notFound(res: Response, message: string = 'Resource not found'): void {
    this.error(res, message, 404);
  }

  static conflict(res: Response, message: string = 'Resource already exists'): void {
    this.error(res, message, 409);
  }

  static tooManyRequests(res: Response, message: string = 'Too many requests'): void {
    this.error(res, message, 429);
  }

  static paginated<T>(
    res: Response,
    data: T[],
    total: number,
    page: number,
    limit: number,
    message: string = 'Data retrieved successfully'
  ): void {
    const totalPages = Math.ceil(total / limit);
    const metadata: PaginationMetadata = {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };

    this.success(res, data, message, 200, metadata);
  }
}