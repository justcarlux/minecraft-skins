import { createCanvas, Image, loadImage } from "canvas";
import { checkSlim, StrictSkinImageOptions } from "../utils";

export async function fullBodySkin32(image: Image, options: StrictSkinImageOptions) {

    // Load image stuff
    const canvas = createCanvas(16 * options.scale, 32 * options.scale);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    // Draw right leg (left leg from third person)
    ctx.drawImage(image, 4, 20, 4, 12, 4 * options.scale, 20 * options.scale, 4 * options.scale, 12 * options.scale);

    // Draw left leg (right leg from third person) - In 1.7 skins this leg is the same as the right one, but flipped
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(image, 4, 20, 4, 12, -12 * options.scale, 20 * options.scale, 4 * options.scale, 12 * options.scale);
    ctx.restore();

    // Draw right arm (left arm from third person)
    ctx.drawImage(image, 44, 20, 4, 12, 0, 8 * options.scale, 4 * options.scale, 12 * options.scale);

    // Draw left arm (right arm from third person) - In 1.7 skins this arm is the same as the right one, but flipped
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(image, 44, 20, 4, 12, -16 * options.scale, 8 * options.scale, 4 * options.scale, 12 * options.scale);
    ctx.restore();

    // Draw head
    ctx.drawImage(image, 8, 8, 8, 8, 4 * options.scale, 0, 8 * options.scale, 8 * options.scale); 
    if (options.layers) ctx.drawImage(image, 40, 8, 8, 8, 4 * options.scale, 0, 8 * options.scale, 8 * options.scale);

    // Draw chest
    ctx.drawImage(image, 20, 20, 8, 12, 4 * options.scale, 8 * options.scale, 8 * options.scale, 12 * options.scale);

    // Return buffer as a Promise
    return await new Promise<Buffer>((resolve, reject) => {
        canvas.toBuffer((err, buf) => {
            if (err) reject(err);
            resolve(buf);
        }, "image/png")
    });

}

export async function fullBodySkin64(image: Image, options: StrictSkinImageOptions) {

    // Load image stuff
    const canvas = createCanvas(16 * options.scale, 32 * options.scale);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    // Draw head
    ctx.drawImage(image, 8, 8, 8, 8, 4 * options.scale, 0, 8 * options.scale, 8 * options.scale); 
    if (options.layers) ctx.drawImage(image, 40, 8, 8, 8, 4 * options.scale, 0, 8 * options.scale, 8 * options.scale);

    // Draw chest
    ctx.drawImage(image, 20, 20, 8, 12, 4 * options.scale, 8 * options.scale, 8 * options.scale, 12 * options.scale);
    if (options.layers) ctx.drawImage(image, 20, 36, 8, 12, 4 * options.scale, 8 * options.scale, 8 * options.scale, 12 * options.scale);

    if (await checkSlim(image)) {

        // Draw right arm (left arm from third person)
        ctx.drawImage(image, 44, 20, 3, 12, 1 * options.scale, 8 * options.scale, 3 * options.scale, 12 * options.scale);
        if (options.layers) ctx.drawImage(image, 44, 36, 3, 12, 1 * options.scale, 8 * options.scale, 3 * options.scale, 12 * options.scale);

        // Draw left arm (right arm from third person)
        ctx.drawImage(image, 36, 52, 3, 12, 12  * options.scale, 8 * options.scale, 3 * options.scale, 12 * options.scale);
        if (options.layers) ctx.drawImage(image, 52, 52, 3, 12, 12  * options.scale, 8 * options.scale, 3 * options.scale, 12 * options.scale);

    } else {

        // Draw right arm (left arm from third person)
        ctx.drawImage(image, 44, 20, 4, 12, 0, 8 * options.scale, 4 * options.scale, 12 * options.scale);
        if (options.layers) ctx.drawImage(image, 44, 36, 4, 12, 0, 8 * options.scale, 4 * options.scale, 12 * options.scale);

        // Draw left arm (right arm from third person)
        ctx.drawImage(image, 36, 52, 4, 12, 12 * options.scale, 8 * options.scale, 4 * options.scale, 12 * options.scale);
        if (options.layers) ctx.drawImage(image, 52, 52, 4, 12, 12 * options.scale, 8 * options.scale, 4 * options.scale, 12 * options.scale);

    }

    // Draw left leg (right leg from third person)
    ctx.drawImage(image, 20, 52, 4, 12, 8 * options.scale, 20 * options.scale, 4 * options.scale, 12 * options.scale);
    if (options.layers) ctx.drawImage(image, 4, 52, 4, 12, 8 * options.scale, 20 * options.scale, 4 * options.scale, 12 * options.scale);

    // Draw right leg (left leg from third person)
    ctx.drawImage(image, 4, 20, 4, 12, 4 * options.scale, 20 * options.scale, 4 * options.scale, 12 * options.scale);
    if (options.layers) ctx.drawImage(image, 4, 36, 4, 12, 4 * options.scale, 20 * options.scale, 4 * options.scale, 12 * options.scale);
    
    // Return buffer as a Promise
    return await new Promise<Buffer>((resolve, reject) => {
        canvas.toBuffer((err, buf) => {
            if (err) reject(err);
            resolve(buf);
        }, "image/png")
    });

}