/*
 * Membuat redirect dan kartu OG bekerja TANPA .htaccess.
 *
 * Extract di File Manager Hostinger berkali-kali melewatkan berkas berawalan
 * titik, jadi situs tidak boleh bergantung padanya untuk hal yang menentukan.
 * Setelah ini .htaccess hanya menyisakan blokir eksekusi PHP — beberapa baris
 * yang gampang dibuat manual.
 *
 * Catatan jujur: meta refresh bukan 301. Google memperlakukannya sebagai
 * sinyal permanen tapi lebih lemah. `<link rel="canonical">` disertakan untuk
 * memperkuatnya. Kalau .htaccess suatu saat aktif, aturan 301-nya menang
 * karena dievaluasi sebelum berkas dilayani.
 */
import { readFile, writeFile, mkdir, readdir, copyFile } from "node:fs/promises";
import path from "node:path";

const OUT = "out";
const cfg = await readFile("next.config.ts", "utf8");
const rules = [...cfg.matchAll(/source:\s*"([^"]+)"[\s\S]*?destination:\s*"([^"]+)"/g)]
  .map((m) => ({ from: m[1], to: m[2] }));

const page = (to) => `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<title>Halaman telah pindah</title>
<link rel="canonical" href="${to}">
<meta name="robots" content="noindex, follow">
<meta http-equiv="refresh" content="0; url=${to}">
<script>location.replace(${JSON.stringify(to)});</script>
</head>
<body>Halaman ini pindah ke <a href="${to}">${to}</a>.</body>
</html>
`;

let n = 0;
for (const { from, to } of rules) {
  const dir = path.join(OUT, from.replace(/^\//, ""));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), page(to));
  n++;
}

/*
 * next/og menulis kartu tanpa ekstensi, jadi server mengirimnya tanpa
 * content-type dan pratinjau WhatsApp kosong. Disalin jadi .png dan seluruh
 * rujukan di HTML diarahkan ke sana.
 */
let og = 0;
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (e.name === "opengraph-image") {
      await copyFile(p, p + ".png");
      og++;
    }
  }
}
await walk(OUT);

async function patch(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await patch(p);
    else if (e.name.endsWith(".html")) {
      const s = await readFile(p, "utf8");
      const r = s.replace(/(\/(?:[\w./-]*\/)?opengraph-image)(\?)/g, "$1.png$2");
      if (r !== s) await writeFile(p, r);
    }
  }
}
await patch(OUT);

console.log(`halaman redirect: ${n} | kartu OG jadi .png: ${og}`);
