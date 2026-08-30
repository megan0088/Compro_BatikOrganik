import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { blogPosts, campaigns, categories, slugify } from "@/lib/content";

/**
 * Dihasilkan dari daftar route saat build, bukan ditulis tangan — jadi tidak
 * bisa basi ketika kategori, kampanye, atau artikel bertambah.
 *
 * URL-nya absolut memakai SITE.url, sumber yang sama dengan `metadataBase`.
 * Kalau situs nanti tayang di domain lain, cukup ubah satu tempat itu.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${SITE.url}${path}`;

  const statis: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: url("/collection"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: url("/about-batik"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: url("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: url("/gallery"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/faq"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: url("/review"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/partnership"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: url("/partnership/hampers"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: url("/partnership/build"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: url("/partnership/custom"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: url("/map-batik"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: url("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const koleksi: MetadataRoute.Sitemap = categories.map((c) => ({
    url: url(`/collection/${c.id}`),
    lastModified: new Date(c.updated_at ?? now),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const kampanye: MetadataRoute.Sitemap = campaigns.map((c) => ({
    url: url(`/campaign/${c.id}`),
    lastModified: new Date(c.updated_at ?? now),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  /*
   * Slug artikel diturunkan dari judul — API lama tidak memberi id maupun
   * slug. Karena itu URL blog ini BARU, belum pernah terindeks, jadi
   * sitemap yang menentukan seberapa cepat Google menemukannya.
   */
  const artikel: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: url(`/blog/${slugify(p.title)}`),
    lastModified: new Date(p.created_at),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...statis, ...koleksi, ...kampanye, ...artikel];
}
