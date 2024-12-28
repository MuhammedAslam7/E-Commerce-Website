import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryUser";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "home",
    "Cart",
    "Address",
    "Profile",
    "ProductDetails",
    "MyOrders",
  ],
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
      providesTags: ["ProductDetails"],
    }),
    productsList: builder.query({
      query: ({ page, limit, minPrice, maxPrice, categories, brands }) => ({
        url: `user/product-page?page=${page}&limit=${limit}&minPrice=${minPrice}&maxPrice=${maxPrice}&categories=${categories?.join(",")}&brands=${brands?.join(",")}`,
        method: "GET",
      }),
    }),
    addToCart: builder.mutation({
      query: ({ productId, color }) => ({
        url: "user/add-to-cart",
        method: "POST",
        body: { productId, color },
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
    updateCartQuantity: builder.mutation({
      query: ({ productId, variantId, newQuantity }) => ({
        url: "user/update-quantity",
        method: "PUT",
        body: { productId, variantId, newQuantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    removeCartItem: builder.mutation({
      query: ({ productId, variantId }) => ({
        url: "user/delete-cartitem",
        method: "DELETE",
        body: { productId, variantId },
      }),
      invalidatesTags: ["Cart"],
    }),

    addAddress: builder.mutation({
      query: ({ newAddress }) => ({
        url: `user/add-address`,
        method: "POST",
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
    addOrder: builder.mutation({
      query: ({ addressId, paymentMethod }) => ({
        url: "user/place-order",
        method: "POST",
        body: { addressId, paymentMethod },
      }),
      invalidatesTags: ["ProductDetails", "Cart", "MyOrders"],
    }),
    myOrders: builder.query({
      query: () => ({
        url: "user/my-orders",
        method: "GET",
      }),
      providesTags: ["MyOrders"],
    }),
    OrderById: builder.query({
      query: (id) => ({
        url: `user/order-details/${id}`,
        method: "GET"
      }),
      providesTags: ["MyOrders"]
    }),
    cancelOrder :  builder.mutation({
      query: (id) => ({
        url: "user/cancel-order",
        method: "PATCH",
        body: {id}
      }),
      invalidatesTags: ["MyOrders"]
    }),
    cancelItem: builder.mutation({
      query: ({orderId, itemId}) => ({
        url: "user/cancel-item",
        method: "PATCH",
        body: {orderId, itemId}
      }),
      invalidatesTags: ["MyOrders"]
    }),
    getCategoryBrand: builder.query({
      query: () => ({
        url: "user/category-brand",
        method: "GET",
      }),
    }),
    allProductsForSearch: builder.query({
      query: () => ({
        url: "user/items-for-search",
        method: "GET"
      })
    })
  }),
});

export const {
  useUserHomeQuery,
  useProductDetailsQuery,
  useProductsListQuery,
  useAddToCartMutation,
  useCartProductsQuery,
  useUpdateCartQuantityMutation,
  useRemoveCartItemMutation,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useGetAddressQuery,
  useDeleteAddresssMutation,
  useChangePasswordMutation,
  useProfileDataQuery,
  useUpdateProfileMutation,
  useAddOrderMutation,
  useMyOrdersQuery,
  useOrderByIdQuery,
  useCancelOrderMutation,
  useCancelItemMutation,
  useGetCategoryBrandQuery,
  useAllProductsForSearchQuery

} = userApi;
