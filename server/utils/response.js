const buildSuccess = (data, message = 'OK') => ({
  success: true,
  data,
  message
});

const buildPaginatedSuccess = (data, meta, message = 'OK') => ({
  success: true,
  data,
  meta,
  message
});

const buildError = (message, code, errors) => {
  const payload = {
    success: false,
    message
  };

  if (code) {
    payload.code = code;
  }

  if (errors) {
    payload.errors = errors;
  }

  return payload;
};

const buildValidationError = (field, message) =>
  buildError('Validation failed', 'VALIDATION_ERROR', [
    {
      field,
      message
    }
  ]);

module.exports = {
  buildSuccess,
  buildPaginatedSuccess,
  buildError,
  buildValidationError
};
