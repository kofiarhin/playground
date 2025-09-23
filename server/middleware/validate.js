const { buildResponse } = require('../utils/http');

const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const target = req[property];
    const { error, value } = schema.validate(target, { abortEarly: false, stripUnknown: true });
    if (error) {
      return buildResponse(res, { status: 400, message: error.details.map((detail) => detail.message).join(', ') });
    }
    req[property] = value;
    return next();
  };
};

module.exports = validate;
