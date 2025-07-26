import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
}

export interface TMDBResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
}

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getMoviesByGenre: builder.query<
      TMDBResponse,
      { categories: number[]; page?: number }
    >({
      query: ({ categories, page = 1 }) => {
        const genreParam = categories.join(","); // numbers -> no need to encode
        return `/tmdb?categories=${genreParam}&page=${page}`;
      },
    }),
  }),
});

export const { useGetMoviesByGenreQuery } = tmdbApi;
