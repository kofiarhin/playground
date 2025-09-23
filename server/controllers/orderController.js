const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');
const { buildResponse } = require('../utils/http');
const { ROLES } = require('../utils/roles');

const getOrders = async (req, res, next) => {
  try {
    let filter = { user: req.user.id };
    if (req.user.role === ROLES.OWNER) {
      const restaurants = await Restaurant.find({ owner: req.user.id }, '_id');
      filter = { restaurant: { $in: restaurants.map((r) => r._id) } };
    }
    if (req.user.role === ROLES.ADMIN) {
      filter = {};
    }
    const orders = await Order.find(filter).sort({ createdAt: -1 }).lean();
    return buildResponse(res, { data: orders });
  } catch (error) {
    return next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).lean();
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
    return buildResponse(res, { data: order });
  } catch (error) {
    return next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findById(id);
    if (!order) {
      return buildResponse(res, { status: 404, message: 'Order not found' });
    }
    const restaurants = await Restaurant.find({ owner: req.user.id }, '_id');
    if (!restaurants.map((r) => String(r._id)).includes(String(order.restaurant))) {
      return buildResponse(res, { status: 403, message: 'Forbidden' });
    }
    order.status = status;
    await order.save();
    return buildResponse(res, { message: 'Order status updated', data: order });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getOrders, getOrderById, updateOrderStatus };
