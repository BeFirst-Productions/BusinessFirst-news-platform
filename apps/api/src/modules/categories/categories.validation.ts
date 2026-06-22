import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional().or(z.literal('')),
  parentId: z.string().uuid().optional().or(z.literal('')),
  isActive: z.boolean().default(true),
  order: z.coerce.number().int().default(0),
});

export const updateCategorySchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional().or(z.literal('')),
  parentId: z.string().uuid().optional().or(z.literal('')),
  isActive: z.boolean().optional(),
  order: z.coerce.number().int().optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
