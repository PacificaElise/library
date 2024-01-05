/* eslint-disable */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadBookById = createAsyncThunk('@@details/load-book', (id, { extra: { client, api } }) => {
  return client.get(api.searchByBook(id));
});

const initialState = {
  currentBook: null,
  status: 'idle',
  error: null,
};

const detailsSlice = createSlice({
  name: '@@details',
  initialState,
  reducers: {
    clearDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBookById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadBookById.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.error.message;
      })
      .addCase(loadBookById.fulfilled, (state, action) => {
        state.status = 'received';
        state.currentBook = action.payload.data;
      });
  },
});

export const selectDetailsInfo = (state) => ({
  statusBookId: state.details.status,
  errorBookId: state.details.error,
});

export const { clearDetails } = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;

export const selectCurrentBook = (state) => state.details.currentBook;
export const selectBookDetails = (state) => state.details;
