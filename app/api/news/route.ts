import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") ?? "technology";
  const page = searchParams.get("page") ?? "1";

  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=20`,
    {
      headers: {
        "X-Api-Key": process.env.NEWS_API_KEY!, // keep this secret
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
