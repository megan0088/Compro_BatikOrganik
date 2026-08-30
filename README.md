# BatikOrganik — Company Profile (Next.js 16)

Port `batikorganik.co.id` (create-react-app) ke Next.js 16 App Router.

Awalnya desainnya disamakan 1:1 dengan situs live. Sejak 28 Agustus 2026 situs
ini memakai arah **“Soga”** — aksen diambil dari pewarna alami produknya
sendiri, bukan dari emas. Perbandingan arah dan fondasinya ada di kanvas desain
(lihat catatan rilis).

## Jalankan

```bash
npm run dev
```

```bash
npm run build
```

## Design token — arah “Soga”

Semua rasio kontras dihitung, bukan diperkirakan.

| Token | Nilai | Kontras di `surface` |
|---|---|---|
| `ink` | `#17110C` | 18,41 : 1 |
| `ink-soft` | `#58514C` | 7,66 : 1 |
| `ink-muted` | `#736D69` | 5,01 : 1 |
| `surface` / `surface-warm` / `surface-deep` | `#FEFDFB` / `#F8F5F1` / `#F1ECE6` | — |
| `hairline` | `#E2DDD7` | garis saja |
| `soga` (aksen utama) | `#8C5D32` | **5,54 : 1** |
| `soga-quiet` | `#F4E5D4` | — |
| `indigo` / `indigo-deep` | `#51689A` / `#213156` | 5,44 : 1 / 12,61 : 1 |

| Hal | Nilai |
|---|---|
| Judul | Newsreader 400 — display 44/68px, h2 32/42px, h3 20/22px |
| Teks & UI | Karla 400, 17px/1.7 |
| Eyebrow | Karla 12px, `tracking 0.22em`, warna `soga`, di **atas** judul |
| Tombol | Tinggi 48px, sudut siku, hover ke `soga`, focus ring `soga` |
| Container | `max-w-[1240px] px-5 md:px-10` — **tanpa** `text-center` |
| Ritme section | 4 tingkat: `--space-major` / `default` / `minor` / `flush` |
| Kartu koleksi | Rasio 3:4, grid statis (bukan carousel) |

**Emas `#C8A45C` ditolak**: hanya 2,35 : 1 di putih, gagal WCAG AA sebagai teks.
Rencana “Modern Elegant — Gold & White” di `ClaudeCommand/planmode.md` tidak dipakai.

## Konten & aset — snapshot, bukan panggilan API

Situs lama menarik semua isinya dari `https://batikorganik.co.id/api/*` saat
runtime. Di sini isinya di-snapshot ke `content/api/*.json` dan gambarnya
diunduh ke `public/assets/`, jadi seluruh situs bisa di-*prerender* statis.

- `content/api/*.json` — 13 endpoint (home, journey, about, category,
  collection, campaign, gallery, faq, testimonial, partnership, blog, contact,
  map-batik).
- `content/asset-map.json` — peta path API → berkas lokal, **plus dimensi asli**
  tiap gambar (dibaca dari header berkas) supaya `<Image>` tidak pernah
  menyebabkan layout shift.
- `lib/assets.ts` — `asset(path)` menormalkan slash ganda dari API
  (`/images/home/carousel//foo.jpg`) sebelum mencari.

Memperbarui konten = unduh ulang JSON + gambar baru, lalu regenerasi asset map.

## Struktur

```
app/
  page.tsx              homepage, 8 section
  collection/           indeks + /collection/[1-6]
  gallery/ blog/        galeri, indeks blog + /blog/[slug]
  campaign/[id]/        /campaign/[1-5]
  (marketing)/          about, about-batik, partnership, review,
                        contact, faq, map-batik
components/
  layout/               Navbar (server) + NavbarClient, Footer,
                        WhatsAppFab, SearchDialog
  sections/             CopyBlock, SplitRow, PageHero, VideoEmbed
  ui/                   Container, Section, Heading, ActionButton,
                        RichText, Carousel
lib/
  constants.ts          SATU sumber kebenaran kontak & sosial
  navigation.ts         struktur navbar
  content.ts            loader konten bertipe
  assets.ts             resolver path gambar
  metadata.ts           helper metadata + Open Graph
```

