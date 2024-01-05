/* eslint-disable */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadUserData = createAsyncThunk('@@auth/load-user-data', (params, { extra: { client, api } }) => {
  return client.post(api.AUTH, params);
});

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {
    logOut: () => initialState,
    dropError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserData.pending, (state) => {
        state.status = 'loading';
        state.data = null;
        state.error = null;
      })
      .addCase(loadUserData.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.error.message;
      })
      .addCase(loadUserData.fulfilled, (state, action) => {
        state.status = 'recieved';
        state.data = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;

export const selectUserInfo = (state) => ({
  statusAuth: state.auth.status,
  errorAuth: state.auth.error,
  data: state.auth.data,
});

export const { logOut, dropError } = authSlice.actions;

export const selectIsAuthState = (state) => Boolean(state.auth.data);
export const selectIsAuth = () => localStorage.getItem('token');

export const selectUserData = (state) => state.auth.data;
