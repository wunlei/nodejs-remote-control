import { Duplex } from "stream";
import { getMousePos, moveMouse } from "robotjs";

export const mouseCommands = [
  "mouse_position",
  "mouse_up",
  "mouse_down",
  "mouse_left",
  "mouse_right",
];

export function mouseAction(
  command: string,
  commandArgs: number[],
  duplex: Duplex
) {
  try {
    const mouse = getMousePos();
    if (command === "mouse_position") {
      duplex.write(`${command} ${mouse.x},${mouse.y}\0`);
      console.log(`Success: ${command} ${mouse.x},${mouse.y}`);
    } else if (command === "mouse_up") {
      const offset = commandArgs[0];
      moveMouse(mouse.x, mouse.y - offset);
      duplex.write(`${command}\0`);
      console.log(`Success: ${command} ${offset}`);
    } else if (command === "mouse_down") {
      const offset = commandArgs[0];
      moveMouse(mouse.x, mouse.y + offset);
      duplex.write(`${command}\0`);
      console.log(`Success: ${command} ${offset}`);
    } else if (command === "mouse_left") {
      const offset = commandArgs[0];
      moveMouse(mouse.x - offset, mouse.y);
      duplex.write(`${command}\0`);
      console.log(`Success: ${command} ${offset}`);
    } else if (command === "mouse_right") {
      const offset = commandArgs[0];
      moveMouse(mouse.x + offset, mouse.y);
      duplex.write(`${command}\0`);
      console.log(`Success: ${command} ${offset}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${command} : ${error.message}`);
    } else {
      console.error(error);
    }
  }
}
