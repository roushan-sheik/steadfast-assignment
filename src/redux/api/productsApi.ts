// services/productsApi.ts
import { config } from "@/constants/config";
import { Product, ProductApiResponse } from "@/types/product/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API service
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseUrl,
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    // Fetch all products with pagination
    getProducts: builder.query<
      ProductApiResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 } = {}) =>
        `/shop/products?page=${page}&limit=${limit}`,
      providesTags: ["Product"],
    }),

    // Fetch single product by ID
    getProductById: builder.query<Product, number>({
      query: (id) => `/shop/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // Fetch product by slug
    getProductBySlug: builder.query<Product, string>({
      query: (slug) => `/shop/products/slug/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Product", id: slug }],
    }),

    // Search products
    searchProducts: builder.query<
      ProductApiResponse,
      { query: string; page?: number }
    >({
      query: ({ query, page = 1 }) =>
        `/shop/products/search?q=${query}&page=${page}`,
      providesTags: ["Product"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductBySlugQuery,
  useSearchProductsQuery,
  useLazyGetProductsQuery,
  useLazySearchProductsQuery,
} = productsApi;
