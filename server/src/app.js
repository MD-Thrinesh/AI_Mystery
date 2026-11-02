import express from 'express';
import cors from 'cors';

import { config } from './config/env.js';
import { healthRoutes } from './routes/healthRoutes.js';
import { mysteryRoutes } from './routes/mysteryRoutes.js';
import { sessionRoutes } from './routes/sessionRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  }),
);
app.use(express.json({ limit: '2mb' }));

app.get('/', (_req, res) => {
  res.json({ message: 'AI Mystery Room API is running.' });
});

app.use('/api/v1', healthRoutes);
app.use('/api/v1', mysteryRoutes);
app.use('/api/v1', sessionRoutes);

app.use(errorHandler);

export default app;
