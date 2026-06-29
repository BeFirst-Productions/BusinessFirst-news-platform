import { prisma } from '../../config/database';

export class SearchService {
  static async globalSearch(query: string) {
    if (!query || query.trim().length < 2) {
      return {
        articles: [],
        categories: [],
        tags: [],
      };
    }

    const cleanQuery = query.trim();

    const [articles, categories, tags] = await Promise.all([
      prisma.article.findMany({
        where: {
          OR: [
            { title: { contains: cleanQuery, mode: 'insensitive' } },
            { excerpt: { contains: cleanQuery, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          title: true,
          slug: true,
          status: true,
          featuredImage: true,
        },
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.category.findMany({
        where: {
          OR: [
            { name: { contains: cleanQuery, mode: 'insensitive' } },
            { description: { contains: cleanQuery, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          name: true,
          slug: true,
          isActive: true,
        },
        take: 5,
        orderBy: { name: 'asc' },
      }),
      prisma.tag.findMany({
        where: {
          OR: [
            { name: { contains: cleanQuery, mode: 'insensitive' } },
            { description: { contains: cleanQuery, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          name: true,
          slug: true,
        },
        take: 5,
        orderBy: { name: 'asc' },
      }),
    ]);

    return {
      articles,
      categories,
      tags,
    };
  }
}
