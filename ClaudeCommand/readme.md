
# BatikOrganik — Company Profile (Next.js)

Re-create `batikorganik.co.id` di Next.js 15. Rencana lengkap ada di `../plan.md`.

## Jalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # verifikasi produksi
npm run typecheck
```

## Struktur

```
app/            route (App Router) + globals.css
components/ui   primitif: Button, Card, Section, Container, Eyebrow, Divider
components/layout  Navbar, Footer
components/sections  blok homepage
content/        data koleksi & sertifikasi
lib/constants   SATU sumber kebenaran untuk kontak & tautan
lib/metadata    helper metadata + Open Graph per halaman
```

## Aturan yang tidak boleh dilanggar

1. **`gold` (#C8A45C) tidak boleh jadi warna teks di latar terang** — rasionya 2,35:1, gagal WCAG AA. Untuk teks beraksen emas gunakan `gold-deep` (#8A6D2F, 4,87:1).
2. **Satu H1 per halaman.** Situs lama punya enam.
3. **Nomor telepon dan tautan sosial hanya dari `lib/constants.ts`.** Jangan pernah ditulis langsung di komponen.
4. **Tidak ada `<img>` mentah** — selalu `next/image`.
5. **Level heading dipilih berdasarkan semantik, bukan ukuran visual.** Untuk mengubah ukuran, ganti className.

## Anggaran performa

| Metrik | Batas |
|---|---|
| Bobot homepage | < 1,5 MB |
| JS per route (gzip) | < 150 KB |
| LCP (4G) | < 2,5 s |
| CLS | < 0,1 |
| Lighthouse Performance / SEO / A11y | ≥ 90 / 95 / 95 |

## Aset yang masih placeholder

Gambar di `public/images/` masih placeholder. Ganti dengan foto asli, lalu kompres di kualitas 75 — tidak ada berkas yang boleh melebihi 200 KB.

## Deploy

Sambungkan repo ke Vercel. Aktifkan **Deployment Protection** agar preview tidak tersebar sebelum disetujui. Preview Vercel otomatis ber-`noindex`, jadi tidak akan bersaing dengan situs lama di Google.