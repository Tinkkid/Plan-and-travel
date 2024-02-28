import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const API_KEY = import.meta.env.VITE_API_KEY_WEATHER;
const API_KEY = 'UXCQQCQAN6GTHLZE365XSJ5AP';
const API_URL = import.meta.env.VITE_API_WEATHER_URL;

export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchCurrentWeather',
  async (city, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}${city}/today?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`,
        { mode: 'cors' }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchWeatherForecast = createAsyncThunk(
  'weather/fetchWeatherForecast',
  async ({ city, startDate, endDate }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`,
        { mode: 'cors' }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

