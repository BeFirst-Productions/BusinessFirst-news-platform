import { prisma } from '../../config/database';
import { env } from '../../config/env';
import { EmailService } from '../../shared/services/email.service';
import { ConflictError, NotFoundError, BadRequestError } from '../../shared/errors/AppError';
import { CampaignStatus, Prisma } from '../../generated/prisma';
import {
  SubscribeInput,
  NewsletterQueryInput,
  CreateCampaignInput,
  CampaignQueryInput,
} from './newsletter.validation';
import { randomBytes } from 'crypto';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function generateToken(): string {
  return randomBytes(32).toString('hex');
}

// ─────────────────────────────────────────────────────────────────────────────
// Newsletter Service
// ─────────────────────────────────────────────────────────────────────────────

export class NewsletterService {
  // ── Public: Subscribe ────────────────────────────────────────────────────
  static async subscribe(data: SubscribeInput) {
    const existing = await prisma.newsletter.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      if (existing.isActive) {
        throw new ConflictError('This email address is already subscribed');
      }
      // Re-subscribe: reset token, mark active
      const token = generateToken();
      const updated = await prisma.newsletter.update({
        where: { email: data.email },
        data: {
          isActive: true,
          token,
          name: data.name ?? existing.name,
          subscribedAt: new Date(),
          unsubscribedAt: null,
        },
      });
      // Send welcome email (fire-and-forget; don't fail the response if SMTP down)
      EmailService.sendWelcomeEmail(
        updated.email,
        updated.name,
        token,
        'BusinessFirst',
        env.WEB_URL,
      ).catch((err) => console.error('[Newsletter] Welcome email failed:', err));

      return { message: 'Successfully re-subscribed to the newsletter' };
    }

    // New subscriber
    const token = generateToken();
    const subscriber = await prisma.newsletter.create({
      data: {
        email: data.email,
        name: data.name ?? null,
        token,
        isActive: true,
      },
    });

    EmailService.sendWelcomeEmail(
      subscriber.email,
      subscriber.name,
      token,
      'BusinessFirst',
      env.WEB_URL,
    ).catch((err) => console.error('[Newsletter] Welcome email failed:', err));

