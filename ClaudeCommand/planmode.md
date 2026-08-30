# Plan — Re-create batikorganik.co.id di Next.js

**Proyek:** Company profile BatikOrganik
**Arah visual:** Modern Elegant — Gold & White
**Stack tujuan:** Next.js 15 (App Router) + TypeScript + Tailwind CSS
**Epic Jira:** [BO-26](https://urbanan.atlassian.net/browse/BO-26)
**Disusun:** 10 Agustus 2026

---

## 1. Ringkasan

Situs `batikorganik.co.id` saat ini berjalan di atas create-react-app — stack yang sudah resmi di-deprecate tim React. Berdasarkan keputusan di [BO-49](https://urbanan.atlassian.net/browse/BO-49), situs ini berperan sebagai **company profile dan brand**, sementara seluruh konversi B2B ditangani domain terpisah `batikorganikcorporate.id`.

Pekerjaan ini adalah **port, bukan rewrite dari nol**. Codebase sudah React + Tailwind, sehingga sebagian besar logika komponen dapat dipindahkan. Yang dirombak total adalah lapisan visual dan struktur halaman.

### Tiga tujuan

1. **Terlihat semahal produknya.** Situs sekarang tidak mencerminkan kualitas batik pewarna alam yang dijual.
2. **Turun dari 12,2 MB ke di bawah 1,5 MB.** Ini bukan kemewahan — mayoritas pengunjung Indonesia mengakses lewat 4G.
3. **Menjadi bukti kredibilitas.** Pembeli korporat yang melihat iklan akan mencari "batikorganik" di Google untuk memverifikasi vendor. Situs inilah yang mereka temukan.

---

## 2. Baseline — Kondisi Saat Ini

Hasil audit 10 Agustus 2026 melalui inspeksi DOM dan Performance API.

| Metrik | Sekarang | Target |
|---|---|---|
| Bobot halaman | 12,2 MB | < 1,5 MB |
| Jumlah request | 82 | < 40 |
| Tinggi homepage | 10.471px | < 6.000px |
| Gambar WebP/AVIF | 0 dari 44 | 100% |
| Gambar dengan `srcset` | 0 | 100% |
| Gambar lazy-load | 0 | semua di bawah fold |
| Jumlah H1 | 6 | 1 |
| Open Graph | tidak ada | lengkap |
| Canonical | tidak ada | ada di semua halaman |
| `lang` | `en` (salah) | `id` |
| Meta description | default create-react-app | unik per halaman |
| Rendering | client-side only | static generation |

### Bug yang harus ikut tertutup

| Bug | Jira |
|---|---|
| Meta description bawaan template | [BO-28](https://urbanan.atlassian.net/browse/BO-28) |
| 4 gambar di-download dua kali (±2,3 MB terbuang) | [BO-29](https://urbanan.atlassian.net/browse/BO-29) |
| URL rusak `/adminundefined` pada 2 elemen gambar | [BO-29](https://urbanan.atlassian.net/browse/BO-29) |
| Celah putih di atas hero (`top-[-15px]` vs `h-screen`) | [BO-30](https://urbanan.atlassian.net/browse/BO-30) |
| Enam tag H1 | [BO-34](https://urbanan.atlassian.net/browse/BO-34) |
| `lang="en"`, canonical & sitemap tidak ada | [BO-35](https://urbanan.atlassian.net/browse/BO-35) |
| Open Graph kosong | [BO-33](https://urbanan.atlassian.net/browse/BO-33) |

---

## 3. Arah Desain — Modern Elegant, Gold & White

### 3.1 Filosofi

Batik pewarna alam adalah produk yang lambat dibuat, penuh pertimbangan, dan tidak berteriak. Antarmukanya harus terasa sama: **tenang, lapang, dan percaya diri**.

Tiga prinsip yang mengikat seluruh keputusan desain:

**Emas adalah bumbu, bukan bahan utama.** Maksimal 5–10% permukaan. Begitu emas dipakai untuk bidang besar, kesan mahal langsung berubah jadi murahan.

**Ruang kosong adalah fitur.** Situs sekarang memadatkan enam section dengan ritme identik. Yang baru memberi napas dan membiarkan foto batik jadi bintangnya.

**Foto produk yang berbicara.** Palet antarmuka sengaja dibuat netral agar warna indigo, soga, dan tanah pada batik tidak berebut perhatian dengan elemen UI.

### 3.2 Token Warna

Seluruh rasio kontras di bawah **sudah dihitung dan diverifikasi**, bukan perkiraan.

#### Netral — tulang punggung antarmuka

| Token | Hex | Fungsi | Kontras di putih |
|---|---|---|---|
| `ink` | `#14110F` | Teks utama, heading | **18,80:1** |
| `ink-secondary` | `#4A4643` | Paragraf sekunder | **9,34:1** |
| `ink-muted` | `#6E6862` | Caption, label, metadata | **5,50:1** |
| `surface` | `#FFFFFF` | Latar utama | — |
| `surface-alt` | `#FAF8F5` | Latar section selang-seling (putih hangat) | — |
| `surface-sunken` | `#F4F0EA` | Kartu, area tenggelam | — |
| `border-hairline` | `#E8E2D9` | Garis pemisah 1px | 1,29:1 (dekoratif) |

Catatan: `ink` sengaja dipilih hitam kehangatan (`#14110F`), bukan `#000000`. Hitam murni terasa keras dan berlawanan dengan karakter pewarna alam.

#### Emas — aksen

| Token | Hex | Fungsi | Kontras di putih |
|---|---|---|---|
| `gold` | `#C8A45C` | Garis, ikon, border, hover, ornamen | **2,35:1 — DILARANG untuk teks** |
| `gold-deep` | `#8A6D2F` | Satu-satunya emas yang boleh jadi teks | **4,87:1 — lolos AA** |
| `gold-wash` | `#F7F1E4` | Latar blok bernuansa emas | — |

#### Aturan penggunaan emas — wajib ditegakkan

| Boleh | Tidak boleh |
|---|---|
| Garis pemisah dan underline dekoratif | Teks paragraf berwarna `gold` |
| Ikon berukuran kecil | Blok latar besar berwarna emas |
| Border tombol sekunder | Gradasi emas metalik |
| State hover dan focus ring | Bayangan berwarna emas |
| Angka statistik dan eyebrow label (pakai `gold-deep`) | Emas di atas emas |

**Kombinasi aman yang sudah diverifikasi:**

| Kombinasi | Rasio | Status |
|---|---|---|
| `ink` di `surface` | 18,80:1 | Lolos AA & AAA |
| `ink` di `surface-alt` | 17,74:1 | Lolos AA & AAA |
| `ink-muted` di `surface-alt` | 5,19:1 | Lolos AA |
| `gold-deep` di `surface` | 4,87:1 | Lolos AA |
| `gold-deep` di `surface-alt` | 4,60:1 | Lolos AA (pas-pasan) |
| `gold-deep` di `gold-wash` | 4,33:1 | **Hanya untuk teks besar (≥18,66px bold / ≥24px)** |
| `surface` di `ink` | 18,80:1 | Lolos AA & AAA |
| `gold` di `ink` | 7,99:1 | Lolos AA — emas aman di latar gelap |
| `ink` di `gold` | 7,99:1 | Lolos AA |

Dua catatan penting yang mudah terlewat:

1. **`gold` (#C8A45C) hanya aman sebagai teks di latar gelap.** Di atas putih rasionya 2,35:1 dan gagal total.
2. **`gold-deep` di atas `gold-wash` hanya 4,33:1.** Untuk teks berukuran normal, gunakan `ink` di latar itu.

### 3.3 Tipografi

Amiri dan Alegreya Sans **diganti**. Kombinasi itu — serif all-caps dengan letter-spacing lebar — adalah salah satu penyumbang terbesar kesan tertinggal zaman.

| Peran | Font | Alasan |
|---|---|---|
| Display & heading | **Fraunces** (variable) | Serif modern dengan sumbu optical size; terasa editorial dan mahal tanpa jadi klasik-berdebu |
| Teks isi & UI | **Inter** (variable) | Netral, terbaca sangat baik pada ukuran kecil, dukungan Bahasa Indonesia lengkap |

Alternatif display bila Fraunces terasa terlalu berkarakter: **Instrument Serif**.

Keduanya dimuat lewat `next/font/google` dengan `display: 'swap'` dan subset `latin` — otomatis di-self-host, tanpa request ke server Google, dan bebas layout shift.

#### Skala tipografi

Semua memakai `clamp()` agar responsif tanpa breakpoint bertingkat.

| Token | Ukuran | Font | Penggunaan |
|---|---|---|---|
| `display` | `clamp(2.75rem, 6vw, 4.5rem)` | Fraunces 400 | Headline hero |
| `h1` | `clamp(2.25rem, 4.5vw, 3.25rem)` | Fraunces 400 | Judul halaman |
| `h2` | `clamp(1.75rem, 3vw, 2.5rem)` | Fraunces 400 | Judul section |
| `h3` | `clamp(1.25rem, 2vw, 1.5rem)` | Inter 600 | Sub-judul |
| `body-lg` | `1.125rem` | Inter 400 | Paragraf pengantar |
| `body` | `1rem` | Inter 400 | Teks isi |
| `caption` | `0.875rem` | Inter 400 | Keterangan gambar |
| `eyebrow` | `0.75rem` | Inter 500, `tracking-[0.18em]`, uppercase | Label di atas judul — **satu-satunya tempat all-caps diizinkan** |

#### Aturan tipografi

- Lebar paragraf **maksimal 68 karakter** (`max-w-[68ch]`).
- Teks panjang **rata kiri**. Rata tengah hanya untuk judul pendek dan eyebrow.
- `line-height` 1,6 untuk teks isi; 1,15 untuk display.
- Tidak ada teks all-caps selain eyebrow.
- Level heading dipilih berdasarkan **struktur semantik**, bukan ukuran visual. Untuk mengubah ukuran, ganti kelas — bukan ganti tag.

### 3.4 Spasi, Radius, Bayangan, Motion

**Spasi section** — inilah yang menciptakan hierarki yang hilang di situs sekarang:

| Token | Nilai | Untuk |
|---|---|---|
| `section-hero` | `clamp(4rem, 10vh, 7rem)` | Hero |
| `section-major` | `clamp(5rem, 9vw, 8rem)` | Section utama |
| `section-minor` | `clamp(3rem, 5vw, 4.5rem)` | Section pendukung |
| `section-tight` | `clamp(2rem, 3vw, 3rem)` | Blok transisi |

Situs sekarang memakai `py-10 md:py-16 lg:py-20` untuk **semua** section. Semuanya terasa sama penting, artinya tidak ada yang menonjol.

**Radius:** `sm` 2px, `md` 4px, `lg` 8px, `full` untuk pill. Elegan berarti radius halus — bukan persegi tajam seperti sekarang, bukan pula membulat berlebihan.

**Bayangan:** sangat halus, netral, tidak pernah berwarna emas.
`shadow-soft: 0 1px 2px rgba(20,17,15,.04), 0 8px 24px rgba(20,17,15,.06)`

**Motion:** durasi 150–250ms, `cubic-bezier(.2,.8,.2,1)`. Fade-in halus saat masuk viewport, tanpa parallax dan tanpa animasi berlebihan. Seluruhnya dibungkus `prefers-reduced-motion`.

### 3.5 Komponen Inti

Tombol adalah elemen yang paling kuat memberi kesan "template lama" pada situs sekarang — persegi, hitam pekat, tanpa hover state.

| Varian | Latar | Teks | Border | Hover |
|---|---|---|---|---|
| **Primary** | `ink` | `surface` | — | latar melunak, naik 1px |
| **Secondary** | transparan | `ink` | 1px `gold` | latar `gold-wash` |
| **Ghost** | transparan | `ink` | — | underline `gold` |

Setiap varian wajib punya state `hover`, `active`, `focus-visible` (ring 2px `gold-deep`, offset 2px), dan `disabled`. Tinggi minimum area sentuh 44px.

Komponen lain: `Container`, `Section`, `Eyebrow`, `SectionHeading`, `Card`, `ImageFrame`, `Divider` (garis 1px `gold` sepanjang 48px sebagai penanda section), `Badge`, `Accordion`, `Breadcrumb`, `Navbar`, `Footer`, `WhatsAppFab`.

---

## 4. Arsitektur Teknis

### 4.1 Stack

| Lapisan | Pilihan | Alasan |
|---|---|---|
| Framework | Next.js 15, App Router | SSG, Metadata API, optimasi gambar bawaan |
| Bahasa | TypeScript (strict) | Wajib untuk lamaran SWE/AI Engineer, dan menangkap bug lebih awal |
| Styling | Tailwind CSS + CSS variables | Sudah dipakai di codebase lama, transisi mulus |
| Font | `next/font/google` | Self-host otomatis, nol layout shift |
| Gambar | `next/image` | Menyelesaikan WebP/AVIF, `srcset`, dan lazy-load sekaligus |
| Ikon | `lucide-react` | Menggantikan `ionicons` dari unpkg yang memblokir render |
| Konten | MDX + TypeScript di `content/` | Konten hampir statis; CMS belum diperlukan |
| Form | Resend atau Formspree | Tanpa backend sendiri |
| Analytics | GTM (lihat [BO-51](https://urbanan.atlassian.net/browse/BO-51)) | Situs ini **belum punya GTM sama sekali** |
| Hosting | Vercel | Preview per PR, deploy otomatis |

### 4.2 Struktur Folder

```
app/
  layout.tsx                  # font, metadata dasar, JSON-LD Organization
  page.tsx                    # homepage
  (marketing)/
    about/page.tsx
    about-batik/page.tsx
    partnership/page.tsx
    review/page.tsx
    contact/page.tsx
    faq/page.tsx
    map-batik/page.tsx
  gallery/page.tsx
  collection/
    page.tsx                  # indeks 6 kategori
    [slug]/page.tsx           # generateStaticParams
  campaign/
    [slug]/page.tsx
  blog/
    page.tsx
    [slug]/page.tsx
  sitemap.ts                  # sitemap otomatis
  robots.ts                   # blokir /admin
  not-found.tsx

components/
  ui/                         # Button, Card, Badge, Accordion, Divider…
  layout/                     # Navbar, Footer, Container, Section
  sections/                   # Hero, TrustStrip, CollectionGrid, BrandStory…

content/
  collections.ts              # 6 kategori
  faq.ts
  testimonials.ts
  campaigns/*.mdx
  blog/*.mdx

lib/
  constants.ts                # WA, email, sosial — SATU sumber kebenaran
  metadata.ts                 # helper metadata per halaman
  utils.ts

public/
  images/                     # aset teroptimasi
  og/                         # gambar Open Graph 1200×630
```

### 4.3 `lib/constants.ts` — mencegah bug lama terulang

Audit menemukan nomor WhatsApp tersebar di **8 titik berbeda** dalam satu halaman, dengan dua nomor berbeda ([BO-27](https://urbanan.atlassian.net/browse/BO-27)). Keduanya ternyata nomor perusahaan, jadi tidak ada lead yang hilang — tapi sebaran seperti itu adalah bom waktu. Cukup satu titik terlupa saat nomor berubah.

```ts
export const CONTACT = {
  whatsappRetail: '6281617000530',
  whatsappCorporate: '6281617000350',  // pembagian perlu dikonfirmasi tim
  email: 'info@batikorganik.co.id',
} as const;

export const SOCIAL = {
  instagram: 'https://www.instagram.com/batikorganik/',
  tiktok: 'https://www.tiktok.com/@batikorganik',
  youtube: 'https://www.youtube.com/c/batikorganik',
  facebook: 'https://www.facebook.com/batikorganik.official/',
  linkedin: '',   // menyusul — lihat BO-43
} as const;

export const SITES = {
  corporate: 'https://batikorganikcorporate.id',
} as const;

export const waLink = (phone: string, text?: string) =>
  `https://api.whatsapp.com/send/?phone=${phone}${text ? `&text=${encodeURIComponent(text)}` : ''}`;
```

Selalu sertakan parameter `text` agar tim langsung tahu konteks percakapan — cara termurah melacak sumber lead WhatsApp, yang saat ini sama sekali tidak terlacak.

---

## 5. Peta Route

Seluruh route hasil pemetaan tautan situs lama. **URL tidak boleh berubah** agar tidak ada otoritas SEO yang hilang.

| Route | Isi | Render | Prioritas |
|---|---|---|---|
| `/` | Homepage | SSG | P0 |
| `/collection` | Indeks 6 kategori | SSG | P0 |
| `/collection/[1-6]` | Batik, Women, Men, Organic Fabric, Craft, Gifts | SSG + `generateStaticParams` | P0 |
| `/gallery` | Galeri foto | SSG | P1 |
| `/about` | Tentang perusahaan | SSG | P0 |
| `/about-batik` | Edukasi tentang batik | SSG | P1 |
| `/contact` | Kontak & lokasi | SSG | P0 |
| `/faq` | Pertanyaan umum | SSG | P1 |
| `/review` | Testimoni | SSG | P1 |
| `/partnership` | Kemitraan | SSG | P2 |
| `/map-batik` | Peta jejak batik Nusantara | SSG | P2 |
| `/campaign/[1-5]` | Halaman kampanye | SSG | P2 |
| `/blog` | Indeks blog | SSG + ISR | P1 |
| `/blog/[slug]` | Artikel | SSG + ISR | P1 |

**Catatan penting:** `/collection/1` sampai `/collection/6` dipertahankan sebagai URL kanonis. Bila ingin URL yang lebih ramah SEO seperti `/collection/kemeja-batik`, tambahkan sebagai jalur baru dan **pasang redirect 301 dari yang lama** — jangan sekadar mengganti.

### Navigasi

Struktur navbar lama dipertahankan agar pengunjung lama tidak tersesat:

- **Gallery** → `/gallery`
- **Our Collection** (dropdown) → 6 kategori
- **Communiqué** (dropdown) → About, About Batik, Partnership, Review, Contact, FAQ
- **Blog** → `/blog`
- **Corporate** → tautan silang ke `batikorganikcorporate.id` dengan UTM

Navbar dibuat `sticky top-0`, **bukan** `fixed` dengan `top-[-15px]` seperti sekarang — inilah akar celah putih di atas hero ([BO-30](https://urbanan.atlassian.net/browse/BO-30)).

---

## 6. Rencana Homepage

Homepage sekarang mengulang pola yang sama enam kali: judul rata tengah → paragraf rata tengah → tombol hitam → carousel. Yang baru memvariasikan ritme.

Konten teks **diambil dari situs lama**, disunting seperlunya agar lebih ringkas.

| # | Section | Layout | Spasi | Sumber konten |
|---|---|---|---|---|
| 1 | **Hero** | Foto penuh + overlay gradasi, teks kiri-bawah | `section-hero` | Headline baru dari materi lama |
| 2 | **Trust strip** | Baris logo sertifikasi | `section-tight` | Tencel, APR, eco-label |
| 3 | **Koleksi** | Grid asimetris 6 kategori | `section-major` | 6 kategori existing |
| 4 | **Cerita brand** | Teks kiri, foto kanan | `section-major` | *"Setiap motif merupakan sebuah kisah…"* |
| 5 | **Anugerah dari Alam** | Foto kiri, teks kanan (selang-seling) | `section-major` | Section pewarna alam & serat organik |
| 6 | **Dedikasi Pengrajin** | Foto lebar + teks tumpang | `section-major` | Section pengrajin |
| 7 | **Estetika Nusantara** | Teks + CTA ke `/map-batik` | `section-minor` | Section peta jejak batik |
| 8 | **Penanaman Pohon** | Blok `gold-wash`, teks tengah | `section-minor` | Section Lindungi Hutan |
| 9 | **Blok B2B** | Blok ringkas + tautan silang | `section-minor` | Per [BO-37](https://urbanan.atlassian.net/browse/BO-37) |
| 10 | **Footer** | 4 kolom | — | Kontak, nav, sosial, sertifikasi |

### Hero — perbaikan paling penting

Hero sekarang adalah **foto full-screen tanpa headline, tanpa CTA**. Ruang paling berharga di seluruh situs terbuang.

Hero baru wajib memuat, terlihat tanpa scroll:

- **Eyebrow:** `INDONESIA ARTSY BATIK` (`gold-deep`, tracking lebar)
- **H1 — satu-satunya di halaman:** *Batik Pewarna Alam, Ditenun dari Kisah Nusantara*
- **Sub-headline:** satu kalimat, maksimal 20 kata
- **CTA primer:** "Lihat Koleksi" → `/collection`
- **CTA sekunder:** "Untuk Perusahaan" → domain corporate (+UTM)
- **Overlay gradasi** dari bawah agar teks terbaca di atas foto

Gambar hero memakai `priority` dan menjadi elemen LCP.

### Dipindahkan keluar dari homepage

| Konten lama | Dipindah ke | Alasan |
|---|---|---|
| Bingkisan Batik / hampers | `/collection/6` | Bukan pesan utama company profile |
| Video YouTube tersemat | `/about` | iframe berat, tidak perlu di homepage |
| Carousel berulang di tiap section | grid statis | Sumber utama pengulangan ritme |
| Section B2B lengkap | domain corporate | Kanibalisasi kata kunci ([BO-49](https://urbanan.atlassian.net/browse/BO-49)) |

**Target: tinggi homepage < 6.000px**, turun dari 10.471px.

---

## 7. Rencana Halaman Lain

| Halaman | Struktur | Catatan |
|---|---|---|
| `/collection` | Hero ringkas + grid 6 kategori | Setiap kartu: foto, nama, jumlah item |
| `/collection/[slug]` | Breadcrumb + judul + grid produk + CTA WhatsApp | Data dari `content/collections.ts` |
| `/gallery` | Masonry grid + lightbox | Lazy-load agresif; halaman terberat, wajib dipantau |
| `/about` | Cerita, timeline, workshop, video YouTube (`loading="lazy"`) | Halaman kredibilitas utama bagi pembeli B2B |
| `/about-batik` | Artikel panjang, gaya editorial | Peluang SEO terbesar untuk kata kunci "batik pewarna alam" |
| `/contact` | Form + info + peta | Peta dimuat statis, bukan iframe Google Maps interaktif |
| `/faq` | Accordion + JSON-LD `FAQPage` | Berpeluang muncul sebagai rich result |
| `/review` | Grid testimoni + JSON-LD `Review` | — |
| `/partnership` | Proposisi + form | — |
| `/map-batik` | Peta interaktif Nusantara | Komponen paling kompleks — jadwalkan di fase akhir |
| `/campaign/[slug]` | MDX bebas | — |
| `/blog`, `/blog/[slug]` | Indeks + artikel MDX | ISR `revalidate: 3600`; JSON-LD `Article` |

---

## 8. Anggaran Performa

Ditegakkan lewat CI. Bila terlampaui, build gagal.

| Metrik | Anggaran |
|---|---|
| Bobot halaman (homepage) | < 1,5 MB |
| Bobot halaman (gallery) | < 2,5 MB |
| JavaScript per route (gzip) | < 150 KB |
| Jumlah request | < 40 |
| LCP (4G simulasi) | < 2,5 s |
| CLS | < 0,1 |
| INP | < 200 ms |
| Lighthouse Performance | ≥ 90 |
| Lighthouse SEO | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |

### Aturan gambar

- Format AVIF dengan fallback WebP; **logo wajib SVG**.
- Ukuran responsif: 400w, 800w, 1200w, 1600w.
- Kualitas 75 — pada foto batik, selisihnya tidak kasat mata.
- `priority` hanya untuk gambar hero; sisanya lazy otomatis.
- `width` dan `height` eksplisit di semua gambar untuk mencegah CLS.
- **Tidak ada gambar melebihi 200 KB.**

Konteks: logo saat ini beresolusi 1600px untuk ditampilkan selebar 136px — 11,8× lebih besar dari kebutuhan.

### Aturan bundle

- Server Component sebagai default. `"use client"` hanya untuk navbar dropdown, menu mobile, lightbox galeri, dan accordion FAQ.
- Nol skrip pihak ketiga yang memblokir render. `ionicons` dari unpkg dihapus.
- GTM dimuat dengan `next/script` strategi `afterInteractive`.

---

## 9. SEO & Metadata

### Per halaman

Setiap `page.tsx` mengekspor objek `metadata`:

```ts
export const metadata: Metadata = {
  title: 'Koleksi Batik Pewarna Alam | BatikOrganik',
  description: '…140–160 karakter…',
  alternates: { canonical: 'https://batikorganik.co.id/collection' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'BatikOrganik',
    images: [{ url: '/og/collection.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};
```

### Yang wajib ada

- `<html lang="id">` — memperbaiki `lang="en"` yang keliru.
- Tepat **satu H1** per halaman.
- Canonical di semua halaman.
- `app/sitemap.ts` — dihasilkan otomatis dari daftar route, tidak akan basi.
- `app/robots.ts` — memblokir `/admin`.
- Gambar OG **1200×630** untuk setiap halaman utama. Foto produk existing berformat persegi dan akan terpotong; perlu dibuat khusus.
- JSON-LD `Organization` di root layout dengan `sameAs` seluruh profil sosial.
- JSON-LD `FAQPage` di `/faq`, `Article` di artikel blog.

### Pembagian kata kunci

Per keputusan [BO-49](https://urbanan.atlassian.net/browse/BO-49), situs ini **hanya** menargetkan: *batik pewarna alam, batik organik, batik etnik, batik artsy, batik Indonesia*.

Kata kunci korporat (*seragam batik kantor, vendor batik perusahaan, batik korporat, seragam instansi*) adalah milik `batikorganikcorporate.id`. **Tidak boleh muncul** di situs ini — inilah yang menghentikan kanibalisasi.

---

## 10. Aksesibilitas

Target **WCAG 2.1 AA**.

- Seluruh pasangan warna sudah diverifikasi di bagian 3.2.
- Navigasi keyboard penuh, dengan `focus-visible` ring 2px `gold-deep` yang terlihat jelas.
- Skip-to-content link.
- Alt text bermakna pada semua gambar produk — bukan "image1.jpg".
- Hierarki heading berurutan tanpa lompatan level.
- Area sentuh minimal 44×44px.
- `prefers-reduced-motion` dihormati.
- Dropdown navbar dapat dioperasikan keyboard dan mengumumkan state via ARIA.
- Diuji dengan axe DevTools dan navigasi keyboard manual.

---

## 11. Alur Kerja & Review Product Owner

**Tujuan tahap ini adalah menghasilkan preview yang bisa direview product owner, bukan mengganti situs produksi.** Situs lama tetap berjalan apa adanya selama pembangunan.

### Vercel sejak hari pertama

Repository disambungkan ke Vercel di **fase 0**, bukan di akhir. Konsekuensinya:

- Setiap push menghasilkan preview URL otomatis.
- PO bisa melihat progres kapan saja tanpa Anda perlu menyiapkan apa pun.
- Setiap pull request punya URL sendiri, sehingga umpan balik bisa spesifik per perubahan.

### Pengamanan preview

| Hal | Pengaturan | Alasan |
|---|---|---|
| Indexing | Preview Vercel otomatis mengirim `X-Robots-Tag: noindex` | Mencegah versi baru bersaing dengan situs lama di Google |
| Akses | Aktifkan **Deployment Protection** (password) | Agar link tidak tersebar sebelum disetujui |
| Domain | Gunakan subdomain preview Vercel | Domain asli belum disentuh sama sekali |

Yang **tidak** dikerjakan di tahap ini: `sitemap.ts`, `robots.ts`, dan pendaftaran Search Console. Ketiganya tidak berguna di preview dan baru relevan saat cutover.

Yang **tetap** dikerjakan lebih awal meski masih preview: **metadata dan Open Graph**. PO kemungkinan membagikan link itu ke orang lain, dan link tanpa preview terlihat tidak rapi.

### Cara meminta review

Setiap kali menyerahkan preview ke PO, sertakan:

1. Preview URL beserta password.
2. Daftar halaman yang sudah selesai dan yang belum.
3. Catatan keterbatasan yang sudah diketahui, agar tidak dilaporkan sebagai temuan baru.
4. Pertanyaan spesifik yang ingin dijawab — umpan balik terarah jauh lebih berguna daripada "bagaimana menurutmu?".

### Risiko pendekatan review-di-akhir

Keputusan yang diambil: review PO dilakukan **setelah seluruh situs selesai**.

Risiko yang perlu disadari: bila arah visual ditolak setelah 15+ halaman jadi, biaya perbaikannya besar. Dua langkah pencegahan yang murah:

- **Kirim tangkapan layar homepage secara informal** di akhir fase 2, tanpa proses review formal. Cukup untuk menangkap penolakan besar lebih awal.
- **Bangun halaman referensi design system** (`/styleguide`) di fase 1 dan tunjukkan. Satu halaman berisi warna, tipografi, dan komponen — cukup untuk memvalidasi arah visual sebelum diterapkan ke belasan halaman.

---

## 11b. Cutover ke Produksi — DI LUAR LINGKUP TAHAP INI

> Bagian ini **belum dikerjakan sekarang**. Baru dijalankan setelah PO menyetujui hasil review dan diputuskan untuk mengganti situs lama. Disimpan di sini agar tidak terlupa.

Migrasi platform adalah momen paling berisiko bagi SEO. Detail lengkap ada di [BO-42](https://urbanan.atlassian.net/browse/BO-42).

1. **Audit URL** — ekspor URL terindeks dari Search Console, crawl situs lama, bandingkan dengan daftar route baru.
2. **Peta redirect** — 301 di `next.config.js` untuk setiap URL yang berubah. Tanpa rantai redirect.
3. **Staging** — jalankan di subdomain, bandingkan Lighthouse lama vs baru.
4. **Cutover** — arahkan domain. **Jangan matikan situs lama** sampai versi baru stabil 1–2 minggu.
5. **Pantau** — kirim ulang sitemap, awasi Coverage Report 30 hari, pantau Core Web Vitals lapangan.

**Rollback:** simpan build lama dan siapkan langkah pengembalian DNS tertulis sebelum cutover.

---

## 12. Milestone

| Fase | Isi | Jira | Estimasi |
|---|---|---|---|
| **0 — Fondasi** | Setup Next.js 15 + TS + Tailwind, token desain, `lib/constants.ts`, ESLint/Prettier, repo, **sambungkan Vercel + Deployment Protection** | [BO-40](https://urbanan.atlassian.net/browse/BO-40), [BO-38](https://urbanan.atlassian.net/browse/BO-38) | 2–3 hari |
| **1 — Design system** | Button, Card, Section, Container, Navbar, Footer, tipografi, halaman `/styleguide` | [BO-38](https://urbanan.atlassian.net/browse/BO-38) | 3–4 hari |
| **2 — Homepage** | 10 section, hero baru, optimasi gambar | [BO-36](https://urbanan.atlassian.net/browse/BO-36), [BO-39](https://urbanan.atlassian.net/browse/BO-39), [BO-37](https://urbanan.atlassian.net/browse/BO-37) | 4–5 hari |
| **3 — Halaman inti** | Collection (7 halaman), About, Contact | [BO-41](https://urbanan.atlassian.net/browse/BO-41) | 4–5 hari |
| **4 — Halaman pendukung** | Gallery, FAQ, Review, About Batik, Partnership | [BO-41](https://urbanan.atlassian.net/browse/BO-41) | 3–4 hari |
| **5 — Konten dinamis** | Blog + Campaign (MDX, ISR) | [BO-41](https://urbanan.atlassian.net/browse/BO-41) | 2–3 hari |
| **6 — Map Batik** | Peta interaktif Nusantara | — | 3–4 hari |
| **7 — Metadata & OG** | Metadata per halaman, Open Graph, JSON-LD | [BO-33](https://urbanan.atlassian.net/browse/BO-33), [BO-34](https://urbanan.atlassian.net/browse/BO-34) | 1–2 hari |
| **8 — Serah review PO** | Rapikan preview, Deployment Protection, catatan rilis, kumpulkan umpan balik | — | 1 hari |

**Total kasar: 5–6 minggu** untuk satu orang paruh waktu, sampai siap direview.

### Setelah review disetujui — belum masuk hitungan di atas

| Fase | Isi | Jira |
|---|---|---|
| **9 — SEO produksi** | `sitemap.ts`, `robots.ts`, Search Console, GTM | [BO-35](https://urbanan.atlassian.net/browse/BO-35), [BO-51](https://urbanan.atlassian.net/browse/BO-51) |
| **10 — Cutover** | Audit URL, redirect 301, DNS, monitoring 30 hari | [BO-42](https://urbanan.atlassian.net/browse/BO-42) |

Fase 0–2 sudah menghasilkan sesuatu yang bisa ditunjukkan. Meski review formal dilakukan di akhir, **kirimkan tangkapan layar homepage secara informal di akhir fase 2** — biaya sepuluh menit untuk menghindari risiko rework belasan halaman.

---

## 13. Definition of Done

### Siap diserahkan ke product owner

- [ ] Seluruh route lama tersedia di versi baru
- [ ] Preview Vercel aktif dengan Deployment Protection
- [ ] Preview ber-`noindex` (verifikasi header `X-Robots-Tag`)
- [ ] Homepage < 1,5 MB, tinggi < 6.000px
- [ ] Lighthouse: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 95
- [ ] LCP < 2,5 s pada simulasi 4G; CLS < 0,1
- [ ] Tepat satu H1 per halaman; hierarki heading berurutan
- [ ] Metadata unik + Open Graph di semua halaman; preview terverifikasi di WhatsApp dan LinkedIn
- [ ] `lang="id"` dan canonical terpasang
- [ ] Nol `<img>` mentah — seluruhnya `next/image`
- [ ] Nol skrip pihak ketiga yang memblokir render
- [ ] Nol error TypeScript, nol peringatan ESLint
- [ ] Seluruh pasangan warna lolos WCAG AA (sudah diverifikasi di bagian 3.2)
- [ ] Nomor WhatsApp & tautan sosial hanya bersumber dari `lib/constants.ts`
- [ ] Tidak ada kata kunci milik domain corporate yang tersisa
- [ ] Catatan rilis untuk PO disiapkan: URL preview, password, daftar halaman selesai, keterbatasan yang diketahui

### Baru relevan saat cutover — bukan sekarang

- [ ] `sitemap.ts` dan `robots.ts` aktif
- [ ] Redirect 301 terpasang untuk URL yang berubah
- [ ] GTM aktif dan terverifikasi
- [ ] Nol error 404 di Search Console, 30 hari setelah cutover

---

## 14. Keputusan Terbuka

| # | Pertanyaan | Perlu dari |
|---|---|---|
| 1 | Fraunces atau Instrument Serif untuk display? | Review visual setelah fase 1 |
| 2 | Pembagian nomor WhatsApp: mana untuk retail, mana untuk korporat? | Tim ([BO-27](https://urbanan.atlassian.net/browse/BO-27)) |
| 3 | Data produk per koleksi — hardcode di `content/` atau ambil dari backend `/admin` lama? | Cek dulu ketersediaan API `/admin` |
| 4 | Aset gambar dipindahkan ke `public/` atau tetap dilayani backend lama? | Keputusan infrastruktur |
| 5 | Status domain `batikorganik.id` | [BO-52](https://urbanan.atlassian.net/browse/BO-52) |
| 6 | URL koleksi diubah jadi slug deskriptif, atau tetap angka? | Trade-off SEO vs risiko redirect |

---

## Lampiran — Ringkas Token untuk `tailwind.config.ts`

```ts
theme: {
  extend: {
    colors: {
      ink:        { DEFAULT: '#14110F', secondary: '#4A4643', muted: '#6E6862' },
      surface:    { DEFAULT: '#FFFFFF', alt: '#FAF8F5', sunken: '#F4F0EA' },
      gold:       { DEFAULT: '#C8A45C', deep: '#8A6D2F', wash: '#F7F1E4' },
      hairline:   '#E8E2D9',
    },
    fontFamily: {
      display: ['var(--font-fraunces)', 'serif'],
      sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
    },
    borderRadius: { sm: '2px', DEFAULT: '4px', lg: '8px' },
    boxShadow: {
      soft: '0 1px 2px rgba(20,17,15,.04), 0 8px 24px rgba(20,17,15,.06)',
    },
    transitionTimingFunction: { elegant: 'cubic-bezier(.2,.8,.2,1)' },
  },
}
```

**Pengingat terakhir:** `gold.DEFAULT` tidak boleh dipakai sebagai warna teks di latar terang. Rasionya 2,35:1 — gagal WCAG. Untuk teks beraksen emas, gunakan `gold.deep`.