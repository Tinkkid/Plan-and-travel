import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_TRIP_URL;

export const fetchCities = createAsyncThunk(
  'cities/fetchCities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(`${API_URL}/Cities`);
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
      const response = await axios.post(`${API_URL}/trip`, requestBody);
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
      const response = await axios(`${API_URL}/trip`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeTripById = createAsyncThunk(
  'cities/removeTripById',
  async (tripId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/trip/${tripId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);