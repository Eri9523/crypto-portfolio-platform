import express, { Application } from "express";
import cors from "cors";
import { config } from "./infrastructure/config/environment";

const app: Application = express();

app.use(cors({ origin: config.cors.origin, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

import authRoutes from "./infrastructure/http/routes/authRoutes";
import { errorHandler } from "./infrastructure/http/middlewares/errorHandler";

app.use("/api/auth", authRoutes);
app.use(errorHandler);

export default app;