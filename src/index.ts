import { config } from "dotenv";
import { start } from "./server";
config(); // read environment variables

start({
  port: +process.env.PORT || 9000,
  development: process.env.ENV === "development",
});
