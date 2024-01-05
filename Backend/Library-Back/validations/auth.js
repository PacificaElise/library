import { body } from 'express-validator';

export const registerValidation = [
  body('username', 'Логие не менее 3 символов').isLength({ min: 3 }),
  body('password', 'Пароль не менее 6 символов').isLength({ min: 6 }),
  body('firstName', 'Укажите имя').isLength({ min: 2 }),
  body('lastName', 'Укажите фамилию').isLength({ min: 2 }),
  body('email', 'Неверный формат почты').isEmail(),
  body('phone', 'Мобильный номер не менее 10 символов').isLength({ min: 10 }),
];
