import { configureStore } from "@reduxjs/toolkit";

import { authApiSlice } from "./features/auth/authApiSlice";
import { friendApiSlice } from "./features/friend/friendApi";
import { msgApiSlice } from "./features/msg/msgApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      // 添加普通的 Slice

      // 添加 RTK Query 的 API Reducer
      [authApiSlice.reducerPath]: authApiSlice.reducer,
      [friendApiSlice.reducerPath]: friendApiSlice.reducer,
      [msgApiSlice.reducerPath]: msgApiSlice.reducer,
    },
    // 必须添加中间件以启用缓存和失效功能
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApiSlice.middleware,
        friendApiSlice.middleware,
        msgApiSlice.middleware,
      ),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
