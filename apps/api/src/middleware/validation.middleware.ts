import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../shared/errors/AppError';

export class ValidationMiddleware {
  static validate(schema: ZodSchema, source: 'body' | 'query' | 'params' = 'body') {
    return (req: Request, res: Response, next: NextFunction): void => {
      try {
        const data = schema.parse(req[source]);
        
        // Replace the source with validated data
        if (source === 'body') {
          req.body = data;
        } else if (source === 'query') {
          req.query = data as Request['query'];
        } else if (source === 'params') {
          req.params = data as Request['params'];
        }
        
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          const errors: Record<string, string[]> = {};
          
          error.errors.forEach((err) => {
            const field = err.path.join('.');
            if (!errors[field]) {
              errors[field] = [];
            }
            errors[field].push(err.message);
          });
          
          next(new ValidationError(errors));
        } else {
          next(error);
        }
      }
    };
  }
}