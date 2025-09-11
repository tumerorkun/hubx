import { BASE_URL } from '@/_constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CategoriesResponse, QuestionsResponse } from './types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => 'getCategories',
    }),
    getQuestions: builder.query<QuestionsResponse, void>({
      query: () => 'getQuestions',
    }),
  }),
});

export const { useGetCategoriesQuery, useGetQuestionsQuery } = api;
