process.env.JWT_SECRET = 'testsecret';
process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../server');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');
const Delivery = require('../models/Delivery');
const { connect, close, clearDatabase, createUserWithToken } = require('./testUtils');
const { ROLES } = require('../utils/roles');

let owner;
let ownerToken;
let customerToken;
let order;
let delivery;

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await close();
});

beforeEach(async () => {
  const ownerResult = await createUserWithToken({ role: ROLES.OWNER });
  owner = ownerResult.user;
  ownerToken = ownerResult.token;
  const customerResult = await createUserWithToken({ role: ROLES.CUSTOMER });
  customerToken = customerResult.token;

  const restaurant = await Restaurant.create({
    name: 'Owner Kitchen',
    description: 'Orders test',
    cuisine: 'Home',
    owner: owner._id
  });
  const menuItem = await MenuItem.create({
    restaurant: restaurant._id,
    name: 'Soup',
    description: 'Warm soup',
    price: 5,
    category: 'Starters'
  });
  order = await Order.create({
    user: customerResult.user._id,
    restaurant: restaurant._id,
    items: [{ menuItem: menuItem._id, name: menuItem.name, price: menuItem.price, quantity: 1 }],
    subtotal: 5,
    tax: 0.4,
    total: 5.4
  });
  delivery = await Delivery.create({ order: order._id, status: 'pending' });
});

describe('Order and delivery management', () => {
  it('allows owner to view and update order and delivery status', async () => {
    const ownerOrders = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${ownerToken}`);
    expect(ownerOrders.status).toBe(200);
    expect(ownerOrders.body.data).toHaveLength(1);

    const updateOrder = await request(app)
      .patch(`/api/orders/${order._id}/status`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ status: 'preparing' });
    expect(updateOrder.status).toBe(200);
    expect(updateOrder.body.data.status).toBe('preparing');

    const updateDelivery = await request(app)
      .patch(`/api/delivery/${order._id}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ status: 'on_route' });
    expect(updateDelivery.status).toBe(200);
    expect(updateDelivery.body.data.status).toBe('on_route');

    const customerDelivery = await request(app)
      .get(`/api/delivery/${order._id}`)
      .set('Authorization', `Bearer ${customerToken}`);
    expect(customerDelivery.status).toBe(200);
    expect(customerDelivery.body.data.status).toBe('on_route');
  });
});
