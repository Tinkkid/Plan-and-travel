import { createSlice } from '@reduxjs/toolkit';
import { fetchCities } from './cityOperations';

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const citySlice = createSlice({
  name: 'city',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchCities.rejected, handleRejected)
      .addCase(fetchCities.pending, handlePending);
  },
});

export const selectCities = state => state.city.items;
export const cityReducer = citySlice.reducer;
