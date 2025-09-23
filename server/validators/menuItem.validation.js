const Joi = require('joi');

const menuItemSchema = Joi.object({
  name: Joi.string().min(2).required(),
  description: Joi.string().allow(''),
  category: Joi.string().allow(''),
  price: Joi.number().positive().required(),
  available: Joi.boolean().optional()
});

module.exports = { menuItemSchema };
