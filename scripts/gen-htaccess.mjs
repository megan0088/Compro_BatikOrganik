/*
 * Menulis public/.htaccess dari daftar redirect di next.config.ts.
 *
 * Hosting statis (Hostinger shared) memakai Apache dan tidak menjalankan
 * Next, jadi `redirects()` tidak pernah dieksekusi. Aturan yang sama harus
 * ada di .htaccess — dan dihasilkan dari sumber yang sama supaya keduanya
 * tidak bisa menyimpang diam-diam.
 */
import { writeFile, readFile } from "node:fs/promises";

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
  "  AddOutputFilterByType DEFLATE application/javascript application/json application/xml",
  "  AddOutputFilterByType DEFLATE image/svg+xml",
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
  "# ── Redirect permanen dari URL situs lama ────────────────",
  "<IfModule mod_rewrite.c>",
  "  RewriteEngine On",
  "",
];

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
