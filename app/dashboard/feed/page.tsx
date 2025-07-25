// app/dashboard/feed/page.tsx
"use client";

import { useAppSelector } from "@/lib/store";
import { useEffect, useState, useRef, useCallback } from "react";
import ContentCard from "@/components/ContentCard";
import { useGetTopHeadlinesQuery } from "@/lib/services/newsApi";

export default function PersonalizedFeed() {
  const userId = useAppSelector((s) => s.user.id);
  const preferences = useAppSelector((s) =>
    userId ? s.user.profile[userId]?.preferences : []
  ) as string[] | undefined;

  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<any[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const shouldSkip = !userId || !preferences || preferences.length === 0;

  const { data, isLoading, isFetching, error } = useGetTopHeadlinesQuery(
    { categories: preferences ?? [], page },
    { skip: shouldSkip }
  );

  useEffect(() => {
    if (!data?.articles?.length) return;

    setArticles((prev) => {
      const existingUrls = new Set(prev.map((a) => a.url));
      const newArticles = data.articles.filter((a) => !existingUrls.has(a.url));
      return [...prev, ...newArticles];
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

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, [handleObserver]);
  const totalResults = data?.totalResults ?? Infinity;
  useEffect(() => {
    if (articles.length >= totalResults) {
      // Stop observing if all articles fetched
      if (observerRef.current) observerRef.current.remove();
    }
  }, [articles, totalResults]);

  if (!userId) return null;
  if (error) return <p>Failed to load personalized feed.</p>;

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Personalized Feed</h2>

      {isLoading && !articles.length && <p>Loading…</p>}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((item) => (
          <ContentCard
            key={item.url}
            id={item.url}
            title={item.title}
            description={item.description}
            imageUrl={item.urlToImage}
            url={item.url}
            source="news"
          />
        ))}
      </div>

      <div ref={observerRef} className="text-center py-4">
        {isFetching && <p>Loading more...</p>}
      </div>
    </section>
  );
}
