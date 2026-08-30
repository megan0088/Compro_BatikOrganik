import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

/**
 * Mengatur PENELUSURAN, bukan pengindeksan — untuk mencegah sebuah halaman
 * muncul di hasil pencarian yang dipakai `noindex`, bukan berkas ini.
 *
 * `/admin` ditutup karena di domain lama alamat itu adalah panel CMS.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