## Aturan yang tidak boleh dilanggar

1. **Nomor telepon dan tautan sosial hanya dari `lib/constants.ts`.** Audit
   situs lama menemukan nomor WhatsApp tersebar di 8 titik dengan dua nomor
   berbeda.
2. **Tidak ada `<img>` mentah** — selalu `next/image` dengan `width`/`height`
   dari `asset()`.
3. **Satu `<h1>` per halaman.** Situs lama punya enam di homepage.
4. **JSON konten tidak boleh diimpor dari client component.** Navbar dipecah
   jadi `Navbar.tsx` (server, membaca konten) + `NavbarClient.tsx` (interaksi);
   kalau digabung, seluruh `content/api/*.json` ikut ke bundle browser.
5. **`section_part` dari API bertipe string**, sementara `id`/`with_image`/
   `with_video` bertipe angka. Normalisasi hanya di `lib/content.ts`.

## Beda yang disengaja dari situs live

| Situs live | Di sini | Alasan |
|---|---|---|
| `nav` `top-[-15px]` | `top-0` | Sumber celah putih di atas hero |
| Navbar transparan di semua halaman | Transparan + scrim & tanda putih hanya di atas hero, putih solid setelah digulir | Logo & ikon hitam tidak terbaca di atas foto batik |
| Ikon akun (→ CMS staf `/admin`) | Dihapus | Situs ini company profile tanpa sistem akun — tidak ada tujuan yang masuk akal. Kontak tetap ada di navbar & footer |
| Ikon keranjang → `batikorganik.id` | Toko Shopee resmi | Domain lama pakai sertifikat self-signed: browser menampilkan peringatan keamanan layar penuh |
| Enam `<h1>` di homepage | Satu `<h1>`, sisanya `<h2>` | Hierarki heading |
| `lang="en"` | `lang="id"` | Isinya Bahasa Indonesia |
| Tanpa hover/focus state | Ada `focus-visible` di semua kontrol | Tak bisa dipakai lewat keyboard |
| ionicons dari unpkg | SVG inline | Skrip pihak ketiga yang memblokir render |
| Swiper (~40 KB) | Scroll-snap native | Nol dependensi baru |
| Meta description bawaan CRA | Metadata + Open Graph per halaman | — |

## Paritas URL dengan situs lama

Rute situs lama diambil dari definisi router di bundle-nya, **bukan** dari
tautan navbar — empat sub-halaman partnership tidak pernah muncul di menu.

| URL lama | Di sini |
|---|---|
| `/`, `/about`, `/about-batik`, `/contact`, `/faq`, `/gallery`, `/review`, `/partnership`, `/map-batik`, `/blog`, `/collection`, `/collection/:id`, `/campaign/:id` | dipertahankan apa adanya |
| `/blog/0` … `/blog/17` | **redirect** ke slug dari judul (`next.config.ts`) |
| `/gallery-review` | **redirect** ke `/gallery` — halaman ini kosong di situs lama |
| `/partnership/hampers`, `/build`, `/custom` | dibangun ulang sebagai konfigurator bingkisan |
| `/partnership/corpo` | **redirect** ke `batikorganikcorporate.id` — isinya kata kunci korporat yang menurut BO-49 milik domain itu |
| `/admin`, `/api/*` | hilang bersama backend lama |

Situs lama memberi artikel URL berdasarkan POSISI dalam array `/api/blog`,
bukan id. Peta redirect dihasilkan dari urutan array yang sama, jadi setiap
URL lama mendarat di artikel yang benar. `permanent: true` mengirim 308 —
Google memperlakukannya sama dengan 301.

## Yang belum ada

- **Peta interaktif `/map-batik`.** 21 motif dan daerahnya sudah diekstrak dari
  bundle JavaScript situs lama ke `content/api/map-batik.json` dan ditampilkan
  sebagai grid, tapi titik-titik hotspot di atas peta belum diposisikan.
- **Slug artikel blog.** `/api/blog` tidak memberi id atau slug, jadi slug
  diturunkan dari judul (`slugify`). URL artikel karena itu **baru** — belum ada
  URL lama yang perlu dipertahankan.
- Gambar Open Graph 1200×630 dan GTM.
