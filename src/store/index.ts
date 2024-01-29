import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { imagesReducer } from "./slices/imagesSlice";
import { imagesApi } from "./apis/imagesApi";

const rootReducer = combineReducers({
  images: imagesReducer,
  [imagesApi.reducerPath]: imagesApi.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: RootState) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(imagesApi.middleware);
    },
  });

setupListeners(setupStore({} as any).dispatch);

export { useFetchImagesQuery } from "./apis/imagesApi";
export type AppStore = ReturnType<typeof setupStore>;
