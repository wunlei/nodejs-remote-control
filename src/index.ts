import "dotenv/config";
import { httpServer } from "./http_server/index";
import WebSocket, { WebSocketServer } from "ws";
import { HTTP_PORT_DEFAULT, WS_PORT_DEFAULT } from "./constants/index";
import { wsStream } from "./ws_server";

const HTTP_PORT = process.env.HTTP_PORT || HTTP_PORT_DEFAULT;
const WS_PORT = Number(process.env.WS_PORT) || WS_PORT_DEFAULT;

console.log(`Start static http server on http://localhost:${HTTP_PORT}`);

httpServer.listen(HTTP_PORT);

export const wsServer = new WebSocketServer({ port: WS_PORT });

wsServer.on("connection", function connection(ws) {
  console.log("Client connected");
  wsStream(ws);

  ws.on("close", () => {
    console.log("Connection closed");
  });

  ws.on("error", (error) => {
    console.error(error);
  });
});

wsServer.on("error", (error) => {
  console.error(error);
});

wsServer.on("close", () => {
  console.log("Server closed");
});

process.on("SIGINT", () => {
  wsServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.close();
    }
  });

  wsServer.close();
});
