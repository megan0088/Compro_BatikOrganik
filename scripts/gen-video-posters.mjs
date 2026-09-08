/*
 * Mendaftarkan poster video ke content/asset-map.json.
 *
 * Poster diunduh sekali dari thumbnail YouTube lalu disimpan sebagai WebP
 * lokal. Tanpa entri di peta aset, `asset()` mengembalikan null dan
 * VideoFacade tampil sebagai kotak gelap tanpa gambar — persis bug yang
 * sempat lolos ke produksi. Script ini bagian dari `build:static` supaya
 * berkas di disk dan peta aset tidak bisa berbeda.
 */
import sharp from "sharp";
import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";

const DIR = "public/assets/video-poster";
const MAP = "content/asset-map.json";
const map = JSON.parse(await readFile(MAP, "utf8"));

let n = 0;
for (const file of await readdir(DIR)) {
  if (!file.endsWith(".webp")) continue;
  const src = `/assets/video-poster/${file}`;
  const { width, height } = await sharp(path.join(DIR, file)).metadata();
  map[`/video-poster/${file}`] = { src, width, height };
  n++;
}
await writeFile(MAP, JSON.stringify(map, null, 1) + "\n");
console.log(`poster video terdaftar: ${n}`);
