import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { imagesReducer } from './slices/imagesSlice';
import { imagesApi } from './apis/imagesApi';

export const store = configureStore({
  reducer: {
    images: imagesReducer,
    [imagesApi.reducerPath]: imagesApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(imagesApi.middleware)
  }
})

setupListeners(store.dispatch)

export { useFetchImagesQuery } from './apis/imagesApi'