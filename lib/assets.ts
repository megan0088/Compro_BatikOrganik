import assetMap from "@/content/asset-map.json";

export type Asset = { src: string; width: number; height: number };

const MAP = assetMap as Record<
  string,
  { src: string; width?: number; height?: number }
>;

/**
 * Memetakan path gambar dari API lama ke berkas lokal di /public/assets,
 * lengkap dengan dimensi asli (dibaca dari header berkas) supaya
 * <Image> tidak pernah menyebabkan layout shift.
 *
 * API kadang mengeluarkan slash ganda — "/images/home/carousel//BTS OF BATIK.jpg".
 * Itu akar URL rusak di situs lama, jadi path dinormalkan dulu.
 */
export function asset(path: string | null | undefined): Asset | null {
  if (!path) return null;
  const e = MAP[path.replace(/\/+/g, "/")];
  if (!e || e.width == null || e.height == null) return null;
  return { src: e.src, width: e.width, height: e.height };
}
