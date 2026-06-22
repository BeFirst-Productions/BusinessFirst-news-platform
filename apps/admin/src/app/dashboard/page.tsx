'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import {
  FileText,
  Users,
  Eye,
  TrendingUp,
  Megaphone,
  Mail,
  Activity,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import toast from 'react-hot-toast';
import { useSettingsStore } from '@/store/settings.store';

interface ArticleAuthor {
  id: string;
  name: string;
}

interface Article {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  author: ArticleAuthor;
}

interface UsageDay {
  name: string;
  count: number;
}

interface UserPerformanceItem {
  name: string;
  email: string;
  role: string;
  count: number;
}

interface DashboardUsageStats {
  dailyUsage: UsageDay[];
  userPerformance: UserPerformanceItem[];
}

interface DashboardStats {
  totalArticles: number;
  totalUsers: number;
  totalViews: number;
  activeAds: number;
  recentArticles: Article[];
  draftArticles: Article[];
  dashboardUsage: DashboardUsageStats;
}

interface WidgetConfig {
  id: string;
  title: string;
  visible: boolean;
  w: number;
  h: number;
}

interface SettingResponse {
  key: string;
  value: WidgetConfig[];
}

function DraftArticlesList({ articles, isLoading }: { articles?: Article[]; isLoading: boolean }) {
  return (
    <div className="space-y-3">
      {isLoading ? (
        [...Array(3)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)
      ) : !articles || articles.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-8">
          No draft articles in progress.
        </p>
      ) : (
        articles.map((article) => (
          <div
            key={article.id}
            className="flex items-center justify-between border-b pb-2.5 last:border-b-0 last:pb-0 text-xs"
          >
            <div className="min-w-0 flex-1 pr-3">
              <p className="font-semibold truncate text-foreground">{article.title}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Saved by {article.author.name} • {new Date(article.createdAt).toLocaleDateString()}
              </p>
            </div>
            <a
              href={`/dashboard/articles/${article.id}/edit`}
              className="text-[10px] bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground px-2 py-1 rounded transition-colors font-medium flex-shrink-0"
            >
              Resume Draft
            </a>
          </div>
        ))
      )}
    </div>
  );
}

