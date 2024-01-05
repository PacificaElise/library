/* eslint-disable */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchResetPassword = createAsyncThunk(
  '@@resetpass/reset-password',
  (params, { extra: { client, api } }) => {
    return client.post(api.RESET_PASS, params);
  }
);

const initialState = {
  resetPassData: null,
  status: 'idle',
  error: null,
};

const resetPassSlice = createSlice({
  name: '@@resetpass',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResetPassword.pending, (state) => {
        state.status = 'loading';
        state.resetPassData = null;
        state.error = null;
      })
      .addCase(fetchResetPassword.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchResetPassword.fulfilled, (state, action) => {
        state.status = 'recieved';
        state.resetPassData = action.payload;
      });
  },
});

export const resetPassReducer = resetPassSlice.reducer;

export const selectResetPassInfo = (state) => ({
  statusResetPass: state.resetPass.status,
  errorResetPass: state.resetPass.error,
});
