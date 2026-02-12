const { buildError } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;
  const message = err.message || 'Server error';
  const code = err.code || 'SERVER_ERROR';

  return res.status(status).json(buildError(message, code, err.errors));
};

module.exports = errorHandler;
