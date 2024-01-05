/* eslint-disable */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchGetPassword = createAsyncThunk('@@getpass/get-password', (params, { extra: { client, api } }) => {
  return client.post(api.FORGOT_PASS, params);
});

const initialState = {
  getPassData: null,
  status: 'idle',
  error: null,
};

const forgotPassSlice = createSlice({
  name: '@@getpass',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetPassword.pending, (state) => {
        state.status = 'loading';
        state.getPassData = null;
        state.error = null;
      })
      .addCase(fetchGetPassword.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchGetPassword.fulfilled, (state, action) => {
        state.status = 'recieved';
        state.getPassData = action.payload;
      });
  },
});

export const forgotPassReducer = forgotPassSlice.reducer;

export const selectForgotPassInfo = (state) => ({
  statusForgotPass: state.forgotPass.status,
  errorForgotPass: state.forgotPass.error,
});
