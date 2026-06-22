import { prisma } from '../../config/database';
import { NotFoundError } from '../../shared/errors/AppError';
import {
  UpdatePageSeoInput,
  PageSeoQueryInput,
} from './seo.validation';
import { Prisma, PageType } from '../../generated/prisma';

// ─────────────────────────────────────────────────────────────
// Preset page definitions
// These are the ONLY pages that this module manages.
// Adding new page types must be done here (in code), not via the
// admin UI.  The admin panel can only EDIT the SEO values.
// ─────────────────────────────────────────────────────────────

export interface PresetPageDef {
  slug:            string;
  label:           string;
  pageType:        PageType;
  metaTitle:       string;
  metaDescription: string;
  robots:          string;
}

export const PRESET_PAGES: PresetPageDef[] = [
  {
    slug:            '',
    label:           'Home Page',
    pageType:        'HOME',
    metaTitle:       'BusinessFirst – Latest Business News & Analysis',
    metaDescription: 'Stay informed with the latest business news, market analysis, and expert insights from BusinessFirst.',
    robots:          'index, follow',
  },
  {
    slug:            'contact',
    label:           'Contact Page',
    pageType:        'CONTACT',
    metaTitle:       'Contact Us – BusinessFirst',
    metaDescription: 'Get in touch with the BusinessFirst team for inquiries, feedback, or support.',
    robots:          'index, follow',
  },
  {
    slug:            'policy/privacy',
    label:           'Privacy Policy',
    pageType:        'POLICY',
    metaTitle:       'Privacy Policy – BusinessFirst',
    metaDescription: 'Read our privacy policy to understand how we collect, use, and protect your personal data.',
    robots:          'index, nofollow',
  },
  {
    slug:            'policy/terms',
    label:           'Terms of Service',
    pageType:        'POLICY',
    metaTitle:       'Terms of Service – BusinessFirst',
    metaDescription: 'Review the terms and conditions governing the use of the BusinessFirst platform.',
    robots:          'index, nofollow',
  },
  {
    slug:            'policy/cookie',
    label:           'Cookie Policy',
    pageType:        'POLICY',
    metaTitle:       'Cookie Policy – BusinessFirst',
    metaDescription: 'Learn about how BusinessFirst uses cookies and similar tracking technologies.',
    robots:          'index, nofollow',
  },
];

export class SeoService {
  // ─────────────────────────────────────────────────────────
  // STARTUP: ensure all preset pages + all category pages
  // have an SEO record.  Safe to call repeatedly – uses
  // upsert / createMany with skipDuplicates.
  // ─────────────────────────────────────────────────────────
  static async ensurePresetsExist(): Promise<void> {
    // 1) Preset static pages
    for (const page of PRESET_PAGES) {
      await prisma.pageSeo.upsert({
        where:  { slug: page.slug },
        create: {
          slug:            page.slug,
          label:           page.label,
          pageType:        page.pageType,
          metaTitle:       page.metaTitle,
          metaDescription: page.metaDescription,
          robots:          page.robots,
          twitterCard:     'SUMMARY_LARGE_IMAGE',
          isActive:        true,
        },
        update: {}, // Never overwrite – admin edits win
      });
    }

    // 2) One SEO record per active category
    await SeoService.seedCategorySeoRecords();
  }

