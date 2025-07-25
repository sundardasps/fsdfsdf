import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../reducers";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { newsApi } from "../services/newsApi";
import { tmdbApi } from "../services/tmdbApi";
import { socialApi } from "../services/socialApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Add other slices if needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(
        newsApi.middleware,
        tmdbApi.middleware,
        socialApi.middleware
      ),
  });

// This is the missing export 👇
export const persistor = (store: ReturnType<typeof makeStore>) =>
  persistStore(store);

// Types
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;

// Hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
