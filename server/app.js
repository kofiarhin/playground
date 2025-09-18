const express = require('express');
const cors = require('cors');
const contentRoutes = require('./routes/contentRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorMiddleware');

const createApp = () => {
  const app = express();

  app.use(cors({ origin: '*', credentials: false }));
  app.use(express.json());

  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.use('/api/content', contentRoutes);
  app.use('/api/inquiries', inquiryRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

module.exports = createApp;
