'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useUIStore } from '@/store/ui.store';

const data = [
  { date: 'Mon', visitors: 4000, pageViews: 2400 },
  { date: 'Tue', visitors: 3000, pageViews: 1398 },
  { date: 'Wed', visitors: 2000, pageViews: 9800 },
  { date: 'Thu', visitors: 2780, pageViews: 3908 },
  { date: 'Fri', visitors: 1890, pageViews: 4800 },
  { date: 'Sat', visitors: 2390, pageViews: 3800 },
  { date: 'Sun', visitors: 3490, pageViews: 4300 },
];

export function TrafficChart() {
  const { theme } = useUIStore();
  const isDark = theme === 'dark';

  const gridColor = isDark ? '#334155' : '#e5e7eb';
  const axisColor = isDark ? '#475569' : '#6b7280';
  const tickColor = isDark ? '#cbd5e1' : '#0f172a';
  const tooltipBg = isDark ? '#1e293b' : '#ffffff';
  const tooltipBorder = isDark ? '#334155' : '#e5e7eb';
  const tooltipText = isDark ? '#f8fafc' : '#0f172a';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Traffic</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="date" stroke={axisColor} tick={{ fill: tickColor, fontSize: 12 }} />
              <YAxis stroke={axisColor} tick={{ fill: tickColor, fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  borderColor: tooltipBorder,
                  color: tooltipText,
                  borderRadius: '8px',
                }}
                labelStyle={{ color: tooltipText, fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="visitors" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVisitors)" />
              <Area type="monotone" dataKey="pageViews" stroke="#10b981" fillOpacity={1} fill="url(#colorPageViews)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}