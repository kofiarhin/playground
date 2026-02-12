const { syncUser } = require('../controllers/authController');

const createRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('authController', () => {
  it('returns validation error when auth is missing', async () => {
    const req = { body: { email: 'test@example.com', name: 'Test User' } };
    const res = createRes();

    await syncUser(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      errors: [
        {
          field: 'auth',
          message: 'Authentication required'
        }
      ]
    });
  });
});
