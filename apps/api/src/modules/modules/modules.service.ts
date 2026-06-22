import { prisma } from '../../config/database';
import { NotFoundError, ConflictError } from '../../shared/errors/AppError';
import { CreateModuleInput, UpdateModuleInput } from './modules.validation';

export class ModulesService {
  static async getAllModules() {
    const modules = await prisma.module.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: {
            permissions: true,
          },
        },
      },
    });

    return modules;
  }

  static async getModuleById(moduleId: string) {
    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      include: {
        _count: {
          select: {
            permissions: true,
          },
        },
      },
    });

    if (!module) {
      throw new NotFoundError('Module not found');
    }

    return module;
  }

  static async createModule(data: CreateModuleInput) {
    // Check if module with same name or code exists
    const existingModule = await prisma.module.findFirst({
      where: {
        OR: [
          { name: data.name },
          { code: data.code },
        ],
      },
    });

    if (existingModule) {
      throw new ConflictError('Module with this name or code already exists');
    }

    const module = await prisma.module.create({
      data,
    });

    return module;
  }

  static async updateModule(moduleId: string, data: UpdateModuleInput) {
    const module = await prisma.module.findUnique({
      where: { id: moduleId },
    });

    if (!module) {
      throw new NotFoundError('Module not found');
    }

    const updatedModule = await prisma.module.update({
      where: { id: moduleId },
      data,
    });

    return updatedModule;
  }

  static async deleteModule(moduleId: string) {
    const module = await prisma.module.findUnique({
      where: { id: moduleId },
    });

    if (!module) {
      throw new NotFoundError('Module not found');
    }

    // Check if module has permissions assigned
    const permissionCount = await prisma.userModulePermission.count({
      where: { moduleId },
    });

    if (permissionCount > 0) {
      // Delete all permissions first
      await prisma.userModulePermission.deleteMany({
        where: { moduleId },
      });
    }

    await prisma.module.delete({
      where: { id: moduleId },
    });

    return { message: 'Module deleted successfully' };
  }

  static async getDefaultModules(): Promise<Array<{ name: string; code: string; description: string }>> {
    return [
      { name: 'Dashboard', code: 'DASHBOARD', description: 'Access to dashboard' },
      { name: 'Articles', code: 'ARTICLES', description: 'Manage articles' },
      { name: 'Categories', code: 'CATEGORIES', description: 'Manage categories' },
      { name: 'Ads', code: 'ADS', description: 'Manage advertisements' },
      { name: 'Users', code: 'USERS', description: 'Manage users' },
      { name: 'Settings', code: 'SETTINGS', description: 'Manage settings' },
      { name: 'Newsletter', code: 'NEWSLETTER', description: 'Manage newsletter' },
      { name: 'Analytics', code: 'ANALYTICS', description: 'View analytics' },
      { name: 'Media', code: 'MEDIA', description: 'Manage media files' },
      { name: 'SEO', code: 'SEO', description: 'Manage SEO settings' },
      { name: 'Comments', code: 'COMMENTS', description: 'Manage comments' },
      { name: 'Contacts', code: 'CONTACTS', description: 'Manage contact messages' },
    ];
  }
}