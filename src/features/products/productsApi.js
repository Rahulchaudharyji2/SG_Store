

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const BASE_URL = (() => {
//   // Configure in .env: VITE_API_URL=https://sg-backend-iota.vercel.app
//   const envUrl = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_API_URL : '';
//   const fallback = 'https://sg-backend-iota.vercel.app';
//   return (envUrl || fallback).replace(/\/+$/, '');
// })();

// export const productsApi = createApi({
//   reducerPath: 'productsApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: BASE_URL,
//     credentials: 'include',
//     prepareHeaders: (headers, { getState }) => {
//       const token = getState()?.auth?.token;
//       if (token) headers.set('authorization', `Bearer ${token}`);
//       return headers;
//     },
//   }),
//   tagTypes: ['Products', 'Product'],
//   endpoints: (builder) => ({
//     // General listing with optional category + search
//     getProducts: builder.query({
//       query: ({ category, q, limit = 50, skip = 0, sort = '-createdAt' } = {}) => {
//         const params = new URLSearchParams();
//         if (category) params.set('category', category);
//         if (q) params.set('q', q);
//         if (limit !== undefined) params.set('limit', String(limit));
//         if (skip !== undefined) params.set('skip', String(skip));
//         if (sort) params.set('sort', sort);
//         return { url: `products?${params.toString()}` };
//       },
//       providesTags: (result) =>
//         result?.products
//           ? [
//               ...result.products.map((p) => ({ type: 'Product', id: p._id })),
//               { type: 'Products', id: 'LIST' },
//             ]
//           : [{ type: 'Products', id: 'LIST' }],
//     }),

//     // Dedicated category endpoint: /products/category/:category
//     getProductsByCategory: builder.query({
//       query: ({ category, q, limit = 50, skip = 0, sort = '-createdAt' }) => {
//         const params = new URLSearchParams();
//         if (q) params.set('q', q);
//         if (limit !== undefined) params.set('limit', String(limit));
//         if (skip !== undefined) params.set('skip', String(skip));
//         if (sort) params.set('sort', sort);
//         return {
//           url: `products/category/${encodeURIComponent(category)}?${params.toString()}`,
//         };
//       },
//       providesTags: (result) =>
//         result?.products
//           ? [
//               ...result.products.map((p) => ({ type: 'Product', id: p._id })),
//               { type: 'Products', id: 'LIST' },
//             ]
//           : [{ type: 'Products', id: 'LIST' }],
//     }),

//     // Single product
//     getProductById: builder.query({
//       query: (id) => `products/${id}`,
//       providesTags: (_res, _err, id) => [{ type: 'Product', id }],
//     }),

//     // Admin: create product
//     createProduct: builder.mutation({
//       query: (body) => ({
//         url: 'products/admin/products',
//         method: 'POST',
//         body,
//       }),
//       invalidatesTags: [{ type: 'Products', id: 'LIST' }],
//     }),

//     // Admin: delete product
//     deleteProduct: builder.mutation({
//       query: (id) => ({
//         url: `products/admin/products/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: (_res, _err, id) => [
//         { type: 'Product', id },
//         { type: 'Products', id: 'LIST' },
//       ],
//     }),
//   }),
// });

// export const {
//   useGetProductsQuery,
//   useGetProductsByCategoryQuery,
//   useGetProductByIdQuery,
//   useCreateProductMutation,
//   useDeleteProductMutation,
// } = productsApi;


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = (() => {
  const envUrl = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_API_URL : '';
  const fallback = 'https://sg-backend-iota.vercel.app';
  return (envUrl || fallback).replace(/\/+$/, '');
})();

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Products', 'Product'],
  endpoints: (builder) => ({
    // EXACT: GET https://sg-backend-iota.vercel.app/products
    getAllProducts: builder.query({
      query: () => 'products',
      providesTags: (result) =>
        result?.products
          ? [
              ...result.products.map((p) => ({ type: 'Product', id: p._id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),

    // Optional: with params (still hits the same base URL + ?params)
    getProducts: builder.query({
      query: ({ category, q, limit = 50, skip = 0, sort = '-createdAt' } = {}) => {
        const params = new URLSearchParams();
        if (category) params.set('category', category);
        if (q) params.set('q', q);
        if (limit !== undefined) params.set('limit', String(limit));
        if (skip !== undefined) params.set('skip', String(skip));
        if (sort) params.set('sort', sort);
        return { url: `products?${params.toString()}` };
      },
      providesTags: (result) =>
        result?.products
          ? [
              ...result.products.map((p) => ({ type: 'Product', id: p._id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),

    getProductsByCategory: builder.query({
      query: ({ category, q, limit = 50, skip = 0, sort = '-createdAt' }) => {
        const params = new URLSearchParams();
        if (q) params.set('q', q);
        if (limit !== undefined) params.set('limit', String(limit));
        if (skip !== undefined) params.set('skip', String(skip));
        if (sort) params.set('sort', sort);
        return {
          url: `products/category/${encodeURIComponent(category)}?${params.toString()}`,
        };
      },
      providesTags: (result) =>
        result?.products
          ? [
              ...result.products.map((p) => ({ type: 'Product', id: p._id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),

    getProductById: builder.query({
      query: (id) => `products/${id}`,
      providesTags: (_res, _err, id) => [{ type: 'Product', id }],
    }),

    createProduct: builder.mutation({
      query: (body) => ({
        url: 'products/admin/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/admin/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, id) => [
        { type: 'Product', id },
        { type: 'Products', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetAllProductsQuery,        // <-- new hook
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} = productsApi;