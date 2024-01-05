import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import UserModel from '../models/User.js';

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      username: req.body.username,
      passwordHash: hash,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
    });

    const user = await doc.save();

    const jwtToken = jwt.sign(
      {
        _id: user._id,
      },
      'secret_key',
      {
        expiresIn: '30d',
      }
    );

    const { passwordHash, avatar, ...userData } = user._doc;

    res.json({ jwtToken, userData });
  } catch (err) {
    res.status(500).json({
      data: null,
      error: {
        status: err.status,
        name: err.name,
        message: err.message,
        details: {},
      },
    });
  }
};

export const auth = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPassword) {
      return res.status(400).json({
        message: 'Неверный логин или пароль',
      });
    }

    const jwtToken = jwt.sign(
      {
        _id: user._id,
      },
      'secret_key',
      {
        expiresIn: '30d',
      }
    );

    const { passwordHash, avatar, ...userData } = user._doc;

    res.json({ jwtToken, userData });
  } catch (err) {
    res.status(500).json({
      data: null,
      error: {
        status: err.status,
        name: err.name,
        message: err.message,
        details: {},
      },
    });
  }
};

export const me = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData });
  } catch (err) {
    res.status(500).json({
      data: null,
      error: {
        status: err.status,
        name: err.name,
        message: err.message,
        details: {},
      },
    });
  }
};
