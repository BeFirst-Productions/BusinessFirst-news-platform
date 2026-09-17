import { NextResponse } from 'next/server';

export const revalidate = 1800; // Cache for 30 minutes

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();

  if (!token) {
    return NextResponse.json(
      { error: 'INSTAGRAM_ACCESS_TOKEN is not configured' },
      { status: 400 }
    );
  }

  try {
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=12&access_token=${token}`;
    const res = await fetch(url, {
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: 'Failed to fetch from Instagram API', details: errorText },
        { status: res.status }
      );
    }

    const data = await res.json();
    const posts = (data?.data || []).map((item: any, i: number) => {
      const dateStr = item.timestamp
        ? new Date(item.timestamp).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        : 'Latest News';

      const firstLine = item.caption
        ? item.caption.split('\n')[0].replace(/^[#@\s]+/, '').trim()
        : `Business First Instagram Post ${i + 1}`;

      const imageUrl =
        item.media_type === 'VIDEO'
          ? item.thumbnail_url || item.media_url
          : item.media_url;

      return {
        id: item.id || `insta-${i + 1}`,
        image: imageUrl || `/Instagram/insta-${(i % 10) + 1}.jpg`,
        title: firstLine || `Business First Instagram Post ${i + 1}`,
        description: item.caption || '',
        dateText: `${dateStr} | Instagram`,
        permalink: item.permalink || 'https://www.instagram.com/businessfirstuae',
      };
    });

    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
