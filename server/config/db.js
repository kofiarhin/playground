const mongoose = require('mongoose');

const connectDb = async (uri) => {
  if (!uri) {
    throw new Error('MongoDB connection string missing. Set MONGO_URI in environment variables.');
  }

  if (uri.startsWith('memory://')) {
    return;
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });
};

module.exports = connectDb;
