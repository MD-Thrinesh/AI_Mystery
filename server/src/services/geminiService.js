import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/env.js';

export const geminiService = {
  async generateMysteryPlan(payload) {
    if (!config.geminiApiKey) {
      return {
        success: true,
        data: {
          title: 'The Glass Ledger',
          scenario: payload.scenario,
          difficulty: payload.difficulty,
          mysteryType: payload.mysteryType,
          suspectCount: payload.suspectCount,
        },
      };
    }

    const genAI = new GoogleGenerativeAI(config.geminiApiKey);
    const model = genAI.getGenerativeModel({ model: config.geminiModel });
    const prompt = `Create a fictional mystery based on this scenario: ${payload.scenario}`;
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    return {
      success: true,
      data: { raw: text },
    };
  },
};
