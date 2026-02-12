const User = require('../models/User');
const { buildSuccess, buildValidationError } = require('../utils/response');

const syncUser = async (req, res, next) => {
  try {
    const clerkId = req.auth && req.auth.userId;
    if (!clerkId) {
      return res.status(401).json(buildValidationError('auth', 'Authentication required'));
    }

    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json(buildValidationError('email', 'email is required'));
    }

    if (!name) {
      return res.status(400).json(buildValidationError('name', 'name is required'));
    }

    const user = await User.findOneAndUpdate(
      { clerkId },
      { clerkId, email, name },
      { new: true, upsert: true }
    );

    return res.status(200).json(buildSuccess(user, 'OK'));
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  syncUser
};
