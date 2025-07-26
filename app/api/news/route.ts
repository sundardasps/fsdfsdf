// app/api/news/route.ts

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categories = searchParams.get('categories');
  const page = searchParams.get('page') ?? '1';

  if (!categories) {
    return NextResponse.json(
      { status: 'error', message: 'Missing categories' },
      { status: 400 }
    );
  }

  const firstCategory = categories.split(',')[0];

  const url = `https://newsapi.org/v2/top-headlines?category=${firstCategory}&page=${page}&apiKey=${process.env.NEWS_API_KEY}`;

  try {
    const response = await fetch(url, { cache: 'no-store' });
    const data = await response.json();

    if (data.status !== 'ok') {
      return NextResponse.json(
        { status: 'error', message: data.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ status: 'error', message: e.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
