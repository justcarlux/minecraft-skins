/**
 * Options for the renderers
 * @interface SkinImageOptions
*/
export interface SkinImageOptions {
    /** Scale of the generated image. Defaults to `1` */
    scale?: number,
    /** If the renderer should include the layers of the skin. Defaults to `true` */
    layers?: boolean
}