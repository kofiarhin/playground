const Joi = require('joi');

const orderStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'preparing', 'ready', 'completed', 'cancelled').required()
});

const deliveryUpdateSchema = Joi.object({
  status: Joi.string().valid('pending', 'assigned', 'picked_up', 'on_route', 'delivered').required(),
  eta: Joi.date().optional()
});

module.exports = { orderStatusSchema, deliveryUpdateSchema };
