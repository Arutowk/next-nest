import { configureStore } from "@reduxjs/toolkit";

import { authApiSlice } from "./features/auth/authApiSlice";
import { friendApiSlice } from "./features/friend/friendApiSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [authApiSlice.reducerPath]: authApiSlice.reducer,
      [friendApiSlice.reducerPath]: friendApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApiSlice.middleware,
        friendApiSlice.middleware,
      ),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
