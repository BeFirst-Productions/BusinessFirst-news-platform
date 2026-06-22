'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  Tags,
  Megaphone,
  Users,
  Settings,
  Mail,
  MessageSquare,
  BarChart3,
  Image as ImageIcon,
  Search,
  ChevronDown,
  ChevronRight,
  Shield,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store/ui.store';
import { useAuthStore } from '@/store/auth.store';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '@/lib/constants';
import { useSettingsStore } from '@/store/settings.store';

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="h-5 w-5" />,
  FileText: <FileText className="h-5 w-5" />,
  FolderTree: <FolderTree className="h-5 w-5" />,
  Tags: <Tags className="h-5 w-5" />,
  Megaphone: <Megaphone className="h-5 w-5" />,
  ImageIcon: <ImageIcon className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  Mail: <Mail className="h-5 w-5" />,
  MessageSquare: <MessageSquare className="h-5 w-5" />,
  BarChart3: <BarChart3 className="h-5 w-5" />,
  Search: <Search className="h-5 w-5" />,
  Settings: <Settings className="h-5 w-5" />,
};

interface SidebarItem {
  title: string;
  href?: string;
  icon: React.ReactNode;
  children?: SidebarItem[];
  module?: string;
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    module: 'DASHBOARD',
  },
  {
    title: 'Articles',
    icon: <FileText className="h-5 w-5" />,
    module: 'ARTICLES',
    children: [
      { title: 'All Articles', href: '/dashboard/articles', icon: <FileText className="h-4 w-4" /> },
      { title: 'Create New', href: '/dashboard/articles/create', icon: <FileText className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Categories',
    href: '/dashboard/categories',
    icon: <FolderTree className="h-5 w-5" />,
    module: 'CATEGORIES',
  },
  {
    title: 'Tags',
    href: '/dashboard/tags',
    icon: <Tags className="h-5 w-5" />,
    module: 'TAGS',
  },
  {
    title: 'Ads Management',
    icon: <Megaphone className="h-5 w-5" />,
    module: 'ADS',
    children: [
      { title: 'All Ads', href: '/dashboard/ads', icon: <Megaphone className="h-4 w-4" /> },
      { title: 'Ad Spaces', href: '/dashboard/ads/slots', icon: <Megaphone className="h-4 w-4" /> },
      { title: 'Create Ad', href: '/dashboard/ads/create', icon: <Megaphone className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Users',
    href: '/dashboard/users',
    icon: <Users className="h-5 w-5" />,
    module: 'USERS',
  },
  {
    title: 'Newsletter',
    href: '/dashboard/newsletter',
    icon: <Mail className="h-5 w-5" />,
    module: 'NEWSLETTER',
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: <BarChart3 className="h-5 w-5" />,
    module: 'ANALYTICS',
  },
  {
    title: 'SEO',
    href: '/dashboard/seo',
    icon: <Search className="h-5 w-5" />,
    module: 'SEO',
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: <Settings className="h-5 w-5" />,
    module: 'SETTINGS',
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen, theme } = useUIStore();
  const { user } = useAuthStore();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  // Fetch public settings for branding, navigation order, feature flags and translations
  const { data: publicSettings } = useQuery({
    queryKey: ['public-settings'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/settings/public`);
      return response.data.data;
    },
  });

  const { branding, sidebarNav, featureFlags, translations: translationKeys } = useSettingsStore();

  const hasModulePermission = (moduleCode?: string) => {
    if (!user) return false;
    if (user.role === 'SUPERADMIN') return true;
    if (!moduleCode) return true;
    const perm = user.modules?.find((m) => m.module.code === moduleCode);
    return perm ? perm.canView : false;
  };

  const hasActionPermission = (
    moduleCode: string,
    action: 'view' | 'create' | 'edit' | 'delete'
  ) => {
    if (!user) return false;
    if (user.role === 'SUPERADMIN') return true;
    const perm = user.modules?.find((m) => m.module.code === moduleCode);
    if (!perm) return false;
    if (action === 'view') return perm.canView;
    if (action === 'create') return perm.canCreate;
    if (action === 'edit') return perm.canEdit;
    if (action === 'delete') return perm.canDelete;
    return false;
  };

  // Filter and order sidebar items based on dynamic settings
  const dynamicSidebarItems = React.useMemo(() => {
    if (!sidebarNav || !Array.isArray(sidebarNav)) {
      return sidebarItems;
    }

    const items: SidebarItem[] = [];

    for (const navConfig of sidebarNav) {
      if (!navConfig.visible) continue;

      // Check if this module is disabled in feature flags
      if (featureFlags) {
        const flagKey = navConfig.code.toLowerCase();
        const flagValue = featureFlags[flagKey as keyof typeof featureFlags];
        if (flagValue === false) {
          continue;
        }
      }

      const originalItem = sidebarItems.find(
        (item) => item.module === navConfig.code
      );

      if (!originalItem) continue;

      // Translate the title if there's a custom translated name
      const customTitle = navConfig.title || translationKeys?.en?.[navConfig.code.toLowerCase()] || originalItem.title;

      // Icon mapping
      const iconElement = iconMap[navConfig.icon] || originalItem.icon;

      items.push({
        ...originalItem,
        title: customTitle,
        icon: iconElement,
      });
    }

    return items;
  }, [sidebarNav, featureFlags, translationKeys]);

  // Filter sidebar items based on module permissions
  const filteredSidebarItems = dynamicSidebarItems
    .filter((item) => !item.module || hasModulePermission(item.module))
    .map((item) => {
      if (item.children) {
        return {
          ...item,
          children: item.children.filter((child) => {
            if (
              child.title.toLowerCase().includes('create') ||
              child.title.toLowerCase().includes('new')
            ) {
              return item.module ? hasActionPermission(item.module, 'create') : true;
            }
            return true;
          }),
        };
      }
      return item;
    })
    .filter((item) => !item.children || item.children.length > 0 || item.href);

  // Automatically adjust sidebar open state based on viewport size on load/resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize(); // run initially on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarOpen]);

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isParentActive = (item: SidebarItem) => {
    if (item.href) return isActive(item.href);
    if (item.children) return item.children.some((child) => child.href && isActive(child.href));
    return false;
  };

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-full w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-0 flex flex-col',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo and Mobile Close Toggle */}
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center gap-2 min-w-0">
            {(() => {
              const logoUrl = theme === 'dark'
                ? (branding?.darkLogoUrl || branding?.lightLogoUrl)
                : branding?.lightLogoUrl;
              return logoUrl ? (
                <img
                  src={logoUrl}
                  alt={branding?.siteTitle || 'BusinessFirst'}
                  className="w-8 h-8 object-contain rounded-lg flex-shrink-0"
                />
              ) : (
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">
                    {branding?.siteTitle
                      ? branding.siteTitle.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()
                      : 'BF'}
                  </span>
                </div>
              );
            })()}
            <div className="min-w-0">
              <h1 className="font-semibold text-lg leading-tight truncate">
                {branding?.siteTitle || 'BusinessFirst'}
              </h1>
              <p className="text-[10px] text-muted-foreground">Admin Panel</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {filteredSidebarItems.map((item) => (
            <div key={item.title}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleExpand(item.title)}
                    className={cn(
                      'flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isParentActive(item)
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    {expandedItems.includes(item.title) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {expandedItems.includes(item.title) && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.title}
                          href={child.href || '#'}
                          onClick={() => {
                            if (window.innerWidth < 1024) setSidebarOpen(false);
                          }}
                          className={cn(
                            'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                            isActive(child.href || '')
                              ? 'bg-primary/10 text-primary'
                              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                          )}
                        >
                          {child.icon}
                          <span>{child.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href || '#'}
                  onClick={() => {
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive(item.href || '')
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t mt-auto">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}