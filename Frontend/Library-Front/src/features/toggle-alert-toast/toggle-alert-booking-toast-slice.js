/* eslint-disable */

import { createSlice } from '@reduxjs/toolkit';

const toogleAlertBookingToastSlice = createSlice({
  name: '@@switchoffAlert',
  initialState: false,
  reducers: {
    setAlertBookingToast: (_, action) => action.payload,
  },
});

export const { setAlertBookingToast } = toogleAlertBookingToastSlice.actions;
export const toogleAlertBookingToastReducer = toogleAlertBookingToastSlice.reducer;
