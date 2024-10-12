import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLocationInfo = createAsyncThunk(
  'geolocation/fetchLocationInfo',
  async ({ latitude, longitude }, { rejectWithValue }) => {
    try {
      console.log(`Fetching location info for lat: ${latitude}, lon: ${longitude}`);
      const response = await axios.get(`/api/geocode`, {
        params: {
          lat: latitude,
          lon: longitude
        },
        withCredentials: true
      });
      console.log('Received response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in fetchLocationInfo:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState: {
    latitude: null,
    longitude: null,
    locationInfo: null,
    loading: false,
    error: null,
    locationacess:null,
  },
  reducers: {
    setCoordinates: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocationInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.locationInfo = action.payload;
      })
      .addCase(fetchLocationInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export const { setCoordinates } = geolocationSlice.actions;
export default geolocationSlice.reducer;