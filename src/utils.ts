import { createCanvas, Image, loadImage } from "canvas";

export interface StrictSkinImageOptions {
    scale: number,
    layers: boolean
}

/**
 * Utility function to check if exactly the pixel located at `x=55` and `y=20` in a skin is empty. This usually means that the skin is slim (Alex based skins, `3px` arms). This pixel is near the arm textures, commonly having a color in the classic skin format
 * @param {Image} skin
 * @returns boolean
*/
export async function checkSlim(skin: Buffer | Image): Promise<boolean> {

    const canvas = createCanvas(64, 64);
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = false;

    const image = skin instanceof Image ? skin : await loadImage(skin);
    ctx.drawImage(image, 0, 0, 64, image.height === Math.floor(image.width / 2) ? 32 : 64);
    return ctx.getImageData(55, 20, 1, 1).data.every(e => e === 0);

}