import { z } from 'zod';

export const createArticleSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().max(300).optional().nullable().or(z.literal('')),
  categoryIds: z.array(z.string().uuid('Invalid category ID')).min(1, 'At least one category must be selected'),
  tags: z.array(z.string().uuid()).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
  scheduledAt: z.string().optional().nullable().or(z.literal('')),
  isFeatured: z.boolean().default(false),
  isBreakingNews: z.boolean().default(false),
  metaTitle: z.string().optional().nullable().or(z.literal('')),
  metaDescription: z.string().max(160).optional().nullable().or(z.literal('')),
  metaKeywords: z.string().optional().nullable().or(z.literal('')),
  featuredImage: z.string().optional().nullable().or(z.literal('')),
}).superRefine((data, ctx) => {
  if (data.status === 'PUBLISHED') {
    if (!data.metaTitle || data.metaTitle.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Meta Title is required for publishing',
        path: ['metaTitle'],
      });
    }
    if (!data.metaDescription || data.metaDescription.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Meta Description is required for publishing',
        path: ['metaDescription'],
      });
    }
    if (!data.featuredImage || data.featuredImage.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Featured Image is required for publishing',
        path: ['featuredImage'],
      });
    }
  }
});

export const updateArticleSchema = z.object({
  title: z.string().min(5).optional(),
  content: z.string().optional(),
  excerpt: z.string().max(300).optional().nullable().or(z.literal('')),
  categoryIds: z.array(z.string().uuid()).optional(),
  tags: z.array(z.string().uuid()).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  scheduledAt: z.string().optional().nullable().or(z.literal('')),
  isFeatured: z.boolean().optional(),
  isBreakingNews: z.boolean().optional(),
  metaTitle: z.string().optional().nullable().or(z.literal('')),
  metaDescription: z.string().max(160).optional().nullable().or(z.literal('')),
  metaKeywords: z.string().optional().nullable().or(z.literal('')),
  featuredImage: z.string().optional().nullable().or(z.literal('')),
});

export const articleQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED']).optional(),
  categoryId: z.string().uuid().optional(),
  sortBy: z.enum(['title', 'createdAt', 'publishedAt', 'viewCount']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const bulkDeleteArticlesSchema = z.object({
  ids: z.array(z.string().uuid()),
});

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
export type ArticleQueryInput = z.infer<typeof articleQuerySchema>;
export type BulkDeleteArticlesInput = z.infer<typeof bulkDeleteArticlesSchema>;
