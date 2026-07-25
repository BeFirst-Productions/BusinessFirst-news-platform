import { z } from 'zod';

export const contactQuerySchema = z.object({
  page: z.string().optional().transform(val => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform(val => (val ? parseInt(val, 10) : 10)),
  search: z.string().optional(),
  isRead: z.string().optional().transform(val => {
    if (val === 'true') return true;
    if (val === 'false') return false;
    return undefined;
  }),
});

export type ContactQueryInput = z.infer<typeof contactQuerySchema>;

export const bulkDeleteSchema = z.object({
  ids: z.array(z.string().uuid()),
});
