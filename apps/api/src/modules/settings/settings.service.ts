import { prisma } from '../../config/database';
import { UpdateSettingsInput } from './settings.validation';

const DEFAULT_SETTINGS = [
  {
    key: 'ui_branding',
    type: 'JSON' as const,
    isPublic: true,
    description: 'System logo, primary brand theme colors, title and favicon',
    value: {
      siteTitle: 'BusinessFirst Admin',
      faviconUrl: '',
      lightLogoUrl: '',
      darkLogoUrl: '',
      primaryColor: '#0f172a',
    },
  },
  {
    key: 'ui_sidebar_navigation',
    type: 'JSON' as const,
    isPublic: true,
    description: 'Custom sidebar navigation order, visibility and icons mapping',
    value: [
      { code: 'DASHBOARD', title: 'Dashboard', icon: 'LayoutDashboard', visible: true },
      { code: 'ARTICLES', title: 'Articles', icon: 'FileText', visible: true },
      { code: 'CATEGORIES', title: 'Categories', icon: 'FolderTree', visible: true },
      { code: 'TAGS', title: 'Tags', icon: 'Tags', visible: true },
      { code: 'ADS', title: 'Ads Management', icon: 'Megaphone', visible: true },
      { code: 'MEDIA', title: 'Media Library', icon: 'ImageIcon', visible: true },
      { code: 'USERS', title: 'Users', icon: 'Users', visible: true },
      { code: 'NEWSLETTER', title: 'Newsletter', icon: 'Mail', visible: true },
      { code: 'COMMENTS', title: 'Comments', icon: 'MessageSquare', visible: true },
      { code: 'ANALYTICS', title: 'Analytics', icon: 'BarChart3', visible: true },
      { code: 'SEO', title: 'SEO', icon: 'Search', visible: true },
      { code: 'SETTINGS', title: 'Settings', icon: 'Settings', visible: true },
    ],
  },
  {
    key: 'ui_dashboard_widgets',
    type: 'JSON' as const,
    isPublic: true,
    description: 'Custom Dashboard widgets layout and visibility settings',
    value: [
      { id: 'analytics_views', title: 'Views Performance', visible: true, w: 6, h: 4 },
      { id: 'recent_articles', title: 'Recent Articles', visible: true, w: 6, h: 4 },
      { id: 'dashboard_performance', title: 'Dashboard Performance', visible: true, w: 6, h: 4 },
      { id: 'quick_actions', title: 'Quick Actions', visible: true, w: 6, h: 4 },
    ],
  },
  {
    key: 'ui_feature_flags',
    type: 'JSON' as const,
    isPublic: true,
    description: 'Toggle optional modules/feature controls globally',
    value: {
      ads: true,
      comments: true,
      categories: true,
      newsletter: true,
      media: true,
      seo: true,
    },
  },
  {
    key: 'ui_custom_code',
    type: 'JSON' as const,
    isPublic: true,
    description: 'Custom CSS and JS styles/scripts injected globally',
    value: {
      customCss: '',
      customJs: '',
    },
  },
  {
    key: 'ui_translation_keys',
    type: 'JSON' as const,
    isPublic: true,
    description: 'System i18n translation key-value definitions for dashboard labels',
    value: {
      en: {
        dashboard: 'Dashboard',
        articles: 'Articles',
        categories: 'Categories',
        tags: 'Tags',
        ads: 'Ads Management',
        media: 'Media Library',
        users: 'Users',
        newsletter: 'Newsletter',
        comments: 'Comments',
        analytics: 'Analytics',
        seo: 'SEO',
        settings: 'Settings',
      },
    },
  },
  {
    key: 'ui_notification_settings',
    type: 'JSON' as const,
    isPublic: true,
    description: 'Toggle real-time notifications for specific system modules',
    value: {
      newsletter: true,
      articles: true,
      comments: true,
      ads: true,
    },
  },
];

export class SettingsService {
  static async seedDefaults() {
    for (const setting of DEFAULT_SETTINGS) {
      const existing = await prisma.siteSetting.findUnique({
        where: { key: setting.key },
      });

      if (!existing) {
        await prisma.siteSetting.create({
          data: {
            key: setting.key,
            type: setting.type,
            isPublic: setting.isPublic,
            description: setting.description,
            value: setting.value,
          },
        });
      } else if (setting.key === 'ui_dashboard_widgets') {
        const val = existing.value as any;
        if (Array.isArray(val) && val.some(w => w.id === 'recent_comments' || w.id === 'quick_draft' || w.id === 'top_articles')) {
          await prisma.siteSetting.update({
            where: { key: setting.key },
            data: { value: setting.value },
          });
        }
      }
    }
  }

  static async getAllSettings() {
    await SettingsService.seedDefaults();
    const settings = await prisma.siteSetting.findMany({
      orderBy: { key: 'asc' },
    });
    return settings;
  }

  static async getPublicSettings() {
    await SettingsService.seedDefaults();
    const settings = await prisma.siteSetting.findMany({
      where: { isPublic: true },
      orderBy: { key: 'asc' },
    });
    return settings;
  }

  static async updateSettings(data: UpdateSettingsInput, userId: string) {
    await SettingsService.seedDefaults();
    
    const results = await prisma.$transaction(
      data.settings.map((s) =>
        prisma.siteSetting.update({
          where: { key: s.key },
          data: {
            value: s.value,
            updatedBy: userId,
          },
        })
      )
    );

    return results;
  }
}
