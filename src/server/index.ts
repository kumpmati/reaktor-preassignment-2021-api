import { Server } from "http";
import { Config } from "../types";
import { startBackgroundFetch } from "../service/fetch";
import { productsCache } from "../api/products";
import { DEFAULT_CONFIG } from "../config";
import { startExpress } from "./express";
import { startWebSocketServer } from "./websocket";

/**
 * Starts the server
 * @returns {Server}
 */
export const start = (config: Config = DEFAULT_CONFIG): Server => {
  if (config.development) console.warn("WARNING: running in development mode");

  const app = startExpress(config);
  const { broadcast } = startWebSocketServer(app);

  startBackgroundFetch({
    broadcast,
    interval: 2 * 60 * 1000,
    cache: productsCache,
    immediate: true,
  });

  return app;
};
