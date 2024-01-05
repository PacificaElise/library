/* eslint-disable */

import * as yup from 'yup';

export const ForgotpassSchema = yup.object().shape({
  email: yup
    .string()
    .email('Введите корректный e-mail')
    .required('Поле не может быть пустым')
    .matches(
      /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
      'Введите корректный e-mail'
    ),
});
