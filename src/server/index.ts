import express from "express";
import cors, { CorsOptions } from "cors";
import { Server } from "http";
import { apiRoutes } from "../api";
import { mockApiRoutes } from "../mock/api";
import { Config } from "../types";
import { startBackgroundFetch } from "../service/fetch";
import { productsCache } from "../api/products";

const allowedOrigins: RegExp[] = [/localhost/, /reaktor-preassignment.netlify.app\/\*/];
const corsOptions: CorsOptions = {
  origin: allowedOrigins,
};

/**
 * Starts the server
 * @returns {Server}
 */
export const start = (config: Config = { port: 9000 }): Server => {
  if (config.development) console.warn("WARNING: running in development mode");

  const app = express();

  app.use(cors());
  app.use("/api", config.mock ? mockApiRoutes : apiRoutes);
  startBackgroundFetch(2 * 60 * 1000, productsCache, true);

  return app.listen(config.port, () => console.log("running on port", config.port));
};
