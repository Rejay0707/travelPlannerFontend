import { configureStore } from '@reduxjs/toolkit';
import tripsReducer from '../reducer/tripsReducer'; // Create this reducer

const store = configureStore({
  reducer: {
    trips: tripsReducer,
  },
});

export default store;
