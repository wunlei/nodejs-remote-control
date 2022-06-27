import Jimp from "jimp";
import { getMousePos, screen } from "robotjs";
import { Duplex } from "stream";
import { screenshot_size } from "../../constants";

export async function ScreenAction(command: string, duplex: Duplex) {
  try {
    const mouse = getMousePos();

    const robotImg = screen.capture(
      mouse.x,
      mouse.y,
      screenshot_size,
      screenshot_size
    );

    // BGR to RGB
    robotImg.image.forEach((image: number, i: number) => {
      if (i % 4 === 0) {
        [robotImg.image[i], robotImg.image[i + 2]] = [
          robotImg.image[i + 2],
          robotImg.image[i],
        ];
      }
    });

    const JimpImg = new Jimp(robotImg.width, robotImg.height);

    JimpImg.bitmap.data = robotImg.image;
    const JimpPng = await JimpImg.getBase64Async(Jimp.MIME_PNG);
    const result = JimpPng.replace("data:image/png;base64,", "");
    duplex.write(`prnt_scrn ${result}`);
    console.log(`Success: ${command}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${command} : ${error.message}`);
    } else {
      console.error(error);
    }
  }
}
