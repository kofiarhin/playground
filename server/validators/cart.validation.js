const Joi = require('joi');

const addItemSchema = Joi.object({
  menuItemId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).default(1)
});

const updateItemSchema = Joi.object({
  quantity: Joi.number().integer().min(0).required()
});

module.exports = { addItemSchema, updateItemSchema };
