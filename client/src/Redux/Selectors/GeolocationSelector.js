export const selectGeolocationState = (state) => state.geolocation;

export const selectCoordinates = (state) => ({
  latitude: selectGeolocationState(state).latitude,
  longitude: selectGeolocationState(state).longitude,
});

export const selectLocationInfo = (state) => selectGeolocationState(state).locationInfo;

export const selectGeolocationLoading = (state) => selectGeolocationState(state).loading;

export const selectGeolocationError = (state) => selectGeolocationState(state).error;