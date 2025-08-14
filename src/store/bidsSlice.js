// src/store/bidsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bids: [], // Array of bid objects
};

const bidsSlice = createSlice({
  name: "bids",
  initialState,
  reducers: {
    setBids: (state, action) => {
      state.bids = action.payload; // Replace all bids
    },
    addBid: (state, action) => {
      state.bids.push(action.payload);
    },
    updateBid: (state, action) => {
      const index = state.bids.findIndex((bid) => bid.id === action.payload.id);
      if (index !== -1) {
        state.bids[index] = action.payload;
      }
    },
    deleteBid: (state, action) => {
      state.bids = state.bids.filter((bid) => bid.id !== action.payload);
    },
  },
});

export const { setBids, addBid, updateBid, deleteBid } = bidsSlice.actions;
export default bidsSlice.reducer;
