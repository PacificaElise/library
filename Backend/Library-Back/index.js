import express from 'express';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as BookController from './controllers/BookController.js';

mongoose
  .connect(
    'mongodb+srv://admin:Password@cluster0.prodadp.mongodb.net/library?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB Error', err));

const app = express();

app.use(express.json());

app.post('/api/auth/local/', UserController.auth);

app.post(
  '/api/auth/local/register',
  registerValidation,
  UserController.register
);

app.get('/api/users/me', checkAuth, UserController.me);

app.get('/api/books/', checkAuth, BookController.allBooks);

app.get('/api/books/:id', checkAuth, BookController.oneBook);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});
