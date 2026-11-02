import mongoose from 'mongoose';
import { config } from './env.js';

export const connectDatabase = async () => {
  try {
    if (!config.mongoUri) {
      console.warn('MongoDB connection string missing. Continuing without DB connection for local scaffolding.');
      return null;
    }

    const connection = await Promise.race([
      mongoose.connect(config.mongoUri, {
        serverSelectionTimeoutMS: 3000,
      }),
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error('MongoDB connection timed out after 3 seconds.')), 3000);
      }),
    ]);

    console.log('MongoDB connected successfully.');
    return connection;
  } catch (error) {
    console.warn('MongoDB connection failed. Continuing in local demo mode:', error.message);
    return null;
  }
};