  // ─────────────────────────────────────────────────────────
  // List  (admin panel – paginated + filtered)
  // ─────────────────────────────────────────────────────────
  static async getAllPageSeo(query: PageSeoQueryInput) {
    const { page, limit, search, pageType, isActive } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.PageSeoWhereInput = {};

    if (search) {
      where.OR = [
        { label:           { contains: search, mode: 'insensitive' } },
        { slug:            { contains: search, mode: 'insensitive' } },
        { metaTitle:       { contains: search, mode: 'insensitive' } },
        { metaDescription: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (pageType) where.pageType = pageType as PageType;
    if (typeof isActive === 'boolean') where.isActive = isActive;

    const [records, total] = await Promise.all([
      prisma.pageSeo.findMany({
        where,
        skip,
        take:     limit,
        orderBy: [{ pageType: 'asc' }, { label: 'asc' }],
        include: {
          category: { select: { id: true, name: true, slug: true } },
        },
      }),
      prisma.pageSeo.count({ where }),
    ]);

    return { records, total };
  }

  // ─────────────────────────────────────────────────────────
  // Get by slug  (public – web front-end)
  // Falls back to a generic default if no record exists.
  // ─────────────────────────────────────────────────────────
  static async getPageSeoBySlug(slug: string) {
    const record = await prisma.pageSeo.findUnique({
      where: { slug },
      include: {
        category: { select: { id: true, name: true, slug: true } },
      },
    });

    if (!record || !record.isActive) {
      // Return a sensible default rather than a 404 –
      // the website should never have a missing SEO state.
      return {
        id:             null,
        slug,
        label:          slug || 'Home',
        pageType:       'CUSTOM' as PageType,
        categoryId:     null,
        category:       null,
        metaTitle:      'BusinessFirst – Business News & Analysis',
        metaDescription:'Stay informed with the latest business news from BusinessFirst.',
        canonicalUrl:   null,
        ogTitle:        null,
        ogDescription:  null,
        ogImage:        null,
        twitterCard:    'SUMMARY_LARGE_IMAGE',
        twitterTitle:   null,
        twitterDescription: null,
        twitterImage:   null,
        structuredData: null,
        robots:         'index, follow',
        extraMeta:      null,
        isActive:       true,
        createdAt:      new Date(),
        updatedAt:      new Date(),
      };
    }

    return record;
  }

  // ─────────────────────────────────────────────────────────
  // Get by ID  (admin panel)
  // ─────────────────────────────────────────────────────────
  static async getPageSeoById(id: string) {
    const record = await prisma.pageSeo.findUnique({
      where: { id },
      include: {
        category: { select: { id: true, name: true, slug: true } },
      },
    });

    if (!record) throw new NotFoundError('SEO record not found');
    return record;
  }

  // ─────────────────────────────────────────────────────────
  // Update  (only admin-facing operation besides read)
  // Slug and pageType are immutable via this endpoint –
  // they are set at seed time and can only change via code.
  // ─────────────────────────────────────────────────────────
  static async updatePageSeo(id: string, data: UpdatePageSeoInput) {
    const existing = await prisma.pageSeo.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError('SEO record not found');

    const updateData: Prisma.PageSeoUpdateInput = {};

    // label allowed to change (admin convenience)
    if (data.label             !== undefined) updateData.label             = data.label;
    // metaTitle / description
    if (data.metaTitle         !== undefined) updateData.metaTitle         = data.metaTitle;
    if (data.metaDescription   !== undefined) updateData.metaDescription   = data.metaDescription;
    // canonical
    if (data.canonicalUrl      !== undefined) updateData.canonicalUrl      = data.canonicalUrl || null;
    // OG
    if (data.ogTitle           !== undefined) updateData.ogTitle           = data.ogTitle;
    if (data.ogDescription     !== undefined) updateData.ogDescription     = data.ogDescription;
    if (data.ogImage           !== undefined) updateData.ogImage           = data.ogImage || null;
    // Twitter
    if (data.twitterCard       !== undefined) updateData.twitterCard       = data.twitterCard;
    if (data.twitterTitle      !== undefined) updateData.twitterTitle      = data.twitterTitle;
    if (data.twitterDescription!== undefined) updateData.twitterDescription= data.twitterDescription;
    if (data.twitterImage      !== undefined) updateData.twitterImage      = data.twitterImage || null;
    // Structured data / robots / extra
    if (data.structuredData    !== undefined) updateData.structuredData    = (data.structuredData as any) ?? Prisma.JsonNull;
    if (data.robots            !== undefined) updateData.robots            = data.robots;
    if (data.extraMeta         !== undefined) updateData.extraMeta         = data.extraMeta    ?? Prisma.JsonNull;
    // Active flag
    if (data.isActive          !== undefined) updateData.isActive          = data.isActive;

    return prisma.pageSeo.update({
      where: { id },
      data:  updateData,
      include: {
        category: { select: { id: true, name: true, slug: true } },
      },
    });
  }

  // ─────────────────────────────────────────────────────────
  // Seed all active categories that don't yet have an SEO
  // record.  Also invoked on startup via ensurePresetsExist.
  // ─────────────────────────────────────────────────────────
  static async seedCategorySeoRecords() {
    const categories = await prisma.category.findMany({
      where:  { isActive: true },
      select: { id: true, name: true, slug: true },
    });

    const existingCategoryIds = new Set(
      (
        await prisma.pageSeo.findMany({
          where:  { pageType: 'CATEGORY', categoryId: { not: null } },
          select: { categoryId: true },
        })
      ).map((r) => r.categoryId)
    );

    const toCreate = categories.filter((cat) => !existingCategoryIds.has(cat.id));
    if (toCreate.length === 0) {
      return { created: 0, message: 'All categories already have SEO records' };
    }

    await prisma.pageSeo.createMany({
      data: toCreate.map((cat) => ({
        slug:            `category/${cat.slug}`,
        label:           `Category: ${cat.name}`,
        pageType:        'CATEGORY' as PageType,
        categoryId:      cat.id,
        metaTitle:       `${cat.name} – Latest Articles | BusinessFirst`,
        metaDescription: `Browse the latest articles in the ${cat.name} category on BusinessFirst.`,
        robots:          'index, follow',
        twitterCard:     'SUMMARY_LARGE_IMAGE',
        isActive:        true,
      })),
      skipDuplicates: true,
    });

    return { created: toCreate.length, message: `${toCreate.length} category SEO records created` };
  }
}
