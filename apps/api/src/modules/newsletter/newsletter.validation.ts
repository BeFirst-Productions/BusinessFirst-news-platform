import { z } from 'zod';

// ── Public subscribe ──────────────────────────────────────────────────────────
export const subscribeSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  name: z.string().min(1).max(100).optional(),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;

// ── Subscriber list query ────────────────────────────────────────────────────
export const newsletterQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
  search: z.string().optional(),
  isActive: z
    .string()
    .transform((v) => (v === 'true' ? true : v === 'false' ? false : undefined))
    .optional(),
});

export type NewsletterQueryInput = z.infer<typeof newsletterQuerySchema>;

// ── Bulk delete subscribers ───────────────────────────────────────────────────
export const bulkDeleteSubscribersSchema = z.object({
  ids: z.array(z.string().uuid()).min(1, 'At least one subscriber ID required'),
});

export type BulkDeleteSubscribersInput = z.infer<typeof bulkDeleteSubscribersSchema>;

// ── Create / Save campaign ───────────────────────────────────────────────────
export const createCampaignSchema = z.object({
  subject: z.string().min(1, 'Subject is required').max(200),
  htmlContent: z.string().min(1, 'Email content is required'),
});

export type CreateCampaignInput = z.infer<typeof createCampaignSchema>;

// ── Send campaign ────────────────────────────────────────────────────────────
export const sendCampaignSchema = z.object({
  subject: z.string().min(1, 'Subject is required').max(200),
  htmlContent: z.string().min(1, 'Email content is required'),
});

export type SendCampaignInput = z.infer<typeof sendCampaignSchema>;

// ── Campaign list query ───────────────────────────────────────────────────────
export const campaignQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

export type CampaignQueryInput = z.infer<typeof campaignQuerySchema>;
