import type { MetadataRoute } from "next";

/* Wajib untuk `output: export` — tanpa ini Next menganggapnya rute dinamis. */
export const dynamic = "force-static";
import { NOINDEX, SITE } from "@/lib/constants";

/**
 * Mengatur PENELUSURAN, bukan pengindeksan — untuk mencegah sebuah halaman
 * muncul di hasil pencarian yang dipakai `noindex`, bukan berkas ini.
 *
 * `/admin` ditutup karena di domain lama alamat itu adalah panel CMS.
 */
export default function robots(): MetadataRoute.Robots {
  if (NOINDEX) {
    // Domain uji coba: tutup total, jangan sampai jadi konten duplikat.
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
