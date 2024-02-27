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

export const addTrip = createAsyncThunk(
  'cities/addTrip',
  async (requestBody, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/cities/trip', requestBody);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAllTrip = createAsyncThunk(
  'cities/fetchAllTrip',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios('/api/cities/trip');
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
