import { create } from 'zustand';

export interface SidebarNavItem {
  code: string;
  title: string;
  icon: string;
  visible: boolean;
}

export interface DashboardWidgetItem {
  id: string;
  title: string;
  visible: boolean;
  w: number;
  h: number;
}

export interface BrandingConfig {
  siteTitle: string;
  faviconUrl: string;
  lightLogoUrl: string;
  darkLogoUrl: string;
  primaryColor: string;
  activeFontType?: 'preset' | 'custom_import' | 'custom_upload';
  fontFamily?: string;
  fontPreset?: string;
  fontImportUrl?: string;
  fontFileUrl?: string;
}

export interface FeatureFlagsConfig {
  ads: boolean;
  comments: boolean;
  categories: boolean;
  newsletter: boolean;
  media: boolean;
  seo: boolean;
}

export interface CustomCodeConfig {
  customCss: string;
  customJs: string;
}

export interface TranslationsConfig {
  [lang: string]: {
    [key: string]: string;
  };
}

interface SettingsState {
  branding: BrandingConfig;
  sidebarNav: SidebarNavItem[];
  dashboardWidgets: DashboardWidgetItem[];
  featureFlags: FeatureFlagsConfig;
  customCode: CustomCodeConfig;
  translations: TranslationsConfig;
  setSettings: (settings: { key: string; value: any }[]) => void;
  updateBranding: (branding: Partial<BrandingConfig>) => void;
  updateSidebarNav: (sidebarNav: SidebarNavItem[]) => void;
  updateDashboardWidgets: (dashboardWidgets: DashboardWidgetItem[]) => void;
  updateFeatureFlags: (featureFlags: Partial<FeatureFlagsConfig>) => void;
  updateCustomCode: (customCode: Partial<CustomCodeConfig>) => void;
  updateTranslations: (translations: TranslationsConfig) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  branding: {
    siteTitle: 'BusinessFirst Admin',
    faviconUrl: '',
    lightLogoUrl: '',
    darkLogoUrl: '',
    primaryColor: '#0f172a',
    activeFontType: 'preset',
    fontFamily: 'Inter',
    fontPreset: 'inter',
    fontImportUrl: '',
    fontFileUrl: '',
  },
  sidebarNav: [],
  dashboardWidgets: [],
  featureFlags: {
    ads: true,
    comments: true,
    categories: true,
    newsletter: true,
    media: true,
    seo: true,
  },
  customCode: {
    customCss: '',
    customJs: '',
  },
  translations: {
    en: {},
  },
  setSettings: (settings) => {
    const getVal = (key: string) => settings.find((s: any) => s.key === key)?.value;
    set((state) => ({
      branding: getVal('ui_branding') ? { ...state.branding, ...getVal('ui_branding') } : state.branding,
      sidebarNav: getVal('ui_sidebar_navigation') || state.sidebarNav,
      dashboardWidgets: getVal('ui_dashboard_widgets') || state.dashboardWidgets,
      featureFlags: getVal('ui_feature_flags') || state.featureFlags,
      customCode: getVal('ui_custom_code') || state.customCode,
      translations: getVal('ui_translation_keys') || state.translations,
    }));
  },
  updateBranding: (branding) => set((state) => ({ branding: { ...state.branding, ...branding } })),
  updateSidebarNav: (sidebarNav) => set({ sidebarNav }),
  updateDashboardWidgets: (dashboardWidgets) => set({ dashboardWidgets }),
  updateFeatureFlags: (featureFlags) => set((state) => ({ featureFlags: { ...state.featureFlags, ...featureFlags } })),
  updateCustomCode: (customCode) => set((state) => ({ customCode: { ...state.customCode, ...customCode } })),
  updateTranslations: (translations) => set({ translations }),
}));
