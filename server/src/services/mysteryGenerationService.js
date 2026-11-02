import { geminiService } from './geminiService.js';
import { validateMysteryData } from './mysteryValidationService.js';

export const generateMystery = async (payload) => {
  const validation = validateMysteryData(payload);
  if (!validation.valid) {
    throw new Error(validation.errors[0]);
  }

  const result = await geminiService.generateMysteryPlan(payload);
  return {
    ...payload,
    ...result.data,
    status: 'Ready',
  };
};
