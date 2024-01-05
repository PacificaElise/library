/* eslint-disable */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  category: 'Все книги',
  path: 'all',
  sort: 'desc',
  field: 'rating',
};

const controlsSlice = createSlice({
  name: '@@controls',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPath: (state, action) => {
      state.path = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setField: (state, action) => {
      state.field = action.payload;
    },
    clearControls: () => initialState,
    clearSearch: (state) => {
      state.search = '';
    },
  },
});

export const { setSearch, setCategory, setPath, clearControls, clearSearch, setSort, setField } = controlsSlice.actions;
export const controlsReducer = controlsSlice.reducer;

export const selectSearch = (state) => state.controls.search;
export const selectCategory = (state) => state.controls.category;
export const selectPath = (state) => state.controls.path;
export const selectSort = (state) => state.controls.sort;
export const selectField = (state) => state.controls.field;
export const selectControls = (state) => state.controls;
