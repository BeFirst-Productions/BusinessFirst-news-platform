import { prisma } from '../../config/database';
import { NotFoundError } from '../../shared/errors/AppError';
import { CreateAdInput, UpdateAdInput, AdQueryInput } from './ads.validation';
import { CloudinaryService } from '../../shared/services/cloudinary.service';
import { Prisma, AdType, AdStatus } from '../../generated/prisma';
import { WebsiteService } from '../website/website.service';

export class AdsService {
  static async getAds(query: AdQueryInput) {
    const { page, limit, search, status, targetPage } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.AdWhereInput = {};

    if (status) {
      where.status = status as AdStatus;
    }

    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    if (targetPage) {
      where.targetPage = targetPage;
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

  static async createAd(
    data: CreateAdInput,
    files: { image?: Express.Multer.File; video?: Express.Multer.File },
    createdBy: string
  ) {
    let imageUrl: string | null = null;
    let videoUrl: string | null = null;

    // Upload files to Cloudinary if they exist
    if (files.image) {
      imageUrl = await CloudinaryService.uploadBuffer(files.image.buffer, 'ads', 'image', files.image.mimetype);
    }
    if (files.video) {
      videoUrl = await CloudinaryService.uploadBuffer(files.video.buffer, 'ads', 'video', files.video.mimetype);
    }

    const ad = await prisma.ad.create({
      data: {
        name: data.name,
        type: data.type as AdType,
        redirectUrl: data.redirectUrl || null,
        imageUrl,
        videoUrl,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        priority: data.priority,
        targetPage: data.targetPage,
        ratio: data.ratio,
        pageName: data.pageName,
        placementName: data.placementName,
        createdBy,
      },
    });

    // Invalidate website cache asynchronously
    WebsiteService.invalidateCache().catch((err) =>
      console.error('Failed to invalidate website cache on ad creation:', err)
    );

    return ad;
  }

  static async updateAd(
    id: string,
    data: UpdateAdInput,
    files: { image?: Express.Multer.File; video?: Express.Multer.File }
  ) {
    const ad = await prisma.ad.findUnique({
      where: { id },
    });

    if (!ad) {
      throw new NotFoundError('Advertisement not found');
    }

    const updateData: any = { ...data };

    if (data.startDate) updateData.startDate = new Date(data.startDate);
    if (data.endDate) updateData.endDate = new Date(data.endDate);
    if (data.status) updateData.status = data.status as AdStatus;
    if (data.type) updateData.type = data.type as AdType;
    if (data.targetPage !== undefined) updateData.targetPage = data.targetPage;
    if (data.ratio !== undefined) updateData.ratio = data.ratio;
    if (data.pageName !== undefined) updateData.pageName = data.pageName;
    if (data.placementName !== undefined) updateData.placementName = data.placementName;

    // Upload files if updated
    if (files.image) {
      updateData.imageUrl = await CloudinaryService.uploadBuffer(files.image.buffer, 'ads', 'image', files.image.mimetype);
    }
    if (files.video) {
      updateData.videoUrl = await CloudinaryService.uploadBuffer(files.video.buffer, 'ads', 'video', files.video.mimetype);
    }

    const updatedAd = await prisma.ad.update({
      where: { id },
      data: updateData,
    });

    // Invalidate website cache asynchronously
    WebsiteService.invalidateCache().catch((err) =>
      console.error('Failed to invalidate website cache on ad update:', err)
    );

    return updatedAd;
  }

  static async deleteAd(id: string) {
    const ad = await prisma.ad.findUnique({
      where: { id },
    });

    if (!ad) {
      throw new NotFoundError('Advertisement not found');
    }

    await prisma.ad.delete({
      where: { id },
    });

    // Invalidate website cache asynchronously
    WebsiteService.invalidateCache().catch((err) =>
      console.error('Failed to invalidate website cache on ad deletion:', err)
    );

    return { message: 'Advertisement deleted successfully' };
  }
}
