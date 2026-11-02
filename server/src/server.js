import app from './app.js';
import { config } from './config/env.js';
import { connectDatabase } from './config/database.js';

const startServer = async () => {
  await connectDatabase();

  app.listen(config.port, () => {
    console.log(`AI Mystery Room API running on http://localhost:${config.port}`);
  });
};

startServer().catch((error) => {
  console.error('Server failed to start:', error);
  process.exit(1);
});
