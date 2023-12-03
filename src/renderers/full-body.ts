import { createCanvas, Image } from "canvas";
import { checkSlim } from "../utils";
import { RendererOptions } from "./structures/RendererOptions";

export async function getFullBodyLegacy(image: Image, { inputScale, layers, outputScale }: RendererOptions) {

    // Load image stuff
    const canvas = createCanvas(16 * outputScale, 32 * outputScale);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    // Draw right leg (left leg from third person)
    ctx.drawImage(image, 4 * inputScale, 20 * inputScale, 4 * inputScale, 12 * inputScale, 4 * outputScale, 20 * outputScale, 4 * outputScale, 12 * outputScale);

    // Draw left leg (right leg from third person) - In 1.7 skins this leg is the same as the right one, but flipped
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(image, 4 * inputScale, 20 * inputScale, 4 * inputScale, 12 * inputScale, -12 * outputScale, 20 * outputScale, 4 * outputScale, 12 * outputScale);
    ctx.restore();

    // Draw right arm (left arm from third person)
    ctx.drawImage(image, 44 * inputScale, 20 * inputScale, 4 * inputScale, 12 * inputScale, 0, 8 * outputScale, 4 * outputScale, 12 * outputScale);

    // Draw left arm (right arm from third person) - In 1.7 skins this arm is the same as the right one, but flipped
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(image, 44 * inputScale, 20 * inputScale, 4 * inputScale, 12 * inputScale, -16 * outputScale, 8 * outputScale, 4 * outputScale, 12 * outputScale);
    ctx.restore();

    // Draw head
    ctx.drawImage(image, 8 * inputScale, 8 * inputScale, 8 * inputScale, 8 * inputScale, 4 * outputScale, 0, 8 * outputScale, 8 * outputScale); 
    if (layers) ctx.drawImage(image, 40 * inputScale, 8 * inputScale, 8 * inputScale, 8 * inputScale, 4 * outputScale, 0, 8 * outputScale, 8 * outputScale);

    // Draw chest
    ctx.drawImage(image, 20 * inputScale, 20 * inputScale, 8 * inputScale, 12 * inputScale, 4 * outputScale, 8 * outputScale, 8 * outputScale, 12 * outputScale);

    // Return buffer as a Promise
    return await new Promise<Buffer>((resolve, reject) => {
        canvas.toBuffer((err, buf) => {
            if (err) reject(err);
            resolve(buf);
        }, "image/png")
    });

}

export async function getFullBodyModern(image: Image, { inputScale, layers, outputScale }: RendererOptions) {

    // Load image stuff
    const canvas = createCanvas(16 * outputScale, 32 * outputScale);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    // Draw head
    ctx.drawImage(image, 8 * inputScale, 8 * inputScale, 8 * inputScale, 8 * inputScale, 4 * outputScale, 0, 8 * outputScale, 8 * outputScale); 
    if (layers) ctx.drawImage(image, 40 * inputScale, 8 * inputScale, 8 * inputScale, 8 * inputScale, 4 * outputScale, 0, 8 * outputScale, 8 * outputScale);

    // Draw chest
    ctx.drawImage(image, 20 * inputScale, 20 * inputScale, 8 * inputScale, 12 * inputScale, 4 * outputScale, 8 * outputScale, 8 * outputScale, 12 * outputScale);
    if (layers) ctx.drawImage(image, 20 * inputScale, 36 * inputScale, 8 * inputScale, 12 * inputScale, 4 * outputScale, 8 * outputScale, 8 * outputScale, 12 * outputScale);

    if (await checkSlim(image)) {

        // Draw right arm (left arm from third person)
        ctx.drawImage(image, 44 * inputScale, 20 * inputScale, 3 * inputScale, 12 * inputScale, 1 * outputScale, 8 * outputScale, 3 * outputScale, 12 * outputScale);
        if (layers) ctx.drawImage(image, 44, 36, 3, 12, 1 * outputScale, 8 * outputScale, 3 * outputScale, 12 * outputScale);

        // Draw left arm (right arm from third person)
        ctx.drawImage(image, 36 * inputScale, 52 * inputScale, 3 * inputScale, 12 * inputScale, 12 * outputScale, 8 * outputScale, 3 * outputScale, 12 * outputScale);
        if (layers) ctx.drawImage(image, 52 * inputScale, 52 * inputScale, 3 * inputScale, 12 * inputScale, 12 * outputScale, 8 * outputScale, 3 * outputScale, 12 * outputScale);

    } else {

        // Draw right arm (left arm from third person)
        ctx.drawImage(image, 44 * inputScale, 20 * inputScale, 4 * inputScale, 12 * inputScale, 0, 8 * outputScale, 4 * outputScale, 12 * outputScale);
        if (layers) ctx.drawImage(image, 44 * inputScale, 36 * inputScale, 4 * inputScale, 12 * inputScale, 0, 8 * outputScale, 4 * outputScale, 12 * outputScale);

        // Draw left arm (right arm from third person)
        ctx.drawImage(image, 36 * inputScale, 52 * inputScale, 4 * inputScale, 12 * inputScale, 12 * outputScale, 8 * outputScale, 4 * outputScale, 12 * outputScale);
        if (layers) ctx.drawImage(image, 52 * inputScale, 52 * inputScale, 4 * inputScale, 12 * inputScale, 12 * outputScale, 8 * outputScale, 4 * outputScale, 12 * outputScale);

    }

    // Draw left leg (right leg from third person)
    ctx.drawImage(image, 20 * inputScale, 52 * inputScale, 4 * inputScale, 12 * inputScale, 8 * outputScale, 20 * outputScale, 4 * outputScale, 12 * outputScale);
    if (layers) ctx.drawImage(image, 4 * inputScale, 52 * inputScale, 4 * inputScale, 12 * inputScale, 8 * outputScale, 20 * outputScale, 4 * outputScale, 12 * outputScale);

    // Draw right leg (left leg from third person)
    ctx.drawImage(image, 4 * inputScale, 20 * inputScale, 4 * inputScale, 12 * inputScale, 4 * outputScale, 20 * outputScale, 4 * outputScale, 12 * outputScale);
    if (layers) ctx.drawImage(image, 4 * inputScale, 36 * inputScale, 4 * inputScale, 12 * inputScale, 4 * outputScale, 20 * outputScale, 4 * outputScale, 12 * outputScale);
    
    // Return buffer as a Promise
    return await new Promise<Buffer>((resolve, reject) => {
        canvas.toBuffer((err, buf) => {
            if (err) reject(err);
            resolve(buf);
        }, "image/png")
    });

}