'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { UserPlus, FileText, MessageSquare, Megaphone, Settings } from 'lucide-react';

const activities = [
  { id: 1, type: 'user', icon: UserPlus, color: 'text-blue-600 bg-blue-50', message: 'New user registered', detail: 'john@example.com', time: '2 min ago' },
  { id: 2, type: 'article', icon: FileText, color: 'text-green-600 bg-green-50', message: 'Article published', detail: '"Market Trends 2024"', time: '15 min ago' },
  { id: 3, type: 'comment', icon: MessageSquare, color: 'text-purple-600 bg-purple-50', message: 'New comment on', detail: '"Tech Stocks Rise"', time: '1 hour ago' },
  { id: 4, type: 'ad', icon: Megaphone, color: 'text-orange-600 bg-orange-50', message: 'Ad campaign started', detail: '"Summer Sale"', time: '2 hours ago' },
  { id: 5, type: 'settings', icon: Settings, color: 'text-gray-600 bg-gray-50', message: 'Settings updated', detail: 'Site configuration', time: '3 hours ago' },
];

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-4">
              <div className={`p-2 rounded-lg ${activity.color} flex-shrink-0`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.message}</p>
                <p className="text-sm text-gray-500">{activity.detail}</p>
                <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}