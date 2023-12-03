import { createCanvas, Image } from "canvas";
import { RendererOptions } from "./structures/RendererOptions";

export async function getHead(image: Image, { inputScale, layers, outputScale }: RendererOptions) {

    // Load image
    const canvas = createCanvas(8 * outputScale, 8 * outputScale);
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = false;

    // Load image and draw head
    ctx.drawImage(image, 8 * inputScale, 8 * inputScale, 8 * inputScale, 8 * inputScale, 0, 0, 8 * outputScale, 8 * outputScale);
    if (layers) ctx.drawImage(image, 40 * inputScale, 8 * inputScale, 8 * inputScale, 8 * inputScale, 0, 0, 8 * outputScale, 8 * outputScale);

    // Return buffer as a Promise
    return await new Promise<Buffer>((resolve, reject) => {
        canvas.toBuffer((err, buf) => {
            if (err) reject(err);
            resolve(buf);
        }, "image/png")
    });

}