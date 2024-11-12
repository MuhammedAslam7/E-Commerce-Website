import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setCredentials, logOut } from "../../redux/slices/userSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.user.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error && result?.error?.status === 401) {
    const refreshResult = await baseQuery("/refresh-token", api, extraOptions);
    if (refreshResult?.data) {
      // api.dispatch(setCredentials({ ...refreshResult.data }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};
