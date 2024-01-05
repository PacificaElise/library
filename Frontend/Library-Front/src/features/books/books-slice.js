/* eslint-disable */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadBooks = createAsyncThunk('@@books/load-books', (_, { extra: { client, api } }) => {
  return client.get(api.ALL_BOOKS);
});

const initialState = {
  status: 'idle',
  error: null,
  list: [],
};

const booksSlice = createSlice({
  name: '@@books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadBooks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadBooks.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.error.message;
      })
      .addCase(loadBooks.fulfilled, (state, action) => {
        state.status = 'recieved';
        state.list = action.payload.data;
      });
  },
});

export const booksReducer = booksSlice.reducer;

// selectors
export const selectBooksInfo = (state) => ({
  status: state.books.status,
  error: state.books.error,
  qty: state.books.list.length,
});

export const selectAllBooks = (state) => state.books.list;

export const selectVisibleBooks = (state, { search = '', category = '' }) => {
  if (category === 'Все книги') {
    return state.books.list.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()));
  }
  return state.books.list.filter(
    (book) => book.title.toLowerCase().includes(search.toLowerCase()) && book.categories.toString().includes(category)
  );
};
