import { prisma } from '../../config/database';
import { NotFoundError } from '../../shared/errors/AppError';
import { ContactQueryInput } from './contacts.validation';

export class ContactsService {
  static async getContacts(query: ContactQueryInput) {
    const { page, limit, search, isRead } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (isRead !== undefined) {
      where.isRead = isRead;
    }

    const [contacts, total] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.contactMessage.count({ where }),
    ]);

    return {
      data: contacts,
      metadata: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getContactById(id: string) {
    const contact = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!contact) {
      throw new NotFoundError('Contact message not found');
    }

    return contact;
  }

  static async markAsRead(id: string) {
    const contact = await this.getContactById(id);

    return prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });
  }

  static async deleteContact(id: string) {
    const contact = await this.getContactById(id);

    return prisma.contactMessage.delete({
      where: { id },
    });
  }

  static async bulkDeleteContacts(ids: string[]) {
    const result = await prisma.contactMessage.deleteMany({
      where: { id: { in: ids } },
    });
    return result;
  }
}
