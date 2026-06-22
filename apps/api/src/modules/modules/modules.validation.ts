import { z } from 'zod';

export const createModuleSchema = z.object({
  name: z.string().min(2, 'Module name must be at least 2 characters'),
  code: z.string().min(2).regex(/^[A-Z_]+$/, 'Code must be uppercase with underscores'),
  description: z.string().optional(),
  icon: z.string().optional(),
  order: z.number().int().default(0),
});

export const updateModuleSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

export type CreateModuleInput = z.infer<typeof createModuleSchema>;
export type UpdateModuleInput = z.infer<typeof updateModuleSchema>;