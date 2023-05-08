# 🧍 minecraft-skins

Module to create 2D renders from Minecraft skins textures.

![Technoblade head](https://i.imgur.com/X6cEnpM.png)
![Technoblade full body](https://i.imgur.com/TiEcV5v.png)

# Usage

1. First, import the module:

    ```js
    // Using CommonJS
    const { renderFullBody, renderHead } = require("minecraft-skins");

    // Using TypeScript or ESM
    import { renderFullBody, renderHead } from "minecraft-skins";
    ```

2. Then, call the `renderFullBody` or `renderHead` function by passing a valid skin buffer:

    ```ts
    // Reading a file with a skin texture
    const skin = await readFile(path.join(__dirname, "skin.png"));

    // Using promises
    renderFullBody(skin).then(async (render) => {
        await writeFile(path.join(__dirname, "skin_full_body.png"), render);
    });
    renderHead(skin).then(async (render) => {
        await writeFile(path.join(__dirname, "skin_head.png"), render);
    });

    // Using async/await
    const fullBody = await renderFullBody(skin);
    await writeFile(path.join(__dirname, "skin_full_body.png"), render);
    const head = await renderHead(skin);
    await writeFile(path.join(__dirname, "skin_head.png"), render);

    ```
# API

# `renderFullBody` - `renderHead`

```ts
renderFullBody(skin: Buffer | Image, options?: SkinImageOptions) => Promise<Buffer>
// Image class belongs to canvas
```
Render a 2D full image of the skin's body.

```ts
renderHead(skin: Buffer | Image, options?: SkinImageOptions) => Promise<Buffer>
// Image class belongs to canvas
```
Render a 2D image of the skin's head. 

Both of the functions above have the same following arguments:

- skin (`Buffer | Image`): Skin texture.
- options.scale (optional, `number`): Scale of the generated image. Defaults to `1`.
- options.layers (optional, `boolean`): If the renderer should include the layers of the skin. Defaults to `true`.

Both of the functions return a `Promise` with the `Buffer` of the image, or throw an error if something happens during the process.

# `checkSlim`
```ts
checkSlim(skin: Buffer | Image) => Promise<boolean>
// Image class belongs to canvas
```
Utility function to check if exactly the pixel located at `x=55` and `y=20` in a skin is empty. This usually means that the skin is slim (Alex based skins, `3px` arms). This pixel is near the arm textures, commonly having a color in the classic skin format. Returns a `Promise` with a `boolean` indicating if the skin is slim or not.