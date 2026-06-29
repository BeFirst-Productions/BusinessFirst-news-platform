'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import { Label } from '@/components/ui/Label';
import { Badge } from '@/components/ui/Badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import {
  Paintbrush,
  Menu,
  LayoutGrid,
  ToggleLeft,
  Code,
  Languages,
  Save,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  RefreshCw,
  Upload,
  Trash2,
  Image as ImageIcon,
  AlertCircle,
  Bell,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { useSettingsStore } from '@/store/settings.store';
import { API_URL } from '@/lib/constants';

interface SidebarNavItem {
  code: string;
  title: string;
  icon: string;
  visible: boolean;
}

interface DashboardWidgetItem {
  id: string;
  title: string;
  visible: boolean;
  w: number;
  h: number;
}

interface BrandingConfig {
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

interface FeatureFlagsConfig {
  ads: boolean;
  comments: boolean;
  categories: boolean;
  newsletter: boolean;
  media: boolean;
  seo: boolean;
}

interface CustomCodeConfig {
  customCss: string;
  customJs: string;
}

interface TranslationsConfig {
  [lang: string]: {
    [key: string]: string;
  };
}

interface NotificationSettingsConfig {
  newsletter: boolean;
  articles: boolean;
  comments: boolean;
  ads: boolean;
}

const PRESETS = [
  { name: 'Default Slate', color: '#0f172a' },
  { name: 'Ocean Indigo', color: '#4f46e5' },
  { name: 'Emerald Forest', color: '#059669' },
  { name: 'Crimson Rose', color: '#e11d48' },
  { name: 'Amber Sunset', color: '#d97706' },
  { name: 'Royal Violet', color: '#7c3aed' },
];

const ICON_LIST = [
  'LayoutDashboard',
  'FileText',
  'FolderTree',
  'Tags',
  'Megaphone',
  'ImageIcon',
  'Users',
  'Mail',
  'MessageSquare',
  'BarChart3',
  'Search',
  'Settings',
];

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  recommendedDimensions: string;
  recommendedSize: string;
  recommendedFormat: string;
  maxFileSizeMB: number;
  previewBgClass?: string;
  accept?: string;
}

