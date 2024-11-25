import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./AdminBaseQuery";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Product", "Category", "Users", "Brand"],
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
    addCategories: builder.mutation({
      query: ({ name, description }) => ({
        url: "admin/category/add-category",
        method: "POST",
        body: { name, description },
      }),
      invalidatesTags: ["Category"],
    }),
    getAllCategories: builder.query({
      query: () => ({
        url: "admin/category/all-categories",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    updateCategoryStatus: builder.mutation({
      query: ({ id, listed }) => ({
        url: `admin/category/update-status/${id}`,
        method: "PATCH",
        body: { listed },
      }),
      invalidatesTags: ["Category"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "admin/users/all-users",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    updateUserStatus: builder.mutation({
      query: ({ id, active }) => ({
        url: `admin/users/update-status/${id}`,
        method: "PATCH",
        body: { active },
      }),
      invalidatesTags: ["Users"],
    }),
    addBrands: builder.mutation({
      query: ({ name, description }) => ({
        url: "admin/brands/add-brand",
        method: "POST",
        body: { name, description },
      }),
      invalidatesTags: ["Brand"],
    }),
    getAllBrands: builder.query({
      query: () => ({
        url: "admin/brands/all-brands",
        method: "GET",
      }),
      providesTags: ["Brands"],
    }),
    updateBrandStatus: builder.mutation({
      query: ({ id, listed }) => ({
        url: `admin/brands/update-status/${id}`,
        method: "PATCH",
        body: { listed },
      }),
      invalidatesTags: ["Brands"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useUpdateProductStatusMutation,
  useAddProductsMutation,
  useGetProductByIdQuery,
  useUpdateProductByIdMutation,
  useAddCategoriesMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryStatusMutation,
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
  useAddBrandsMutation,
  useGetAllBrandsQuery,
  useUpdateBrandStatusMutation,
} = adminApi;
