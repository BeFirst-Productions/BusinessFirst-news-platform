'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { GeoMap } from './GeoMap';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  BarChart3,
  Users,
  Eye,
  MousePointerClick,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  AlertCircle,
  Key,
  HelpCircle,
  Smartphone,
  Laptop,
  Tablet,
  RefreshCw,
  Search,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const COLORS = ['#24214c', '#cd2027', '#e2e8f0', '#94a3b8', '#0f172a'];

export function AnalyticsManager() {
  const [period, setPeriod] = useState<7 | 30 | 90>(30);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // ── Queries ──────────────────────────────────────────────
  const { 
    data: realtimeData, 
    isLoading: isRealtimeLoading, 
    refetch: refetchRealtime 
  } = useQuery({
    queryKey: ['analytics-realtime'],
    queryFn: async () => {
      const res = await apiClient.get('/analytics/realtime');
      return res.data.data;
    },
    refetchInterval: 30_000, // Update active users every 30s
  });

  const { 
    data: historicalData, 
    isLoading: isHistoricalLoading,
    refetch: refetchHistorical 
  } = useQuery({
    queryKey: ['analytics-historical', period],
    queryFn: async () => {
      const res = await apiClient.get(`/analytics/historical?days=${period}`);
      return res.data.data;
    },
  });

  const { 
    data: searchData, 
    isLoading: isSearchLoading,
    refetch: refetchSearch 
  } = useQuery({
    queryKey: ['analytics-search', period],
    queryFn: async () => {
      const res = await apiClient.get(`/analytics/search-console?days=${period}`);
      return res.data.data;
    },
  });

  const { 
    data: geoData, 
    isLoading: isGeoLoading,
    refetch: refetchGeo 
  } = useQuery({
    queryKey: ['analytics-geo', period],
    queryFn: async () => {
      const res = await apiClient.get(`/analytics/geo?days=${period}`);
      return res.data.data;
    },
  });

  const refreshAll = () => {
    refetchRealtime();
    refetchHistorical();
    refetchSearch();
    refetchGeo();
  };

  const isMockMode = historicalData?.isMock || searchData?.isMock || geoData?.isMock;

  // Format session duration: seconds -> mm:ss
  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.round(secs % 60);
    return `${m}m ${s}s`;
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" /> Traffic & Search Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Website stats fetched from Google Analytics (GA4) and Google Search Console
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Period selector */}
          <div className="inline-flex rounded-lg border border-border p-1 bg-card">
            {([7, 30, 90] as const).map((days) => (
              <button
                key={days}
                onClick={() => setPeriod(days)}
                className={cn(
                  'px-3 py-1.5 text-xs font-semibold rounded-md transition-all',
                  period === days
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {days === 7 ? '7 Days' : days === 30 ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>

          <button
            onClick={refreshAll}
            className="flex items-center justify-center h-10 w-10 border border-border bg-card rounded-lg text-muted-foreground hover:text-foreground transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mock Mode Alert Banner */}
      {isMockMode && (
        <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-amber-800">Simulated Analytics Mode Active</h4>
              <p className="text-xs text-amber-700 mt-0.5">
                Google Analytics credentials are not yet configured in the environment. Displaying high-fidelity mock data.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowConfigModal(true)}
            className="flex items-center justify-center gap-1.5 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
          >
            <Key className="h-3.5 w-3.5" /> Setup API Connection
          </button>
        </div>
      )}

      {/* Realtime & Key Stats Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Realtime Active Card */}
        <div className="bg-[#24214c] text-white p-5 rounded-xl flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="absolute right-[-10px] top-[-10px] opacity-10">
            <Users className="h-28 w-28 text-white" />
          </div>
          <div className="z-10">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <p className="text-xs text-slate-300 font-semibold tracking-wide uppercase">Active Right Now</p>
            </div>
            <h2 className="text-4xl font-extrabold mt-3 tracking-tight">
              {isRealtimeLoading ? '...' : realtimeData?.activeUsers || 0}
            </h2>
          </div>
          <p className="text-[11px] text-slate-300 mt-4 leading-normal font-medium">
            Active unique visitors reading articles on the site
          </p>
        </div>

        {/* Total Page Views */}
        <div className="bg-card border border-border p-5 rounded-xl flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-semibold tracking-wide uppercase">Page Views</span>
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Eye className="h-4 w-4" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mt-2 tracking-tight">
              {isHistoricalLoading ? '...' : historicalData?.summary?.pageViews?.toLocaleString() || 0}
            </h2>
          </div>
          <div className="flex items-center gap-1 mt-4">
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
              <ArrowUpRight className="h-3 w-3" /> +{historicalData?.summary?.pageViewsChange || 0}%
            </span>
            <span className="text-[10px] text-muted-foreground font-semibold">vs prev period</span>
          </div>
        </div>

        {/* Total Sessions */}
        <div className="bg-card border border-border p-5 rounded-xl flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-semibold tracking-wide uppercase">Sessions</span>
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mt-2 tracking-tight">
              {isHistoricalLoading ? '...' : historicalData?.summary?.sessions?.toLocaleString() || 0}
            </h2>
          </div>
          <div className="flex items-center gap-1 mt-4">
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
              <ArrowUpRight className="h-3 w-3" /> +{historicalData?.summary?.sessionsChange || 0}%
            </span>
            <span className="text-[10px] text-muted-foreground font-semibold">vs prev period</span>
          </div>
        </div>

        {/* Session Duration */}
        <div className="bg-card border border-border p-5 rounded-xl flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-semibold tracking-wide uppercase">Avg. Read Time</span>
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mt-2 tracking-tight">
              {isHistoricalLoading ? '...' : formatDuration(historicalData?.summary?.avgSessionDuration || 0)}
            </h2>
          </div>
          <div className="flex items-center gap-1 mt-4">
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
              <ArrowUpRight className="h-3 w-3" /> +{historicalData?.summary?.avgSessionDurationChange || 0}%
            </span>
            <span className="text-[10px] text-muted-foreground font-semibold">vs prev period</span>
          </div>
        </div>

        {/* Bounce Rate */}
        <div className="bg-card border border-border p-5 rounded-xl flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-semibold tracking-wide uppercase">Bounce Rate</span>
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mt-2 tracking-tight">
              {isHistoricalLoading ? '...' : `${historicalData?.summary?.bounceRate || 0}%`}
            </h2>
          </div>
          <div className="flex items-center gap-1 mt-4">
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
              <ArrowDownRight className="h-3 w-3" /> {historicalData?.summary?.bounceRateChange || 0}%
            </span>
            <span className="text-[10px] text-muted-foreground font-semibold">vs prev period</span>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Traffic Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">Traffic Analytics</h3>
            <p className="text-xs text-muted-foreground">Unique page views vs active user sessions</p>
          </div>

          <div className="h-[300px] w-full">
            {isHistoricalLoading ? (
              <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
                Loading traffic charts...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicalData?.trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#cd2027" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#cd2027" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#24214c" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#24214c" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: '#e2e8f0' }} />
                  <Area type="monotone" dataKey="views" name="Page Views" stroke="#cd2027" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                  <Area type="monotone" dataKey="sessions" name="Sessions" stroke="#24214c" strokeWidth={2} fillOpacity={1} fill="url(#colorSessions)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Acquisition Sources */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Traffic Channels</h3>
            <p className="text-xs text-muted-foreground">Acquisition channels driving page traffic</p>
          </div>

          <div className="h-[220px] w-full relative">
            {isHistoricalLoading ? (
              <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
                Loading channels...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={historicalData?.acquisition}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {historicalData?.acquisition?.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="space-y-2">
            {historicalData?.acquisition?.map((item: any, idx: number) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="text-muted-foreground font-medium">{item.name}</span>
                </div>
                <span className="font-bold">{item.value?.toLocaleString()} sessions</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Geography Map & Devices Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* World Map Wrapper */}
        <div className="lg:col-span-2">
          <GeoMap countries={geoData?.countries || []} isLoading={isGeoLoading} />
        </div>

        {/* Top Locations Table */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Top Visitor Regions</h3>
            <p className="text-xs text-muted-foreground">Highest traffic countries by visitor volume</p>
          </div>

          <div className="flex-1 overflow-y-auto mt-4 space-y-4 max-h-[300px] pr-2">
            {isGeoLoading ? (
              <div className="h-40 flex items-center justify-center text-xs text-muted-foreground">
                Loading countries...
              </div>
            ) : geoData?.countries?.slice(0, 7).map((c: any, index: number) => {
              const maxUsers = geoData?.countries?.[0]?.users || 1;
              const percentage = Math.round((c.users / maxUsers) * 100);
              return (
                <div key={c.code} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-muted-foreground/60 w-4">#{index + 1}</span>
                      <span className="font-semibold text-foreground">{c.country}</span>
                    </div>
                    <span className="text-muted-foreground font-semibold">{c.users?.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div 
                      className="bg-primary h-1.5 rounded-full transition-all duration-500" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Google Search Console & Realtime Active Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Google Search Console Queries */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Search className="h-4 w-4 text-primary" /> Google Search Console Performance
            </h3>
            <p className="text-xs text-muted-foreground">Top keywords query, impressions, CTR and rankings</p>
          </div>

          <div className="flex-1 overflow-x-auto min-h-[250px]">
            {isSearchLoading ? (
              <div className="h-40 flex items-center justify-center text-xs text-muted-foreground">
                Loading Search Console stats...
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/20 text-muted-foreground font-semibold">
                    <th className="py-2.5 px-3">Query</th>
                    <th className="py-2.5 px-3 text-right">Clicks</th>
                    <th className="py-2.5 px-3 text-right">Impressions</th>
                    <th className="py-2.5 px-3 text-right">CTR</th>
                    <th className="py-2.5 px-3 text-right">Position</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-medium text-foreground">
                  {searchData?.queries?.slice(0, 6).map((q: any) => (
                    <tr key={q.query} className="hover:bg-muted/10">
                      <td className="py-2.5 px-3 truncate max-w-[150px] font-semibold text-slate-700">{q.query}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-slate-900">{q.clicks?.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right text-muted-foreground">{q.impressions?.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right text-emerald-600 font-bold">{q.ctr}%</td>
                      <td className="py-2.5 px-3 text-right text-slate-600 font-bold">{q.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Realtime Active Pages */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Eye className="h-4 w-4 text-primary" /> Active Pages Breakdown
            </h3>
            <p className="text-xs text-muted-foreground">Articles currently being read by users in real-time</p>
          </div>

          <div className="flex-1 space-y-4">
            {isRealtimeLoading ? (
              <div className="h-40 flex items-center justify-center text-xs text-muted-foreground">
                Loading active pages...
              </div>
            ) : (
              <div className="space-y-3">
                {realtimeData?.activePages?.map((page: any, index: number) => (
                  <div key={index} className="flex items-center justify-between text-xs border-b border-slate-50 pb-2">
                    <span className="font-semibold truncate max-w-[80%] text-slate-700 hover:text-primary transition-colors cursor-default">
                      {page.title}
                    </span>
                    <span className="flex items-center justify-center h-6 min-w-8 bg-emerald-50 rounded-full text-[11px] font-bold text-emerald-700 px-2">
                      {page.count} active
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── API Integration Guide Dialog / Modal ────────────────── */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card rounded-2xl border border-border shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-border flex items-center justify-between bg-muted/10">
              <div className="flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg text-foreground">Google API Connection Setup</h3>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="h-8 w-8 hover:bg-muted rounded-full flex items-center justify-center text-muted-foreground transition-all"
              >
                &times;
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-foreground font-medium leading-relaxed">
              <p className="text-muted-foreground text-[11px] -mt-2">
                Follow these instructions to link this admin dashboard to your live Google Analytics 4 property and Google Search Console property.
              </p>

              {/* Step 1 */}
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="flex items-center justify-center h-4 w-4 bg-primary text-white rounded-full text-[9px]">1</span>
                  Create a Google Cloud Service Account
                </h4>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1 text-[11px] font-medium">
                  <li>Open the <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold inline-flex items-center gap-0.5">Google Cloud Console <ExternalLink className="h-2.5 w-2.5" /></a>.</li>
                  <li>Enable the <strong>Google Analytics Data API</strong> and <strong>Google Search Console API</strong> in your API Library.</li>
                  <li>Go to <strong>IAM & Admin &gt; Service Accounts</strong>, create a service account, and create a <strong>JSON credentials key</strong>. Download this file.</li>
                </ul>
              </div>

              {/* Step 2 */}
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="flex items-center justify-center h-4 w-4 bg-primary text-white rounded-full text-[9px]">2</span>
                  Share Google Analytics 4 Property
                </h4>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1 text-[11px] font-medium">
                  <li>Open your Google Analytics Admin panel.</li>
                  <li>Go to <strong>Property Access Management</strong> and click the <strong>+</strong> icon to add users.</li>
                  <li>Invite the Service Account email address (e.g. <code>your-account@project-id.iam.gserviceaccount.com</code>) with the <strong>Viewer</strong> role.</li>
                </ul>
              </div>

              {/* Step 3 */}
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="flex items-center justify-center h-4 w-4 bg-primary text-white rounded-full text-[9px]">3</span>
                  Share Google Search Console Property
                </h4>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1 text-[11px] font-medium">
                  <li>Open Google Search Console.</li>
                  <li>Go to <strong>Settings &gt; Users and permissions</strong> and click <strong>Add User</strong>.</li>
                  <li>Invite the Service Account email address with <strong>Full</strong> or <strong>Restricted</strong> permission.</li>
                </ul>
              </div>

              {/* Step 4 */}
              <div className="space-y-1 bg-muted/40 p-4 border rounded-xl">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5 mb-2">
                  <span className="flex items-center justify-center h-4 w-4 bg-primary text-white rounded-full text-[9px]">4</span>
                  Configure Environment Variables
                </h4>
                <p className="text-[11px] text-muted-foreground mb-2">
                  Add the downloaded credentials variables to your API server environment configuration (<code>apps/api/.env</code>):
                </p>
                <pre className="p-3 bg-slate-950 text-slate-50 font-mono text-[9px] rounded-lg overflow-x-auto leading-relaxed shadow-inner">
{`# Google Analytics 4 (GA4) Property ID
GA_PROPERTY_ID=123456789

# Search Console Site URL
GSC_SITE_URL=https://example.com/

# Service Account Credentials JSON Fields
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-account@project-id.iam.gserviceaccount.com
GOOGLE_PROJECT_ID=project-id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC..."`}
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-border bg-muted/20 flex justify-end">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg text-xs shadow-sm hover:bg-primary/95 transition-all"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
