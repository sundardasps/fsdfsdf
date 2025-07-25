import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
}

interface TMDBResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
}

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Movies"],
  endpoints: (builder) => ({
    getMoviesByGenre: builder.query<TMDBResponse, { genre: string; page?: number }>({
      query: ({ genre, page = 1 }) => `/tmdb?genre=${genre}&page=${page}`,
      providesTags: (res, err, arg) => [{ type: "Movies", id: arg.genre }],
    }),
  }),
});

export const { useGetMoviesByGenreQuery } = tmdbApi;
