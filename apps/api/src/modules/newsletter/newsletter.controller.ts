import { Request, Response, NextFunction } from 'express';
import { NewsletterService } from './newsletter.service';
import { ResponseUtil } from '../../shared/utils/response.util';
import {
  NewsletterQueryInput,
  CampaignQueryInput,
} from './newsletter.validation';

export class NewsletterController {
  // ── Public: Subscribe ──────────────────────────────────────────────────────
  static async subscribe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await NewsletterService.subscribe(req.body);
      ResponseUtil.created(res, result, result.message);
    } catch (error) {
      next(error);
    }
  }

  // ── Public: Unsubscribe (via email link token) ─────────────────────────────
  static async unsubscribe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.query['token'] as string;
      const result = await NewsletterService.unsubscribe(token);
      // Return a nice HTML page for direct browser visits
      res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Unsubscribed — BusinessFirst</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f1f5f9; color: #1e293b; }
  .card { background: #fff; border-radius: 12px; padding: 48px 40px; text-align: center; max-width: 480px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
  h1 { font-size: 24px; margin-bottom: 12px; }
  p { color: #64748b; font-size: 15px; line-height: 1.6; margin-bottom: 24px; }
  a { display: inline-block; padding: 12px 28px; background: #0f172a; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; }
</style>
</head>
<body>
  <div class="card">
    <div style="font-size:48px;margin-bottom:16px">✅</div>
    <h1>You've been unsubscribed</h1>
    <p>${result.message}. You won't receive any more newsletters from us.</p>
    <a href="/">Return to BusinessFirst</a>
  </div>
</body>
</html>`);
    } catch (error) {
      next(error);
    }
  }

  // ── Admin: Get paginated subscriber list ───────────────────────────────────
  static async getSubscribers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = req.query as unknown as NewsletterQueryInput;
      const { subscribers, total } = await NewsletterService.getSubscribers(query);
      ResponseUtil.paginated(res, subscribers, total, query.page, query.limit);
    } catch (error) {
      next(error);
    }
  }

  // ── Admin: Subscriber stats ────────────────────────────────────────────────
  static async getSubscriberStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await NewsletterService.getSubscriberStats();
      ResponseUtil.success(res, stats);
    } catch (error) {
      next(error);
    }
  }

  // ── Admin: Delete single subscriber ───────────────────────────────────────
  static async deleteSubscriber(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await NewsletterService.deleteSubscriber(id as string);
      ResponseUtil.success(res, result, result.message);
    } catch (error) {
      next(error);
    }
  }

  // ── Admin: Bulk delete subscribers ────────────────────────────────────────
  static async bulkDeleteSubscribers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { ids } = req.body;
      const result = await NewsletterService.bulkDeleteSubscribers(ids);
      ResponseUtil.success(res, result, result.message);
    } catch (error) {
      next(error);
    }
  }

  // ── Admin: Export subscribers as CSV ──────────────────────────────────────
  static async exportSubscribers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const csv = await NewsletterService.exportSubscribersAsCsv();
      const filename = `newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.status(200).send('\uFEFF' + csv); // BOM for Excel UTF-8 compatibility
    } catch (error) {
      next(error);
    }
  }

  // ── Admin: Create campaign (draft) ────────────────────────────────────────
  static async createCampaign(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) { ResponseUtil.unauthorized(res); return; }
      const campaign = await NewsletterService.createCampaign(req.body, req.user.userId);
      ResponseUtil.created(res, campaign, 'Campaign created successfully');
    } catch (error) {
      next(error);
    }
  }

  // ── Admin: Send existing campaign ─────────────────────────────────────────
  static async sendCampaign(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) { ResponseUtil.unauthorized(res); return; }
      const { id } = req.params;
      const result = await NewsletterService.sendCampaign(id as string, req.user.userId);
      ResponseUtil.success(res, result, `Campaign sent to ${result.result.sent} subscribers`);
    } catch (error) {
      next(error);
    }
  }

  // ── Admin: Create & immediately send campaign ──────────────────────────────
  static async createAndSend(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) { ResponseUtil.unauthorized(res); return; }
      const result = await NewsletterService.createAndSendCampaign(req.body, req.user.userId);
      ResponseUtil.success(res, result, `Campaign sent to ${result.result.sent} subscribers`);
    } catch (error) {
      next(error);
    }
  }

  // ── Admin: Get campaigns list ─────────────────────────────────────────────
  static async getCampaigns(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = req.query as unknown as CampaignQueryInput;
      const { campaigns, total } = await NewsletterService.getCampaigns(query);
      ResponseUtil.paginated(res, campaigns, total, query.page, query.limit);
    } catch (error) {
      next(error);
    }
  }

  // ── Admin: Get single campaign detail ────────────────────────────────────
  static async getCampaignById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const campaign = await NewsletterService.getCampaignById(id as string);
      ResponseUtil.success(res, campaign);
    } catch (error) {
      next(error);
    }
  }
}
