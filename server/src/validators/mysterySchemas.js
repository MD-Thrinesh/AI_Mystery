import { z } from 'zod';

export const createMysterySchema = z.object({
  scenario: z.string().trim().min(30, 'Scenario must be at least 30 characters.').max(2000, 'Scenario is too long.'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  mysteryType: z.enum(['theft', 'murder', 'disappearance', 'sabotage', 'general']),
  suspectCount: z.number().int().min(3).max(6),
  evidenceIntensity: z.enum(['standard', 'detailed']),
  setting: z.string().trim().max(300).optional().or(z.literal('')),
});

export const accusationSchema = z.object({
  suspectId: z.string().min(1, 'A suspect must be selected.'),
});