function ImageUploadField({
  label,
  value,
  onChange,
  placeholder,
  recommendedDimensions,
  recommendedSize,
  recommendedFormat,
  maxFileSizeMB,
  previewBgClass = 'bg-muted/30',
  accept = 'image/*',
}: ImageUploadFieldProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const uploadFile = async (file: File) => {
    // Client-side size check
    const maxSizeBytes = maxFileSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      toast.error(`File size exceeds the limit of ${maxFileSizeMB}MB.`);
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('files', file);

      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

      const response = await fetch(`${API_URL}/media/upload`, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: formData,
      });

      const resData = await response.json();

      if (response.ok && resData.success && resData.data?.[0]?.url) {
        onChange(resData.data[0].url);
        toast.success(`${label} uploaded successfully`);
      } else {
        throw new Error(resData.message || 'Upload failed');
      }
    } catch (error: any) {
      toast.error(error.message || `Failed to upload ${label.toLowerCase()}`);
      console.error(`Upload error for ${label}:`, error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  return (
    <div className="space-y-3 p-4 border rounded-xl bg-card/50 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <label className="text-sm font-semibold text-foreground">{label}</label>
        <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
          Max {maxFileSizeMB}MB limit
        </span>
      </div>

      {/* Preview & Drag-Drop Box */}
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative rounded-lg overflow-hidden border flex items-center justify-center min-h-[140px] group transition-all duration-200 cursor-pointer", 
          isDragging ? "border-primary bg-primary/5 ring-2 ring-primary/20" : previewBgClass
        )}
        onClick={() => {
          if (!value && !isUploading) {
            fileInputRef.current?.click();
          }
        }}
      >
        {value ? (
          <div className="relative w-full h-full flex items-center justify-center p-4 min-h-[140px]">
            <img
              src={value}
              alt={`${label} Preview`}
              className="max-h-[120px] max-w-full object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-white border-white hover:bg-white/20 h-8 px-3"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                disabled={isUploading}
              >
                Change
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="h-8 px-3"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange('');
                }}
                disabled={isUploading}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <RefreshCw className="h-7 w-7 text-primary animate-spin" />
                <p className="text-xs text-muted-foreground mt-2">Uploading...</p>
              </div>
            ) : (
              <>
                <div className="p-3 bg-background rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform duration-200">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground font-semibold">Click or drag & drop to upload</p>
                <p className="text-[10px] text-muted-foreground/70 mt-0.5">Supports {accept ? accept.replace(/\./g, '').toUpperCase() : 'PNG, JPG, WebP, SVG'}</p>
              </>
            )}
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
        />
      </div>

      {/* Manual Input field */}
      <div className="space-y-1">
        <span className="text-[11px] font-semibold text-muted-foreground">Or input asset URL:</span>
        <Input
          placeholder={placeholder || "https://example.com/image.png"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 text-xs"
          disabled={isUploading}
        />
      </div>

      {/* Specs / Info box */}
      <div className="flex gap-2 p-2.5 rounded-lg bg-muted/30 border border-border/50 text-[11px] text-muted-foreground leading-relaxed">
        <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-foreground/90">Optimized Upload Guidelines:</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
            <div>Dimensions: <span className="font-medium text-foreground">{recommendedDimensions}</span></div>
            <div>Target Size: <span className="font-medium text-foreground">{recommendedSize}</span></div>
            <div className="col-span-2">Formats: <span className="font-medium text-foreground">{recommendedFormat}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'branding' | 'sidebar' | 'widgets' | 'flags' | 'notifications' | 'code' | 'i18n'>('branding');

  // Form states
  const [branding, setBranding] = useState<BrandingConfig>({
    siteTitle: '',
    faviconUrl: '',
    lightLogoUrl: '',
    darkLogoUrl: '',
    primaryColor: '#0f172a',
    activeFontType: 'preset',
    fontFamily: 'Inter',
    fontPreset: 'inter',
    fontImportUrl: '',
    fontFileUrl: '',
  });
  const [sidebarNav, setSidebarNav] = useState<SidebarNavItem[]>([]);
  const [dashboardWidgets, setDashboardWidgets] = useState<DashboardWidgetItem[]>([]);
  const [featureFlags, setFeatureFlags] = useState<FeatureFlagsConfig>({
    ads: true,
    comments: true,
    categories: true,
    newsletter: true,
    media: true,
    seo: true,
  });
  const [customCode, setCustomCode] = useState<CustomCodeConfig>({
    customCss: '',
    customJs: '',
  });
  const [translations, setTranslations] = useState<TranslationsConfig>({
    en: {},
  });
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettingsConfig>({
    newsletter: true,
    articles: true,
    comments: true,
    ads: true,
  });

  const { data: settingsData, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const response = await apiClient.get('/settings');
      return response.data;
    },
  });

  useEffect(() => {
    if (settingsData?.data) {
      const getVal = (key: string) => settingsData.data.find((s: any) => s.key === key)?.value;
      
      const brandVal = getVal('ui_branding');
      if (brandVal) setBranding(prev => ({ ...prev, ...brandVal }));

      const navVal = getVal('ui_sidebar_navigation');
      if (navVal) setSidebarNav(navVal);

      const widgetsVal = getVal('ui_dashboard_widgets');
      if (widgetsVal) setDashboardWidgets(widgetsVal);

      const flagsVal = getVal('ui_feature_flags');
      if (flagsVal) setFeatureFlags(flagsVal);

      const codeVal = getVal('ui_custom_code');
      if (codeVal) setCustomCode(codeVal);

      const translationVal = getVal('ui_translation_keys');
      if (translationVal) setTranslations(translationVal);

      const notifVal = getVal('ui_notification_settings');
      if (notifVal) setNotificationSettings(notifVal);
    }
  }, [settingsData]);

  const {
    updateBranding,
    updateSidebarNav,
    updateDashboardWidgets,
    updateFeatureFlags,
    updateCustomCode,
    updateTranslations,
    updateNotificationSettings,
    setSettings,
  } = useSettingsStore();

  // Revert settings store to database values on unmount (if not saved)
  useEffect(() => {
    return () => {
      if (settingsData?.data) {
        setSettings(settingsData.data);
      }
    };
  }, [settingsData, setSettings]);

  // Sync local branding state changes to store in real-time
  useEffect(() => {
    updateBranding(branding);
  }, [branding, updateBranding]);

  // Sync local sidebarNav to store in real-time
  useEffect(() => {
    updateSidebarNav(sidebarNav);
  }, [sidebarNav, updateSidebarNav]);

  // Sync local widgets to store in real-time
  useEffect(() => {
    updateDashboardWidgets(dashboardWidgets);
  }, [dashboardWidgets, updateDashboardWidgets]);

  // Sync local featureFlags to store in real-time
  useEffect(() => {
    updateFeatureFlags(featureFlags);
  }, [featureFlags, updateFeatureFlags]);

  // Sync local customCode to store in real-time
  useEffect(() => {
    updateCustomCode(customCode);
  }, [customCode, updateCustomCode]);

  // Sync local translations to store in real-time
  useEffect(() => {
    updateTranslations(translations);
  }, [translations, updateTranslations]);

  // Sync local notificationSettings to store in real-time
  useEffect(() => {
    updateNotificationSettings(notificationSettings);
  }, [notificationSettings, updateNotificationSettings]);

  const saveSettings = useMutation({
    mutationFn: async (payload: { settings: { key: string; value: any }[] }) => {
      return apiClient.put('/settings', payload);
    },
    onSuccess: () => {
      toast.success('Settings updated successfully');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      // Invalidate public settings too if cached
      queryClient.invalidateQueries({ queryKey: ['public-settings'] });
      // Trigger dynamic style update in DOM
      const styles = document.getElementById('brand-theme-styles');
      if (styles) {
        styles.innerHTML = `
          :root {
            --primary: ${hexToHsl(branding.primaryColor)};
            --primary-foreground: 0 0% 100%;
          }
        `;
      }
    },
    onError: () => toast.error('Failed to update settings'),
  });

  const handleSave = () => {
    const payload = [
      { key: 'ui_branding', value: branding },
      { key: 'ui_sidebar_navigation', value: sidebarNav },
      { key: 'ui_dashboard_widgets', value: dashboardWidgets },
      { key: 'ui_feature_flags', value: featureFlags },
      { key: 'ui_custom_code', value: customCode },
      { key: 'ui_translation_keys', value: translations },
      { key: 'ui_notification_settings', value: notificationSettings },
    ];
    saveSettings.mutate({ settings: payload });
  };

  // Sidebar Helpers
  const moveNavItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...sidebarNav];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    
    const temp = newItems[index];
    const targetItem = newItems[targetIndex];
    if (temp === undefined || targetItem === undefined) return;
    
    newItems[index] = targetItem;
    newItems[targetIndex] = temp;
    setSidebarNav(newItems);
  };

  const updateNavItem = (code: string, updates: Partial<SidebarNavItem>) => {
    setSidebarNav(prev =>
      prev.map(item => (item.code === code ? { ...item, ...updates } : item))
    );
  };

  const handleResetSidebar = () => {
    const DEFAULT_SIDEBAR = [
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
    ];
    setSidebarNav(DEFAULT_SIDEBAR);
    toast.success('Sidebar labels and order reset to defaults');
  };

  // Widget Helpers
  const updateWidget = (id: string, updates: Partial<DashboardWidgetItem>) => {
    setDashboardWidgets(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  // Translation Helpers
  const updateTranslation = (key: string, value: string) => {
    setTranslations(prev => ({
      ...prev,
      en: {
        ...prev.en,
        [key]: value,
      },
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: 'branding', label: 'Branding & Theme', icon: <Paintbrush className="h-4 w-4" /> },
    { id: 'sidebar', label: 'Sidebar Navigation', icon: <Menu className="h-4 w-4" /> },
    { id: 'widgets', label: 'Dashboard Widgets', icon: <LayoutGrid className="h-4 w-4" /> },
    { id: 'flags', label: 'Feature Flags', icon: <ToggleLeft className="h-4 w-4" /> },
    { id: 'notifications', label: 'Notification Settings', icon: <Bell className="h-4 w-4" /> },
    { id: 'code', label: 'Styles & Code', icon: <Code className="h-4 w-4" /> },
    { id: 'i18n', label: 'Translations', icon: <Languages className="h-4 w-4" /> },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Configure layout themes, sidebar, modules and custom injection styling.</p>
        </div>
        <Button
          onClick={handleSave}
          loading={saveSettings.isPending}
          leftIcon={<Save className="h-4 w-4" />}
          className="w-full sm:w-auto"
        >
          Save Configurations
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Navigation Tabs list */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <Card>
            <CardContent className="p-2 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-1 whitespace-nowrap scrollbar-none">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors w-full ${
                    activeTab === tab.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </aside>

        {/* Configurations Forms Container */}
        <main className="flex-1 min-w-0">
          {activeTab === 'branding' && (
            <Card>
              <CardHeader>
                <CardTitle>Branding & Theme Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Input
                  label="Site Title"
                  placeholder="BusinessFirst Admin"
                  value={branding.siteTitle}
                  onChange={(e) => setBranding({ ...branding, siteTitle: e.target.value })}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <ImageUploadField
                    label="Favicon"
                    value={branding.faviconUrl}
                    onChange={(url) => setBranding({ ...branding, faviconUrl: url })}
                    placeholder="https://example.com/favicon.ico"
                    recommendedDimensions="32x32 px or 48x48 px"
                    recommendedSize="Less than 100 KB"
                    recommendedFormat="ICO, WebP, PNG"
                    maxFileSizeMB={0.2}
                    previewBgClass="bg-slate-50 dark:bg-slate-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]"
                  />
                  <ImageUploadField
                    label="Light Theme Logo"
                    value={branding.lightLogoUrl}
                    onChange={(url) => setBranding({ ...branding, lightLogoUrl: url })}
                    placeholder="https://example.com/logo-light.png"
                    recommendedDimensions="Max width 400px, max height 100px"
                    recommendedSize="Less than 200 KB"
                    recommendedFormat="Transparent SVG, PNG, WebP"
                    maxFileSizeMB={1}
                    previewBgClass="bg-white border-slate-200"
                  />
                  <ImageUploadField
                    label="Dark Theme Logo"
                    value={branding.darkLogoUrl}
                    onChange={(url) => setBranding({ ...branding, darkLogoUrl: url })}
                    placeholder="https://example.com/logo-dark.png"
                    recommendedDimensions="Max width 400px, max height 100px"
                    recommendedSize="Less than 200 KB"
                    recommendedFormat="Transparent SVG, PNG, WebP"
                    maxFileSizeMB={1}
                    previewBgClass="bg-slate-950 border-slate-800"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Primary Theme Color</Label>
                  <div className="flex items-center gap-3 flex-wrap">
                    <input
                      type="color"
                      value={branding.primaryColor}
                      onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                      className="w-12 h-12 rounded border cursor-pointer bg-background p-1"
                    />
                    <Input
                      placeholder="#0f172a"
                      value={branding.primaryColor}
                      onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                      className="max-w-[150px]"
                    />
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
                    {PRESETS.map(preset => (
                      <button
                        key={preset.name}
                        onClick={() => setBranding({ ...branding, primaryColor: preset.color })}
                        className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border text-xs font-medium hover:bg-muted/50 transition-colors ${
                          branding.primaryColor === preset.color ? 'border-primary bg-primary/5' : 'border-border'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full block border" style={{ backgroundColor: preset.color }} />
                        <span className="truncate max-w-[80px]">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <hr className="my-6 border-border" />

                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Typography Settings</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Customize the default styling font applied throughout the entire admin panel interface.</p>
                  </div>

                  <div className="flex gap-2 p-1 bg-muted rounded-lg w-fit">
                    {(['preset', 'custom_import', 'custom_upload'] as const).map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setBranding({
                          ...branding,
                          activeFontType: type,
                          fontFamily: type === 'preset' ? 'Inter' : '',
                          fontPreset: type === 'preset' ? 'inter' : '',
                        })}
                        className={cn(
                          "px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 capitalize",
                          (branding.activeFontType || 'preset') === type
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {type.replace('_', ' ')}
                      </button>
                    ))}
                  </div>

                  {/* Preset option fields */}
                  {(branding.activeFontType || 'preset') === 'preset' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label>Select Preset Font</Label>
                        <Select
                          value={branding.fontPreset || 'inter'}
                          onValueChange={(val) => {
                            const fontNames: Record<string, string> = {
                              inter: 'Inter',
                              poppins: 'Poppins',
                              outfit: 'Outfit',
                              roboto: 'Roboto',
                              playfair: 'Playfair Display',
                              jetbrains: 'JetBrains Mono',
                            };
                            setBranding({
                              ...branding,
                              fontPreset: val,
                              fontFamily: fontNames[val] || 'Inter',
                            });
                          }}
                        >
                          <SelectTrigger className="h-10 text-sm">
                            <SelectValue placeholder="Select font preset" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="inter">Inter (Sans-serif)</SelectItem>
                            <SelectItem value="poppins">Poppins (Geometric Sans)</SelectItem>
                            <SelectItem value="outfit">Outfit (Modern Clean)</SelectItem>
                            <SelectItem value="roboto">Roboto (Neo-Grotesque)</SelectItem>
                            <SelectItem value="playfair">Playfair Display (Elegant Serif)</SelectItem>
                            <SelectItem value="jetbrains">JetBrains Mono (Monospace)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center p-4 border rounded-lg bg-muted/20 text-sm">
                        <span className="font-semibold text-muted-foreground mr-2">Preview:</span>
                        <span style={{ fontFamily: `'${branding.fontFamily || 'Inter'}', sans-serif` }} className="text-foreground font-medium text-base">
                          The quick brown fox jumps over the lazy dog.
                        </span>
                      </div>
                    </div>
                  )}

                  {branding.activeFontType === 'custom_import' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Google Fonts / CSS Import URL"
                        placeholder="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
                        value={branding.fontImportUrl || ''}
                        onChange={(e) => setBranding({ ...branding, fontImportUrl: e.target.value })}
                        helperText="Provide Google Fonts stylesheet link or `@import` URL."
                      />
                      <Input
                        label="Font Family Name"
                        placeholder="Fira Code"
                        value={branding.fontFamily || ''}
                        onChange={(e) => setBranding({ ...branding, fontFamily: e.target.value })}
                        helperText="Type the exact name of the CSS font-family to apply."
                      />
                    </div>
                  )}

                  {branding.activeFontType === 'custom_upload' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                      <div className="space-y-2">
                        <Label>Upload Font File (.ttf, .woff, .woff2)</Label>
                        <ImageUploadField
                          label="Custom Font File"
                          value={branding.fontFileUrl || ''}
                          onChange={(url) => {
                            let guessedFamily = branding.fontFamily;
                            if (url && !guessedFamily) {
                              const parts = url.split('/');
                              const filename = parts[parts.length - 1] || '';
                              const nameNoExt = filename.split('.')[0] || 'CustomUploadedFont';
                              guessedFamily = nameNoExt.replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i, 'CustomFont').replace(/-|_/g, ' ').trim();
                            }
                            setBranding({ ...branding, fontFileUrl: url, fontFamily: guessedFamily });
                          }}
                          placeholder="https://example.com/font.woff2"
                          recommendedDimensions="TrueType or WOFF standard format"
                          recommendedSize="Less than 2 MB target"
                          recommendedFormat="WOFF2, WOFF, TTF"
                          maxFileSizeMB={2}
                          previewBgClass="bg-muted/10 border-dashed"
                          accept=".ttf,.woff,.woff2,.otf"
                        />
                      </div>
                      <div className="space-y-4">
                        <Input
                          label="Font Family Name"
                          placeholder="My Custom Font"
                          value={branding.fontFamily || ''}
                          onChange={(e) => setBranding({ ...branding, fontFamily: e.target.value })}
                          helperText="Type the name to identify this uploaded font in stylesheet settings."
                        />
                        {branding.fontFileUrl && (
                          <div className="flex items-center p-4 border rounded-lg bg-muted/20 text-sm">
                            <span className="font-semibold text-muted-foreground mr-2">Preview:</span>
                            <span style={{ fontFamily: `'${branding.fontFamily || 'sans-serif'}', sans-serif` }} className="text-foreground font-medium text-base">
                              The quick brown fox jumps over the lazy dog.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'sidebar' && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Sidebar Navigation Builder</CardTitle>
                </div>
                <Button variant="outline" size="sm" onClick={handleResetSidebar}>
                  Reset Defaults
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted border-b">
                      <tr>
                        <th className="text-left p-3 font-semibold w-[80px]">Reorder</th>
                        <th className="text-left p-3 font-semibold">Module Code</th>
                        <th className="text-left p-3 font-semibold">Custom Label</th>
                        <th className="text-left p-3 font-semibold w-[160px]">Custom Icon</th>
                        <th className="text-center p-3 font-semibold w-[100px]">Visible</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {sidebarNav.map((item, index) => (
                        <tr key={item.code} className="hover:bg-muted/20">
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                disabled={index === 0}
                                onClick={() => moveNavItem(index, 'up')}
                              >
                                <ArrowUp className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                disabled={index === sidebarNav.length - 1}
                                onClick={() => moveNavItem(index, 'down')}
                              >
                                <ArrowDown className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                          <td className="p-3 font-mono text-xs">{item.code}</td>
                          <td className="p-3">
                            <Input
                              value={item.title}
                              onChange={(e) => updateNavItem(item.code, { title: e.target.value })}
                              className="h-8 py-1 px-2 text-sm"
                            />
                          </td>
                          <td className="p-3">
                            <Select
                              value={item.icon}
                              onValueChange={(v) => updateNavItem(item.code, { icon: v })}
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {ICON_LIST.map(icon => (
                                  <SelectItem key={icon} value={icon}>
                                    {icon}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => updateNavItem(item.code, { visible: !item.visible })}
                              className="inline-flex items-center justify-center h-8 w-8 hover:bg-muted rounded-lg"
                              title={item.visible ? 'Visible' : 'Hidden'}
                            >
                              {item.visible ? (
                                <Eye className="h-4 w-4 text-primary" />
                              ) : (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'widgets' && (
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Layout configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {dashboardWidgets.map(widget => (
                    <div key={widget.id} className="p-4 border rounded-xl bg-card space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">{widget.title}</h4>
                        <Switch
                          checked={widget.visible}
                          onCheckedChange={(v) => updateWidget(widget.id, { visible: v })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <Label className="text-[10px] text-muted-foreground">Grid Width</Label>
                          <Select
                            value={widget.w.toString()}
                            onValueChange={(v) => updateWidget(widget.id, { w: parseInt(v) })}
                          >
                            <SelectTrigger className="h-7 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="4">Small (4/12)</SelectItem>
                              <SelectItem value="6">Medium (6/12)</SelectItem>
                              <SelectItem value="12">Full (12/12)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-[10px] text-muted-foreground">Grid Height</Label>
                          <Select
                            value={widget.h.toString()}
                            onValueChange={(v) => updateWidget(widget.id, { h: parseInt(v) })}
                          >
                            <SelectTrigger className="h-7 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3">Short</SelectItem>
                              <SelectItem value="4">Standard</SelectItem>
                              <SelectItem value="6">Tall</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'flags' && (
            <Card>
              <CardHeader>
                <CardTitle>Feature Toggle Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="divide-y">
                  {Object.entries(featureFlags).map(([key, visible]) => (
                    <div key={key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                      <div>
                        <h4 className="font-semibold text-sm capitalize">{key} Module</h4>
                        <p className="text-xs text-muted-foreground">
                          Toggle visibility and access controls for the {key} system module globally.
                        </p>
                      </div>
                      <Switch
                        checked={visible}
                        onCheckedChange={(v) => setFeatureFlags({ ...featureFlags, [key]: v })}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="divide-y">
                  <div className="flex items-center justify-between py-4 first:pt-0">
                    <div>
                      <h4 className="font-semibold text-sm">Newsletter Notifications</h4>
                      <p className="text-xs text-muted-foreground">
                        Receive real-time notifications when a user subscribes to the newsletter.
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.newsletter}
                      onCheckedChange={(v) => setNotificationSettings({ ...notificationSettings, newsletter: v })}
                    />
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <h4 className="font-semibold text-sm">Article Notifications</h4>
                      <p className="text-xs text-muted-foreground">
                        Receive real-time notifications for article creations or updates.
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.articles}
                      onCheckedChange={(v) => setNotificationSettings({ ...notificationSettings, articles: v })}
                    />
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <h4 className="font-semibold text-sm">Comments Notifications</h4>
                      <p className="text-xs text-muted-foreground">
                        Receive notifications when new comments are posted.
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.comments}
                      onCheckedChange={(v) => setNotificationSettings({ ...notificationSettings, comments: v })}
                    />
                  </div>
                  <div className="flex items-center justify-between py-4 last:pb-0">
                    <div>
                      <h4 className="font-semibold text-sm">Ads Notifications</h4>
                      <p className="text-xs text-muted-foreground">
                        Receive notifications for ads status changes or expirations.
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.ads}
                      onCheckedChange={(v) => setNotificationSettings({ ...notificationSettings, ads: v })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'code' && (
            <Card>
              <CardHeader>
                <CardTitle>Custom Code Injection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Global Custom CSS Override</Label>
                  <textarea
                    className="w-full h-48 rounded-md border border-input bg-card font-mono text-xs p-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="/* Custom CSS variables or resets */&#13;body { background-color: #fafafa; }"
                    value={customCode.customCss}
                    onChange={(e) => setCustomCode({ ...customCode, customCss: e.target.value })}
                  />
                  <p className="text-[11px] text-muted-foreground">Injected inside a &lt;style&gt; block in the admin dashboard head.</p>
                </div>
                <div className="space-y-2">
                  <Label>Global Custom JS Scripts</Label>
                  <textarea
                    className="w-full h-48 rounded-md border border-input bg-card font-mono text-xs p-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="// Custom scripts running on bootstrap&#13;console.log('Admin bootstrapped successfully');"
                    value={customCode.customJs}
                    onChange={(e) => setCustomCode({ ...customCode, customJs: e.target.value })}
                  />
                  <p className="text-[11px] text-muted-foreground">Executed globally within client browser layout hooks.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'i18n' && (
            <Card>
              <CardHeader>
                <CardTitle>Languages & UI Dictionary Translations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="info">English (en)</Badge>
                  <span className="text-xs text-muted-foreground">Local mapping dictionary strings.</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {Object.entries(translations.en || {}).map(([key, label]) => (
                    <div key={key} className="space-y-1">
                      <Label className="text-xs font-mono text-muted-foreground">{key}</Label>
                      <Input
                        value={label}
                        onChange={(e) => updateTranslation(key, e.target.value)}
                        className="h-8 py-1 text-sm"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
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
