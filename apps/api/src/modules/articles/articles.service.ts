import { prisma } from '../../config/database';
import { NotFoundError, ConflictError, BadRequestError } from '../../shared/errors/AppError';
import { CreateArticleInput, UpdateArticleInput, ArticleQueryInput } from './articles.validation';
import { SlugUtil } from '../../shared/utils/slug.util';
import { Prisma, ArticleStatus } from '../../generated/prisma';
import { WebsiteService } from '../website/website.service';

export class ArticlesService {
  static async getArticles(query: ArticleQueryInput) {
    const {
      page,
      limit,
      search,
      status,
      categoryId,
      isTopHeadline,
      isTrending,
      isUaeNews,
      isSponsored,
      sortBy,
      sortOrder,
    } = query;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: Prisma.ArticleWhereInput = {};

    if (status) {
      where.status = status as ArticleStatus;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (isTopHeadline !== undefined) {
      where.isTopHeadline = isTopHeadline;
    }

    if (isTrending !== undefined) {
      where.isTrending = isTrending;
    }

    if (isUaeNews !== undefined) {
      where.isUaeNews = isUaeNews;
    }

    if (isSponsored !== undefined) {
      where.isSponsored = isSponsored;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Build order by
    const orderBy: Prisma.ArticleOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          category: {
            select: { id: true, name: true, slug: true },
          },
          author: {
            select: { id: true, name: true, avatar: true },
          },
          tags: {
            include: {
              tag: {
                select: { id: true, name: true, slug: true },
              },
            },
          },
        },
      }),
      prisma.article.count({ where }),
    ]);

    // Flatten tags for client convenience
    const formattedArticles = articles.map(article => ({
      ...article,
      tags: article.tags.map(t => t.tag),
    }));

    return { articles: formattedArticles, total };
  }

  static async getArticleById(id: string) {
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        category: true,
        author: {
          select: { id: true, name: true, email: true, avatar: true },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!article) {
      throw new NotFoundError('Article not found');
    }

    return {
      ...article,
      tags: article.tags.map(t => t.tag),
    };
  }

  static async createArticle(data: CreateArticleInput, authorId: string) {
    // Generate unique slug
    const customSlug = data.slug && data.slug.trim() !== '' ? data.slug : null;
    let slug = customSlug ? SlugUtil.generate(customSlug, false) : SlugUtil.generate(data.title, false);
    const existingSlug = await prisma.article.findUnique({
      where: { slug },
    });
    if (existingSlug) {
      if (customSlug) {
        throw new ConflictError('The custom URL slug is already in use by another article');
      } else {
        slug = SlugUtil.generate(data.title, true);
      }
    }

    // Check category exists
    const categoryExists = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });
    if (!categoryExists) {
      throw new NotFoundError('Category not found');
    }

    // Validate that SEO and Featured Image are provided if publishing
    if (data.status === 'PUBLISHED') {
      if (!data.metaTitle?.trim()) {
        throw new BadRequestError('Meta Title is required for publishing');
      }
      if (!data.metaDescription?.trim()) {
        throw new BadRequestError('Meta Description is required for publishing');
      }
      if (!data.featuredImage?.trim()) {
        throw new BadRequestError('Featured Image is required for publishing');
      }
    }

    // Calculate approximate reading time (average 200 words/min)
    const wordCount = data.content.split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const author = await prisma.user.findUnique({ where: { id: authorId }, select: { name: true } });
    const article = await prisma.article.create({
      data: {
        title: data.title,
        slug,
        content: data.content,
        excerpt: data.excerpt || null,
        featuredImage: data.featuredImage || null,
        featuredImageTitle: data.featuredImageTitle || null,
        status: data.status as ArticleStatus,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
        isFeatured: data.isFeatured,
        isBreakingNews: data.isBreakingNews || data.isTopHeadline || false,
        isTopHeadline: data.isTopHeadline || false,
        isTrending: data.isTrending || false,
        isUaeNews: data.isUaeNews || false,
        isSponsored: data.isSponsored || false,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        metaKeywords: data.metaKeywords || null,
        readingTime,
        authorId,
        categoryId: data.categoryId,
        tags: {
          create: data.tags?.map(tagId => ({ tagId })) || [],
        },
      },
      include: {
        category: true,
        author: {
          select: { id: true, name: true, email: true, avatar: true },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    // Invalidate website cache asynchronously
    WebsiteService.invalidateCache().catch((err) =>
      console.error('Failed to invalidate website cache on article creation:', err)
    );

    return {
      ...article,
      tags: article.tags.map(t => t.tag),
    };
  }

  static async updateArticle(id: string, data: UpdateArticleInput) {
    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundError('Article not found');
    }

    // Validate that an already published article cannot be changed back to draft
    if (article.status === 'PUBLISHED' && data.status !== undefined && data.status !== 'PUBLISHED') {
      throw new BadRequestError('Once an article is published, it cannot be reverted to a draft');
    }

    // Validate that SEO and Featured Image are provided if publishing
    const finalStatus = data.status !== undefined ? data.status : article.status;
    if (finalStatus === 'PUBLISHED') {
      const finalMetaTitle = data.metaTitle !== undefined ? data.metaTitle : article.metaTitle;
      const finalMetaDescription = data.metaDescription !== undefined ? data.metaDescription : article.metaDescription;
      const finalFeaturedImage = data.featuredImage !== undefined ? data.featuredImage : article.featuredImage;

      if (!finalMetaTitle?.trim()) {
        throw new BadRequestError('Meta Title is required for publishing');
      }
      if (!finalMetaDescription?.trim()) {
        throw new BadRequestError('Meta Description is required for publishing');
      }
      if (!finalFeaturedImage?.trim()) {
        throw new BadRequestError('Featured Image is required for publishing');
      }
    }

    const updateData: any = {};

    if (data.title !== undefined && data.title !== article.title) {
      updateData.title = data.title;
    }

    if (data.slug !== undefined && data.slug !== null && data.slug.trim() !== '') {
      const cleanSlug = SlugUtil.generate(data.slug, false);
      if (cleanSlug !== article.slug) {
        const existingSlug = await prisma.article.findUnique({
          where: { slug: cleanSlug },
        });
        if (existingSlug && existingSlug.id !== id) {
          throw new ConflictError('The custom URL slug is already in use by another article');
        }
        updateData.slug = cleanSlug;
      }
    } else if (data.title !== undefined && data.title !== article.title) {
      // If title changed and no slug was provided in the update payload
      let slug = SlugUtil.generate(data.title, false);
      const existingSlug = await prisma.article.findUnique({
        where: { slug },
      });
      if (existingSlug && existingSlug.id !== id) {
        slug = SlugUtil.generate(data.title, true);
      }
      updateData.slug = slug;
    }

    if (data.content !== undefined) {
      updateData.content = data.content;
      // Recalculate reading time
      const wordCount = data.content.split(/\s+/).length;
      updateData.readingTime = Math.max(1, Math.ceil(wordCount / 200));
    }

    if (data.excerpt !== undefined) {
      updateData.excerpt = data.excerpt || null;
    }

    if (data.featuredImage !== undefined) {
      updateData.featuredImage = data.featuredImage || null;
    }

    if (data.featuredImageTitle !== undefined) {
      updateData.featuredImageTitle = data.featuredImageTitle || null;
    }

    if (data.categoryId !== undefined) {
      if (data.categoryId) {
        const categoryExists = await prisma.category.findUnique({
          where: { id: data.categoryId },
        });
        if (!categoryExists) {
          throw new NotFoundError('Category not found');
        }
        updateData.categoryId = data.categoryId;
      } else {
        updateData.categoryId = null;
      }
    }

    if (data.status !== undefined) {
      updateData.status = data.status as ArticleStatus;
      if (data.status === 'PUBLISHED' && article.status !== 'PUBLISHED') {
        updateData.publishedAt = new Date();
      }
    }

    if (data.scheduledAt !== undefined) {
      updateData.scheduledAt = data.scheduledAt ? new Date(data.scheduledAt) : null;
    }

    if (data.isFeatured !== undefined) {
      updateData.isFeatured = data.isFeatured;
    }

    if (data.isBreakingNews !== undefined) {
      updateData.isBreakingNews = data.isBreakingNews;
    }

    if (data.isTopHeadline !== undefined) {
      updateData.isTopHeadline = data.isTopHeadline;
      updateData.isBreakingNews = data.isTopHeadline;
    }

    if (data.isTrending !== undefined) {
      updateData.isTrending = data.isTrending;
    }

    if (data.isUaeNews !== undefined) {
      updateData.isUaeNews = data.isUaeNews;
    }

    if (data.isSponsored !== undefined) {
      updateData.isSponsored = data.isSponsored;
    }

    if (data.metaTitle !== undefined) {
      updateData.metaTitle = data.metaTitle || null;
    }

    if (data.metaDescription !== undefined) {
      updateData.metaDescription = data.metaDescription || null;
    }

    if (data.metaKeywords !== undefined) {
      updateData.metaKeywords = data.metaKeywords || null;
    }

    // Sync tags inside a transaction if updated
    const updatedArticle = await prisma.$transaction(async (tx) => {
      if (data.tags !== undefined) {
        // Delete all old links
        await tx.articleTag.deleteMany({
          where: { articleId: id },
        });

        // Insert new ones
        if (data.tags.length > 0) {
          await tx.articleTag.createMany({
            data: data.tags.map(tagId => ({
              articleId: id,
              tagId,
            })),
          });
        }
      }

      return tx.article.update({
        where: { id },
        data: updateData,
        include: {
          category: true,
          author: {
            select: { id: true, name: true, email: true, avatar: true },
          },
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });
    });

    // Invalidate website cache asynchronously
    WebsiteService.invalidateCache().catch((err) =>
      console.error('Failed to invalidate website cache on article update:', err)
    );

    return {
      ...updatedArticle,
      tags: updatedArticle.tags.map(t => t.tag),
    };
  }

  static async deleteArticle(id: string) {
    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundError('Article not found');
    }

    // Cascade deletes on tags and comments are configured in schema,
    // so we can directly delete the article
    await prisma.article.delete({
      where: { id },
    });

    // Invalidate website cache asynchronously
    WebsiteService.invalidateCache().catch((err) =>
      console.error('Failed to invalidate website cache on article deletion:', err)
    );

    return { message: 'Article deleted successfully' };
  }

  static async bulkDeleteArticles(ids: string[]) {
    await prisma.article.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    // Invalidate website cache asynchronously
    WebsiteService.invalidateCache().catch((err) =>
      console.error('Failed to invalidate website cache on bulk article deletion:', err)
    );

    return { message: `${ids.length} articles deleted successfully` };
  }
}
