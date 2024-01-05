/* eslint-disable */

import { createSlice } from '@reduxjs/toolkit';

const toogleAlertDeleteBookingToastSlice = createSlice({
  name: '@@switchoffDeleteBookingAlert',
  initialState: false,
  reducers: {
    setAlertDeleteBookingToast: (_, action) => action.payload,
  },
});

export const { setAlertDeleteBookingToast } = toogleAlertDeleteBookingToastSlice.actions;
export const toogleAlertDeleteBookingToastReducer = toogleAlertDeleteBookingToastSlice.reducer;
