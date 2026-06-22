import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/database';
import { ResponseUtil } from '../../shared/utils/response.util';
import { AnalyticsService } from './analytics.service';

export class AnalyticsController {
  static async getDashboardStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const now = new Date();
      const currentDay = now.getDay();
      const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() + mondayOffset);
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      const [totalArticles, totalUsers, viewsAggregate, activeAds, recentArticles, draftArticles, weeklyActivities] = await Promise.all([
        prisma.article.count(),
        prisma.user.count(),
        prisma.article.aggregate({
          _sum: {
            viewCount: true,
          },
        }),
        prisma.ad.count({
          where: { status: 'ACTIVE' },
        }),
        prisma.article.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        }),
        prisma.article.findMany({
          take: 5,
          where: { status: 'DRAFT' },
          orderBy: { updatedAt: 'desc' },
          include: {
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        }),
        prisma.articleActivity.findMany({
          where: {
            createdAt: {
              gte: startOfWeek,
              lte: endOfWeek,
            },
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
          },
        }),
      ]);

      const totalViews = viewsAggregate._sum.viewCount || 0;

      // Calculate daily activity counts (Monday to Sunday)
      const dailyUsage = [
        { name: 'Mon', count: 0 },
        { name: 'Tue', count: 0 },
        { name: 'Wed', count: 0 },
        { name: 'Thu', count: 0 },
        { name: 'Fri', count: 0 },
        { name: 'Sat', count: 0 },
        { name: 'Sun', count: 0 },
      ];

      // Calculate user performance contributions
      const userContributionMap = new Map<string, { name: string; email: string; role: string; count: number }>();

      for (const act of weeklyActivities) {
        // Map day (Mon=0, Tue=1, ..., Sun=6)
        const dayVal = act.createdAt.getDay();
        const dayIdx = dayVal === 0 ? 6 : dayVal - 1;
        if (dailyUsage[dayIdx]) {
          dailyUsage[dayIdx].count++;
        }

        // Map user contribution
        if (act.user) {
          const u = act.user;
          const existing = userContributionMap.get(u.id);
          if (existing) {
            existing.count++;
          } else {
            userContributionMap.set(u.id, {
              name: u.name,
              email: u.email,
              role: u.role,
              count: 1,
            });
          }
        }
      }

      const userPerformance = Array.from(userContributionMap.values()).sort((a, b) => b.count - a.count);

      const data = {
        totalArticles,
        totalUsers,
        totalViews,
        activeAds,
        recentArticles,
        draftArticles,
        dashboardUsage: {
          dailyUsage,
          userPerformance,
        },
      };

      ResponseUtil.success(res, data, 'Dashboard stats retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getRealtimeStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await AnalyticsService.getRealtimeStats();
      ResponseUtil.success(res, data, 'Realtime analytics retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getHistoricalStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const days = parseInt(req.query.days as string, 10) || 30;
      const data = await AnalyticsService.getHistoricalStats(days);
      ResponseUtil.success(res, data, `Historical stats for past ${days} days retrieved successfully`);
    } catch (error) {
      next(error);
    }
  }

  static async getSearchConsoleStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const days = parseInt(req.query.days as string, 10) || 30;
      const data = await AnalyticsService.getSearchConsoleStats(days);
      ResponseUtil.success(res, data, `Search Console stats for past ${days} days retrieved successfully`);
    } catch (error) {
      next(error);
    }
  }

  static async getGeoStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const days = parseInt(req.query.days as string, 10) || 30;
      const data = await AnalyticsService.getGeoStats(days);
      ResponseUtil.success(res, data, `Geo location stats for past ${days} days retrieved successfully`);
    } catch (error) {
      next(error);
    }
  }
}
