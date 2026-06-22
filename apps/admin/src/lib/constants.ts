const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8083/api/v1';
export const API_URL = rawApiUrl.endsWith('/api/v1') ? rawApiUrl : `${rawApiUrl}/api/v1`;

export const ROLES = {
  SUPERADMIN: 'SUPERADMIN',
  ADMIN: 'ADMIN',
  EDITOR: 'EDITOR',
} as const;

export const STATUS_COLORS: Record<string, string> = {
  ACTIVE: 'bg-green-100 text-green-800',
  INACTIVE: 'bg-gray-100 text-gray-800',
  SUSPENDED: 'bg-red-100 text-red-800',
  DRAFT: 'bg-yellow-100 text-yellow-800',
  PUBLISHED: 'bg-green-100 text-green-800',
  ARCHIVED: 'bg-gray-100 text-gray-800',
  SCHEDULED: 'bg-blue-100 text-blue-800',
};

export const NAVIGATION = [
  {
    title: 'MAIN',
    items: [
      { title: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
      { title: 'Analytics', href: '/dashboard/analytics', icon: 'BarChart3' },
    ],
  },
  {
    title: 'CONTENT',
    items: [
      { title: 'Articles', href: '/dashboard/articles', icon: 'FileText' },
      { title: 'Categories', href: '/dashboard/categories', icon: 'FolderTree' },
      { title: 'Tags', href: '/dashboard/tags', icon: 'Tags' },
      { title: 'Media', href: '/dashboard/media', icon: 'Image' },
    ],
  },
  {
    title: 'MANAGEMENT',
    items: [
      { title: 'Users', href: '/dashboard/users', icon: 'Users' },
      { title: 'Ads', href: '/dashboard/ads', icon: 'Megaphone' },
      { title: 'Comments', href: '/dashboard/comments', icon: 'MessageSquare' },
      { title: 'Newsletter', href: '/dashboard/newsletter', icon: 'Mail' },
    ],
  },
  {
    title: 'SETTINGS',
    items: [
      { title: 'SEO', href: '/dashboard/seo', icon: 'Search' },
      { title: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
    ],
  },
];