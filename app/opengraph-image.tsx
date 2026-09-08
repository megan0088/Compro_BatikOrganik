import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = "BatikOrganik — batik pewarna alam, ditenun dari kisah Nusantara";
/* Wajib untuk `output: export` — kartu digambar saat build, bukan on-demand. */
export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * Kartu bawaan untuk seluruh situs. Halaman yang ingin kartunya sendiri
 * cukup menaruh `opengraph-image.tsx` di segmennya — Next memakai yang
 * paling dekat.
 */
export default function Image() {
  return ogImage({ title: "Batik pewarna alam, ditenun dari kisah Nusantara" });
}
