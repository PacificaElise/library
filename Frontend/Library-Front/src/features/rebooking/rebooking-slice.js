/* eslint-disable */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from '../../axios';
import * as api from '../../config';

/*export const loadRebookingData = createAsyncThunk('@@rebooking/load-rebooking-data', async (id, data) => {
  try {
    const response = await axios.put(`https://strapi.cleverland.by/api/bookings/${id}`, data);
    return response.data;
  } catch (err) {
    ('error');
  }
});*/
export const loadRebookingData = createAsyncThunk('@@rebooking/load-rebooking-data', ({ bookingID, data }) => {
  return axios.put(api.searchRebooking(bookingID), { data });
});

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

const rebookingSlice = createSlice({
  name: '@@rebooking',
  initialState,
  reducers: {
    clearReBooking: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadRebookingData.pending, (state) => {
        state.status = 'loading';
        state.data = null;
        state.error = null;
      })
      .addCase(loadRebookingData.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.error.message;
      })
      .addCase(loadRebookingData.fulfilled, (state, action) => {
        state.status = 'recieved';
        state.data = action.payload;
      });
  },
});

export const rebookingReducer = rebookingSlice.reducer;

export const { clearReBooking } = rebookingSlice.actions;

export const selectRebookingInfo = (state) => ({
  statusRebooking: state.rebooking.status,
  erroRebooking: state.rebooking.error,
  data: state.rebooking.data,
});

export const selectRebookingData = (state) => state.rebooking.data;
