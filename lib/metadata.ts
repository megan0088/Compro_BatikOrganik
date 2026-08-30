import type { Metadata } from "next";
import { SITE } from "./constants";

/** Metadata + canonical + Open Graph per halaman, satu pola untuk semua. */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "id_ID",
      siteName: SITE.name,
      title,
      description,
      url: path,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: "summary_large_image" },
  };
}

/** Buang tag HTML dari caption API untuk dipakai sebagai meta description. */
export const plain = (html: string, max = 160) => {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
};
