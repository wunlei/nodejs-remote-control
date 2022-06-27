import { Duplex } from "stream";
import { dragMouse, getMousePos, mouseToggle } from "robotjs";
import { getRad } from "../../utils";

export const drawCommands = ["draw_circle", "draw_square", "draw_rectangle"];

export function drawAction(
  command: string,
  commandArgs: number[],
  duplex: Duplex
) {
  try {
    const mouse = getMousePos();

    if (command === "draw_circle") {
      const radius = commandArgs[0];
      const circe_deg = 36;
      mouseToggle("down");
      for (let i = circe_deg; i >= 0; i -= 0.5) {
        const deg = i * 10;
        const rad = getRad(deg);

        const x = mouse.x - radius * Math.sin(rad);
        const y = mouse.y - radius * Math.cos(rad) + radius;
        dragMouse(x, y);
      }
      mouseToggle("up");
      duplex.write(`${command}\0`);
      console.log(`Success: ${command}, radius: ${radius}`);
    } else if (command === "draw_square") {
      const width = commandArgs[0];

      // mouseToggle("down");
      // mouseToggle("up");
      mouseToggle("down");
      dragMouse(mouse.x + width, mouse.y);
      dragMouse(mouse.x + width, mouse.y + width);
      dragMouse(mouse.x, mouse.y + width);
      dragMouse(mouse.x, mouse.y);
      mouseToggle("up");

      duplex.write(`${command}\0`);
      console.log(`Success: ${command}, width: ${width}`);
    } else if (command === "draw_rectangle") {
      const width = commandArgs[0];
      const length = commandArgs[1];

      // mouseToggle("down");
      // mouseToggle("up");
      mouseToggle("down");
      dragMouse(mouse.x + width, mouse.y);
      dragMouse(mouse.x + width, mouse.y + length);
      dragMouse(mouse.x, mouse.y + length);
      dragMouse(mouse.x, mouse.y);
      mouseToggle("up");

      duplex.write(`${command}\0`);
      console.log(`Success: ${command}, width: ${width}, length: ${length}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${command} : ${error.message}`);
    } else {
      console.error(error);
    }
  }
}
