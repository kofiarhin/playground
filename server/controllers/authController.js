const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { buildResponse } = require('../utils/http');
const { ROLES } = require('../utils/roles');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || '1d'
  });
};

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return buildResponse(res, { status: 400, message: 'Email already registered' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role: role || ROLES.CUSTOMER });
    const token = generateToken(user);
    return buildResponse(res, {
      status: 201,
      message: 'Registration successful',
      data: { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } }
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return buildResponse(res, { status: 401, message: 'Invalid credentials' });
    }
    const match = await user.comparePassword(password);
    if (!match) {
      return buildResponse(res, { status: 401, message: 'Invalid credentials' });
    }
    const token = generateToken(user);
    return buildResponse(res, {
      message: 'Login successful',
      data: { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } }
    });
  } catch (error) {
    return next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return buildResponse(res, { status: 404, message: 'User not found' });
    }
    return buildResponse(res, { data: user });
  } catch (error) {
    return next(error);
  }
};

module.exports = { register, login, profile };
