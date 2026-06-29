import { prisma } from '../../src/config/database';
import { Role, UserStatus } from '../../src/generated/prisma';
import { PasswordUtil } from '../../src/shared/utils/password.util';
import { env } from '../../src/config/env';

async function main() {
  console.log('🌱 Starting database seed...');

  // Create default modules
  const modules = [
    { name: 'Dashboard', code: 'DASHBOARD', description: 'Access to dashboard', order: 1 },
    { name: 'Articles', code: 'ARTICLES', description: 'Manage articles', order: 2 },
    { name: 'Categories', code: 'CATEGORIES', description: 'Manage categories', order: 3 },
    { name: 'Tags', code: 'TAGS', description: 'Manage tags', order: 4 },
    { name: 'Ads', code: 'ADS', description: 'Manage advertisements', order: 5 },
    { name: 'Users', code: 'USERS', description: 'Manage users', order: 6 },
    { name: 'Settings', code: 'SETTINGS', description: 'Manage settings', order: 7 },
    { name: 'Newsletter', code: 'NEWSLETTER', description: 'Manage newsletter', order: 8 },
    { name: 'Analytics', code: 'ANALYTICS', description: 'View analytics', order: 9 },
    { name: 'Media', code: 'MEDIA', description: 'Manage media files', order: 10 },
    { name: 'SEO', code: 'SEO', description: 'Manage SEO settings', order: 11 },
    { name: 'Comments', code: 'COMMENTS', description: 'Manage comments', order: 12 },
    { name: 'Contacts', code: 'CONTACTS', description: 'Manage contact messages', order: 13 },
  ];

  for (const module of modules) {
    await prisma.module.upsert({
      where: { code: module.code },
      update: module,
      create: module,
    });
  }
  console.log('✅ Modules created');

  // Create super admin
  const hashedPassword = await PasswordUtil.hash(env.SUPER_ADMIN_PASSWORD);

  const superAdmin = await prisma.user.upsert({
    where: { email: env.SUPER_ADMIN_EMAIL },
    update: {},
    create: {
      email: env.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      name: 'Super Admin',
      role: Role.SUPERADMIN,
      status: UserStatus.ACTIVE,
      canCreateUsers: true,
    },
  });
  console.log('✅ Super Admin created');



  // Create ad spaces
  const adSpaces = [
    { name: 'Home Top Banner', code: 'HOME_TOP_BANNER', description: 'Top banner on homepage' },
    { name: 'Home Sidebar', code: 'HOME_SIDEBAR', description: 'Sidebar on homepage' },
    { name: 'Home Bottom Banner', code: 'HOME_BOTTOM_BANNER', description: 'Bottom banner on homepage' },
    { name: 'Article Top', code: 'ARTICLE_TOP', description: 'Top of article page' },
    { name: 'Article Middle', code: 'ARTICLE_MIDDLE', description: 'Middle of article content' },
    { name: 'Article Sidebar', code: 'ARTICLE_SIDEBAR', description: 'Sidebar on article page' },
    { name: 'Category Top', code: 'CATEGORY_TOP', description: 'Top of category page' },
    { name: 'Category Sidebar', code: 'CATEGORY_SIDEBAR', description: 'Sidebar on category page' },
  ];

  for (const space of adSpaces) {
    await prisma.adSpace.upsert({
      where: { code: space.code },
      update: space,
      create: space,
    });
  }
  console.log('✅ Ad spaces created');

  // Create default settings
  const settings = [
    {
      key: 'site_name',
      value: { value: 'BusinessFirst News' },
      description: 'Website name',
    },
    {
      key: 'site_description',
      value: { value: 'Latest business news and financial updates' },
      description: 'Website description',
    },
    {
      key: 'posts_per_page',
      value: { value: 10 },
      description: 'Number of posts per page',
    },
    {
      key: 'enable_comments',
      value: { value: true },
      description: 'Enable/disable comments',
    },
    {
      key: 'moderate_comments',
      value: { value: true },
      description: 'Moderate comments before publishing',
    },
    {
      key: 'default_meta_title',
      value: { value: 'BusinessFirst News - Latest Business Updates' },
      description: 'Default meta title',
    },
    {
      key: 'default_meta_description',
      value: { value: 'Stay updated with the latest business news, financial markets, and corporate developments.' },
      description: 'Default meta description',
    },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: setting,
      create: {
        ...setting,
        updatedBy: superAdmin.id,
      },
    });
  }
  console.log('✅ Settings created');

  console.log('🌱 Database seed completed successfully!');
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });