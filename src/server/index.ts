import { createServer, Server } from "http";
import { requestListener } from "./listener";

/**
 * Starts the server
 * @returns {Server}
 */
export const start = (): Server => {
  const PORT = +process.env.PORT || 9000;

  const server = createServer(requestListener);
  server.listen(PORT, () => console.log("listening on port", PORT));
  return server;
};
