/* eslint-disable */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadRating = createAsyncThunk('@@rate/load-rating', (params, { extra: { client, api } }) => {
  return client.post(api.COMMENTS, params);
});

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

const ratingSlice = createSlice({
  name: '@@rate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadRating.pending, (state) => {
        state.status = 'loading';
        state.data = null;
        state.error = null;
      })
      .addCase(loadRating.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.error.message;
      })
      .addCase(loadRating.fulfilled, (state, action) => {
        state.status = 'recieved';
        state.data = action.payload;
      });
  },
});

export const ratingReducer = ratingSlice.reducer;

export const selectRatingInfo = (state) => ({
  statusRate: state.rate.status,
  errorRate: state.rate.error,
  data: state.rate.data,
});

export const selectRate = (state) => state.rate.data;
