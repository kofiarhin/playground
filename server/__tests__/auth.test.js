const request = require('supertest');

jest.mock('@clerk/express', () => ({
  requireAuth: () => (req, res, next) => {
    req.auth = { userId: 'clerk_123' };
    next();
  }
}));

jest.mock('../models/User', () => ({
  findOneAndUpdate: jest.fn()
}));

const User = require('../models/User');
const app = require('../app');

describe('POST /api/auth/sync', () => {
  it('returns validation error when email is missing', async () => {
    const response = await request(app).post('/api/auth/sync').send({ name: 'Test User' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      errors: [
        {
          field: 'email',
          message: 'email is required'
        }
      ]
    });
  });

  it('returns validation error when name is missing', async () => {
    const response = await request(app).post('/api/auth/sync').send({ email: 'test@example.com' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      errors: [
        {
          field: 'name',
          message: 'name is required'
        }
      ]
    });
  });

  it('syncs user when payload is valid', async () => {
    User.findOneAndUpdate.mockResolvedValue({
      id: 'user_1',
      clerkId: 'clerk_123',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user'
    });

    const response = await request(app).post('/api/auth/sync').send({
      email: 'test@example.com',
      name: 'Test User'
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe('test@example.com');
    expect(User.findOneAndUpdate).toHaveBeenCalledWith(
      { clerkId: 'clerk_123' },
      {
        clerkId: 'clerk_123',
        email: 'test@example.com',
        name: 'Test User'
      },
      { new: true, upsert: true }
    );
  });

  it('returns server error when sync fails', async () => {
    User.findOneAndUpdate.mockRejectedValue({
      status: 500,
      message: 'Sync failed',
      code: 'SYNC_ERROR'
    });

    const response = await request(app).post('/api/auth/sync').send({
      email: 'test@example.com',
      name: 'Test User'
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      success: false,
      message: 'Sync failed',
      code: 'SYNC_ERROR'
    });
  });
});
