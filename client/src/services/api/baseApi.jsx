import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userlogOut } from "../../redux/slices/userSlice";
import { adminlogout } from "@/redux/slices/adminSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const userRole = getState()?.user?.role;
    const adminRole = getState()?.admin?.role;

    let token;
    if (userRole === "user") {
      token = localStorage.getItem("userToken");
    } else if (adminRole === "admin") {
      token = localStorage.getItem("adminToken");
    }

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log("result", result);
  if (result?.error && result?.error?.status === 401) {
    const role = api.getState()?.user?.role || api.getState()?.admin?.role;
    const refreshResult = await baseQuery(
      "/auth/refresh-token",
      api,
      extraOptions
    );

    console.log("refresh", refreshResult);
    if (refreshResult?.data) {
      const { accessToken } = refreshResult.data;
      if (role === "user") {
        localStorage.setItem("userToken", accessToken);
      } else if (role === "admin") {
        localStorage.setItem("adminToken", accessToken);
      }

      result = await baseQuery(args, api, extraOptions);
    } else {
      if (role == "user") {
        api.dispatch(userlogOut());
      } else if (role == "admin") {
        api.dispatch(adminlogout());
      }
    }
  }

  return result;
};
