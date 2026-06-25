'use client';

import React from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { useAuthStore } from '@/store/auth.store';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { Shield } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '@/lib/constants';
import { useSettingsStore } from '@/store/settings.store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const GOOGLE_FONTS_MAP: Record<string, string> = {
  inter: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  poppins: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
  outfit: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap',
  roboto: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
  playfair: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap',
  jetbrains: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap',
};

const ROUTE_MODULE_MAP: Record<string, string | null> = {
  '/dashboard/profile': null,
  '/dashboard': 'DASHBOARD',
  '/dashboard/analytics': 'ANALYTICS',
  '/dashboard/articles': 'ARTICLES',
  '/dashboard/categories': 'CATEGORIES',
  '/dashboard/tags': 'TAGS',
  '/dashboard/media': 'MEDIA',
  '/dashboard/users': 'USERS',
  '/dashboard/ads': 'ADS',
  '/dashboard/comments': 'COMMENTS',
  '/dashboard/newsletter': 'NEWSLETTER',
  '/dashboard/seo': 'SEO',
  '/dashboard/settings': 'SETTINGS',
};

function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = React.useState(false);
  const { user, isAuthenticated, refreshProfile } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  // Query public settings for logo/theme/JS overrides on app initialization
  const { data: publicSettings } = useQuery({
    queryKey: ['public-settings'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/settings/public`);
      return response.data.data;
    },
  });

  const { branding, customCode, setSettings } = useSettingsStore();

  useEffect(() => {
    if (publicSettings) {
      setSettings(publicSettings);
    }
  }, [publicSettings, setSettings]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated && pathname !== '/login') {
      router.push('/login');
    }
  }, [mounted, isAuthenticated, pathname, router]);

  useEffect(() => {
    if (isAuthenticated) {
      refreshProfile();
    }
  }, [pathname, isAuthenticated, refreshProfile]);

  useEffect(() => {
    if (!customCode?.customJs) return;

    let script: HTMLScriptElement | null = null;
    try {
      script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = customCode.customJs;
      document.body.appendChild(script);
    } catch (err) {
      console.error('Failed to execute custom injected JS:', err);
    }

    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [customCode]);

  useEffect(() => {
    if (branding?.siteTitle) {
      document.title = branding.siteTitle;
    }
    if (branding?.faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = branding.faviconUrl;
    }
  }, [branding]);

  useEffect(() => {
    if (!branding?.activeFontType) return;

    let fontLink = document.getElementById('dynamic-branding-font') as HTMLLinkElement | null;

    const createLink = (href: string) => {
      if (!fontLink) {
        fontLink = document.createElement('link');
        fontLink.id = 'dynamic-branding-font';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
      }
      fontLink.href = href;
    };

    if (branding.activeFontType === 'preset' && branding.fontPreset) {
      const href = GOOGLE_FONTS_MAP[branding.fontPreset];
      if (href) createLink(href);
    } else if (branding.activeFontType === 'custom_import' && branding.fontImportUrl) {
      createLink(branding.fontImportUrl);
    } else {
      if (fontLink) {
        fontLink.remove();
      }
    }
  }, [branding?.activeFontType, branding?.fontPreset, branding?.fontImportUrl]);

  // Prevent rendering on the server and initial hydration mismatch
  if (!mounted || !isAuthenticated) {
    return null;
  }

  // Determine if the user has permission to view the current route
  const activeRoute = Object.keys(ROUTE_MODULE_MAP)
    .sort((a, b) => b.length - a.length)
    .find(route => pathname === route || pathname.startsWith(route + '/'));

  const activeModule = activeRoute ? ROUTE_MODULE_MAP[activeRoute] : null;

  // Determine required action based on path conventions
  let requiredAction: 'view' | 'create' | 'edit' | 'delete' = 'view';
  if (
    pathname.endsWith('/create') ||
    pathname.endsWith('/new') ||
    pathname.includes('/create/') ||
    pathname.includes('/new/')
  ) {
    requiredAction = 'create';
  } else if (
    pathname.endsWith('/edit') ||
    pathname.includes('/edit/') ||
    pathname.includes('/permissions/') ||
    pathname.endsWith('/permissions')
  ) {
    requiredAction = 'edit';
  }

  const hasPermission =
    !activeModule ||
    user?.role === 'SUPERADMIN' ||
    user?.modules?.some((m) => {
      if (m.module.code !== activeModule) return false;
      if (requiredAction === 'create') return m.canCreate;
      if (requiredAction === 'edit') return m.canEdit;
      return m.canView;
    });

  const primaryColor = branding?.primaryColor || '#0f172a';
  const customCss = customCode?.customCss || '';

  let fontFaceRule = '';
  let activeFontFamily = 'inherit';

  if (branding?.fontFamily) {
    if (branding.activeFontType === 'custom_upload' && branding.fontFileUrl) {
      activeFontFamily = `'${branding.fontFamily}', sans-serif`;
      fontFaceRule = `
        @font-face {
          font-family: '${branding.fontFamily}';
          src: url('${branding.fontFileUrl}');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `;
    } else if (branding.activeFontType === 'preset' || branding.activeFontType === 'custom_import') {
      activeFontFamily = `'${branding.fontFamily}', sans-serif`;
    }
  }

  return (
    <>
      <style id="brand-theme-styles">
        {`
          ${fontFaceRule}
          :root {
            --primary: ${hexToHsl(primaryColor)};
            --primary-foreground: 0 0% 100%;
          }
          ${branding?.fontFamily ? `
          body, input, button, select, textarea, .ProseMirror {
            font-family: ${activeFontFamily} !important;
          }
          ` : ''}
          ${customCss}
        `}
      </style>
      <div className="flex h-screen overflow-hidden bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="mx-auto max-w-7xl">
              {hasPermission ? (
                children
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 border-2 border-dashed rounded-lg bg-card mt-8">
                  <Shield className="h-16 w-16 text-destructive mb-4 animate-pulse" />
                  <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    You do not have permission to view the <strong>{activeModule}</strong> section.
                    Please contact your administrator if you need access.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      <ConfirmModal />
    </>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </QueryClientProvider>
  );
}

function hexToHsl(hex: string): string {
  hex = hex.replace(/^#/, '');

  if (hex.length === 3) {
    hex = hex.charAt(0) + hex.charAt(0) + hex.charAt(1) + hex.charAt(1) + hex.charAt(2) + hex.charAt(2);
  }

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}
