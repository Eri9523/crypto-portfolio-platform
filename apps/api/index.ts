import express, { Application } from "express";
import cors from "cors";
import { config } from "./infrastructure/config/environment";
import { connectDatabase } from "./infrastructure/database/mongo/connection";

const app: Application = express();

app.use(cors({ origin: config.cors.origin, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timeStamp: new Date().toISOString() });
});

import authRoutes from "./infrastructure/http/routes/authRoutes";
import { errorHandler } from "./infrastructure/http/middlewares/errorHandler";

app.use("/api/auth", authRoutes);
app.use(errorHandler);

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

export default app;