const errorHandler = require('../middleware/errorHandler');

const createRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('errorHandler middleware', () => {
  it('passes through when headers are sent', () => {
    const res = createRes();
    res.headersSent = true;
    const next = jest.fn();

    errorHandler(new Error('Test error'), {}, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('returns formatted error payload', () => {
    const res = createRes();
    const error = { status: 400, message: 'Bad request', code: 'BAD_REQUEST' };

    errorHandler(error, {}, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Bad request',
      code: 'BAD_REQUEST'
    });
  });
});
