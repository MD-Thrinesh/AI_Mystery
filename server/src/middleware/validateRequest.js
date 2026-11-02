export const validateRequest = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse(req.body);
    req.body = parsed;
    next();
  } catch (error) {
    next({
      statusCode: 400,
      code: 'VALIDATION_ERROR',
      message: error.errors?.[0]?.message || 'Invalid request payload.',
    });
  }
};
