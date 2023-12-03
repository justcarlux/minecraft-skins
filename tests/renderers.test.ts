import { loadImage } from "canvas";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { renderFullBody, renderHead } from "../src/index";
import { existsSync, mkdirSync } from "fs";

try {
    if (!existsSync(path.join(__dirname, "generated"))) {
        mkdirSync(path.join(__dirname, "generated"));
    }
} catch (err) {}

async function getImage(name: string) {
    const image = await readFile(path.join(__dirname, "skins", name + ".png"));
    return image;
}

async function saveImage(name: string, buffer: Buffer) {
    await writeFile(path.join(__dirname, "generated", name + ".png"), buffer);
}

test("render full body 1.8", async () => {
    const buffer = await getImage("technoblade-1.8");
    const skin = await renderFullBody(buffer);
    await saveImage("technoblade-1.8_render", skin);
    const meta = await loadImage(skin);
    expect(meta.width === 16 && meta.height === 32).toBeTruthy();
}, 15_000);

test("render full body 1.7", async () => {
    const buffer = await getImage("technoblade-1.7");
    const skin = await renderFullBody(buffer);
    await saveImage("technoblade-1.7_render", skin);
    const meta = await loadImage(skin);
    expect(meta.width === 16 && meta.height === 32).toBeTruthy();
}, 15_000);

test("render full body 1.7 at 10x", async () => {
    const buffer = await getImage("technoblade-1.7");
    const skin = await renderFullBody(buffer, { scale: 10 });
    await saveImage("technoblade-1.7_render_10x", skin);
    const meta = await loadImage(skin);
    expect(meta.width === 160 && meta.height === 320).toBeTruthy();
}, 15_000);

test("render full body at 10x scale", async () => {
    const buffer = await getImage("technoblade-1.8");
    const skin = await renderFullBody(buffer, { scale: 10 });
    await saveImage("technoblade-1.8_render_10x", skin);
    const meta = await loadImage(skin);
    expect(meta.width === 160 && meta.height === 320).toBeTruthy();
}, 15_000);

test("render full body at 20x scale", async () => {
    const buffer = await getImage("technoblade-1.8");
    const skin = await renderFullBody(buffer, { scale: 20 });
    await saveImage("technoblade-1.8_render_20x", skin);
    const meta = await loadImage(skin);
    expect(meta.width === 320 && meta.height === 640).toBeTruthy();
}, 15_000);

test("render full body without layers", async () => {
    const buffer = await getImage("technoblade-1.8");
    const skin = await renderFullBody(buffer, { layers: false });
    await saveImage("technoblade-1.8_render_without_layers", skin);
    const meta = await loadImage(skin);
    expect(meta.width === 16 && meta.height === 32).toBeTruthy();
}, 15_000);

test("render head", async () => {
    const buffer = await getImage("technoblade-1.8");
    const skin = await renderHead(buffer);
    await saveImage("technoblade-1.8_render_head", skin);
    const meta = await loadImage(skin);
    expect(meta.width === 8 && meta.height === 8).toBeTruthy();
}, 15_000);

test("render head without layers", async () => {
    const buffer = await getImage("technoblade-1.8");
    const skin = await renderHead(buffer, { layers: false });
    await saveImage("technoblade-1.8_render_head_without_layers", skin);
    const meta = await loadImage(skin);
    expect(meta.width === 8 && meta.height === 8).toBeTruthy();
}, 15_000);

test("render head at 10x scale", async () => {
    const buffer = await getImage("technoblade-1.8");
    const skin = await renderHead(buffer, { scale: 10 });
    await saveImage("technoblade-1.8_render_head_10x", skin);
    const meta = await loadImage(skin);
    expect(meta.width === 80 && meta.height === 80).toBeTruthy();
}, 15_000);

test("render head at 20x scale", async () => {
    const buffer = await getImage("technoblade-1.8");
    const skin = await renderHead(buffer, { scale: 20 });
    await saveImage("technoblade-1.8_render_head_20x", skin);
    const meta = await loadImage(skin);
    expect(meta.width === 160 && meta.height === 160).toBeTruthy();
}, 15_000);

test("render head of high-res (128x) skin", async () => {
    const buffer = await getImage("128x");
    const skin = await renderHead(buffer);
    await saveImage("128x_render_head", skin);
    const meta = await loadImage(skin);
    expect(meta.width === 8 && meta.height === 8).toBeTruthy();
}, 15_000);

test("render head of high-res (128x) skin at 10x scale", async () => {
    const buffer = await getImage("128x");
    const skin = await renderHead(buffer, { scale: 10 });
    await saveImage("128x_render_head_10x", skin);
    const meta = await loadImage(skin);
    expect(meta.width === 80 && meta.height === 80).toBeTruthy();
}, 15_000);

test("render full body of high-res (128x) skin", async () => {
    const buffer = await getImage("128x");
    const skin = await renderFullBody(buffer);
    await saveImage("128x_render", skin);
    const meta = await loadImage(skin);
    expect(meta.width === 16 && meta.height === 32).toBeTruthy();
}, 15_000);

test("render full body of high-res (128x) skin at 10x scale", async () => {
    const buffer = await getImage("128x");
    const skin = await renderFullBody(buffer, { scale: 10 });
    await saveImage("128x_render_10x", skin);
    const meta = await loadImage(skin);
    expect(meta.width === 160 && meta.height === 320).toBeTruthy();
}, 15_000);

test("render head of high-res (512x) skin", async () => {
    const buffer = await getImage("512x");
    const skin = await renderHead(buffer);
    await saveImage("512x_render_head", skin);
    const meta = await loadImage(skin);
    expect(meta.width === 8 && meta.height === 8).toBeTruthy();
}, 15_000);

test("render head of high-res (512x) skin at 20x scale", async () => {
    const buffer = await getImage("512x");
    const skin = await renderHead(buffer, { scale: 20 });
    await saveImage("512x_render_head_20x", skin);
    const meta = await loadImage(skin);
    expect(meta.width === 160 && meta.height === 160).toBeTruthy();
}, 15_000);

test("render full body of high-res (512x) skin", async () => {
    const buffer = await getImage("512x");
    const skin = await renderFullBody(buffer);
    await saveImage("512x_render", skin);
    const meta = await loadImage(skin);
    expect(meta.width === 16 && meta.height === 32).toBeTruthy();
}, 15_000);

test("render full body of high-res (512x) skin at 20x scale", async () => {
    const buffer = await getImage("512x");
    const skin = await renderFullBody(buffer, { scale: 20 });
    await saveImage("512x_render_20x", skin);
    const meta = await loadImage(skin);
    expect(meta.width === 320 && meta.height === 640).toBeTruthy();
}, 15_000);