import express from 'express';
import { createMystery, getMystery, getMysteryStatus, getEvidence } from '../controllers/mysteryController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { createMysterySchema } from '../validators/mysterySchemas.js';

export const mysteryRoutes = express.Router();

mysteryRoutes.post('/mysteries', validateRequest(createMysterySchema), createMystery);
mysteryRoutes.get('/mysteries/:mysteryId', getMystery);
mysteryRoutes.get('/mysteries/:mysteryId/status', getMysteryStatus);
mysteryRoutes.get('/mysteries/:mysteryId/evidence', getEvidence);
