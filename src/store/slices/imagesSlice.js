import { createSlice } from '@reduxjs/toolkit'

const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    data: []
  },
  reducers: {}
})

export const imagesReducer = imagesSlice.reducer