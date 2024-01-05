import * as yup from 'yup';

export const ResetPassSchema = yup.object().shape({
  password: yup
    .string()
    .required('Пароль не менее 8 символов, с заглавной буквой и цифрой')
    .min(8, 'не менее 8 символов')
    .matches(/([A-ZА-Я])/, 'с заглавной буквой')
    .matches(/([0-9])/, 'цифрой'),
  passwordConfirmation: yup
    .string()
    .required('Пароль не менее 8 символов, с заглавной буквой и цифрой')
    .min(8, 'не менее 8 символов')
    .matches(/([A-ZА-Я])/, 'с заглавной буквой')
    .matches(/([0-9])/, 'цифрой')
    .oneOf([yup.ref('password')], 'Пароли не совпадают'),
});
