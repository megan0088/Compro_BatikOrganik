/*
 * Varian hero untuk <picture> srcset. Hosting statis tidak bisa mengubah
 * ukuran gambar per perangkat, jadi variannya dibuat saat build.
 */
import sharp from "sharp";
import { readFile } from "node:fs/promises";

const map = JSON.parse(await readFile("content/asset-map.json", "utf8"));
const key = Object.keys(map).find((k) => map[k].src.includes("home1/main-banner"));
if (!key) throw new Error("hero tidak ditemukan di asset-map");

const src = "public" + map[key].src;
for (const w of [640, 960, 1400]) {
  const out = src.replace(/\.webp$/, `-${w}.webp`);
  await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 68, effort: 6 }).toFile(out);
}
console.log("varian hero: 640 / 960 / 1400 px");
