/* eslint-disable */

import * as yup from 'yup';

export const RegSchema = yup.object().shape({
  username: yup
    .string()
    .required('Используйте для логина латинский алфавит и цифры')
    .matches(/([A-Za-z])/, 'латинский алфавит')
    .matches(/([0-9])/, 'цифры'),
  password: yup
    .string()
    .required('Пароль не менее 8 символов, с заглавной буквой и цифрой')
    .min(8, 'не менее 8 символов')
    .matches(/([A-ZА-Я])/, 'с заглавной буквой')
    .matches(/([0-9])/, 'цифрой'),
  firstName: yup.string().required('Поле не может быть пустым'),
  lastName: yup.string().required('Поле не может быть пустым'),
  phone: yup
    .string()
    .required('Поле не может быть пустым')
    .matches(
      /^[+]{1}[0-9]{3} [(]{1}[0-9]{2}[)]{1} [0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/,
      'В формате +375 (xx) xxx-xx-xx'
    ),
  email: yup
    .string()
    .email('Введите корректный e-mail')
    .required('Поле не может быть пустым')
    .matches(
      /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
      'Введите корректный e-mail'
    ),
});
