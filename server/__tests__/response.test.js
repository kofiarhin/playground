const {
  buildSuccess,
  buildPaginatedSuccess,
  buildError,
  buildValidationError
} = require('../utils/response');

describe('response helpers', () => {
  it('builds success response', () => {
    expect(buildSuccess({ id: 1 })).toEqual({
      success: true,
      data: { id: 1 },
      message: 'OK'
    });
  });

  it('builds paginated success response', () => {
    expect(
      buildPaginatedSuccess([], { page: 1, limit: 20, total: 0, pages: 0 })
    ).toEqual({
      success: true,
      data: [],
      meta: { page: 1, limit: 20, total: 0, pages: 0 },
      message: 'OK'
    });
  });

  it('builds error response with code and errors', () => {
    expect(buildError('Bad request', 'BAD_REQUEST', [{ field: 'name', message: 'Required' }])).toEqual({
      success: false,
      message: 'Bad request',
      code: 'BAD_REQUEST',
      errors: [{ field: 'name', message: 'Required' }]
    });
  });

  it('builds error response without code', () => {
    expect(buildError('Oops')).toEqual({
      success: false,
      message: 'Oops'
    });
  });

  it('builds validation error response', () => {
    expect(buildValidationError('email', 'email is required')).toEqual({
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
});
