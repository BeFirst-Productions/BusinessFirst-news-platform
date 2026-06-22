import { z } from 'zod';

export const createTagSchema = z.object({
  name: z.string().min(1, 'Tag name is required'),
  description: z.string().optional().or(z.literal('')),
});

export const updateTagSchema = z.object({
  name: z.string().min(1, 'Tag name is required').optional(),
  description: z.string().optional().or(z.literal('')),
});

export type CreateTagInput = z.infer<typeof createTagSchema>;
export type UpdateTagInput = z.infer<typeof updateTagSchema>;
