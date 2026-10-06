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
  slug: string;
  label: string;
  pageType: PageType;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  robots: string;
  extraMeta?: { name: string; content: string }[];
}

export const PRESET_PAGES: PresetPageDef[] = [
  {
    slug: '',
    label: 'Home Page',
    pageType: 'HOME',
    metaTitle: 'Business News UAE & Dubai | Latest Business News | BusinessFirst',
    metaDescription: 'Get the latest UAE and Dubai business news, market updates, company news, finance, economy, investment and expert analysis from BusinessFirst.',
    canonicalUrl: 'https://businessfirstnews.com/',
    robots: 'index, follow',
    extraMeta: [
      {
        name: 'keywords',
        content: 'Latest UAE news, Dubai news, uae news, dubai news, abu dhabi news, latest news uae, gulf news, middle east news,UAE business news, Dubai business news, business news UAE, latest business news,travel news, UAE economy news, Dubai economy news , breaking news, uae weather, uae gold price, dubai events, business news uae, sports news uae, technology news uae, lifestyle uae, entertainment news, world news, travel news, uae visa updates, uae news today,current dubai news,UAE technology news, UAE real estate news, Gulf business updates, business news UAE,Gulf daily news',
      },
    ],
  },
  {
    slug: 'about',
    label: 'About Us',
    pageType: 'CUSTOM',
    metaTitle: 'About Us – BusinessFirst | Middle East Business Journalism',
    metaDescription: 'Learn about BusinessFirst, our editorial mission, leadership team, and premier business journalism coverage across the UAE and GCC region.',
    canonicalUrl: 'https://businessfirstnews.com/about',
    robots: 'index, follow',
    extraMeta: [
      {
        name: 'keywords',
        content: 'About BusinessFirst, UAE news organization, Dubai business media, editorial team, BusinessFirst mission',
      },
    ],
  },
  {
    slug: 'contact',
    label: 'Contact Us',
    pageType: 'CONTACT',
    metaTitle: 'Contact Us – BusinessFirst',
    metaDescription: 'Get in touch with the BusinessFirst editorial team, advertising department, or corporate support in Dubai, UAE.',
    canonicalUrl: 'https://businessfirstnews.com/contact',
    robots: 'index, follow',
    extraMeta: [
      {
        name: 'keywords',
        content: 'Contact BusinessFirst, editorial office Dubai, media inquiries, BusinessFirst support',
      },
    ],
  },
  {
    slug: 'advertise',
    label: 'Advertise With Us',
    pageType: 'CUSTOM',
    metaTitle: 'Advertise With Us – BusinessFirst Media Kit & Partnerships',
    metaDescription: 'Partner with BusinessFirst to reach senior business leaders, investors, and decision-makers across the UAE and Middle East.',
    canonicalUrl: 'https://businessfirstnews.com/advertise',
    robots: 'index, follow',
    extraMeta: [
      {
        name: 'keywords',
        content: 'Advertise with BusinessFirst, media kit, UAE business advertising, sponsored articles Dubai, executive audience reach',
      },
    ],
  },
  {
    slug: 'news',
    label: 'Latest News',
    pageType: 'CUSTOM',
    metaTitle: 'Latest Business News & Breaking Stories – BusinessFirst',
    metaDescription: 'Explore breaking business stories, financial updates, and company news from the UAE and globally.',
    canonicalUrl: 'https://businessfirstnews.com/news',
    robots: 'index, follow',
    extraMeta: [
      {
        name: 'keywords',
        content: 'Latest business news, UAE breaking news, Dubai corporate updates, financial headlines',
      },
    ],
  },
  {
    slug: 'policy/privacy',
    label: 'Privacy Policy',
    pageType: 'POLICY',
    metaTitle: 'Privacy Policy – BusinessFirst',
    metaDescription: 'Read our privacy policy to understand how BusinessFirst collects, uses, and safeguards your personal data.',
    canonicalUrl: 'https://businessfirstnews.com/privacy-policy',
    robots: 'index, nofollow',
  },
  {
    slug: 'policy/terms',
    label: 'Terms of Service',
    pageType: 'POLICY',
    metaTitle: 'Terms of Service – BusinessFirst',
    metaDescription: 'Review the terms and conditions governing the use of the BusinessFirst platform.',
    canonicalUrl: 'https://businessfirstnews.com/terms',
    robots: 'index, nofollow',
  },
  {
    slug: 'policy/cookie',
    label: 'Cookie Policy',
    pageType: 'POLICY',
    metaTitle: 'Cookie Policy – BusinessFirst',
    metaDescription: 'Learn about how BusinessFirst uses cookies and similar tracking technologies to improve your experience.',
    canonicalUrl: 'https://businessfirstnews.com/cookie-policy',
    robots: 'index, nofollow',
  },
  {
    slug: 'policy/copyright',
    label: 'Copyright Policy',
    pageType: 'POLICY',
    metaTitle: 'Copyright & Intellectual Property – BusinessFirst',
    metaDescription: 'Information about copyright, content syndication, and intellectual property rights on BusinessFirst.',
    canonicalUrl: 'https://businessfirstnews.com/copyright-policy',
    robots: 'index, nofollow',
  },
  {
    slug: 'policy/editorial',
    label: 'Editorial Policy',
    pageType: 'POLICY',
    metaTitle: 'Editorial Policy & Guidelines – BusinessFirst',
    metaDescription: 'Discover BusinessFirst editorial standards, guidelines, ethics, and journalistic principles.',
    canonicalUrl: 'https://businessfirstnews.com/editorial-policy',
    robots: 'index, nofollow',
  },
  {
    slug: 'policy/corrections',
    label: 'Corrections Policy',
    pageType: 'POLICY',
    metaTitle: 'Corrections & Clarifications Policy – BusinessFirst',
    metaDescription: 'Learn about how BusinessFirst handles corrections, clarifications, and updates to published stories.',
    canonicalUrl: 'https://businessfirstnews.com/corrections-policy',
    robots: 'index, nofollow',
  },
  {
    slug: 'policy/disclaimer',
    label: 'Disclaimer',
    pageType: 'POLICY',
    metaTitle: 'Disclaimer & Financial Notice – BusinessFirst',
    metaDescription: 'Legal disclaimer and financial information notices for BusinessFirst.',
    canonicalUrl: 'https://businessfirstnews.com/disclaimer',
    robots: 'index, nofollow',
  },
  {
    slug: 'sponsored',
    label: 'Sponsored Contents',
    pageType: 'CUSTOM',
    metaTitle: 'Sponsored Contents – BusinessFirst',
    metaDescription: 'Read the latest sponsored contents and partner articles on BusinessFirst.',
    canonicalUrl: 'https://businessfirstnews.com/sponsored',
    robots: 'index, follow',
  },
  {
    slug: 'uae-news',
    label: 'UAE News',
    pageType: 'CUSTOM',
    metaTitle: 'UAE Business & Economy News – BusinessFirst',
    metaDescription: 'Get the latest business news and updates from the UAE on BusinessFirst.',
    canonicalUrl: 'https://businessfirstnews.com/uae-news',
    robots: 'index, follow',
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
        where: { slug: page.slug },
        create: {
          slug: page.slug,
          label: page.label,
          pageType: page.pageType,
          metaTitle: page.metaTitle,
          metaDescription: page.metaDescription,
          canonicalUrl: page.canonicalUrl || (page.slug ? `https://businessfirstnews.com/${page.slug}` : 'https://businessfirstnews.com/'),
          robots: page.robots,
          twitterCard: 'SUMMARY_LARGE_IMAGE',
          extraMeta: page.extraMeta ? (page.extraMeta as any) : undefined,
          isActive: true,
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
    const { page, limit, search, pageType, tab, isActive } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.PageSeoWhereInput = {};

    if (search) {
      where.OR = [
        { label: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
        { metaTitle: { contains: search, mode: 'insensitive' } },
        { metaDescription: { contains: search, mode: 'insensitive' } },
        { category: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }

    if (tab === 'categories') {
      where.pageType = 'CATEGORY';
    } else if (tab === 'static') {
      where.pageType = { not: 'CATEGORY' };
    } else if (pageType) {
      where.pageType = pageType as PageType;
    }

    if (typeof isActive === 'boolean') where.isActive = isActive;

    const [records, total] = await Promise.all([
      prisma.pageSeo.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ pageType: 'asc' }, { label: 'asc' }],
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
              _count: {
                select: {
                  articles: true,
                },
              },
            },
          },
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
    let record = await prisma.pageSeo.findUnique({
      where: { slug },
      include: {
        category: { select: { id: true, name: true, slug: true } },
      },
    });

    // Fallback: If not found by exact SEO slug, search by category relation or slug variations
    if (!record) {
      const cleanSlug = slug.replace(/^category\//, '');
      record = await prisma.pageSeo.findFirst({
        where: {
          OR: [
            { slug: `category/${cleanSlug}` },
            { slug: cleanSlug },
            { category: { slug: cleanSlug } },
          ],
        },
        include: { category: { select: { id: true, name: true, slug: true } } },
      });
    }

    if (!record || !record.isActive) {
      // Return a sensible default rather than a 404 –
      // the website should never have a missing SEO state.
      return {
        id: null,
        slug,
        label: slug || 'Home',
        pageType: 'CUSTOM' as PageType,
        categoryId: null,
        category: null,
        metaTitle: 'BusinessFirst – Business News & Analysis',
        metaDescription: 'Stay informed with the latest business news from BusinessFirst.',
        canonicalUrl: null,
        ogTitle: null,
        ogDescription: null,
        ogImage: null,
        twitterCard: 'SUMMARY_LARGE_IMAGE',
        twitterTitle: null,
        twitterDescription: null,
        twitterImage: null,
        structuredData: null,
        robots: 'index, follow',
        extraMeta: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
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
    if (data.label !== undefined) updateData.label = data.label;
    // metaTitle / description
    if (data.metaTitle !== undefined) updateData.metaTitle = data.metaTitle;
    if (data.metaDescription !== undefined) updateData.metaDescription = data.metaDescription;
    // canonical
    if (data.canonicalUrl !== undefined) updateData.canonicalUrl = data.canonicalUrl || null;
    // OG
    if (data.ogTitle !== undefined) updateData.ogTitle = data.ogTitle;
    if (data.ogDescription !== undefined) updateData.ogDescription = data.ogDescription;
    if (data.ogImage !== undefined) updateData.ogImage = data.ogImage || null;
    // Twitter
    if (data.twitterCard !== undefined) updateData.twitterCard = data.twitterCard;
    if (data.twitterTitle !== undefined) updateData.twitterTitle = data.twitterTitle;
    if (data.twitterDescription !== undefined) updateData.twitterDescription = data.twitterDescription;
    if (data.twitterImage !== undefined) updateData.twitterImage = data.twitterImage || null;
    // Structured data / robots / extra
    if (data.structuredData !== undefined) updateData.structuredData = (data.structuredData as any) ?? Prisma.JsonNull;
    if (data.robots !== undefined) updateData.robots = data.robots;
    if (data.extraMeta !== undefined) updateData.extraMeta = data.extraMeta ?? Prisma.JsonNull;
    // Active flag
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    return prisma.pageSeo.update({
      where: { id },
      data: updateData,
      include: {
        category: { select: { id: true, name: true, slug: true } },
      },
    });
  }

  // ─────────────────────────────────────────────────────────
  // Seed all active categories and missing presets that don't
  // yet have an SEO record. Also invoked on startup & admin sync.
  // ─────────────────────────────────────────────────────────
  static async seedCategorySeoRecords() {
    let createdCount = 0;
    let updatedCount = 0;

    // 1) First ensure any missing preset static pages exist, and backfill null canonicalUrl/extraMeta
    for (const page of PRESET_PAGES) {
      const existing = await prisma.pageSeo.findUnique({ where: { slug: page.slug } });
      if (!existing) {
        await prisma.pageSeo.create({
          data: {
            slug: page.slug,
            label: page.label,
            pageType: page.pageType,
            metaTitle: page.metaTitle,
            metaDescription: page.metaDescription,
            canonicalUrl: page.canonicalUrl || (page.slug ? `https://businessfirstnews.com/${page.slug}` : 'https://businessfirstnews.com/'),
            robots: page.robots,
            twitterCard: 'SUMMARY_LARGE_IMAGE',
            extraMeta: page.extraMeta ? (page.extraMeta as any) : undefined,
            isActive: true,
          },
        });
        createdCount++;
      } else {
        // Backfill canonicalUrl or extraMeta if previously null/empty
        const updateData: Prisma.PageSeoUpdateInput = {};
        if (!existing.canonicalUrl && page.canonicalUrl) {
          updateData.canonicalUrl = page.canonicalUrl;
        }
        if (!existing.extraMeta && page.extraMeta) {
          updateData.extraMeta = page.extraMeta as any;
        }
        if (Object.keys(updateData).length > 0) {
          await prisma.pageSeo.update({
            where: { id: existing.id },
            data: updateData,
          });
          updatedCount++;
        }
      }
    }

    // 2) Seed category SEO records or backfill null canonicalUrl
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      select: { id: true, name: true, slug: true, description: true },
    });

    for (const cat of categories) {
      const existing = await prisma.pageSeo.findFirst({
        where: {
          OR: [
            { categoryId: cat.id },
            { slug: `category/${cat.slug}` },
          ],
        },
      });

      const defaultCanonical = `https://businessfirstnews.com/${cat.slug}`;
      const defaultKeywords = [
        {
          name: 'keywords',
          content: `${cat.name}, ${cat.name} news, UAE ${cat.name}, latest ${cat.name} updates, BusinessFirst`,
        },
      ];

      if (!existing) {
        await prisma.pageSeo.create({
          data: {
            slug: `category/${cat.slug}`,
            label: `Category: ${cat.name}`,
            pageType: 'CATEGORY' as PageType,
            categoryId: cat.id,
            metaTitle: `${cat.name} – Latest News & Updates | BusinessFirst`,
            metaDescription: cat.description
              ? `${cat.description} Read the latest ${cat.name} news, in-depth analysis, market updates, and insights on BusinessFirst.`
              : `Read the latest ${cat.name} news, in-depth analysis, market updates, and insights from BusinessFirst.`,
            canonicalUrl: defaultCanonical,
            robots: 'index, follow',
            twitterCard: 'SUMMARY_LARGE_IMAGE',
            extraMeta: defaultKeywords,
            isActive: true,
          },
        });
        createdCount++;
      } else {
        // Backfill canonicalUrl, extraMeta, or categoryId if previously null
        const updateData: Prisma.PageSeoUncheckedUpdateInput = {};
        if (!existing.canonicalUrl) {
          updateData.canonicalUrl = defaultCanonical;
        }
        if (!existing.extraMeta) {
          updateData.extraMeta = defaultKeywords as any;
        }
        if (!existing.categoryId) {
          updateData.categoryId = cat.id;
        }
        if (Object.keys(updateData).length > 0) {
          await prisma.pageSeo.update({
            where: { id: existing.id },
            data: updateData,
          });
          updatedCount++;
        }
      }
    }

    return {
      created: createdCount,
      updated: updatedCount,
      message: `SEO records sync completed: ${createdCount} created, ${updatedCount} backfilled.`,
    };
  }
}
