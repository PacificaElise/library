import { createSlice } from '@reduxjs/toolkit';

const toogleErrorToastSlice = createSlice({
  name: '@@switchoffError',
  initialState: true,
  reducers: {
    setToogleErrorToast: (_, action) => action.payload,
  },
});

export const { setToogleErrorToast } = toogleErrorToastSlice.actions;
export const toogleErrorToastReducer = toogleErrorToastSlice.reducer;
