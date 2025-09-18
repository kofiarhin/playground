const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const inquiryStore = [];

jest.mock('../models/Inquiry', () => ({
  create: async (payload) => {
    const record = {
      ...payload,
      _id: `inquiry-${inquiryStore.length + 1}`,
      createdAt: new Date(),
    };
    inquiryStore.push(record);
    return record;
  },
  find: () => ({
    sort: () => ({
      lean: async () => [...inquiryStore].sort((a, b) => b.createdAt - a.createdAt),
    }),
  }),
  findOne: async (query) => inquiryStore.find((entry) => entry.email === query.email) || null,
  deleteMany: async () => {
    inquiryStore.length = 0;
  },
}));

const createApp = require('../app');
const { connectDb, disconnectDb } = require('../config/db');
const Inquiry = require('../models/Inquiry');

let app;
let mongoServer;

describe('LuxeAura Salon API', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await connectDb(uri);
    app = createApp();
  });

  afterEach(async () => {
    await Inquiry.deleteMany();
  });

  afterAll(async () => {
    await disconnectDb();
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  it('delivers brand content from JSON source', async () => {
    const response = await request(app).get('/api/content');
    expect(response.statusCode).toBe(200);
    expect(response.body.meta.brand).toBe('LuxeAura Salon');
    expect(response.body.navigation).toHaveLength(4);
    expect(response.body.services.list.length).toBeGreaterThan(0);
  });

  it('creates an inquiry and persists to database', async () => {
    const payload = {
      name: 'Elena Maris',
      email: 'elena@example.com',
      phone: '+12125550111',
      message: 'Requesting an evening styling appointment.',
      marketingOptIn: true,
    };

    const response = await request(app).post('/api/inquiries').send(payload);
    expect(response.statusCode).toBe(201);
    expect(response.body.id).toBeDefined();

    const stored = await Inquiry.findOne({ email: payload.email });
    expect(stored).not.toBeNull();
    expect(stored.marketingOptIn).toBe(true);
  });
});
