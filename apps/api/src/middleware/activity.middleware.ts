import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';

export const activityLogger = (req: Request, res: Response, next: NextFunction): void => {
  res.on('finish', async () => {
    try {
      const user = (req as any).user;
      if (
        user &&
        ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) &&
        res.statusCode >= 200 &&
        res.statusCode < 300
      ) {
        // Skip auth/login operations since we logged it explicitly, and logs/analytics queries
        if (req.path.startsWith('/auth/login') || req.path.startsWith('/analytics')) {
          return;
        }

        // Determine action type and module from path (e.g. /api/v1/articles -> ARTICLES)
        const pathSegments = req.path.split('/').filter(Boolean);
        // Filter out api and version numbers
        const segments = pathSegments.filter(s => s !== 'api' && s !== 'v1');
        const moduleName = segments[0]?.toUpperCase() || 'SYSTEM';
        
        let action = `${req.method}_${moduleName}`;
        if (req.method === 'POST') action = `CREATE_${moduleName}`;
        if (['PUT', 'PATCH'].includes(req.method)) action = `UPDATE_${moduleName}`;
        if (req.method === 'DELETE') action = `DELETE_${moduleName}`;

        // Extract articleId if it's an article CRUD
        let articleId: string | null = null;
        if (moduleName === 'ARTICLES') {
          if (segments[1] && segments[1].length === 36) {
            articleId = segments[1];
          }
        }

        // Construct dynamic details
        const details = {
          method: req.method,
          path: req.originalUrl,
          ip: req.ip,
          body: { ...req.body }
        };

        // Redact secrets
        if (details.body.password) delete details.body.password;
        if (details.body.passwordConfirm) delete details.body.passwordConfirm;
        if (details.body.currentPassword) delete details.body.currentPassword;
        if (details.body.newPassword) delete details.body.newPassword;

        // Truncate long body content
        if (details.body.content && typeof details.body.content === 'string' && details.body.content.length > 200) {
          details.body.content = details.body.content.slice(0, 200) + '...';
        }

        await prisma.articleActivity.create({
          data: {
            action,
            details: details as any,
            userId: user.userId,
            articleId: articleId || undefined,
          },
        });
      }
    } catch (err) {
      console.error('Failed to log dashboard activity:', err);
    }
  });

  next();
};