function QuickWorkspace({ draftArticles, isLoading }: { draftArticles?: Article[]; isLoading: boolean }) {
  const [activeSubTab, setActiveSubTab] = useState<'drafts' | 'actions'>('drafts');

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 border-b flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg">Quick Workspace</CardTitle>
        <div className="flex bg-muted rounded-lg p-0.5 text-xs">
          <button
            onClick={() => setActiveSubTab('drafts')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeSubTab === 'drafts'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Draft Articles
          </button>
          <button
            onClick={() => setActiveSubTab('actions')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeSubTab === 'actions'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Quick Actions
          </button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pt-4 overflow-y-auto">
        {activeSubTab === 'drafts' ? (
          <DraftArticlesList articles={draftArticles} isLoading={isLoading} />
        ) : (
          <div className="grid grid-cols-2 gap-3 min-h-[160px]">
            <a
              href="/dashboard/articles/create"
              className="p-3 border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-left flex flex-col justify-between"
            >
              <div>
                <FileText className="h-5 w-5 text-blue-600 mb-1" />
                <p className="font-semibold text-xs">New Article</p>
                <p className="text-[10px] text-muted-foreground line-clamp-2 leading-tight">
                  Create a new article draft
                </p>
              </div>
            </a>
            <a
              href="/dashboard/users"
              className="p-3 border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-left flex flex-col justify-between"
            >
              <div>
                <Users className="h-5 w-5 text-green-600 mb-1" />
                <p className="font-semibold text-xs">Add User</p>
                <p className="text-[10px] text-muted-foreground line-clamp-2 leading-tight">
                  Create new user account
                </p>
              </div>
            </a>
            <a
              href="/dashboard/ads"
              className="p-3 border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-left flex flex-col justify-between"
            >
              <div>
                <Megaphone className="h-5 w-5 text-orange-600 mb-1" />
                <p className="font-semibold text-xs">Create Ad</p>
                <p className="text-[10px] text-muted-foreground line-clamp-2 leading-tight">
                  Add new advertisement
                </p>
              </div>
            </a>
            <a
              href="/dashboard/newsletter"
              className="p-3 border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-left flex flex-col justify-between"
            >
              <div>
                <Mail className="h-5 w-5 text-purple-600 mb-1" />
                <p className="font-semibold text-xs">Newsletter</p>
                <p className="text-[10px] text-muted-foreground line-clamp-2 leading-tight">
                  Send campaign newsletters
                </p>
              </div>
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await apiClient.get('/analytics/dashboard');
      return response.data.data;
    },
  });

  const { dashboardWidgets: widgetConfig } = useSettingsStore();

  const activeWidgets = React.useMemo(() => {
    const rawWidgets = widgetConfig && Array.isArray(widgetConfig)
      ? widgetConfig
      : [
          { id: 'analytics_views', title: 'Views Performance', visible: true, w: 6, h: 4 },
          { id: 'recent_articles', title: 'Recent Articles', visible: true, w: 6, h: 4 },
          { id: 'dashboard_performance', title: 'Dashboard Performance', visible: true, w: 6, h: 4 },
          { id: 'quick_actions', title: 'Quick Actions', visible: true, w: 6, h: 4 },
        ];

    return rawWidgets
      .filter((w) => w.visible)
      .map((w) => {
        // Map old settings config to new widget layouts automatically
        if (w.id === 'recent_comments' || w.id === 'top_articles') {
          return { ...w, id: 'dashboard_performance', title: 'Dashboard Performance' };
        }
        if (w.id === 'quick_draft') {
          return { ...w, id: 'quick_actions', title: 'Quick Actions' };
        }
        return w;
      });
  }, [widgetConfig]);

  const viewData = React.useMemo(() => {
    const totalViews = stats?.totalViews || 0;
    return [
      { name: 'Mon', views: Math.round(totalViews * 0.1) || 120 },
      { name: 'Tue', views: Math.round(totalViews * 0.15) || 250 },
      { name: 'Wed', views: Math.round(totalViews * 0.12) || 180 },
      { name: 'Thu', views: Math.round(totalViews * 0.18) || 320 },
      { name: 'Fri', views: Math.round(totalViews * 0.14) || 280 },
      { name: 'Sat', views: Math.round(totalViews * 0.2) || 450 },
      { name: 'Sun', views: Math.round(totalViews * 0.11) || 210 },
    ];
  }, [stats?.totalViews]);

  const statCards = [
    {
      title: 'Total Articles',
      value: stats?.totalArticles || 0,
      icon: FileText,
      color: 'text-blue-600 bg-blue-100',
      trend: '+12%',
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'text-green-600 bg-green-100',
      trend: '+5%',
    },
    {
      title: 'Total Views',
      value: stats?.totalViews || 0,
      icon: Eye,
      color: 'text-purple-600 bg-purple-100',
      trend: '+18%',
    },
    {
      title: 'Active Ads',
      value: stats?.activeAds || 0,
      icon: Megaphone,
      color: 'text-orange-600 bg-orange-100',
      trend: '+3%',
    },
  ];

  const getColSpan = (w: number) => {
    if (w === 4) return 'col-span-1 lg:col-span-4';
    if (w === 12) return 'col-span-1 lg:col-span-12';
    return 'col-span-1 lg:col-span-6'; // w === 6 or fallback
  };

  const renderWidget = (id: string, h: number) => {
    const heightClass = h === 3 ? 'h-[250px]' : h === 6 ? 'h-[450px]' : 'h-[350px]';

    switch (id) {
      case 'analytics_views':
        return (
          <div className={heightClass}>
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Views Performance</span>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 min-h-0 pb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={viewData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="name"
                      stroke="#94a3b8"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ fontWeight: 'bold', fontSize: '11px', color: '#1e293b' }}
                      itemStyle={{ fontSize: '12px', color: 'var(--primary)' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stroke="var(--primary)"
                      fillOpacity={1}
                      fill="url(#colorViews)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        );
      case 'recent_articles':
        return (
          <div className={heightClass}>
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">Recent Articles</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto pb-4">
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {!stats?.recentArticles || stats.recentArticles.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-8">
                        No articles found.
                      </p>
                    ) : (
                      stats.recentArticles.map((article) => (
                        <div
                          key={article.id}
                          className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0"
                        >
                          <div className="min-w-0 flex-1 pr-3">
                            <p className="font-medium truncate text-sm">{article.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {article.author.name} •{' '}
                              {new Date(article.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge
                            variant={article.status === 'PUBLISHED' ? 'success' : 'warning'}
                            className="flex-shrink-0"
                          >
                            {article.status}
                          </Badge>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );
      case 'dashboard_performance':
        return (
          <div className={heightClass}>
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg">Dashboard Performance</CardTitle>
                  <p className="text-[11px] text-muted-foreground">Weekly activity logs calculated from Monday to Sunday</p>
                </div>
                <Activity className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent className="flex-1 min-h-0 pt-4 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                  {/* Left Column: Weekly Activity Bar Chart */}
                  <div className="flex flex-col h-full min-h-[160px]">
                    <span className="text-xs font-semibold text-muted-foreground mb-2">Usage Activity (Weekly actions)</span>
                    <div className="flex-1 min-h-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats?.dashboardUsage?.dailyUsage || []} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                          <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} allowDecimals={false} />
                          <Tooltip
                            contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                            itemStyle={{ fontSize: '11px', color: 'var(--primary)' }}
                            labelStyle={{ fontWeight: 'bold', fontSize: '10px' }}
                          />
                          <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={30} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Right Column: Active Users Contribution */}
                  <div className="flex flex-col h-full">
                    <span className="text-xs font-semibold text-muted-foreground mb-2">Editor Contribution (Performance)</span>
                    <div className="flex-1 overflow-y-auto space-y-2">
                      {!stats?.dashboardUsage?.userPerformance || stats.dashboardUsage.userPerformance.length === 0 ? (
                        <p className="text-xs text-muted-foreground text-center py-8">No user activity recorded this week.</p>
                      ) : (
                        stats.dashboardUsage.userPerformance.map((userPerf) => (
                          <div key={userPerf.email} className="flex items-center justify-between text-xs border-b pb-2 last:border-b-0 last:pb-0">
                            <div className="min-w-0 pr-2">
                              <p className="font-semibold truncate text-foreground">{userPerf.name}</p>
                              <p className="text-[10px] text-muted-foreground truncate">{userPerf.email} • {userPerf.role}</p>
                            </div>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <Badge variant="success" className="font-mono text-[10px]">
                                {userPerf.count} acts
                              </Badge>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'quick_actions':
        return (
          <div className={heightClass}>
            <QuickWorkspace draftArticles={stats?.draftArticles} isLoading={isLoading} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, here's your overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  {isLoading ? (
                    <Skeleton className="h-8 w-20 mt-1" />
                  ) : (
                    <p className="text-2xl font-bold mt-1">{stat.value.toLocaleString()}</p>
                  )}
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-green-600 font-medium">{stat.trend}</span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dynamic Widgets Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {activeWidgets.map((widget) => (
          <div key={widget.id} className={getColSpan(widget.w)}>
            {renderWidget(widget.id, widget.h)}
          </div>
        ))}
      </div>
    </div>
  );
}