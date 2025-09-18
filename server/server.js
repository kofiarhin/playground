const http = require('http');
const path = require('path');
const dotenv = require('dotenv');
const { connectDb } = require('./config/db');
const createApp = require('./app');

dotenv.config({ path: path.join(__dirname, '.env') });

const port = process.env.PORT || 4000;
const mongoUri =
  process.env.MONGO_URI || process.env.MONGODB_URI || process.env.DATABASE_URL;

const startServer = async () => {
  try {
    await connectDb(mongoUri);
    const app = createApp();
    const server = http.createServer(app);

    server.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`LuxeAura Salon API running on port ${port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = startServer;
