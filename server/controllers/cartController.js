const Cart = require('../models/Cart');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');
const Delivery = require('../models/Delivery');
const { calculateTotals } = require('../utils/totals');
const { buildResponse } = require('../utils/http');

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
};

const hydrateTotals = async (cart) => {
  const totals = calculateTotals(cart.items);
  cart.subtotal = totals.subtotal;
  cart.tax = totals.tax;
  cart.total = totals.total;
  await cart.save();
  return cart;
};

const getCart = async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    return buildResponse(res, { data: cart });
  } catch (error) {
    return next(error);
  }
};

const addItem = async (req, res, next) => {
  try {
    const { menuItemId, quantity } = req.body;
    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem || !menuItem.available) {
      return buildResponse(res, { status: 404, message: 'Menu item not available' });
    }
    const cart = await getOrCreateCart(req.user.id);
    if (cart.restaurant && String(cart.restaurant) !== String(menuItem.restaurant)) {
      cart.items = [];
    }
    cart.restaurant = menuItem.restaurant;
    const existing = cart.items.find((item) => String(item.menuItem) === String(menuItemId));
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ menuItem: menuItemId, name: menuItem.name, price: menuItem.price, quantity });
    }
    await hydrateTotals(cart);
    return buildResponse(res, { status: 201, message: 'Item added to cart', data: cart });
  } catch (error) {
    return next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const cart = await getOrCreateCart(req.user.id);
    const target = cart.items.find((item) => String(item.menuItem) === itemId);
    if (!target) {
      return buildResponse(res, { status: 404, message: 'Item not found in cart' });
    }
    target.quantity = quantity;
    cart.items = cart.items.filter((item) => item.quantity > 0);
    await hydrateTotals(cart);
    return buildResponse(res, { message: 'Cart updated', data: cart });
  } catch (error) {
    return next(error);
  }
};

const removeItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const cart = await getOrCreateCart(req.user.id);
    const initialLength = cart.items.length;
    cart.items = cart.items.filter((item) => String(item.menuItem) !== itemId);
    if (cart.items.length === initialLength) {
      return buildResponse(res, { status: 404, message: 'Item not found in cart' });
    }
    if (!cart.items.length) {
      cart.restaurant = null;
    }
    await hydrateTotals(cart);
    return buildResponse(res, { message: 'Item removed', data: cart });
  } catch (error) {
    return next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    cart.items = [];
    cart.restaurant = null;
    await hydrateTotals(cart);
    return buildResponse(res, { message: 'Cart cleared', data: cart });
  } catch (error) {
    return next(error);
  }
};

const checkout = async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    if (!cart.items.length) {
      return buildResponse(res, { status: 400, message: 'Cart is empty' });
    }
    await hydrateTotals(cart);
    const order = await Order.create({
      user: cart.user,
      restaurant: cart.restaurant,
      items: cart.items,
      subtotal: cart.subtotal,
      tax: cart.tax,
      total: cart.total
    });
    const delivery = await Delivery.create({ order: order._id, status: 'pending' });
    cart.items = [];
    cart.restaurant = null;
    cart.subtotal = 0;
    cart.tax = 0;
    cart.total = 0;
    await cart.save();
    return buildResponse(res, {
      status: 201,
      message: 'Order placed',
      data: { order, delivery }
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getCart, addItem, updateItem, removeItem, clearCart, checkout };
