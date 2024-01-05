/* eslint-disable */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadCategories = createAsyncThunk('@@categories/load-categories', (_, { extra: { client, api } }) => {
  return client.get(api.ALL_CATEGORIES);
});

const initialState = {
  status: 'idle',
  error: null,
  list: [],
};

const categoriesSlice = createSlice({
  name: '@@categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.error.message;
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.status = 'recieved';
        state.list = action.payload.data;
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;

// selectors
export const selectCategoriesInfo = (state) => ({
  statusCat: state.categories.status,
  errorCat: state.categories.error,
  qty: state.categories.list.length,
});

export const selectAllCategories = (state) => state.categories.list;
