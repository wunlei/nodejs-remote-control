import { createWebSocketStream, WebSocket } from "ws";
import { drawAction, drawCommands } from "./components/Draw";
import { mouseAction, mouseCommands } from "./components/Mouse";
import { ScreenAction } from "./components/Screen";

export function wsStream(ws: WebSocket) {
  const duplex = createWebSocketStream(ws, {
    encoding: "utf8",
    decodeStrings: false,
  });

  duplex.on("data", async (data: string) => {
    const parsedData = data.split(" ");
    const command = parsedData[0];
    const commandArgs = parsedData.slice(1).map((el) => parseInt(el, 10));

    if (mouseCommands.includes(command)) {
      mouseAction(command, commandArgs, duplex);
    } else if (drawCommands.includes(command)) {
      drawAction(command, commandArgs, duplex);
    } else if (command === "prnt_scrn") {
      await ScreenAction(command, duplex);
    }
  });

  duplex.on("error", (error) => {
    console.error(error);
  });
}
