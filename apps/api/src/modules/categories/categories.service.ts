import { prisma } from '../../config/database';
import { NotFoundError, ConflictError } from '../../shared/errors/AppError';
import { CreateCategoryInput, UpdateCategoryInput } from './categories.validation';
import { SlugUtil } from '../../shared/utils/slug.util';
import { WebsiteService } from '../website/website.service';

export class CategoriesService {
  static async getAllCategories() {
    const categories = await prisma.category.findMany({
      orderBy: [
        { order: 'asc' },
        { name: 'asc' },
      ],
      include: {
        _count: {
          select: {
            articles: true,
          },
        },
      },
    });

    return categories;
  }

  static async getCategoryById(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            articles: true,
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    return category;
  }

  static async createCategory(data: CreateCategoryInput) {
    // Check name duplicate
    const existingName = await prisma.category.findUnique({
      where: { name: data.name },
    });

    if (existingName) {
      throw new ConflictError('Category name already exists');
    }

    // Generate unique slug
    let slug = SlugUtil.generate(data.name, false);
    const existingSlug = await prisma.category.findUnique({
      where: { slug },
    });
    if (existingSlug) {
      slug = SlugUtil.generate(data.name, true);
    }

    // Handle parent relation
    let parentId: string | null = null;
    if (data.parentId) {
      const parent = await prisma.category.findUnique({
        where: { id: data.parentId },
      });
      if (!parent) {
        throw new NotFoundError('Parent category not found');
      }
      parentId = data.parentId;
    }

    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug,
        description: data.description || null,
        parentId,
        isActive: data.isActive,
        order: data.order,
      },
    });

    // Automatically generate and link default SEO record for the newly created category
    try {
      await prisma.pageSeo.upsert({
        where: { slug: `category/${category.slug}` },
        create: {
          slug: `category/${category.slug}`,
          label: `Category: ${category.name}`,
          pageType: 'CATEGORY',
          categoryId: category.id,
          metaTitle: `${category.name} – Latest News & Updates | BusinessFirst`,
          metaDescription: category.description
            ? `${category.description} Read the latest ${category.name} news, in-depth analysis, market updates, and insights on BusinessFirst.`
            : `Read the latest ${category.name} news, in-depth analysis, market updates, and insights from BusinessFirst.`,
          canonicalUrl: `https://businessfirstnews.com/${category.slug}`,
          robots: 'index, follow',
          twitterCard: 'SUMMARY_LARGE_IMAGE',
          isActive: category.isActive ?? true,
          extraMeta: [
            {
              name: 'keywords',
              content: `${category.name}, ${category.name} news, UAE ${category.name}, latest ${category.name} updates, BusinessFirst`,
            },
          ],
        },
        update: {
          categoryId: category.id,
        },
      });
    } catch (seoErr) {
      console.error('Failed to auto-create PageSeo for new category:', seoErr);
    }

    // Invalidate website cache asynchronously
    WebsiteService.invalidateCache().catch((err) =>
      console.error('Failed to invalidate website cache on category creation:', err)
    );

    return category;
  }

  static async updateCategory(id: string, data: UpdateCategoryInput) {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    const updateData: any = {};

    if (data.name !== undefined && data.name !== category.name) {
      const existingName = await prisma.category.findUnique({
        where: { name: data.name },
      });
      if (existingName) {
        throw new ConflictError('Category name already exists');
      }
      updateData.name = data.name;

      // Update slug
      let slug = SlugUtil.generate(data.name, false);
      const existingSlug = await prisma.category.findUnique({
        where: { slug },
      });
      if (existingSlug) {
        slug = SlugUtil.generate(data.name, true);
      }
      updateData.slug = slug;
    }

    if (data.description !== undefined) {
      updateData.description = data.description || null;
    }

    if (data.parentId !== undefined) {
      if (data.parentId === id) {
        throw new ConflictError('A category cannot be its own parent');
      }
      if (data.parentId) {
        const parent = await prisma.category.findUnique({
          where: { id: data.parentId },
        });
        if (!parent) {
          throw new NotFoundError('Parent category not found');
        }
        updateData.parentId = data.parentId;
      } else {
        updateData.parentId = null;
      }
    }

    if (data.isActive !== undefined) {
      updateData.isActive = data.isActive;
    }

    if (data.order !== undefined) {
      updateData.order = data.order;
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: updateData,
    });

    // Keep associated PageSeo record in sync
    if (updateData.name || updateData.slug) {
      try {
        const seoRecord = await prisma.pageSeo.findFirst({
          where: { categoryId: id },
        });
        if (seoRecord) {
          await prisma.pageSeo.update({
            where: { id: seoRecord.id },
            data: {
              ...(updateData.slug ? {
                slug: `category/${updatedCategory.slug}`,
                canonicalUrl: `https://businessfirstnews.com/${updatedCategory.slug}`,
              } : {}),
              ...(updateData.name ? {
                label: `Category: ${updatedCategory.name}`,
              } : {}),
            },
          });
        }
      } catch (seoErr) {
        console.error('Failed to sync PageSeo on category update:', seoErr);
      }
    }

    // Invalidate website cache asynchronously
    WebsiteService.invalidateCache().catch((err) =>
      console.error('Failed to invalidate website cache on category update:', err)
    );

    return updatedCategory;
  }

  static async deleteCategory(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    // Check if category has subcategories
    const subCategoriesCount = await prisma.category.count({
      where: { parentId: id },
    });
    if (subCategoriesCount > 0) {
      throw new ConflictError('Cannot delete category with subcategories');
    }

    // Check if category has articles
    const articlesCount = await prisma.article.count({
      where: {
        categoryId: id,
      },
    });
    if (articlesCount > 0) {
      throw new ConflictError('Cannot delete category with associated articles');
    }

    // Clean up associated PageSeo record before deleting category
    await prisma.pageSeo.deleteMany({
      where: {
        OR: [
          { categoryId: id },
          { slug: `category/${category.slug}` },
        ],
      },
    }).catch((err) => console.error('Failed to cleanup category PageSeo:', err));

    await prisma.category.delete({
      where: { id },
    });

    // Invalidate website cache asynchronously
    WebsiteService.invalidateCache().catch((err) =>
      console.error('Failed to invalidate website cache on category deletion:', err)
    );

    return { message: 'Category deleted successfully' };
  }
}
