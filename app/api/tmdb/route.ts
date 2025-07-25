import { NextResponse } from "next/server";

// simple map – you can make it smarter
const genreMap: Record<string, number> = {
  action: 28,
  comedy: 35,
  drama: 18,
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const genre = searchParams.get("genre") ?? "action";
  const page = searchParams.get("page") ?? "1";
  const genreId = genreMap[genre.toLowerCase()] ?? 28;

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=${page}&api_key=${process.env.TMDB_API_KEY}`,
    { next: { revalidate: 60 } } // optional caching hint
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
