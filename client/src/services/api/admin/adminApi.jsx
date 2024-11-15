import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./AdminBaseQuery";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addProducts: builder.mutation({
      query: (formData) => ({
        url: "admin/products/add-products",
        method: "POST",
        body: formData,
      }),
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: "admin/all-products",
        method: "GET",
        providesTags: ["product"],
      }),
    }),
    updateProductStatus: builder.mutation({
      query: ({ id }) => ({
        url: `admin/products/update-status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useUpdateProductStatusMutation,
  useAddProductsMutation,
} = adminApi;
