import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryUser";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  // tagTypes: ["home"],
  endpoints: (builder) => ({
    userHome: builder.query({
      query: () => ({
        url: "user/home",
        method: "GET",
        // providesTags: ["home"],
      }),
    }),
    // updateUserProfile: builder.mutation({
    //   query: (profileData) => ({
    //     url: "user/profile",
    //     method: "PUT",
    //     body: profileData,
    //   }),
    // }),
  }),
});

export const { useUserHomeQuery, useUpdateUserProfileMutation } = userApi;
