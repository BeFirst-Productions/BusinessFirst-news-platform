import { prisma } from '../../config/database';
import { NotFoundError, BadRequestError } from '../../shared/errors/AppError';
import { Prisma } from '../../generated/prisma';

export class WebsiteService {
  // Optimized Article Listing (No heavy 'content' field in response)
  static async getArticles(query: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string;
    isFeatured?: boolean;
    isBreakingNews?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(query.limit) || 12));
    const skip = (page - 1) * limit;

    const where: Prisma.ArticleWhereInput = {
      status: 'PUBLISHED',
    };

    if (query.categoryId) {
      where.categoryId = query.categoryId;
    }

    if (query.isFeatured !== undefined) {
      where.isFeatured = query.isFeatured;
    }

    if (query.isBreakingNews !== undefined) {
      where.isBreakingNews = query.isBreakingNews;
    }

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { excerpt: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const sortBy = query.sortBy || 'publishedAt';
    const sortOrder = query.sortOrder || 'desc';

    const orderBy: Prisma.ArticleOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    // Projected selection for listing (excluding heavy 'content' column)
    const select = {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      featuredImage: true,
      isFeatured: true,
      isBreakingNews: true,
      viewCount: true,
      readingTime: true,
      publishedAt: true,
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      author: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    };

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        select,
      }),
      prisma.article.count({ where }),
    ]);

    return {
      data: articles,
      metadata: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get Single Article by Slug (with full content and increments view count)
  static async getArticleBySlug(slug: string) {
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            bio: true,
          },
        },
      },
    });

    if (!article || article.status !== 'PUBLISHED') {
      throw new NotFoundError('Article not found');
    }

    // Increment view count asynchronously
    prisma.article
      .update({
        where: { id: article.id },
        data: { viewCount: { increment: 1 } },
      })
      .catch((err) => console.error('Failed to increment view count:', err));

    return article;
  }

  // Fetch Categories List
  static async getCategories(query: { isActive?: boolean }) {
    const where: Prisma.CategoryWhereInput = {};
    if (query.isActive !== undefined) {
      where.isActive = query.isActive;
    }

    return prisma.category.findMany({
      where,
      orderBy: { order: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        order: true,
        isActive: true,
      },
    });
  }

  // Fetch Category by Slug
  static async getCategoryBySlug(slug: string) {
    const category = await prisma.category.findUnique({
      where: { slug },
    });

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    return category;
  }

  // Fetch Category Tree Structure (for Navbar navigation)
  static async getCategoryTree() {
    const allCategories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    // Build the hierarchical tree structure
    const tree = allCategories.filter((c) => !c.parentId);
    const map = new Map<string, typeof allCategories>();

    allCategories.forEach((c) => {
      if (c.parentId) {
        if (!map.has(c.parentId)) {
          map.set(c.parentId, []);
        }
        map.get(c.parentId)!.push(c);
      }
    });

    const populateChildren = (nodes: any[]) => {
      nodes.forEach((node) => {
        const children = map.get(node.id) || [];
        node.children = children;
        if (children.length > 0) {
          populateChildren(children);
        }
      });
    };

    populateChildren(tree);
    return tree;
  }

  // Fetch Ads for specific slot
  static async getAdsBySlot(slotCode: string) {
    const adSpace = await prisma.adSpace.findUnique({
      where: { code: slotCode, isActive: true },
    });

    if (!adSpace) {
      return [];
    }

    const placements = await prisma.adPlacement.findMany({
      where: {
        adSpaceId: adSpace.id,
        isActive: true,
        ad: {
          status: 'ACTIVE',
          startDate: { lte: new Date() },
          endDate: { gte: new Date() },
        },
      },
      orderBy: { order: 'asc' },
      include: {
        ad: true,
      },
      take: adSpace.maxAds,
    });

    return placements.map((p) => p.ad);
  }

  // Track ad impression
  static async trackAdImpression(adId: string, slotCode: string) {
    await prisma.$transaction([
      prisma.ad.update({
        where: { id: adId },
        data: { impressions: { increment: 1 } },
      }),
      prisma.adAnalytics.create({
        data: {
          adId,
          impressions: 1,
          clicks: 0,
        },
      }),
    ]);
    return { success: true };
  }

  // Track ad click
  static async trackAdClick(adId: string, slotCode: string) {
    await prisma.$transaction([
      prisma.ad.update({
        where: { id: adId },
        data: { clicks: { increment: 1 } },
      }),
      prisma.adAnalytics.create({
        data: {
          adId,
          impressions: 0,
          clicks: 1,
        },
      }),
    ]);
    return { success: true };
  }

  // Subscribe Newsletter
  static async subscribeNewsletter(email: string, name?: string) {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new BadRequestError('Invalid email address');
    }

    const subscriber = await prisma.newsletter.upsert({
      where: { email },
      update: { isActive: true },
      create: {
        email,
        name: name || null,
        isActive: true,
      },
    });

    return { success: true, subscriber };
  }

  // Fetch Related Articles (same category, excluding current article)
  static async getRelatedArticles(articleId: string, limit: number) {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: { category: true },
    });

    if (!article) {
      throw new NotFoundError('Article not found');
    }

    if (!article.categoryId) {
      return {
        data: [],
        metadata: {
          page: 1,
          limit,
          total: 0,
          totalPages: 0,
        },
      };
    }

    const relatedArticles = await prisma.article.findMany({
      where: {
        id: { not: articleId },
        status: 'PUBLISHED',
        categoryId: article.categoryId,
      },
      take: limit,
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        isFeatured: true,
        isBreakingNews: true,
        viewCount: true,
        readingTime: true,
        publishedAt: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    return {
      data: relatedArticles,
      metadata: {
        page: 1,
        limit,
        total: relatedArticles.length,
        totalPages: 1,
      },
    };
  }
}
