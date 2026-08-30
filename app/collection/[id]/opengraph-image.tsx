import { notFound } from "next/navigation";
import { categories } from "@/lib/content";
import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = "Koleksi BatikOrganik";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Enam kategori punya kartunya sendiri — ini halaman yang paling sering dibagikan. */
export function generateStaticParams() {
  return categories.map((c) => ({ id: String(c.id) }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = categories.find((c) => String(c.id) === id);
  if (!category) notFound();

  return ogImage({
    title: `Koleksi ${category.title}`,
    eyebrow: "Our Collection",
  });
}
