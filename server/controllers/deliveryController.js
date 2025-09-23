const Delivery = require('../models/Delivery');
const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');
const { buildResponse } = require('../utils/http');
const { ROLES } = require('../utils/roles');

const getDeliveryByOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const delivery = await Delivery.findOne({ order: orderId }).lean();
    if (!delivery) {
      return buildResponse(res, { status: 404, message: 'Delivery not found' });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return buildResponse(res, { status: 404, message: 'Order not found' });
    }
    if (req.user.role === ROLES.CUSTOMER && String(order.user) !== req.user.id) {
      return buildResponse(res, { status: 403, message: 'Forbidden' });
    }
    if (req.user.role === ROLES.OWNER) {
      const restaurants = await Restaurant.find({ owner: req.user.id }, '_id');
      if (!restaurants.map((r) => String(r._id)).includes(String(order.restaurant))) {
        return buildResponse(res, { status: 403, message: 'Forbidden' });
      }
    }
    return buildResponse(res, { data: delivery });
  } catch (error) {
    return next(error);
  }
};

const updateDeliveryStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status, eta } = req.body;
    const delivery = await Delivery.findOne({ order: orderId });
    if (!delivery) {
      return buildResponse(res, { status: 404, message: 'Delivery not found' });
    }
    delivery.status = status;
    delivery.eta = eta ? new Date(eta) : delivery.eta;
    await delivery.save();
    return buildResponse(res, { message: 'Delivery updated', data: delivery });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getDeliveryByOrder, updateDeliveryStatus };
