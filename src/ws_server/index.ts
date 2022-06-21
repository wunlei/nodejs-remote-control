import { createWebSocketStream, WebSocket } from "ws";

export function wsStream(ws: WebSocket) {
  const duplex = createWebSocketStream(ws, {
    encoding: "utf8",
    decodeStrings: false,
  });

  duplex.on("data", function (data: string) {
    console.log(data);
    const parsedData = data.split(" ");
    const command = parsedData[0];
    const commandArgs = parsedData.slice(1).map((el) => parseInt(el, 10));
  });

  duplex.on("error", (error) => {
    console.error(error);
  });
}
