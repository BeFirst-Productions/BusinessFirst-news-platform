import { z } from 'zod';

// -----------------------------------------------------------
// Shared validators
// -----------------------------------------------------------

const twitterCardEnum = z.enum(['SUMMARY', 'SUMMARY_LARGE_IMAGE']);
const pageTypeEnum = z.enum(['HOME', 'CONTACT', 'POLICY', 'CATEGORY', 'CUSTOM']);

const extraMetaItemSchema = z.object({
  name: z.string().min(1, 'Meta name is required'),
  content: z.string().min(1, 'Meta content is required'),
});

// -----------------------------------------------------------
// Create schema
// -----------------------------------------------------------

export const createPageSeoSchema = z.object({
  slug: z
    .string()
    .min(0)
    .max(255)
    .regex(/^[a-z0-9/_-]*$/, 'Slug may only contain lowercase letters, numbers, hyphens, underscores and forward slashes')
    .transform((s) => s.replace(/^\//, '')), // strip leading slash
  label: z.string().min(1, 'Label is required').max(120),
  pageType: pageTypeEnum,
  categoryId: z.string().uuid('Invalid category ID').optional().nullable(),
  metaTitle: z.string().min(1, 'Meta title is required').max(70),
  metaDescription: z.string().min(1, 'Meta description is required').max(160),
  canonicalUrl: z.string().url('Invalid canonical URL').optional().nullable().or(z.literal('')),
  ogTitle: z.string().max(70).optional().nullable(),
  ogDescription: z.string().max(200).optional().nullable(),
  ogImage: z.string().url('Invalid OG image URL').optional().nullable().or(z.literal('')),
  twitterCard: twitterCardEnum.optional().default('SUMMARY_LARGE_IMAGE'),
  twitterTitle: z.string().max(70).optional().nullable(),
  twitterDescription: z.string().max(200).optional().nullable(),
  twitterImage: z.string().url('Invalid Twitter image URL').optional().nullable().or(z.literal('')),
  structuredData: z.record(z.unknown()).optional().nullable(),
  robots: z.string().max(100).optional().nullable().default('index, follow'),
  extraMeta: z.array(extraMetaItemSchema).optional().nullable(),
  isActive: z.boolean().optional().default(true),
}).superRefine((data, ctx) => {
  if (data.pageType === 'CATEGORY' && !data.categoryId) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'categoryId is required when pageType is CATEGORY',
      path: ['categoryId'],
    });
  }
});

// -----------------------------------------------------------
// Update schema  (all SEO fields optional)
// -----------------------------------------------------------

export const updatePageSeoSchema = z.object({
  label: z.string().min(1).max(120).optional(),
  pageType: pageTypeEnum.optional(),
  categoryId: z.string().uuid().optional().nullable(),
  metaTitle: z.string().min(1).max(70).optional(),
  metaDescription: z.string().min(1).max(160).optional(),
  canonicalUrl: z.string().url().optional().nullable().or(z.literal('')),
  ogTitle: z.string().max(70).optional().nullable(),
  ogDescription: z.string().max(200).optional().nullable(),
  ogImage: z.string().url().optional().nullable().or(z.literal('')),
  twitterCard: twitterCardEnum.optional(),
  twitterTitle: z.string().max(70).optional().nullable(),
  twitterDescription: z.string().max(200).optional().nullable(),
  twitterImage: z.string().url().optional().nullable().or(z.literal('')),
  structuredData: z.record(z.unknown()).optional().nullable(),
  robots: z.string().max(100).optional().nullable(),
  extraMeta: z.array(extraMetaItemSchema).optional().nullable(),
  isActive: z.boolean().optional(),
});

// -----------------------------------------------------------
// Query schema
// -----------------------------------------------------------

export const pageSeoQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().optional(),
  pageType: pageTypeEnum.optional(),
  isActive: z.coerce.boolean().optional(),
});

// -----------------------------------------------------------
// Inferred TypeScript types
// -----------------------------------------------------------

export type CreatePageSeoInput = z.infer<typeof createPageSeoSchema>;
export type UpdatePageSeoInput = z.infer<typeof updatePageSeoSchema>;
export type PageSeoQueryInput  = z.infer<typeof pageSeoQuerySchema>;
