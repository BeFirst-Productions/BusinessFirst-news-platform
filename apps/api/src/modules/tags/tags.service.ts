import { prisma } from '../../config/database';
import { ConflictError, NotFoundError } from '../../shared/errors/AppError';
import { CreateTagInput, UpdateTagInput } from './tags.validation';
import { SlugUtil } from '../../shared/utils/slug.util';
import { WebsiteService } from '../website/website.service';

export class TagsService {
  static async getAllTags() {
    const tags = await prisma.tag.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            articles: true,
          },
        },
      },
    });

    return tags;
  }

  static async getTagById(id: string) {
    const tag = await prisma.tag.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            articles: true,
          },
        },
      },
    });

    if (!tag) {
      throw new NotFoundError('Tag not found');
    }

    return tag;
  }

  static async createTag(data: CreateTagInput) {
    const existing = await prisma.tag.findUnique({
      where: { name: data.name },
    });

    if (existing) {
      throw new ConflictError('Tag with this name already exists');
    }

    let slug = SlugUtil.generate(data.name, false);
    const existingSlug = await prisma.tag.findUnique({
      where: { slug },
    });
    if (existingSlug) {
      slug = SlugUtil.generate(data.name, true);
    }

    const tag = await prisma.tag.create({
      data: {
        name: data.name,
        slug,
        description: data.description || null,
      },
    });

    // Invalidate website cache asynchronously
    WebsiteService.invalidateCache().catch((err) =>
      console.error('Failed to invalidate website cache on tag creation:', err)
    );

    return tag;
  }

  static async updateTag(id: string, data: UpdateTagInput) {
    const tag = await prisma.tag.findUnique({
      where: { id },
    });

    if (!tag) {
      throw new NotFoundError('Tag not found');
    }

    const updateData: any = {};

    if (data.name !== undefined && data.name !== tag.name) {
      const existing = await prisma.tag.findUnique({
        where: { name: data.name },
      });
      if (existing) {
        throw new ConflictError('Tag with this name already exists');
      }
      updateData.name = data.name;

      let slug = SlugUtil.generate(data.name, false);
      const existingSlug = await prisma.tag.findUnique({
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

    const updatedTag = await prisma.tag.update({
      where: { id },
      data: updateData,
    });

    // Invalidate website cache asynchronously
    WebsiteService.invalidateCache().catch((err) =>
      console.error('Failed to invalidate website cache on tag update:', err)
    );

    return updatedTag;
  }

  static async deleteTag(id: string) {
    const tag = await prisma.tag.findUnique({
      where: { id },
    });

    if (!tag) {
      throw new NotFoundError('Tag not found');
    }

    await prisma.tag.delete({
      where: { id },
    });

    // Invalidate website cache asynchronously
    WebsiteService.invalidateCache().catch((err) =>
      console.error('Failed to invalidate website cache on tag deletion:', err)
    );

    return { message: 'Tag deleted successfully' };
  }
}
