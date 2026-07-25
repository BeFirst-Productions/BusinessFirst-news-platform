import { prisma } from '../../config/database';
import { NotFoundError, BadRequestError } from '../../shared/errors/AppError';
import { Prisma } from '../../generated/prisma';
import { NotificationsService } from '../notifications/notifications.service';
import RedisClient from '../../config/redis';

export class WebsiteService {
  // Generic Redis Cache-aside helper
  private static async getCachedOrFetch<T>(
    key: string,
    ttl: number,
    fetchFn: () => Promise<T>
  ): Promise<T> {
    try {
      const cached = await RedisClient.get(key);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (err) {
      console.error(`Redis cache get failed for key ${key}:`, err);
    }

    const data = await fetchFn();

    try {
      await RedisClient.set(key, JSON.stringify(data), ttl);
    } catch (err) {
      console.error(`Redis cache set failed for key ${key}:`, err);
    }

    return data;
  }

  // Invalidate cache keys matching a pattern
  public static async invalidateCache(pattern: string = 'website:*') {
    try {
      await RedisClient.delByPattern(pattern);
    } catch (err) {
      console.error(`Failed to invalidate cache with pattern ${pattern}:`, err);
    }
  }

  // Single Aggregated Home Content
  static async getHomeContent() {
    const cacheKey = 'website:home-content';

    return this.getCachedOrFetch(cacheKey, 300, async () => {
      const selectFields = {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        isFeatured: true,
        isBreakingNews: true,
        isTopHeadline: true,
        isTrending: true,
        isUaeNews: true,
        isSponsored: true,
        publishedAt: true,
        createdAt: true,
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

      const [featured, topHeadlines, breakingNews, latest] = await Promise.all([
        prisma.article.findMany({
          where: { status: 'PUBLISHED', isFeatured: true },
          take: 6,
          orderBy: { publishedAt: 'desc' },
          select: selectFields,
        }),
        prisma.article.findMany({
          where: { status: 'PUBLISHED', isTopHeadline: true },
          take: 10,
          orderBy: { publishedAt: 'desc' },
          select: selectFields,
        }),
        prisma.article.findMany({
          where: { status: 'PUBLISHED', isBreakingNews: true },
          take: 5,
          orderBy: { publishedAt: 'desc' },
          select: selectFields,
        }),
        prisma.article.findMany({
          where: { status: 'PUBLISHED' },
          take: 15,
          orderBy: { publishedAt: 'desc' },
          select: selectFields,
        }),
      ]);

      return {
        featured,
        topHeadlines,
        breakingNews,
        latest,
      };
    });
  }

  // Single Aggregated Home Category Sections Endpoint
  static async getHomeCategories() {
    const cacheKey = 'website:home-categories';

    return this.getCachedOrFetch(cacheKey, 300, async () => {
      const selectFields = {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        isFeatured: true,
        isBreakingNews: true,
        isTopHeadline: true,
        isTrending: true,
        isUaeNews: true,
        isSponsored: true,
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

      const categoryConfigs = [
        { key: 'real-estate-construction', name: 'Real Estate & Construction', limit: 7, matchers: ['real-estate-construction', 'real-estate', 'construction'] },
        { key: 'economy-policy', name: 'Economy & Policy', limit: 4, matchers: ['economy-policy', 'economy', 'policy'] },
        { key: 'technology-innovation', name: 'Technology & Innovation', limit: 6, matchers: ['technology-innovation', 'technology', 'innovation'] },
        { key: 'logistics-trade', name: 'Logistics & Trade', limit: 4, matchers: ['logistics-trade', 'logistics', 'trade'] },
        { key: 'aviation-aerospace', name: 'Aviation & Aerospace', limit: 4, matchers: ['aviation-aerospace', 'aviation', 'aerospace'] },
        { key: 'oil-gas-energy', name: 'Oil, Gas & Energy', limit: 4, matchers: ['oil-gas-energy', 'oil-gas', 'energy'] },
        { key: 'sports-recreation', name: 'Sports & Recreation', limit: 4, matchers: ['sports-recreation', 'sports', 'recreation'] },
        { key: 'banking-finance', name: 'Banking & Finance', limit: 7, matchers: ['banking-finance', 'banking', 'finance'] },
        { key: 'healthcare-pharma', name: 'Healthcare & Pharma', limit: 7, matchers: ['healthcare-pharma', 'healthcare', 'pharma'] },
        { key: 'tourism-hospitality', name: 'Tourism & Hospitality', limit: 5, matchers: ['tourism-hospitality', 'tourism', 'hospitality'] },
        { key: 'events', name: 'Events', limit: 6, matchers: ['events', 'events-coverage'] },
        { key: 'culture-lifestyle', name: 'Culture & Lifestyle', limit: 6, matchers: ['culture-lifestyle', 'lifestyle', 'culture'] },
        { key: 'media-entertainment', name: 'Media and Entertainment', limit: 4, matchers: ['media-entertainment', 'media-coverage', 'media', 'entertainment'] },
      ];

      // Fetch all active categories to resolve matches
      const dbCategories = await prisma.category.findMany({
        where: { isActive: true },
        select: { id: true, name: true, slug: true },
      });

      const sectionResults = await Promise.all(
        categoryConfigs.map(async (config) => {
          // Find category in DB by matching slug or name
          const matchedCategory = dbCategories.find((cat) =>
            config.matchers.some(
              (m) =>
                cat.slug.toLowerCase() === m.toLowerCase() ||
                cat.name.toLowerCase().includes(m.toLowerCase())
            )
          );

          let articles: any[] = [];
          if (matchedCategory) {
            articles = await prisma.article.findMany({
              where: {
                status: 'PUBLISHED',
                categoryId: matchedCategory.id,
              },
              take: config.limit,
              orderBy: { publishedAt: 'desc' },
              select: selectFields,
            });
          }

          return {
            key: config.key,
            data: {
              categoryName: config.name,
              categorySlug: matchedCategory ? matchedCategory.slug : config.key,
              limit: config.limit,
              articles,
            },
          };
        })
      );

      const result: Record<string, any> = {};
      for (const section of sectionResults) {
        result[section.key] = section.data;
      }

      return result;
    });
  }

  // Optimized Article Listing (No heavy 'content' field in response)
  static async getArticles(query: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string;
    isFeatured?: boolean;
    isBreakingNews?: boolean;
    isTopHeadline?: boolean;
    isTrending?: boolean;
    isUaeNews?: boolean;
    isSponsored?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const cacheKey = `website:articles:${JSON.stringify(query)}`;

    return this.getCachedOrFetch(cacheKey, 300, async () => {
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

      if (query.isTopHeadline !== undefined) {
        where.isTopHeadline = query.isTopHeadline;
      }

      if (query.isTrending !== undefined) {
        where.isTrending = query.isTrending;
      }

      if (query.isUaeNews !== undefined) {
        where.isUaeNews = query.isUaeNews;
      }

      if (query.isSponsored !== undefined) {
        where.isSponsored = query.isSponsored;
      } else {
        // Exclude sponsored articles by default in general listing/category queries
        where.isSponsored = false;
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
        isTopHeadline: true,
        isTrending: true,
        isUaeNews: true,
        isSponsored: true,
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
    });
  }

  // Get Single Article by Slug (with full content and increments view count)
  static async getArticleBySlug(slug: string) {
    const cacheKey = `website:article:${slug}`;

    const article = await this.getCachedOrFetch(cacheKey, 60, async () => {
      const dbArticle = await prisma.article.findUnique({
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

      if (!dbArticle || dbArticle.status !== 'PUBLISHED') {
        throw new NotFoundError('Article not found');
      }

      return dbArticle;
    });

    // Increment view count asynchronously on every hit (without blocking the request)
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
    const cacheKey = `website:categories:${JSON.stringify(query)}`;

    return this.getCachedOrFetch(cacheKey, 3600, async () => {
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
    });
  }

  // Fetch Category by Slug
  static async getCategoryBySlug(slug: string) {
    const cacheKey = `website:category:${slug}`;

    return this.getCachedOrFetch(cacheKey, 3600, async () => {
      const category = await prisma.category.findUnique({
        where: { slug },
      });

      if (!category) {
        throw new NotFoundError('Category not found');
      }

      return category;
    });
  }

  // Fetch Category Tree Structure (for Navbar navigation)
  static async getCategoryTree() {
    const cacheKey = 'website:categorytree';

    return this.getCachedOrFetch(cacheKey, 3600, async () => {
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
    });
  }

  static async getAds(query: any) {
    const page = query.page ? Number(query.page) : 1;
    const limit = query.limit ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;

    const where: Prisma.AdWhereInput = {};

    if (query.status) {
      where.status = query.status as any;
    }

    if (query.search) {
      where.name = { contains: query.search, mode: 'insensitive' };
    }

    if (query.targetPage) {
      where.targetPage = query.targetPage;
    }

    const [ads, total] = await Promise.all([
      prisma.ad.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.ad.count({ where }),
    ]);

    return { ads, total };
  }

  static async getAdById(id: string) {
    const ad = await prisma.ad.findUnique({
      where: { id },
    });

    if (!ad) {
      throw new NotFoundError('Advertisement not found');
    }

    return ad;
  }

  // Fetch Ads for specific slot
  static async getAdsBySlot(slotCode: string) {
    const cacheKey = `website:ads:${slotCode}`;

    return this.getCachedOrFetch(cacheKey, 600, async () => {
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
    });
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

    const existing = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (existing && existing.isActive) {
      return { success: true, subscriber: existing };
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

    // Trigger newsletter subscription notification
    await NotificationsService.createNewsletterNotification(email, name).catch((err) => {
      console.error('Failed to trigger subscriber notification:', err);
    });

    return { success: true, subscriber };
  }

  // Submit Contact Form
  static async submitContactForm(data: { name: string; email: string; subject: string; message: string }) {
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new BadRequestError('Invalid email address');
    }
    if (!data.name || !data.subject || !data.message) {
      throw new BadRequestError('All fields are required');
    }

    const contact = await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });

    // Trigger live notification
    await NotificationsService.createContactNotification(data).catch((err) => {
      console.error('Failed to trigger contact notification:', err);
    });

    return { success: true, contact };
  }

  // Fetch Related Articles (same category, excluding current article)
  static async getRelatedArticles(articleId: string, limit: number) {
    const cacheKey = `website:related:${articleId}:${limit}`;

    return this.getCachedOrFetch(cacheKey, 600, async () => {
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
          isTopHeadline: true,
          isTrending: true,
          isUaeNews: true,
          isSponsored: true,
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
    });
  }
}
