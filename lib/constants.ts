/**
 * SATU sumber kebenaran untuk kontak & tautan.
 * Nilai diambil dari GET https://batikorganik.co.id/api/contact (27 Agustus 2026).
 * Jangan pernah menulis nomor atau URL sosial langsung di komponen.
 */
export const CONTACT = {
  phoneDisplay: "+6281617000530",
  whatsappRetail: "6281617000530",
  /** Dipakai navbar situs live untuk item "Whatsapp" di dropdown Communiqué. */
  whatsappCorporate: "6281617000350",
  email: "info@batikorganik.co.id",
  street: "Cipaku, Bogor Selatan",
  city: "Jawa Barat, Indonesia",
} as const;

export const SOCIAL = {
  instagram: "https://www.instagram.com/batikorganik/",
  tiktok: "https://www.tiktok.com/@batikorganik",
  youtube: "https://www.youtube.com/c/batikorganik",
  facebook: "https://www.facebook.com/batikorganik.official/",
} as const;

/** Kanal jual resmi. Tambahkan marketplace lain di sini, bukan di komponen. */
export const SHOP = {
  shopee: "https://shopee.co.id/batikorganik",
} as const;

export const SITE = {
  name: "BatikOrganik",
  title: "Batik Organik",
  url: "https://batikorganik.co.id",
  tagline: "INDONESIA ARTSY BATIK",
  description:
    "BatikOrganik adalah brand batik artsy pertama yang mengangkat motif batik etnik inovatif, menampilkan keindahan tradisi, budaya, fauna dan flora endemik, serta keelokan panorama Indonesia.",
} as const;

export const waLink = (phone: string, text?: string) =>
  `https://api.whatsapp.com/send/?phone=${phone}${
    text ? `&text=${encodeURIComponent(text)}` : ""
  }`;
