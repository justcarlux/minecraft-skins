import { Image, loadImage } from "canvas";
import { SkinImageOptions } from "./structures/SkinImageOptions";
import { getHead } from "../renderers/head";

/**
 * Render a 2D image of the skin's head. Returns a `Promise` with the `Buffer` of the image, or throws an error if something happens during the process
 * @param {Buffer} skin Skin texture
 * @param {options} SkinImageOptions Options for the renderer
 * @returns {Promise<Buffer>} `Buffer` of the image. Throws an error if something happened while generating the image
*/
export async function renderHead(skin: Buffer | Image, options?: SkinImageOptions): Promise<Buffer> {

    // Load image
    const image = skin instanceof Image ? skin : await loadImage(skin);

    // Render image
    const inputScale = Math.floor(image.width / 64);
    const outputScale = options?.scale ?? 1;
    const layers = options?.layers ?? true;
    return await getHead(image, { inputScale, outputScale, layers });

}