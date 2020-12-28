import { IncomingMessage, RequestListener, ServerResponse } from "http";

/**
 * Handles incoming HTTP requests
 * @param {IncomingMessage} req Request
 * @param {ServerResponse} res Response
 */
export const requestListener: RequestListener = (
  req: IncomingMessage,
  res: ServerResponse
) => {
  if (req.method !== "GET") {
    res.writeHead(405, "Method not allowed");
    res.end();
    return;
  }

  res.writeHead(200);
  res.end("hello!");
};
