/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const NotFoundError = require('../helpers/not-found-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.findUser = (req, res, next) => {
  console.log(req.body);
  User.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('Нет пользователя с таким id');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  if (password && password.length >= 8 && password.match(/^[ ]{1,}$/) === null) {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        email,
        password: hash,
        name,
      }))
      .then((user) => res.status(201).send({
        data: {
          _id: user._id,
          email: user.email,
          name: user.name,
        },
      }))
      .catch(next);
  }
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      return res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'Авторизация прошла успешно' });
    })
    .catch(next);
};
