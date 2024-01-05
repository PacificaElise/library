/* eslint-disable */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadMe = createAsyncThunk('@@me/load-me', (_, { extra: { client, api } }) => {
  return client.get(api.ME);
});

const initialState = {
  status: 'idle',
  error: null,
  data: null,
};

const meSlice = createSlice({
  name: '@@me',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMe.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadMe.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.error.message;
      })
      .addCase(loadMe.fulfilled, (state, action) => {
        state.status = 'recieved';
        state.data = action.payload.data;
      });
  },
});

export const meReducer = meSlice.reducer;

// selectors
export const selectMeInfo = (state) => ({
  statusMe: state.me.status,
  errorMe: state.me.error,
  dataMe: state.me.data,
});

export const selectMeData = (state) => state.me.data;
