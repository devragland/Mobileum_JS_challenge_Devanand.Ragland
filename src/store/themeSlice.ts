// src/store/themeSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ThemeState {
  themeName: 'light' | 'dark'
}

const initialState: ThemeState = {
  themeName: 'light'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.themeName = action.payload
    }
  }
})

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer
