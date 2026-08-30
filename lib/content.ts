import homeJson from "@/content/api/home.json";
import categoryJson from "@/content/api/category.json";
import campaignJson from "@/content/api/campaign.json";
import contactJson from "@/content/api/contact.json";
import aboutJson from "@/content/api/about.json";
import blogJson from "@/content/api/blog.json";
import collectionJson from "@/content/api/collection.json";
import faqJson from "@/content/api/faq.json";
import journeyJson from "@/content/api/journey.json";
import mapBatikJson from "@/content/api/map-batik.json";
import galleryJson from "@/content/api/gallery.json";
import partnershipJson from "@/content/api/partnership.json";
import testimonialJson from "@/content/api/testimonial.json";

/** Satu baris section homepage seperti dikembalikan GET /api/home. */
export type HomeRow = {
  id: number;
  section_part: number;
  name: string;
  image_url: string | null;
  title: string | null;
  subtitle: string | null;
  caption: string | null;
  button_label: string | null;
  link: string | null;
  with_image: number;
  with_video: number;
};

export type Category = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  cover_image_url: string | null;
};

export type Campaign = {
  id: number;
  name: string;
  title: string;
  description: string;
  image_url: string;
};

/**
 * API mengembalikan `section_part` sebagai string ("1", "2", …) sementara
 * `id`, `with_image`, dan `with_video` sebagai angka. Normalkan di satu
 * tempat supaya pemanggil tidak perlu tahu keanehan itu.
 */
export const homeRows: HomeRow[] = (
  homeJson.data as unknown as Array<Record<string, unknown>>
).map((r) => ({
  ...(r as unknown as HomeRow),
  id: Number(r.id),
  section_part: Number(r.section_part),
  with_image: Number(r.with_image),
  with_video: Number(r.with_video),
}));
export const categories = categoryJson.data as unknown as Category[];
export const campaigns = campaignJson.data as unknown as Campaign[];
export const contact = contactJson.data as unknown as {
  phone: string;
  email: string;
  about: string;
  caption_contact: string;
  map_iframe: string;
  logo_img: string;
  banner_img: string;
  partnership_imgs: string[];
  cta_label: string;
  cta_link: string;
};

/** Baris homepage untuk satu section_part, urut sesuai id (urutan situs live). */
export const partRows = (part: number) =>
  homeRows.filter((r) => r.section_part === part).sort((a, b) => a.id - b.id);

/** Baris teks utama sebuah section: yang punya title atau caption. */
export const partCopy = (part: number) =>
  partRows(part).filter((r) => r.title || r.caption);

/** Slide carousel sebuah section: baris bergambar tanpa teks. */
export const partSlides = (part: number) =>
  partRows(part).filter((r) => r.with_image === 1 && !r.title && !r.caption);

/* ---------- Konten halaman lain ---------- */

/** Baris bergaya section_part, dipakai halaman About / Gallery / Partnership. */
export type SectionRow = {
  id: number;
  section_part: number;
  name: string;
  image_url: string | null;
  title: string | null;
  subtitle: string | null;
  caption: string | null;
  button_label: string | null;
  link: string | null;
  with_image?: number;
  with_video?: number;
  is_header?: number;
};

const asSectionRows = (raw: unknown): SectionRow[] =>
  (raw as Array<Record<string, unknown>>)
    .map((r) => ({
      ...(r as unknown as SectionRow),
      id: Number(r.id),
      section_part: Number(r.section_part),
      with_image: r.with_image == null ? undefined : Number(r.with_image),
      with_video: r.with_video == null ? undefined : Number(r.with_video),
      is_header: r.is_header == null ? undefined : Number(r.is_header),
    }))
    .sort((a, b) => a.id - b.id);

/** /about-batik memakai dataset `about`; /about (Journey) memakai `journey`. */
export const aboutBatikRows = asSectionRows(aboutJson.data);
export const journeyRows = asSectionRows(journeyJson.data);
export const galleryRows = asSectionRows(galleryJson.data);
export const partnershipRows = asSectionRows(partnershipJson.data);

/** Kelompokkan baris per section_part, urut naik. */
export const groupByPart = (rows: SectionRow[]): SectionRow[][] => {
  const parts = [...new Set(rows.map((r) => r.section_part))].sort(
    (a, b) => a - b,
  );
  return parts.map((p) => rows.filter((r) => r.section_part === p));
};

export type CollectionItem = {
  id: number;
  collection_category_id: number;
  name: string;
  image_url: string;
  description: string;
};

export const collectionItems: CollectionItem[] = (
  collectionJson.data as unknown as Array<Record<string, unknown>>
).map((r) => ({
  ...(r as unknown as CollectionItem),
  id: Number(r.id),
  collection_category_id: Number(r.collection_category_id),
}));

export const itemsForCategory = (categoryId: number) =>
  collectionItems.filter((i) => i.collection_category_id === categoryId);

export type Faq = {
  question: string;
  answer: string;
  type_label: string;
  type: string;
};
export const faqs = faqJson.data as unknown as Faq[];

export type Testimonial = {
  id: number;
  name: string;
  image_url: string;
  source: string;
};
export const testimonials = testimonialJson.data as unknown as Testimonial[];

export type BlogPost = {
  admin: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
};
export const blogPosts = blogJson.data as unknown as BlogPost[];

/** Situs lama tidak punya slug artikel; dibuat dari judul agar URL stabil. */
export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

export const blogSlugs = blogPosts.map((p) => slugify(p.title));
export const postBySlug = (slug: string) =>
  blogPosts.find((p) => slugify(p.title) === slug) ?? null;

export type PartnerLogo = {
  id: number;
  image_url: string;
  name: string;
  position: number;
};

/** Logo klien korporat, dari kunci `partnership_images` di /api/partnership. */
export const partnerLogos: PartnerLogo[] = (
  (partnershipJson as { partnership_images?: unknown }).partnership_images as
    | PartnerLogo[]
    | undefined ?? []
).slice().sort((a, b) => a.position - b.position);

export type BatikMotif = {
  id: number;
  motif: string;
  region: string;
  image_url: string | null;
};

/**
 * 21 motif Peta Jejak Batik. Situs lama tidak menyediakannya lewat API —
 * datanya hardcoded di bundle JavaScript, jadi diekstrak dari sana.
 */
export const batikMotifs = mapBatikJson.data as unknown as BatikMotif[];
