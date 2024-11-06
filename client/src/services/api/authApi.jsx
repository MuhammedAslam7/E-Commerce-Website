import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../redux/slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/auth`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log("Sending refresh token");
    const refreshResult = await baseQuery("/refresh-token", api, extraOptions);
    if (refreshResult?.data) {
      api.dispatch(setCredentials({ ...refreshResult.data }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const authApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (formData) => ({
        url: "/signup",
        method: "POST",
        body: formData,
      }),
      // transformResponse: (result) => result.data,
    }),

    verifyOTP: builder.mutation({
      query: ({ email, otpValue }) => ({
        url: "/verify-otp",
        method: "POST",
        body: { email, otpValue },
      }),
    }),
    resendOTP: builder.mutation({
      query: ({ email }) => ({
        url: "/resend-otp",
        method: "POST",
        body: { email },
      }),
    }),

    signIn: builder.mutation({
      query: (credentials) => ({
        url: "/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    protected: builder.query({
      query: () => "protected",
    }),
  }),
});

export const {
  useSignUpMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useSignInMutation,
  useProtectedQuery,
} = authApi;

// resendOTP: builder.mutation({
//   query: ({ email }) => ({
//     url: "/resend-otp",
//     method: "POST",
//     body: { email },
//   }),
// }),
