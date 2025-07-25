'use client';

import { useGetMoviesByGenreQuery } from '@/lib/services/tmdbApi';
import ContentCard from './ContentCard';

export default function TrendingSection() {
  const { data, isLoading, error } = useGetMoviesByGenreQuery();

  if (isLoading) return <p>Loading trending content...</p>;
  if (error) return <p>Failed to load trending movies.</p>;

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Trending Movies</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.results?.slice(0, 6).map((movie: any) => (
          <ContentCard
            key={movie.id}
            id={movie.id.toString()}
            title={movie.title}
            description={movie.overview}
            imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            url={`https://www.themoviedb.org/movie/${movie.id}`}
            source="tmdb"
          />
        ))}
      </div>
    </section>
  );
}
