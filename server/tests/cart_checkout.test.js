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

let customer;
let token;
let menuItem;

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
  const restaurant = await Restaurant.create({
    name: 'Cart Bistro',
    description: 'Cart test restaurant',
    cuisine: 'Global',
    owner: ownerResult.user._id
  });
  menuItem = await MenuItem.create({
    restaurant: restaurant._id,
    name: 'Taco',
    description: 'Spicy taco',
    price: 4.5,
    category: 'Street Food'
  });
  const customerResult = await createUserWithToken({ role: ROLES.CUSTOMER });
  customer = customerResult.user;
  token = customerResult.token;
});

describe('Cart and checkout', () => {
  it('adds items to cart and performs checkout', async () => {
    const addResponse = await request(app)
      .post('/api/cart/items')
      .set('Authorization', `Bearer ${token}`)
      .send({ menuItemId: menuItem._id.toString(), quantity: 2 });

    expect(addResponse.status).toBe(201);
    expect(addResponse.body.data.items[0].quantity).toBe(2);

    const checkoutResponse = await request(app)
      .post('/api/cart/checkout')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(checkoutResponse.status).toBe(201);
    const orderId = checkoutResponse.body.data.order._id;

    const order = await Order.findById(orderId);
    const delivery = await Delivery.findOne({ order: orderId });

    expect(order).not.toBeNull();
    expect(delivery).not.toBeNull();
  });
});
