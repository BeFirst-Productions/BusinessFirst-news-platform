import { Card, CardContent } from './Card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  iconBg?: string;
  className?: string;
}

export function StatsCard({ title, value, change, icon, iconBg = 'bg-blue-50', className }: StatsCardProps) {
  return (
    <Card className={cn('hover:shadow-md transition-shadow duration-200', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {change !== undefined && (
              <div className="flex items-center mt-2">
                {change >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-emerald-600 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                )}
                <span className={cn('text-sm font-medium', change >= 0 ? 'text-emerald-600' : 'text-red-600')}>
                  {Math.abs(change)}%
                </span>
                <span className="text-xs text-muted-foreground ml-1">vs last month</span>
              </div>
            )}
          </div>
          <div className={cn('p-3 rounded-xl', iconBg)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}