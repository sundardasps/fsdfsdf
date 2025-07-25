// lib/reducers/userFavoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteItem {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  url: string;
  source: 'news' | 'tmdb' | 'spotify' | 'social';
}

interface FavoritesState {
  favorites: FavoriteItem[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const slice = createSlice({
  name: 'userFavorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<FavoriteItem>) {
      if (!state.favorites.some((item) => item.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = slice.actions;
export default slice.reducer;
