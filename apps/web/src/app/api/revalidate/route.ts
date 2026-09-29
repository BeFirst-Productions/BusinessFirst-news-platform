import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * On-Demand Cache Revalidation API Route
 *
 * Usage:
 * POST /api/revalidate?secret=YOUR_SECRET&path=/sitemap.xml
 * POST /api/revalidate?secret=YOUR_SECRET&path=/news/example-article-slug
 * POST /api/revalidate?secret=YOUR_SECRET&tag=articles
 */
export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret') || request.headers.get('x-revalidation-secret');
  const path = searchParams.get('path') || '/sitemap.xml';
  const tag = searchParams.get('tag');

  const configuredSecret = process.env.REVALIDATION_SECRET;

  // Ensure security token is set and verified
  if (!configuredSecret || secret !== configuredSecret) {
    return NextResponse.json(
      { success: false, message: 'Invalid or missing revalidation secret token' },
      { status: 401 }
    );
  }

  try {
    if (tag) {
      revalidateTag(tag);
    }

    if (path) {
      revalidatePath(path);
    }

    return NextResponse.json({
      success: true,
      revalidated: true,
      path,
      tag: tag || null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error during on-demand revalidation',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Allow GET for quick browser/curl testing with secret
export async function GET(request: NextRequest) {
  return POST(request);
}
