// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export interface NewsArticle {
//   title: string;
//   description: string;
//   url: string;
//   urlToImage?: string;
//   publishedAt: string;
//   source: { name: string };
// }

// interface NewsResponse {
//   status: string;
//   totalResults: number;
//   articles: NewsArticle[];
// }

// export const newsApi = createApi({
//   reducerPath: "newsApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
//   tagTypes: ["News"],
//   endpoints: (builder) => ({
//     // newsApi.ts (RTK Query slice)
//     getTopHeadlines: builder.query<
//       NewsResponse,
//       { categories: string[]; page?: number }
//     >({
//       query: ({ categories, page = 1 }) => {
//         const catParam = categories.map(encodeURIComponent).join(",");
//         return `/news?categories=${catParam}&page=${page}`;
//       },
//     }),
//   }),
// });

// export const { useGetTopHeadlinesQuery } = newsApi;

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
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<
      NewsResponse,
      { categories: string[]; page?: number }
    >({
      query: ({ categories, page = 1 }) => {
        const catParam = categories.map(encodeURIComponent).join(",");
        return `/news?categories=${catParam}&page=${page}`;
      },
    }),
  }),
});

export const { useGetTopHeadlinesQuery } = newsApi;
