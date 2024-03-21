import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trips: [],
  change: false,
};

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    setTrips(state, action) {
      state.trips = action.payload;
    },
    addTrip(state, action) {
      state.trips.push(action.payload);
    },
    setChange(state,action){
      state.change = action.payload
    }
    
  },
});

export const { setTrips, addTrip,setChange } = tripsSlice.actions;

export default tripsSlice.reducer;
