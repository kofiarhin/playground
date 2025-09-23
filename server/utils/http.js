const buildResponse = (res, { status = 200, data = null, message = '' }) => {
  return res.status(status).json({ message, data });
};

module.exports = { buildResponse };
