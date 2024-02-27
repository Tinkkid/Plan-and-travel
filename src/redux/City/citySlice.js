import { createSlice } from '@reduxjs/toolkit';
import { addTrip, fetchAllTrip, fetchCities } from './cityOperations';

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
    responseTrip: [],
    allTrips:[],
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchCities.rejected, handleRejected)
      .addCase(fetchCities.pending, handlePending)
      .addCase(addTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.responseTrip = action.payload;
      })
      .addCase(fetchAllTrip.rejected, handleRejected)
      .addCase(fetchAllTrip.pending, handlePending)
      .addCase(fetchAllTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.allTrips = action.payload;
      });
  },
});

export const selectCities = state => state.city.items;
export const selectTrip = state => state.city.responseTrip;
export const selectAlltrips = state => state.city.allTrips;
export const cityReducer = citySlice.reducer;
