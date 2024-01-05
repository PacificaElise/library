/* eslint-disable */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadBookingData = createAsyncThunk('@@booking/load-booking-data', (params, { extra: { client, api } }) => {
  return client.post(api.BOOKING, params);
});

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

const bookingSlice = createSlice({
  name: '@@booking',
  initialState,
  reducers: {
    clearBooking: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBookingData.pending, (state) => {
        state.status = 'loading';
        state.data = null;
        state.error = null;
      })
      .addCase(loadBookingData.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.error.message;
      })
      .addCase(loadBookingData.fulfilled, (state, action) => {
        state.status = 'recieved';
        state.data = action.payload;
      });
  },
});

export const bookingReducer = bookingSlice.reducer;

export const { clearBooking } = bookingSlice.actions;

export const selectBookingInfo = (state) => ({
  statusBooking: state.booking.status,
  errorBooking: state.booking.error,
  data: state.booking.data,
});

export const selectBookingData = (state) => state.booking.data;
