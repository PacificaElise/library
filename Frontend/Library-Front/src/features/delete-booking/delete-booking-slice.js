/* eslint-disable */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const deleteBookingById = createAsyncThunk('@@delete/delete-booking', (id, { extra: { client, api } }) => {
  return client.delete(api.deleteBooking(id));
});

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

const deleteBookingSlice = createSlice({
  name: '@@delete',
  initialState,
  reducers: {
    clearDeleteBooking: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteBookingById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteBookingById.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteBookingById.fulfilled, (state, action) => {
        state.status = 'received';
        state.data = action.payload.data;
      });
  },
});

export const deleteBookingReducer = deleteBookingSlice.reducer;

export const { clearDeleteBooking } = deleteBookingSlice.actions;

export const selectDeleteBookingInfo = (state) => ({
  statusDeleteBooking: state.deleteBooking.status,
  errorDeleteBooking: state.deleteBooking.error,
  data: state.deleteBooking.data,
});

export const selectDeleteBookingData = (state) => state.deleteBooking.data;
