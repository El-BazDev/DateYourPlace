import { configureStore } from '@reduxjs/toolkit';
import geolocationReducer from '../Redux/Slices/GeolocationSlice';
import authReducer from './Slices/AuthSlice'
import restaurantReducer from './Slices/SwipeSlice'
import  userReducer from './Slices/UserSlice'
const store = configureStore({
  reducer: {
    geolocation: geolocationReducer,
    auth: authReducer,
    restaurants: restaurantReducer,
    user: userReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
});

export default store;
