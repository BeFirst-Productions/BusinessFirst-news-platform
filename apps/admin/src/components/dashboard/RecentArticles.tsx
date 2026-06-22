'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, Eye, MessageSquare, ThumbsUp } from 'lucide-react';
import Link from 'next/link';

const articles = [
  { id: 1, title: 'Global Markets Rally on Fed Decision', author: 'John Doe', status: 'PUBLISHED', views: 1240, comments: 23, likes: 156, date: '2 hours ago' },
  { id: 2, title: 'Tech Stocks Surge Amid AI Boom', author: 'Jane Smith', status: 'PUBLISHED', views: 980, comments: 18, likes: 134, date: '4 hours ago' },
  { id: 3, title: 'Real Estate Market Trends 2024', author: 'Mike Johnson', status: 'DRAFT', views: 0, comments: 0, likes: 0, date: '6 hours ago' },
  { id: 4, title: 'Cryptocurrency Regulation Update', author: 'Sarah Wilson', status: 'SCHEDULED', views: 0, comments: 0, likes: 0, date: 'Yesterday' },
  { id: 5, title: 'Startup Funding Roundup', author: 'Alex Brown', status: 'PUBLISHED', views: 756, comments: 12, likes: 89, date: 'Yesterday' },
];

export function RecentArticles() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Articles</CardTitle>
        <Link href="/dashboard/articles" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {articles.map((article) => (
            <div key={article.id} className="flex items-center justify-between py-2 border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 px-2 rounded-lg transition-colors">
              <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={article.status === 'PUBLISHED' ? 'success' : article.status === 'DRAFT' ? 'warning' : 'info'}>
                    {article.status}
                  </Badge>
                  <span className="text-xs text-gray-400">{article.date}</span>
                </div>
                <p className="font-medium text-gray-900 dark:text-white truncate">{article.title}</p>
                <p className="text-sm text-gray-500">by {article.author}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1"><Eye className="h-4 w-4" /> {article.views}</span>
                <span className="flex items-center gap-1"><MessageSquare className="h-4 w-4" /> {article.comments}</span>
                <span className="flex items-center gap-1"><ThumbsUp className="h-4 w-4" /> {article.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}