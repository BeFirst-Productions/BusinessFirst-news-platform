import { z } from 'zod';

export const createAdSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  type: z.enum(['IMAGE', 'VIDEO', 'BOTH']),
  redirectUrl: z.string().url('Invalid redirect URL').optional().or(z.literal('')),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  priority: z.coerce.number().int().min(0).default(0),
});

export const updateAdSchema = z.object({
  name: z.string().min(2).optional(),
  type: z.enum(['IMAGE', 'VIDEO', 'BOTH']).optional(),
  redirectUrl: z.string().url('Invalid redirect URL').optional().or(z.literal('')),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  priority: z.coerce.number().int().min(0).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'EXPIRED']).optional(),
});

export const adQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'EXPIRED']).optional(),
});

export type CreateAdInput = z.infer<typeof createAdSchema>;
export type UpdateAdInput = z.infer<typeof updateAdSchema>;
export type AdQueryInput = z.infer<typeof adQuerySchema>;
