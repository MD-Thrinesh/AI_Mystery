import express from 'express';

export const healthRoutes = express.Router();

healthRoutes.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});
