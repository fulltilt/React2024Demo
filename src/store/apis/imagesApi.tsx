import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const imagesApi = createApi({
  reducerPath: 'images',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://img.cdn4dd.com/s/managed/interview/tps-dogs'
  }),
  endpoints: (builder) => {
    return {
      fetchImages: builder.query<any, void>({
        query: () => {
          return {
            url: '/api.json',
            method: 'GET'
          }
        }
      })
    }
  }
})

export const { useFetchImagesQuery } = imagesApi
export { imagesApi }