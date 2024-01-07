// src/store/smartphonesSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Smartphone, API } from '../services/Api'
import { RootState } from './store'

/**
 * State structure for managing smartphones data.
 */
interface SmartphonesState {
  smartphones: Smartphone[]
  searchTerm: string
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  addStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: SmartphonesState = {
  smartphones: [],
  searchTerm: '',
  status: 'idle',
  addStatus: 'idle',
  error: null
}

/**
 * Async thunk for fetching smartphones from the API.
 */
export const fetchSmartphones = createAsyncThunk(
  'smartphones/fetchSmartphones',
  async () => {
    const response = await API.getAll()
    return response
  }
)

/**
 * Async thunk for adding a new smartphone. This thunk includes additional logic
 * to determine the new ID based on the last smartphone's ID in the state.
 */
export const addSmartphone = createAsyncThunk(
  'smartphones/addSmartphone',
  async (
    {
      name,
      brand,
      image,
      description
    }: { name: string; brand: string; image: string; description: string },
    thunkAPI
  ) => {
    try {
      const state = thunkAPI.getState() as RootState
      const lastId =
        state.smartphones.smartphones.length > 0
          ? state.smartphones.smartphones[
              state.smartphones.smartphones.length - 1
            ].id
          : 0

      await API.add(name, brand, image, description)
      return { id: lastId + 1, name, brand, image, description }
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to add smartphone')
    }
  }
)

const smartphonesSlice = createSlice({
  name: 'smartphones',
  initialState,
  reducers: {
    /**
     * Reducer to set the search term for filtering smartphones.
     */
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSmartphones.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchSmartphones.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.smartphones = action.payload
      })
      .addCase(fetchSmartphones.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
          ? (action.payload as string)
          : action.error.message || 'Failed to fetch smartphones'
      })
      .addCase(addSmartphone.pending, state => {
        state.addStatus = 'loading'
      })
      .addCase(addSmartphone.fulfilled, (state, action) => {
        state.addStatus = 'succeeded'
        alert('Smart Phone Added Successfully')
        state.smartphones.push(action.payload as any)
      })
      .addCase(addSmartphone.rejected, (state, action) => {
        state.addStatus = 'failed'
        state.error = action.payload
          ? (action.payload as string)
          : action.error.message || 'Failed to add smartphone'
      })
  }
})

export const { setSearchTerm } = smartphonesSlice.actions

export default smartphonesSlice.reducer
