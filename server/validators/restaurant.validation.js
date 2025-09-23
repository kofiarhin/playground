const Joi = require('joi');

const restaurantSchema = Joi.object({
  name: Joi.string().min(2).required(),
  description: Joi.string().allow(''),
  cuisine: Joi.string().allow('')
});

module.exports = { restaurantSchema };
