import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./AdminBaseQuery";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    addProducts: builder.mutation({
      query: (formData) => ({
        url: "admin/products/add-products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: "admin/products/all-products",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    updateProductStatus: builder.mutation({
      query: ({ id, listed }) => ({
        url: `admin/products/update-status/${id}`,
        method: "PATCH",
        body: { listed },
      }),
      invalidatesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `admin/products/get-product/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    updateProductById: builder.mutation({
      query: ({ id, productData }) => ({
        url: `admin/products/edit-product/${id}`,
        method: "PUT",
        body: productData,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useUpdateProductStatusMutation,
  useAddProductsMutation,
  useGetProductByIdQuery,
  useUpdateProductByIdMutation,
} = adminApi;
