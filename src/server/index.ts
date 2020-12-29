import express from "express";
import { Server } from "http";
import { apiRoutes } from "../api";

/**
 * Starts the server
 * @returns {Server}
 */
export const start = (): Server => {
  const PORT = +process.env.PORT || 9000;

  const app = express();
  app.use("/api", apiRoutes);
  return app.listen(PORT, () => console.log("running on port", PORT));
};
