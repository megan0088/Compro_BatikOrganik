import type { NextConfig } from "next";

/*
 * Situs lama memberi artikel URL berdasarkan POSISI dalam array /api/blog
 * (`/blog/0` … `/blog/17`), bukan id atau slug. Skema itu rapuh — urutan
 * berubah, URL ikut berubah — jadi versi baru memakai slug dari judul.
 *
 * Peta di bawah dihasilkan dari urutan array yang sama, jadi setiap URL lama
 * yang sudah terindeks atau pernah dibagikan tetap mendarat di artikel yang
 * benar. Tanpa ini, 18 artikel jadi 404 saat cutover.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
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
    ];
  },
};

export default nextConfig;
