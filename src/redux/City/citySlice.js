import { createSlice } from '@reduxjs/toolkit';
import {
  addTrip,
  fetchAllTrip,
  fetchCities,
  removeTripById,
} from './cityOperations';

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
        state.allTrips.push(action.payload)
      })
      .addCase(fetchAllTrip.rejected, handleRejected)
      .addCase(fetchAllTrip.pending, handlePending)
      .addCase(fetchAllTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.allTrips = action.payload;
      })
      .addCase(removeTripById.fulfilled, (state, action) => {
        
      const tripId = action.payload; 
  state.allTrips = state.allTrips.filter(trip => trip.id !== tripId);
      })
      
  },
});

export const selectCities = state => state.city.items;
export const selectTrip = state => state.city.responseTrip;
export const selectAlltrips = state => state.city.allTrips;
export const selectLoading = state => state.city.isLoading;
export const cityReducer = citySlice.reducer;
