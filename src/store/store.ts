// src/store/store.ts

import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './themeSlice'
import smartphonesReducer from './smartphoneSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    smartphones: smartphonesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
