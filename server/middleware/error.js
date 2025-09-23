const { buildResponse } = require('../utils/http');

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Server error';
  return buildResponse(res, { status, message });
};

module.exports = errorHandler;
