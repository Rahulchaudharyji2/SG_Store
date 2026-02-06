import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/admin/login',
        method: 'POST',
        body,
      }),
    }),
    signupAdmin: builder.mutation({
      query: (body) => ({
        url: '/admin/signup',
        method: 'POST',
        body,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: '/admin/profile',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupAdminMutation, useGetProfileQuery } = authApi;