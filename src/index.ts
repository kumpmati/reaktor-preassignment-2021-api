import { config } from "dotenv";
import { start } from "./server";
config(); // read environment variables

start({
  port: parseInt(process.env.PORT) || 9000,
  mock: !!process.env.MOCK,
  development: process.env.ENV === "development",
});
