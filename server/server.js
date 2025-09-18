const http = require('http');
const path = require('path');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const createApp = require('./app');

dotenv.config({ path: path.join(__dirname, '.env') });

const port = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
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
