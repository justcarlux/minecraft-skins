import { Image, loadImage } from "canvas";
import { fullBodySkin32, fullBodySkin64 } from "./renderers/full-body";
import { getHead } from "./renderers/head";
import { checkSlim } from "./utils";

/**
 * Options for the renderers
 * @interface SkinImageOptions
*/
interface SkinImageOptions {
    /** Scale of the generated image. Defaults to `1` */
    scale?: number,
    /** If the renderer should include the layers of the skin. Defaults to `true` */
    layers?: boolean
}

/**
 * Render a 2D full image of the skin's body. Returns a `Promise` with the `Buffer` of the image, or throws an error if something happens during the process
 * @param {Buffer} skin Skin texture
 * @param {options} SkinImageOptions Options for the renderer
 * @returns {Promise<Buffer>} `Buffer` of the image. Throws an error if something happened while generating the image
*/
async function renderFullBody(skin: Buffer | Image, options?: SkinImageOptions): Promise<Buffer> {
    
    // Load image
    const image = skin instanceof Image ? skin : await loadImage(skin);

    // Detects if the skin has a height of 32px (old skins before 1.8)
    // or a height of 64px (current modern skin format)
    const scale = options?.scale ?? 1;
    const layers = options?.layers ?? true;
    if (image.height < 64) return await fullBodySkin32(image, { scale, layers });
    return await fullBodySkin64(image, { scale, layers });

}


/**
 * Render a 2D image of the skin's head. Returns a `Promise` with the `Buffer` of the image, or throws an error if something happens during the process
 * @param {Buffer} skin Skin texture
 * @param {options} SkinImageOptions Options for the renderer
 * @returns {Promise<Buffer>} `Buffer` of the image. Throws an error if something happened while generating the image
*/
async function renderHead(skin: Buffer | Image, options?: SkinImageOptions): Promise<any> {

    // Load image
    const image = skin instanceof Image ? skin : await loadImage(skin);

    // Render image
    const scale = options?.scale ?? 1;
    const layers = options?.layers ?? true;
    return await getHead(image, { scale, layers });

}

export { renderFullBody, renderHead, checkSlim, SkinImageOptions };