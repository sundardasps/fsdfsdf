"use client";

import { useAppSelector } from "@/lib/store";
import { useEffect, useState, useRef, useCallback } from "react";
import ContentCard from "@/components/ContentCard";
import { useGetMoviesByGenreQuery } from "@/lib/services/tmdbApi";

export default function RecommendationFeed() {
  const userId = useAppSelector((s) => s.user.id);
  const preferences = useAppSelector((s) =>
    userId ? s.user.profile[userId]?.moviePreferences : []
  ) as number[] | undefined;

  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<any[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const shouldSkip = !userId || !preferences || preferences.length === 0;

  const { data, isLoading, isFetching, error } = useGetMoviesByGenreQuery(
    { categories: preferences ?? [], page },
    { skip: shouldSkip }
  );

  useEffect(() => {
    if (!data?.results?.length) return;

    setMovies((prev) => {
      const existingIds = new Set(prev.map((m) => m.id));
      const newMovies = data.results.filter((m) => !existingIds.has(m.id));
      return [...prev, ...newMovies];
    });
  }, [data, page]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && !isFetching && !isLoading) {
        setPage((prev) => prev + 1);
      }
    },
    [isFetching, isLoading]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "200px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    const target = observerRef.current;

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, [handleObserver]);

  const totalPages = data?.total_pages ?? Infinity;

  useEffect(() => {
    if (page >= totalPages) {
      if (observerRef.current) observerRef.current.remove();
    }
  }, [page, totalPages]);

  if (!userId) return null;
  if (error) return <p>Failed to load personalized feed.</p>;

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">
        Personalized Movie Recommendations
      </h2>

      {isLoading && !movies.length && <p>Loading…</p>}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {movies.map((item) => (
          <ContentCard
            key={item.id}
            id={item.id.toString()}
            title={item.title}
            description={item.overview}
            imageUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            url={`https://www.themoviedb.org/movie/${item.id}`}
            source="tmdb"
          />
        ))}
      </div>

      <div ref={observerRef} className="text-center py-4">
        {isFetching && <p>Loading more...</p>}
      </div>
    </section>
  );
}