    return { message: 'Successfully subscribed to the newsletter' };
  }

  // ── Public: Unsubscribe (via token link) ─────────────────────────────────
  static async unsubscribe(token: string) {
    if (!token) throw new BadRequestError('Unsubscribe token is required');

    const subscriber = await prisma.newsletter.findUnique({ where: { token } });
    if (!subscriber) throw new NotFoundError('Invalid or expired unsubscribe link');

    if (!subscriber.isActive) {
      return { message: 'You are already unsubscribed' };
    }

    await prisma.newsletter.update({
      where: { token },
      data: {
        isActive: false,
        unsubscribedAt: new Date(),
      },
    });

    return { message: 'Successfully unsubscribed from the newsletter' };
  }

  // ── Admin: Get subscribers (paginated + searchable) ───────────────────────
  static async getSubscribers(query: NewsletterQueryInput) {
    const { page, limit, search, isActive } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.NewsletterWhereInput = {};

    if (typeof isActive === 'boolean') {
      where.isActive = isActive;
    }

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [subscribers, total] = await Promise.all([
      prisma.newsletter.findMany({
        where,
        skip,
        take: limit,
        orderBy: { subscribedAt: 'desc' },
        select: {
          id: true,
          email: true,
          name: true,
          isActive: true,
          subscribedAt: true,
          unsubscribedAt: true,
          createdAt: true,
        },
      }),
      prisma.newsletter.count({ where }),
    ]);

    return { subscribers, total };
  }

  // ── Admin: Subscriber stats ──────────────────────────────────────────────
  static async getSubscriberStats() {
    const [total, active, unsubscribed] = await Promise.all([
      prisma.newsletter.count(),
      prisma.newsletter.count({ where: { isActive: true } }),
      prisma.newsletter.count({ where: { isActive: false } }),
    ]);

    return { total, active, unsubscribed };
  }

  // ── Admin: Delete a single subscriber ────────────────────────────────────
  static async deleteSubscriber(id: string) {
    const subscriber = await prisma.newsletter.findUnique({ where: { id } });
    if (!subscriber) throw new NotFoundError('Subscriber not found');

    await prisma.newsletter.delete({ where: { id } });
    return { message: 'Subscriber deleted successfully' };
  }

  // ── Admin: Bulk delete subscribers ───────────────────────────────────────
  static async bulkDeleteSubscribers(ids: string[]) {
    const result = await prisma.newsletter.deleteMany({
      where: { id: { in: ids } },
    });
    return { message: `${result.count} subscriber(s) deleted successfully`, count: result.count };
  }

  // ── Admin: Export active subscribers as CSV ───────────────────────────────
  static async exportSubscribersAsCsv(): Promise<string> {
    const subscribers = await prisma.newsletter.findMany({
      where: { isActive: true },
      orderBy: { subscribedAt: 'asc' },
      select: { email: true, name: true, subscribedAt: true },
    });

    const header = 'Email,Name,Subscribed At\n';
    const rows = subscribers
      .map(
        (s) =>
          `"${s.email}","${s.name ?? ''}","${s.subscribedAt.toISOString()}"`,
      )
      .join('\n');

    return header + rows;
  }

  // ── Admin: Create campaign (saved as DRAFT) ───────────────────────────────
  static async createCampaign(data: CreateCampaignInput, userId: string) {
    const campaign = await prisma.newsletterCampaign.create({
      data: {
        subject: data.subject,
        htmlContent: data.htmlContent,
        status: CampaignStatus.DRAFT,
        sentBy: userId,
      },
    });
    return campaign;
  }

  // ── Admin: Send a campaign to all active subscribers ─────────────────────
  static async sendCampaign(campaignId: string, userId: string) {
    const campaign = await prisma.newsletterCampaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) throw new NotFoundError('Campaign not found');

    if (campaign.status === CampaignStatus.SENDING) {
      throw new BadRequestError('Campaign is already being sent');
    }

    if (campaign.status === CampaignStatus.SENT) {
      throw new BadRequestError('Campaign has already been sent');
    }

    // Get all active subscribers with their tokens
    const subscribers = await prisma.newsletter.findMany({
      where: { isActive: true },
      select: { email: true, token: true, name: true },
    });

    if (subscribers.length === 0) {
      throw new BadRequestError('No active subscribers to send to');
    }

    // Mark as SENDING
    await prisma.newsletterCampaign.update({
      where: { id: campaignId },
      data: { status: CampaignStatus.SENDING, sentBy: userId },
    });

    // Filter out subscribers without token (shouldn't happen but safety net)
    const validSubscribers = subscribers.filter(
      (s): s is { email: string; token: string; name: string | null } => s.token !== null,
    );

    // Send bulk (batched)
    const result = await EmailService.sendBulk(
      validSubscribers,
      campaign.subject,
      campaign.htmlContent,
    );

    // Update campaign with results
    const finalStatus =
      result.failed > 0 && result.sent === 0
        ? CampaignStatus.FAILED
        : CampaignStatus.SENT;

    const updatedCampaign = await prisma.newsletterCampaign.update({
      where: { id: campaignId },
      data: {
        status: finalStatus,
        sentCount: result.sent,
        failedCount: result.failed,
        sentAt: new Date(),
        sentBy: userId,
      },
    });

    return {
      campaign: updatedCampaign,
      result: {
        sent: result.sent,
        failed: result.failed,
        total: validSubscribers.length,
      },
    };
  }

  // ── Admin: Create and immediately send campaign ────────────────────────────
  static async createAndSendCampaign(data: CreateCampaignInput, userId: string) {
    const campaign = await NewsletterService.createCampaign(data, userId);
    return NewsletterService.sendCampaign(campaign.id, userId);
  }

  // ── Admin: Get campaigns (paginated) ─────────────────────────────────────
  static async getCampaigns(query: CampaignQueryInput) {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const [campaigns, total] = await Promise.all([
      prisma.newsletterCampaign.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.newsletterCampaign.count(),
    ]);

    return { campaigns, total };
  }

  // ── Admin: Get single campaign ────────────────────────────────────────────
  static async getCampaignById(id: string) {
    const campaign = await prisma.newsletterCampaign.findUnique({ where: { id } });
    if (!campaign) throw new NotFoundError('Campaign not found');
    return campaign;
  }
}
