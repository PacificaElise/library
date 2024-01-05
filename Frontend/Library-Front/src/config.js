/* eslint-disable */

export const BASE_URL = 'https://library-cleverland-2jfze.ondigitalocean.app';

export const ALL_BOOKS = '/api/books';
export const ALL_CATEGORIES = '/api/categories';
export const AUTH = '/api/auth/local';
export const REG = '/api/auth/local/register';
export const FORGOT_PASS = '/api/auth/forgot-password';
export const RESET_PASS = '/api/auth/reset-password';
export const BOOKING = '/api/bookings';
export const COMMENTS = '/api/comments';
export const ME = '/api/users/me';

export const searchByBook = (id) => `${ALL_BOOKS}/${id}`;
export const searchRebooking = (bookingID) => `${BOOKING}/${bookingID}`;
export const deleteBooking = (id) => `${BOOKING}/${id}`;
