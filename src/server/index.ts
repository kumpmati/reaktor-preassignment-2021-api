import express from "express";
import cors from "cors";
import { Server } from "http";
import { apiRoutes } from "../api";
import { mockApiRoutes } from "../mock/api";
import { Config } from "../types";

/**
 * domains allowed to use API
 */
const allowedOrigins: RegExp[] = [
  /localhost/,
  /reaktor-preassignment.netlify.app/,
];

/**
 * Starts the server
 * @returns {Server}
 */
export const start = (config: Config = { port: 9000 }): Server => {
  if (config.development) console.warn("WARNING: running in development mode");
  const app = express();

  app.use(
    cors({
      origin: allowedOrigins,
    })
  );
  app.use("/api", config.development ? mockApiRoutes : apiRoutes);

  return app.listen(config.port, () =>
    console.log("running on port", config.port)
  );
};
