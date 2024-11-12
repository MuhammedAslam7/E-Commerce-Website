import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../../services/api/authApi";
import userReducer from "../slices/userSlice";
import { userApi } from "@/services/api/userApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    // [userApi.reducerPath]: userApi.reducer,
    auth: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
  // .concat(userApi.middleware),
});
