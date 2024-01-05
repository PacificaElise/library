/* eslint-disable */

import { configureStore } from '@reduxjs/toolkit';
import axios from './axios';

import * as api from './config';
import { controlsReducer } from './features/controls/controls-slice';
import { booksReducer } from './features/books/books-slice';
import { categoriesReducer } from './features/categories/categories-slice';
import { detailsReducer } from './features/details/details-slice';
import { toogleErrorToastReducer } from './features/toggle-error-toast/toggle-error-toast-slice';
import { authReducer } from './features/auth/auth-slice';
import { regReducer } from './features/reg/reg-slice';
import { forgotPassReducer } from './features/forgot-password/forgot-password-slice';
import { resetPassReducer } from './features/reset-password/reset-password-slice';
import { bookingReducer } from './features/booking/booking-slice';
import { toogleAlertBookingToastReducer } from './features/toggle-alert-toast/toggle-alert-booking-toast-slice';
import { rebookingReducer } from './features/rebooking/rebooking-slice';
import { deleteBookingReducer } from './features/delete-booking/delete-booking-slice';
import { toogleRebookingAlertToastReducer } from './features/toggle-alert-toast/toggle-alert-rebooking-toast-slice';
import { toogleAlertDeleteBookingToastReducer } from './features/toggle-alert-toast/toggle-alert-delete-booking-toast-slice';
import { ratingReducer } from './features/rating/rating-slice';
import { toogleAlertCommentsToastReducer } from './features/toggle-alert-toast/toggle-alert-comments-slice';
import { meReducer } from './features/me/me-slice';

export const store = configureStore({
  reducer: {
    controls: controlsReducer,
    books: booksReducer,
    categories: categoriesReducer,
    details: detailsReducer,
    errorToast: toogleErrorToastReducer,
    alertBookingToast: toogleAlertBookingToastReducer,
    alertRebookingToast: toogleRebookingAlertToastReducer,
    alertDeleteBookingToast: toogleAlertDeleteBookingToastReducer,
    alertCommentsToast: toogleAlertCommentsToastReducer,
    auth: authReducer,
    reg: regReducer,
    forgotPass: forgotPassReducer,
    resetPass: resetPassReducer,
    booking: bookingReducer,
    rebooking: rebookingReducer,
    deleteBooking: deleteBookingReducer,
    rate: ratingReducer,
    me: meReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          client: axios,
          api,
        },
      },
      serializableCheck: false,
    }),
});
