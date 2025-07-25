'use client';

import { useAppSelector } from '@/lib/store';
import { useGetTopHeadlinesQuery } from '@/lib/services/newsApi';
import ContentCard from './ContentCard';
import { useEffect, useState, useRef, useCallback } from 'react';

export default function PersonalizedFeed() {
  const userId = useAppSelector((state) => state.user.id);
  const preferences = useAppSelector((state) =>
    userId ? state.user.profile[userId]?.preferences : []
  );

  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<any[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isFetching, error } = useGetTopHeadlinesQuery({
    categories: preferences,
    page,
  });

  // Append new articles when data changes
  useEffect(() => {
    if (data?.articles?.length) {
      setArticles((prev) => [...prev, ...data.articles]);
    }
  }, [data]);

  // Infinite Scroll Observer
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isFetching) {
        setPage((prev) => prev + 1);
      }
    },
    [isFetching]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '200px',
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [handleObserver]);

  if (!userId) return null;
  if (error) return <p>Failed to load personalized feed.</p>;

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Personalized Feed</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((item, i) => (
          <ContentCard
            key={i}
            id={item.url}
            title={item.title}
            description={item.description}
            imageUrl={item.urlToImage}
            url={item.url}
            source="news"
          />
        ))}
      </div>

      {/* Loader + Observer Trigger */}
      <div ref={observerRef} className="text-center py-4">
        {isFetching && <p>Loading more...</p>}
      </div>
    </section>
  );
}
