import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrentWeather } from "./weatherOperations";

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    currentWeather: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentWeather.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const selectWeatherData = state => state.weather;
export const weatherReducer = weatherSlice.reducer;
