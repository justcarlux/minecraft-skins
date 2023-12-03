import { Image, loadImage } from "canvas";
import { getFullBodyLegacy, getFullBodyModern } from "../renderers/full-body";
import { SkinImageOptions } from "./structures/SkinImageOptions";

/**
 * Render a 2D full image of the skin's body. Returns a `Promise` with the `Buffer` of the image, or throws an error if something happens during the process
 * @param {Buffer} skin Skin texture
 * @param {options} SkinImageOptions Options for the renderer
 * @returns {Promise<Buffer>} `Buffer` of the image. Throws an error if something happened while generating the image
*/
export async function renderFullBody(skin: Buffer | Image, options?: SkinImageOptions): Promise<Buffer> {
    
    // Load image
    const image = skin instanceof Image ? skin : await loadImage(skin);

    // Detects if the skin has half of the width amount on the height (old skins before 1.8)
    // or the same number on the width and height (current modern skin format)
    const inputScale = Math.floor(image.width / 64);
    const outputScale = options?.scale ?? 1;
    const layers = options?.layers ?? true;
    if (image.height === Math.floor(image.width / 2)) {
        return await getFullBodyLegacy(image, { inputScale, outputScale, layers });
    }
    return await getFullBodyModern(image, { inputScale, outputScale, layers });

}