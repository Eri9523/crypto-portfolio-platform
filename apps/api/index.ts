import { config } from "./infrastructure/config/environment";
import { connectDatabase } from "./infrastructure/database/mongo/connection";
import app from "./app";

const startServer = async () => {
  try {
    await connectDatabase();

    // Start listening
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
      console.log(`Environment: ${config.env}`);
      console.log(`CORS enabled for: ${config.cors.origin}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();