import { z } from 'zod';

export const createEventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  badge: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  linkUrl: z.string().optional().nullable(),
  linkText: z.string().optional().nullable(),
  isActive: z.boolean().optional().default(true),
  order: z.number().int().optional().default(0),
});

export const updateEventSchema = createEventSchema.partial();
