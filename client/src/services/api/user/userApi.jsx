import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryUser";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["home"],
  endpoints: (builder) => ({
    userHome: builder.query({
      query: () => ({
        url: "user/home",
        method: "GET",
        providesTags: ["home"],
      }),
    }),
    ProductDetails: builder.query({
      query: (id) => ({
        url: `user/product-details/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useUserHomeQuery, useProductDetailsQuery } = userApi;
