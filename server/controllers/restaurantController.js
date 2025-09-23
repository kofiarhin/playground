const Restaurant = require('../models/Restaurant');
const { buildResponse } = require('../utils/http');

const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find().lean();
    return buildResponse(res, { data: restaurants });
  } catch (error) {
    return next(error);
  }
};

const createRestaurant = async (req, res, next) => {
  try {
    const payload = { ...req.body, owner: req.user.id };
    const restaurant = await Restaurant.create(payload);
    return buildResponse(res, { status: 201, message: 'Restaurant created', data: restaurant });
  } catch (error) {
    return next(error);
  }
};

const updateRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findOneAndUpdate({ _id: id, owner: req.user.id }, req.body, {
      new: true
    });
    if (!restaurant) {
      return buildResponse(res, { status: 404, message: 'Restaurant not found' });
    }
    return buildResponse(res, { message: 'Restaurant updated', data: restaurant });
  } catch (error) {
    return next(error);
  }
};

const deleteRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Restaurant.findOneAndDelete({ _id: id, owner: req.user.id });
    if (!deleted) {
      return buildResponse(res, { status: 404, message: 'Restaurant not found' });
    }
    return buildResponse(res, { message: 'Restaurant deleted' });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getRestaurants, createRestaurant, updateRestaurant, deleteRestaurant };
