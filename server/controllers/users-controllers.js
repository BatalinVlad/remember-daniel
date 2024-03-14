// const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const cloudinary = require('../utils/cloudinary');
// const getDataUri = require('../utils/datauri');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUserById = async (req, res, next) => {
  const userId = req.params.uid;
  let user;

  try {
    user = await User.findById(userId, '-password');
  } catch (err) {
    const error = new HttpError('Something went wrong, could not find a user', 500);
    return next(error)
  }

  if (!user) {
    const error = new HttpError('Could not find a user for the provided id.', 404);
    return next(error)
  }

  res.json(user.toObject({ getters: true }));
};

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError('fetching users failed, please try again late', 500)
    return next(error);
  }
  res.json({ users: users.map(user => user.toObject({ getters: true })) })
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    const error = new HttpError('login up failed, Please try again later.', 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError('Invalid credentials, Could not log in', 403);
    return next(error);
  }

  let isValidPassword = false
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError('Could not log you in, please check credencials and try again', 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError('Invalid credentials, Could not log in', 403);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' });
  } catch (err) {
    const error = new HttpError('logging in failed, Please try again', 500);
    return next(error);
  }

  res.json({
    username: existingUser.username,
    token: token,
    role: existingUser.role
  });
}

exports.getUserById = getUserById;
exports.getUsers = getUsers;
exports.login = login;

