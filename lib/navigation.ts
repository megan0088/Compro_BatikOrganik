import { CONTACT, SHOP, waLink } from "./constants";

export type NavItem = { label: string; href: string; external?: boolean };
export type NavGroup = { label: string; items: NavItem[] };

/** 6 kategori koleksi — id-nya dipakai sebagai URL kanonis /collection/[1-6]. */
export const COLLECTION_NAV: NavItem[] = [
  { label: "Batik", href: "/collection/1" },
  { label: "Women", href: "/collection/2" },
  { label: "Men", href: "/collection/3" },
  { label: "Organic Fiber", href: "/collection/4" },
  { label: "Craft", href: "/collection/5" },
  { label: "Gift", href: "/collection/6" },
];

/** Tiga kolom di dalam dropdown "Communiqué", persis seperti situs live. */
export const COMMUNIQUE_NAV: NavGroup[] = [
  {
    label: "About",
    items: [
      { label: "Journey", href: "/about" },
      { label: "Batik", href: "/about-batik" },
      { label: "Partnership", href: "/partnership" },
      { label: "Testimonial", href: "/review" },
    ],
  },
  {
    label: "Connect",
    items: [
      { label: "Contact & Location", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      {
        label: "Whatsapp",
        href: waLink(CONTACT.whatsappCorporate),
        external: true,
      },
    ],
  },
  {
    label: "Campaign",
    items: [
      { label: "Heritage", href: "/campaign/1" },
      { label: "Modern Batik", href: "/campaign/2" },
      { label: "Artisan Craft", href: "/campaign/3" },
      { label: "Eco-Friendly", href: "/campaign/4" },
      { label: "Global", href: "/campaign/5" },
    ],
  },
];

/**
 * Target ikon di kanan navbar.
 *
 * Ikon keranjang di situs live mengarah ke `https://batikorganik.id`, dan
 * domain itu RUSAK: sertifikatnya self-signed, jadi browser menampilkan
 * peringatan keamanan layar penuh; varian `www` cuma halaman default cPanel.
 * Pembeli yang mengkliknya mengira brand-nya kena retas.
 *
 * Diarahkan ke toko Shopee resmi (handle dikonfirmasi pemilik, 28 Agu 2026).
 * Parameter `?is_from_login=true` sengaja tidak dipakai — itu jejak sesi login,
 * bukan bagian alamat toko.
 */
/*
 * Situs live punya tiga ikon: orang (menuju panel CMS staf `/admin`),
 * pencarian, dan keranjang. Ikon orang dihapus — situs ini company profile
 * tanpa sistem akun, jadi tidak ada tujuan yang masuk akal untuk ikon itu.
 * Kontak tetap terjangkau lewat navbar (Communiqué) dan footer.
 */
export const NAV_ICON_LINKS = {
  shop: SHOP.shopee,
} as const;

/** Sasaran pencarian: 6 koleksi + halaman utama. */
export const SEARCH_TARGETS: NavItem[] = [
  ...COLLECTION_NAV,
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  ...COMMUNIQUE_NAV.flatMap((g) => g.items.filter((i) => !i.external)),
];
