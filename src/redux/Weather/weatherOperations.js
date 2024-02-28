import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY_WEATHER;
const API_URL = import.meta.env.VITE_API_WEATHER_URL;
export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchCurrentWeather',
  async (city, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}${city}?key=${API_KEY}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
