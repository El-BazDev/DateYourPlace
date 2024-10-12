import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLocationInfo = createAsyncThunk(
  'geolocation/fetchLocationInfo',
  async ({ latitude, longitude }, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/geocode', {
        params: {
          lat: latitude,
          lon: longitude
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);