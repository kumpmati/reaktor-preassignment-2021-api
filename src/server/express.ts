import express from "express";
import cors from "cors";
import nocache from "nocache";
import { apiRoutes } from "../api";
import { mockApiRoutes } from "../mock/api";
import { Config } from "../types";

export const startExpress = (config: Config) => {
  const app = express();

  app.use(cors());
  app.use(nocache());
  app.use("/api", config.mock ? mockApiRoutes : apiRoutes);

  return app.listen(config.port, () =>
    console.log("Express running on port", config.port)
  );
};
