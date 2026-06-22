import { prisma } from '../../config/database';
import { NotFoundError, ConflictError } from '../../shared/errors/AppError';
import { CreateCategoryInput, UpdateCategoryInput } from './categories.validation';
import { SlugUtil } from '../../shared/utils/slug.util';

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
        categories: {
          some: {
            id,
          },
        },
      },
    });
    if (articlesCount > 0) {
      throw new ConflictError('Cannot delete category with associated articles');
    }

    await prisma.category.delete({
      where: { id },
    });

    return { message: 'Category deleted successfully' };
  }
}
