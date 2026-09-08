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

const lines = [
  "# Dihasilkan oleh scripts/gen-htaccess.mjs — jangan diedit tangan.",
  "# Sumbernya REDIRECTS di next.config.ts.",
  "",
  "# ── Kompresi ──────────────────────────────────────────────",
  "<IfModule mod_deflate.c>",
  "  AddOutputFilterByType DEFLATE text/html text/plain text/css text/xml",
  "  # text/javascript, bukan hanya application/javascript: Apache modern",
  "  # menyajikan .js sebagai text/javascript, dan tanpa baris ini seluruh",
  "  # bundel (628 KB) terkirim mentah — 438 KB terbuang tiap kunjungan.",
  "  AddOutputFilterByType DEFLATE text/javascript application/javascript",
  "  AddOutputFilterByType DEFLATE application/json application/xml application/manifest+json",
  "  AddOutputFilterByType DEFLATE image/svg+xml image/x-icon",
  "</IfModule>",
  "",
  "# ── Cache ────────────────────────────────────────────────",
  "<IfModule mod_expires.c>",
  "  ExpiresActive On",
  "  # Aset ber-hash dari Next aman di-cache selamanya.",
  '  <FilesMatch "\\.(js|css|woff2)$">',
  "    ExpiresDefault \"access plus 1 year\"",
  "    Header set Cache-Control \"public, immutable\"",
  "  </FilesMatch>",
  '  <FilesMatch "\\.(webp|jpg|jpeg|png|gif|svg|ico)$">',
  "    ExpiresDefault \"access plus 6 months\"",
  "  </FilesMatch>",
  "  # HTML harus selalu divalidasi ulang, kalau tidak deploy baru tak terlihat.",
  '  <FilesMatch "\\.html$">',
  "    ExpiresDefault \"access plus 0 seconds\"",
  "    Header set Cache-Control \"public, max-age=0, must-revalidate\"",
  "  </FilesMatch>",
  "</IfModule>",
  "",
  "# ── Kartu Open Graph ─────────────────────────────────────",
  "# next/og menulisnya tanpa ekstensi; tanpa baris ini Apache",
  "# menyajikannya sebagai octet-stream dan pratinjau WhatsApp kosong.",
  "<IfModule mod_mime.c>",
  '  <FilesMatch "opengraph-image$">',
  "    ForceType image/png",
  "  </FilesMatch>",
  "</IfModule>",
  "",
  "# ── Matikan eksekusi PHP ─────────────────────────────────",
  "# Situs ini 100% statis — tidak ada satu pun berkas PHP yang sah.",
  "# Pada Maret 2025 penyerang menaruh 200 index.php halaman judi di sini.",
  "# Dengan aturan ini, berkas serupa hanya akan terunduh sebagai teks,",
  "# tidak pernah dijalankan. Hapus blok ini kalau suatu saat menaruh PHP.",
  "<FilesMatch \\.(php|php[0-9]|phtml|phar|pl|py|cgi|shtml)$>",
  "  Require all denied",
  "</FilesMatch>",
  "<IfModule mod_php.c>",
  "  php_flag engine off",
  "</IfModule>",
  "RemoveHandler .php .phtml .php3 .php4 .php5 .php7 .php8",
  "RemoveType .php .phtml .php3 .php4 .php5 .php7 .php8",
  "",
  "# ── Redirect permanen dari URL situs lama ────────────────",
  "<IfModule mod_rewrite.c>",
  "  RewriteEngine On",
  "",
];

if (PASSTHROUGH.length) {
  lines.push(
    "  # Serahkan sepenuhnya ke backend lama — jangan ada aturan di bawah",
    "  # yang menyentuhnya.",
    `  RewriteRule ^(${PASSTHROUGH.join("|")})(/|$) - [L]`,
    "",
  );
}

for (const { from, to } of rules) {
  const pattern = `^${from.replace(/^\//, "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/?$`;
  lines.push(`  RewriteRule ${pattern} ${to} [R=301,L]`);
}

lines.push(
  "",
  "  # trailingSlash: true — arahkan /path ke /path/ supaya tidak ada URL kembar.",
  "  RewriteCond %{REQUEST_FILENAME} !-f",
  "  RewriteCond %{REQUEST_FILENAME} !-d",
  "  RewriteRule ^(.+[^/])$ /$1/ [R=301,L]",
  "</IfModule>",
  "",
  "# ── Halaman 404 ──────────────────────────────────────────",
  "ErrorDocument 404 /404.html",
  "",
);

await writeFile("public/.htaccess", lines.join("\n"));
console.log(`public/.htaccess ditulis — ${rules.length} redirect`);
