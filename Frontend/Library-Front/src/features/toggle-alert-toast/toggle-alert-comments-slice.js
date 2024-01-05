/* eslint-disable */

import { createSlice } from '@reduxjs/toolkit';

const toogleAlertCommentsToastSlice = createSlice({
  name: '@@switchoffCommentsAlert',
  initialState: false,
  reducers: {
    setAlertCommentsToast: (_, action) => action.payload,
  },
});

export const { setAlertCommentsToast } = toogleAlertCommentsToastSlice.actions;
export const toogleAlertCommentsToastReducer = toogleAlertCommentsToastSlice.reducer;
