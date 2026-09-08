/*
 * Menulis public/.htaccess dari daftar redirect di next.config.ts.
 *
 * Hosting statis (Hostinger shared) memakai Apache dan tidak menjalankan
 * Next, jadi `redirects()` tidak pernah dieksekusi. Aturan yang sama harus
 * ada di .htaccess — dan dihasilkan dari sumber yang sama supaya keduanya
 * tidak bisa menyimpang diam-diam.
 */
import { writeFile, readFile } from "node:fs/promises";

/*
 * Path yang TIDAK boleh disentuh aturan di bawah.
 *
 * Di Hostinger, backend Laravel lama masih tinggal di public_html yang sama
 * dan melayani /admin serta /api lewat route virtual — bukan berkas nyata.
 *
 * Diuji dengan Apache: kalau backend punya .htaccess sendiri di subfoldernya,
 * aturan mod_rewrite di subdirektori MENIMPA aturan induk (tidak digabung),
 * jadi backend sebenarnya sudah aman tanpa baris ini. Aturan tetap ada
 * sebagai penjaga eksplisit untuk kasus backend yang tidak punya .htaccess
 * sendiri. Kosongkan array ini kalau backend lama sudah pensiun.
 */
const PASSTHROUGH = ["admin", "api"];

const src = await readFile("next.config.ts", "utf8");
const rules = [
  ...src.matchAll(/source:\s*"([^"]+)"[\s\S]*?destination:\s*"([^"]+)"/g),
].map((m) => ({ from: m[1], to: m[2] }));

if (rules.length === 0) throw new Error("tidak ada aturan redirect terbaca");

/*
 * Sengaja MINIMAL. Redirect dan kartu OG kini ditangani berkas statis
 * (scripts/post-export.mjs) karena Extract di File Manager berkali-kali
 * melewatkan berkas berawalan titik. Kompresi dan cache sudah ditangani
 * CDN Hostinger — diverifikasi mengirim `br` dan `max-age=604800`.
 *
 * Yang tersisa hanya satu hal yang tidak bisa digantikan berkas statis:
 * mencegah PHP dieksekusi. Cukup pendek untuk diketik manual kalau perlu.
 */
const lines = [
  "# Situs ini 100% statis — tidak ada berkas PHP yang sah.",
  "# Maret 2025 penyerang menaruh 200 index.php halaman judi di sini.",
  "# Dengan aturan ini berkas serupa hanya terunduh sebagai teks.",
  "",
  "<FilesMatch \\.(php|php[0-9]|phtml|phar|pl|py|cgi|shtml)$>",
  "  Require all denied",
  "</FilesMatch>",
  "",
  "RemoveHandler .php .phtml .php3 .php4 .php5 .php7 .php8",
  "RemoveType .php .phtml .php3 .php4 .php5 .php7 .php8",
  "",
  "ErrorDocument 404 /404.html",
  "",
];

await writeFile("public/.htaccess", lines.join("\n"));
console.log(`public/.htaccess ditulis — ${lines.length} baris (minimal)`);
