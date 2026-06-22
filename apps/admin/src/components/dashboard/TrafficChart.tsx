'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
              <Area type="monotone" dataKey="visitors" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVisitors)" />
              <Area type="monotone" dataKey="pageViews" stroke="#10b981" fillOpacity={1} fill="url(#colorPageViews)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}