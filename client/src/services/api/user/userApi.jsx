import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryUser";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["home", "Cart", "Address", "Profile"],
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
    productsList: builder.query({
      query: () => ({
        url: "user/product-page",
        method: "GET",
      }),
    }),
    addToCart: builder.mutation({
      query: ({ productId, userId }) => ({
        url: "user/add-to-cart",
        method: "POST",
        body: { productId, userId },
      }),
      invalidatesTags: ["Cart"],
    }),
    cartProducts: builder.query({
      query: (userId) => ({
        url: `user/cart?userId=${userId}`,
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
    addAddress: builder.mutation({
      query: ({ newAddress, userId }) => ({
        url: `user/add-address`,
        method: "POST",
        params: { userId },
        body: { newAddress },
      }),
      invalidatesTags: ["Address"],
    }),
    getAddress: builder.query({
      query: () => ({
        url: `user/address`,
        method: "GET",
      }),
      providesTags: ["Address"],
    }),
    updateAddress: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: "user/update-address",
        method: "PATCH",
        body: { id, updatedData },
      }),
      invalidatesTags: ["Address"],
    }),
    deleteAddresss: builder.mutation({
      query: (id) => ({
        url: "user/delete-address",
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Address"],
    }),
    changePassword: builder.mutation({
      query: ({ password, newPassword }) => ({
        url: "user/change-password",
        method: "POST",
        body: { password, newPassword },
      }),
    }),
    profileData: builder.query({
      query: () => ({
        url: "user/profile-details",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "user/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useUserHomeQuery,
  useProductDetailsQuery,
  useProductsListQuery,
  useAddToCartMutation,
  useCartProductsQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useGetAddressQuery,
  useDeleteAddresssMutation,
  useChangePasswordMutation,
  useProfileDataQuery,
  useUpdateProfileMutation,
} = userApi;
