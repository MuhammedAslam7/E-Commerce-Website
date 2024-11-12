import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseApi";

// export const adminApi = createApi({
//     baseQuery: baseQueryWithReauth,
//     endpoints: (builder) => ({
//       getAllUsers: builder.query({
//         query: () => ({
//           url: "admin/users",
//           method: "GET",
//         }),
//       }),
//       deleteUser: builder.mutation({
//         query: (userId) => ({
//           url: `admin/users/${userId}`,
//           method: "DELETE",
//         }),
//       }),
//     }),
//   });

//   export const { useGetAllUsersQuery, useDeleteUserMutation } = adminApi;
