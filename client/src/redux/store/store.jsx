import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../../services/api/authApi";
import userReducer from "../slices/userSlice";
import { userApi } from "@/services/api/userApi";
import adminReducer from "../slices/adminSlice";
import { adminApi } from "@/services/api/adminApi";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["user", "admin"],
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  user: userReducer,
  admin: adminReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(authApi.middleware)
      .concat(userApi.middleware),
});

export const persistor = persistStore(store);
