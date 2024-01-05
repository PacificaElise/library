/* eslint-disable */

import { createSlice } from '@reduxjs/toolkit';

const toogleAlertRebookingToastSlice = createSlice({
  name: '@@switchoffRebookingAlert',
  initialState: false,
  reducers: {
    setRebookingAlertToast: (_, action) => action.payload,
  },
});

export const { setRebookingAlertToast } = toogleAlertRebookingToastSlice.actions;
export const toogleRebookingAlertToastReducer = toogleAlertRebookingToastSlice.reducer;
