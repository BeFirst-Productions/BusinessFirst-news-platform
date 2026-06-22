import nodemailer, { Transporter } from 'nodemailer';
import { env } from '../../config/env';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface BulkSendResult {
  sent: number;
  failed: number;
  errors: Array<{ email: string; error: string }>;
}

export interface TemplateOptions {
  subject: string;
  htmlContent: string;
  unsubscribeUrl: string;
  siteTitle?: string;
  siteUrl?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// HTML Email Template Builder
// ─────────────────────────────────────────────────────────────────────────────

function buildEmailTemplate(opts: TemplateOptions): string {
  const { subject, htmlContent, unsubscribeUrl, siteTitle = 'BusinessFirst', siteUrl = '#' } = opts;
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; color: #1e293b; }
    .email-wrapper { max-width: 640px; margin: 32px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .email-header { background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); padding: 32px 40px; text-align: center; }
    .email-header a { color: #ffffff; text-decoration: none; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; }
    .email-header p { color: rgba(255,255,255,0.6); font-size: 12px; margin-top: 4px; }
    .email-subject { padding: 32px 40px 16px; border-bottom: 1px solid #e2e8f0; }
    .email-subject h1 { font-size: 24px; font-weight: 700; color: #0f172a; line-height: 1.3; }
    .email-body { padding: 32px 40px; line-height: 1.7; color: #334155; font-size: 15px; }
    .email-body h2 { font-size: 20px; font-weight: 600; color: #0f172a; margin: 24px 0 12px; }
    .email-body h3 { font-size: 16px; font-weight: 600; color: #0f172a; margin: 20px 0 8px; }
    .email-body p { margin-bottom: 16px; }
    .email-body a { color: #3b82f6; text-decoration: underline; }
    .email-body img { max-width: 100%; border-radius: 8px; margin: 16px 0; }
    .email-body ul, .email-body ol { padding-left: 24px; margin-bottom: 16px; }
    .email-body li { margin-bottom: 8px; }
    .email-body blockquote { border-left: 4px solid #3b82f6; padding: 12px 20px; margin: 20px 0; background: #eff6ff; border-radius: 0 8px 8px 0; color: #1e40af; font-style: italic; }
    .cta-block { text-align: center; margin: 32px 0; }
    .cta-btn { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #3b82f6, #2563eb); color: #ffffff !important; text-decoration: none !important; border-radius: 8px; font-weight: 600; font-size: 15px; }
    .email-divider { border: none; border-top: 1px solid #e2e8f0; margin: 32px 0; }
    .email-footer { background: #f8fafc; padding: 24px 40px; text-align: center; border-top: 1px solid #e2e8f0; }
    .email-footer p { font-size: 12px; color: #94a3b8; line-height: 1.6; }
    .email-footer a { color: #64748b; text-decoration: underline; }
    @media (max-width: 640px) {
      .email-wrapper { margin: 0; border-radius: 0; }
      .email-header, .email-body, .email-subject, .email-footer { padding-left: 24px; padding-right: 24px; }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-header">
      <a href="${siteUrl}">${siteTitle}</a>
      <p>News &amp; Insights</p>
    </div>
    <div class="email-subject">
      <h1>${subject}</h1>
    </div>
    <div class="email-body">
      ${htmlContent}
    </div>
    <div class="email-footer">
      <p>
        You are receiving this email because you subscribed to <strong>${siteTitle}</strong> newsletters.<br/>
        <a href="${unsubscribeUrl}">Unsubscribe</a> &nbsp;·&nbsp; 
        <a href="${siteUrl}">${siteTitle}</a>
      </p>
      <p style="margin-top: 8px;">© ${year} ${siteTitle}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Welcome / Confirmation Email Template
// ─────────────────────────────────────────────────────────────────────────────

function buildWelcomeTemplate(name: string | null, unsubscribeUrl: string, siteTitle: string, siteUrl: string): string {
  const greeting = name ? `Hi ${name}` : 'Welcome';
  const html = `
    <p>${greeting},</p>
    <p>Thank you for subscribing to <strong>${siteTitle}</strong> newsletters! You'll now receive our latest business news, insights, and updates directly in your inbox.</p>
    <hr class="email-divider" />
    <p>Here's what you can expect from us:</p>
    <ul>
      <li>📰 Breaking business news and market updates</li>
      <li>📊 In-depth analysis and financial insights</li>
      <li>🚀 Startup stories and innovation spotlights</li>
      <li>📅 Weekly digests curated by our editorial team</li>
    </ul>
    <div class="cta-block">
      <a href="${siteUrl}" class="cta-btn">Visit ${siteTitle} →</a>
    </div>
    <p style="font-size:13px; color:#64748b;">You can unsubscribe at any time by clicking the link below.</p>
  `;
  return buildEmailTemplate({
    subject: `Welcome to ${siteTitle} Newsletters!`,
    htmlContent: html,
    unsubscribeUrl,
    siteTitle,
    siteUrl,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Email Service
// ─────────────────────────────────────────────────────────────────────────────

export class EmailService {
  private static transporter: Transporter | null = null;

  private static readonly BATCH_SIZE = parseInt(process.env['SMTP_BATCH_SIZE'] ?? '50', 10);
  private static readonly BATCH_DELAY_MS = parseInt(process.env['SMTP_BATCH_DELAY_MS'] ?? '1000', 10);

  static getTransporter(): Transporter {
    if (!EmailService.transporter) {
      EmailService.transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_PORT === 465,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
      });
    }
    return EmailService.transporter;
  }

  static isConfigured(): boolean {
    return Boolean(env.SMTP_USER && env.SMTP_PASS);
  }

  // ── Send a single transactional email ──────────────────────────────────────
  static async sendSingle(to: string, subject: string, html: string): Promise<void> {
    if (!EmailService.isConfigured()) {
      console.warn('[EmailService] SMTP not configured — skipping email to:', to);
      return;
    }
    const transporter = EmailService.getTransporter();
    await transporter.sendMail({
      from: env.SMTP_FROM,
      to,
      subject,
      html,
    });
  }

  // ── Send welcome / subscription confirmation ────────────────────────────────
  static async sendWelcomeEmail(
    to: string,
    name: string | null,
    unsubscribeToken: string,
    siteTitle = 'BusinessFirst',
    siteUrl = env.WEB_URL,
  ): Promise<void> {
    const unsubscribeUrl = `${env.API_URL}/api/v1/newsletter/unsubscribe?token=${unsubscribeToken}`;
    const html = buildWelcomeTemplate(name, unsubscribeUrl, siteTitle, siteUrl);
    await EmailService.sendSingle(to, `Welcome to ${siteTitle} Newsletters!`, html);
  }

  // ── Batched bulk send ───────────────────────────────────────────────────────
  static async sendBulk(
    recipients: Array<{ email: string; token: string; name?: string | null }>,
    subject: string,
    htmlContent: string,
    siteTitle = 'BusinessFirst',
    siteUrl = env.WEB_URL,
  ): Promise<BulkSendResult> {
    const result: BulkSendResult = { sent: 0, failed: 0, errors: [] };

    if (!EmailService.isConfigured()) {
      console.warn('[EmailService] SMTP not configured — bulk send skipped');
      result.failed = recipients.length;
      return result;
    }

    const transporter = EmailService.getTransporter();

    // Split recipients into batches
    const batches: typeof recipients[] = [];
    for (let i = 0; i < recipients.length; i += EmailService.BATCH_SIZE) {
      batches.push(recipients.slice(i, i + EmailService.BATCH_SIZE));
    }

    console.log(`[EmailService] Sending to ${recipients.length} recipients in ${batches.length} batches of ${EmailService.BATCH_SIZE}`);

    for (let batchIdx = 0; batchIdx < batches.length; batchIdx++) {
      const batch = batches[batchIdx]!;

      // Send each email in batch concurrently
      const batchResults = await Promise.allSettled(
        batch.map(async (recipient) => {
          const unsubscribeUrl = `${env.API_URL}/api/v1/newsletter/unsubscribe?token=${recipient.token}`;
          const html = buildEmailTemplate({
            subject,
            htmlContent,
            unsubscribeUrl,
            siteTitle,
            siteUrl,
          });
          await transporter.sendMail({
            from: env.SMTP_FROM,
            to: recipient.email,
            subject,
            html,
          });
          return recipient.email;
        })
      );

      // Tally results
      batchResults.forEach((res, idx) => {
        if (res.status === 'fulfilled') {
          result.sent++;
        } else {
          result.failed++;
          const email = batch[idx]?.email ?? 'unknown';
          result.errors.push({ email, error: res.reason?.message ?? 'Unknown error' });
          console.error(`[EmailService] Failed to send to ${email}:`, res.reason);
        }
      });

      // Delay between batches (except after last batch)
      if (batchIdx < batches.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, EmailService.BATCH_DELAY_MS));
      }

      console.log(`[EmailService] Batch ${batchIdx + 1}/${batches.length} done — sent: ${result.sent}, failed: ${result.failed}`);
    }

    return result;
  }
}

// Re-export template builder for use in service
export { buildEmailTemplate };
