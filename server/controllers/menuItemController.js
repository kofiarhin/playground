const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');
const { buildResponse } = require('../utils/http');

const getMenuByRestaurant = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const items = await MenuItem.find({ restaurant: restaurantId, available: true }).lean();
    return buildResponse(res, { data: items });
  } catch (error) {
    return next(error);
  }
};

const createMenuItem = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await Restaurant.findOne({ _id: restaurantId, owner: req.user.id });
    if (!restaurant) {
      return buildResponse(res, { status: 404, message: 'Restaurant not found' });
    }
    const menuItem = await MenuItem.create({ ...req.body, restaurant: restaurantId });
    return buildResponse(res, { status: 201, message: 'Menu item created', data: menuItem });
  } catch (error) {
    return next(error);
  }
};

const updateMenuItem = async (req, res, next) => {
  try {
    const { restaurantId, itemId } = req.params;
    const restaurant = await Restaurant.findOne({ _id: restaurantId, owner: req.user.id });
    if (!restaurant) {
      return buildResponse(res, { status: 404, message: 'Restaurant not found' });
    }
    const menuItem = await MenuItem.findOneAndUpdate({ _id: itemId, restaurant: restaurantId }, req.body, {
      new: true
    });
    if (!menuItem) {
      return buildResponse(res, { status: 404, message: 'Menu item not found' });
    }
    return buildResponse(res, { message: 'Menu item updated', data: menuItem });
  } catch (error) {
    return next(error);
  }
};

const deleteMenuItem = async (req, res, next) => {
  try {
    const { restaurantId, itemId } = req.params;
    const restaurant = await Restaurant.findOne({ _id: restaurantId, owner: req.user.id });
    if (!restaurant) {
      return buildResponse(res, { status: 404, message: 'Restaurant not found' });
    }
    const menuItem = await MenuItem.findOneAndDelete({ _id: itemId, restaurant: restaurantId });
    if (!menuItem) {
      return buildResponse(res, { status: 404, message: 'Menu item not found' });
    }
    return buildResponse(res, { message: 'Menu item deleted' });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getMenuByRestaurant, createMenuItem, updateMenuItem, deleteMenuItem };
