export const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const errorCode = err.code || 'SERVER_ERROR';

  res.status(statusCode).json({
    error: {
      code: errorCode,
      message: err.message || 'An unexpected server error occurred.',
    },
  });
};
