'use client';

import { useAppSelector } from '@/lib/store';
import ContentCard from './ContentCard';

export default function FavoritesSection() {
  const favorites = useAppSelector((state) => state.userFavorites.favorites); // Create this slice
  if (!favorites.length) return null;

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Your Favorites</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {favorites?.map((fav) => (
          <ContentCard
            key={fav.id}
            id={fav.id}
            title={fav.title}
            description={fav.description}
            imageUrl={fav.imageUrl}
            url={fav.url}
            source={fav.source}
            isFavorite
            onToggleFavorite={() => {
              // Dispatch removeFavorite if needed
            }}
          />
        ))}
      </div>
    </section>
  );
}
