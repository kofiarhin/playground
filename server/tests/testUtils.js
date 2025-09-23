const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { ROLES } = require('../utils/roles');

let mongoServer;

const connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {});
};

const close = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongoServer) {
    await mongoServer.stop();
  }
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany();
  }
};

const createUserWithToken = async ({ role = ROLES.CUSTOMER } = {}) => {
  const password = await bcrypt.hash('password123', 10);
  const user = await User.create({
    name: `${role}-user`,
    email: `${role}-${Date.now()}@example.com`,
    password,
    role
  });
  const token = jwt.sign({ id: user._id.toString(), role: user.role, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
  return { user, token };
};

module.exports = { connect, close, clearDatabase, createUserWithToken };
