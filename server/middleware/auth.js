const jwt = require('jsonwebtoken');
const { buildResponse } = require('../utils/http');

const auth = (roles = []) => {
  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  return (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;
    if (!token) {
      return buildResponse(res, { status: 401, message: 'Authentication required' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
        return buildResponse(res, { status: 403, message: 'Forbidden' });
      }
      return next();
    } catch (error) {
      return buildResponse(res, { status: 401, message: 'Invalid token' });
    }
  };
};

module.exports = auth;
