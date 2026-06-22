'use client';

import { StatsCard } from '@/components/ui/StatsCard';
import { FileText, Users, Eye, Megaphone, TrendingUp, DollarSign } from 'lucide-react';

const stats = [
  { title: 'Total Articles', value: '1,247', change: 12.5, icon: <FileText className="h-6 w-6 text-blue-600" />, iconBg: 'bg-blue-50' },
  { title: 'Active Users', value: '3,842', change: 8.2, icon: <Users className="h-6 w-6 text-green-600" />, iconBg: 'bg-green-50' },
  { title: 'Page Views', value: '128.4K', change: 23.1, icon: <Eye className="h-6 w-6 text-purple-600" />, iconBg: 'bg-purple-50' },
  { title: 'Active Ads', value: '24', change: -3.0, icon: <Megaphone className="h-6 w-6 text-orange-600" />, iconBg: 'bg-orange-50' },
  { title: 'Revenue', value: '$12,426', change: 18.7, icon: <DollarSign className="h-6 w-6 text-emerald-600" />, iconBg: 'bg-emerald-50' },
  { title: 'Conversion', value: '3.24%', change: 4.1, icon: <TrendingUp className="h-6 w-6 text-rose-600" />, iconBg: 'bg-rose-50' },
];

export function OverviewStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}