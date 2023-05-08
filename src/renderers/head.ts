import { createCanvas, Image, loadImage } from "canvas";
import { StrictSkinImageOptions } from "../utils";

export async function getHead(image: Image, options: StrictSkinImageOptions): Promise<Buffer> {

    // Load image
    const canvas = createCanvas(8 * options.scale, 8 * options.scale);
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = false;

    // Load image and draw head
    ctx.drawImage(image, 8, 8, 8, 8, 0, 0, 8 * options.scale, 8 * options.scale);
    if (options.layers) ctx.drawImage(image, 40, 8, 8, 8, 0, 0, 8 * options.scale, 8 * options.scale);

    // Return buffer as a Promise
    return await new Promise<Buffer>((resolve, reject) => {
        canvas.toBuffer((err, buf) => {
            if (err) reject(err);
            resolve(buf);
        }, "image/png")
    });

}