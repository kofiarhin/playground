const mongoose = require('mongoose');

let memoryServer;

const connectDb = async (uri) => {
  let connectionUri = uri;

  if (!connectionUri) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('MongoDB connection string missing. Set MONGO_URI in environment variables.');
    }

    let MongoMemoryServer;
    try {
      ({ MongoMemoryServer } = require('mongodb-memory-server'));
    } catch (error) {
      throw new Error(
        'MongoDB connection string missing and mongodb-memory-server is not available. Install it or set MONGO_URI.'
      );
    }

    memoryServer = await MongoMemoryServer.create();
    connectionUri = memoryServer.getUri();
  }

  if (connectionUri.startsWith('memory://')) {
    return;
  }

  await mongoose.connect(connectionUri, {
    serverSelectionTimeoutMS: 5000,
  });
};

const disconnectDb = async () => {
  await mongoose.connection.close();

  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }
};

module.exports = {
  connectDb,
  disconnectDb,
};
