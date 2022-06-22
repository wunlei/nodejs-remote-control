import { createWebSocketStream, WebSocket } from "ws";
import { drawAction, drawCommands } from "./components/Draw";
import { mouseAction, mouseCommands } from "./components/Mouse";

export function wsStream(ws: WebSocket) {
  const duplex = createWebSocketStream(ws, {
    encoding: "utf8",
    decodeStrings: false,
  });

  duplex.on("data", function (data: string) {
    const parsedData = data.split(" ");
    const command = parsedData[0];
    const commandArgs = parsedData.slice(1).map((el) => parseInt(el, 10));

    if (mouseCommands.includes(command)) {
      mouseAction(command, commandArgs, duplex);
    } else if (drawCommands.includes(command)) {
      drawAction(command, commandArgs, duplex);
    }
  });

  duplex.on("error", (error) => {
    console.error(error);
  });
}
