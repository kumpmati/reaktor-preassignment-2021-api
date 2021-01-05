import express from "express";
import { Server } from "http";
import { apiRoutes } from "../api";
import { mockApiRoutes } from "../mock/api";
import { Config } from "../types";

/**
 * Starts the server
 * @returns {Server}
 */
export const start = (config: Config = { port: 9000 }): Server => {
  if (config.development) console.warn("WARNING: running in development mode");
  const app = express();

  app.use("/api", config.development ? mockApiRoutes : apiRoutes);

  return app.listen(config.port, () =>
    console.log("running on port", config.port)
  );
};
