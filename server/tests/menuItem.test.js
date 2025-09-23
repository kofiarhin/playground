process.env.JWT_SECRET = 'testsecret';
process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../server');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const { connect, close, clearDatabase, createUserWithToken } = require('./testUtils');
const { ROLES } = require('../utils/roles');

let owner;
let token;
let restaurant;

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
  token = ownerResult.token;
  restaurant = await Restaurant.create({ name: 'Testaurant', description: 'Test', cuisine: 'Test', owner: owner._id });
});

describe('Menu item routes', () => {
  it('allows owner to create and update menu items', async () => {
    const createResponse = await request(app)
      .post(`/api/restaurants/${restaurant._id}/menu`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Burger', price: 9.99, description: 'Yummy', category: 'Mains' });

    expect(createResponse.status).toBe(201);
    const itemId = createResponse.body.data._id;

    const updateResponse = await request(app)
      .put(`/api/restaurants/${restaurant._id}/menu/${itemId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Burger', price: 11.5, description: 'Even better', category: 'Mains' });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.data.price).toBe(11.5);

    const listResponse = await request(app).get(`/api/restaurants/${restaurant._id}/menu`);
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.data).toHaveLength(1);
  });
});
