/* eslint-disable */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchRegister = createAsyncThunk('@@reg/fetch-register', (params, { extra: { client, api } }) => {
  return client.post(api.REG, params);
});

const initialState = {
  regdata: null,
  status: 'idle',
  error: null,
};

const regSlice = createSlice({
  name: '@@reg',
  initialState,
  reducers: {
    clearReg: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.status = 'loading';
        state.regdata = null;
        state.error = null;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = 'recieved';
        state.regdata = action.payload;
      });
  },
});

export const regReducer = regSlice.reducer;

export const selectRegInfo = (state) => ({
  statusReg: state.reg.status,
  errorReg: state.reg.error,
});

export const { clearReg } = regSlice.actions;
