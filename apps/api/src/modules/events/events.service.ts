import { prisma } from '../../config/database';
import { NotFoundError } from '../../shared/errors/AppError';
import { Prisma } from '../../generated/prisma';

export class EventsService {
  static async getAll(query: { isActive?: boolean; page?: number; limit?: number }) {
    const page = query.page ? Number(query.page) : 1;
    const limit = query.limit ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;

    const where: Prisma.EventWhereInput = {};

    if (query.isActive !== undefined) {
      where.isActive = query.isActive;
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      }),
      prisma.event.count({ where }),
    ]);

    return {
      data: events,
      metadata: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
      },
    };
  }

  static async getById(id: string) {
    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    return event;
  }

  static async getLatestActive() {
    const event = await prisma.event.findFirst({
      where: { isActive: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    return event; // Might return null if no active events exist, handled gracefully
  }

  static async create(data: any) {
    return prisma.event.create({
      data,
    });
  }

  static async update(id: string, data: any) {
    await this.getById(id); // Check existence

    return prisma.event.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    await this.getById(id);

    await prisma.event.delete({
      where: { id },
    });

    return { success: true };
  }
}
