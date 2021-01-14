import WebSocket, { Server } from "ws";
import { Server as HttpServer } from "http";

export const startWebSocketServer = (app: HttpServer) => {
  const wss = new Server({ server: app });

  const broadcast = (event: string) => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) client.send(event);
    });
  };

  console.log("WSS running");
  return { wss, broadcast };
};
