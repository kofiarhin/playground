const notFoundHandler = (req, res, next) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message || 'Unexpected error',
  });
};

module.exports = { notFoundHandler, errorHandler };
