process.env.JWT_SECRET = 'testsecret';
process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../server');
const { connect, close, clearDatabase } = require('./testUtils');

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await close();
});

describe('Auth routes', () => {
  it('registers and logs in a user', async () => {
    const registerResponse = await request(app).post('/api/auth/register').send({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123'
    });

    expect(registerResponse.status).toBe(201);
    expect(registerResponse.body.data.token).toBeDefined();

    const loginResponse = await request(app).post('/api/auth/login').send({
      email: 'jane@example.com',
      password: 'password123'
    });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.data.token).toBeDefined();
  });
});
