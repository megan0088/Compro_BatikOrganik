import type { NextConfig } from "next";

/*
 * Satu repo, dua target.
 *
 * Vercel (default)          : mode server — redirect ditangani Next.
 * Hostinger (STATIC_EXPORT=1): `next build` menghasilkan folder `out/` berisi
 *   HTML statis. Mode ini TIDAK mendukung `redirects()`, jadi aturan yang sama
 *   digandakan ke `public/.htaccess` — dihasilkan oleh `scripts/gen-htaccess.mjs`
 *   dari sumber yang sama supaya keduanya tidak bisa berbeda.
 *
 * `images.unoptimized` menyala di kedua mode: hosting statis tidak punya
 * Image Optimization API, dan aset di repo sudah WebP seukuran tampilnya —
 * jadi mengoptimalkan ulang tidak memberi apa-apa.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

export const REDIRECTS = [
    { source: "/blog/0", destination: "/blog/9th-tpo-general-assembly-common-prosperity-in-tourism-through-open-partnership-2", permanent: true },
    { source: "/blog/1", destination: "/blog/indonesia-city-expo-2022-padang-7-10-agustus-2022", permanent: true },
    { source: "/blog/2", destination: "/blog/tourism-trade-investment-expo-2022", permanent: true },
    { source: "/blog/3", destination: "/blog/event-g-20-kolaborasi-fashion-show-2022", permanent: true },
    { source: "/blog/4", destination: "/blog/gebyar-ekonomi-kreatif-bogor-creative-center-22-23-december-2022", permanent: true },
    { source: "/blog/5", destination: "/blog/inacraft-2023-1-5-maret-jakarta-convention-center", permanent: true },
    { source: "/blog/6", destination: "/blog/ragam-pesona-batik-bogor-chapter-1-dan-2-2022-2023", permanent: true },
    { source: "/blog/7", destination: "/blog/talk-show-persembahan-srikandi-wika-2023-memayu-hayuning-bawana-bangkitlah-batik", permanent: true },
    { source: "/blog/8", destination: "/blog/cerita-nusantara-unveiling-the-essence-of-indonesia-artistry-kemenkopukm-2023", permanent: true },
    { source: "/blog/9", destination: "/blog/youtube-rewind-2023", permanent: true },
    { source: "/blog/10", destination: "/blog/batikorganik-wakili-jawa-barat-dalam-program-nasional-bangun-wirausaha-perempuan", permanent: true },
    { source: "/blog/11", destination: "/blog/kolaborasi-hebat-ppk-ormawa-founder-batik-organik-luncurkan-kub-tumbuh-untuk-eko", permanent: true },
    { source: "/blog/12", destination: "/blog/couplepreuner-tda-bogor-resmikan-kelompok-usaha-bersama-tumbuh-batikorganik", permanent: true },
    { source: "/blog/13", destination: "/blog/kub-tumbuh-diluncurkan-di-desa-cipaku-dorong-pemberdayaan-ekonomi-perempuan-lewa", permanent: true },
    { source: "/blog/14", destination: "/blog/kub-tumbuh-mewujudkan-ekonomi-inklusif-dan-ramah-lingkungan", permanent: true },
    { source: "/blog/15", destination: "/blog/cerita-ana-khairani-membangun-batik-organik-hingga-diminati-pasar-global", permanent: true },
    { source: "/blog/16", destination: "/blog/batik-organik-menjalankan-bisnis-inklusif-dengan-model-pentahelix", permanent: true },
    { source: "/blog/17", destination: "/blog/tantangan-dan-strategi-berbisnis-inklusif-ala-founder-batik-organik", permanent: true },
      // Halaman kosong di situs lama — tidak pernah menampilkan apa pun.
      { source: "/gallery-review", destination: "/gallery", permanent: true },
      /*
       * Halaman seragam kantor. Isinya kata kunci korporat yang menurut
       * keputusan BO-49 milik domain terpisah — menaruhnya di sini justru
       * mengulang kanibalisasi yang keputusan itu ingin hentikan.
       */
      {
        source: "/partnership/corpo",
        destination: "https://batikorganikcorporate.id",
        permanent: true,
      },
] as const;

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  ...(isStaticExport
    ? { output: "export" as const, trailingSlash: true }
    : { redirects: async () => [...REDIRECTS] }),
};

export default nextConfig;
