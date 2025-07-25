import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: { name: string };
}

interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["News"],
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<
      NewsResponse,
      { category: string; page?: number }
    >({
      query: ({ category, page = 1 }) =>
        `/news?category=${encodeURIComponent(category)}&page=${page}`,
      providesTags: (res, err, arg) => [{ type: "News", id: arg.category }],
    }),
  }),
});

export const { useGetTopHeadlinesQuery } = newsApi;
