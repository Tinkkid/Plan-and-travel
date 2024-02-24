import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://65d9cf4fbcc50200fcdc2511.mockapi.io';

export const fetchCities = createAsyncThunk(
  'cities/fetchCities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios('/api/cities/Cities');
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

