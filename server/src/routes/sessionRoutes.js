import express from 'express';
import { createSession, updateProgress, submitAccusation, getSolution } from '../controllers/sessionController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { accusationSchema } from '../validators/mysterySchemas.js';

export const sessionRoutes = express.Router();

sessionRoutes.post('/mysteries/:mysteryId/sessions', createSession);
sessionRoutes.patch('/sessions/:sessionId/progress', updateProgress);
sessionRoutes.post('/sessions/:sessionId/accusation', validateRequest(accusationSchema), submitAccusation);
sessionRoutes.get('/sessions/:sessionId/solution', getSolution);
