// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const categoriesParam = searchParams.get("categories") ?? "technology";
//   const page = searchParams.get("page") ?? "1";

//   const categories = categoriesParam.split(",");

//   let allArticles: any[] = [];

//   for (const category of categories) {
//     const res = await fetch(
//       `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=20`,
//       { headers: { "X-Api-Key": process.env.NEWS_API_KEY! } }
//     );

//     if (res.ok) {
//       const data = await res.json();
//       allArticles = allArticles.concat(data.articles || []);
//     }
//   }

//   // Remove duplicate articles by URL if needed
//   const uniqueArticles = Array.from(
//     new Map(allArticles.map((a) => [a.url, a])).values()
//   );

//   return NextResponse.json(
//     { status: "ok", totalResults: uniqueArticles.length, articles: uniqueArticles },
//     { status: 200 }
//   );
// }

import type { NextApiRequest, NextApiResponse } from 'next';

const NEWS_API_KEY = process.env.NEWS_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { categories = '', page = '1' } = req.query;

  if (!categories) {
    return res.status(400).json({ status: 'error', message: 'Missing categories' });
  }

  const categoryList = Array.isArray(categories) ? categories.join(',') : categories;

  const firstCategory = categoryList.split(',')[0];

  const url = `https://newsapi.org/v2/top-headlines?country=in&category=${encodeURIComponent(
    firstCategory
  )}&page=${page}&apiKey=${NEWS_API_KEY}`;

  try {
    console.log('Calling News API with:', url);
    const response = await fetch(url);
    const data = await response.json();

    console.log('News API response:', data);

    if (data.status !== 'ok') {
      return res.status(500).json({ status: 'error', message: data.message || 'News API error' });
    }

    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
}
