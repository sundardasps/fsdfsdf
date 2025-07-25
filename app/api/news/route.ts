import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoriesParam = searchParams.get("categories") ?? "technology";
  const page = searchParams.get("page") ?? "1";

  const categories = categoriesParam.split(",");

  let allArticles: any[] = [];

  for (const category of categories) {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=20`,
      { headers: { "X-Api-Key": process.env.NEWS_API_KEY! } }
    );

    if (res.ok) {
      const data = await res.json();
      allArticles = allArticles.concat(data.articles || []);
    }
  }

  // Remove duplicate articles by URL if needed
  const uniqueArticles = Array.from(
    new Map(allArticles.map((a) => [a.url, a])).values()
  );

  return NextResponse.json(
    { status: "ok", totalResults: uniqueArticles.length, articles: uniqueArticles },
    { status: 200 }
  );
}
