import { asset } from "./assets";
import {
  hamperCategoriesIn,
  hamperItemsIn,
  type HamperSection,
} from "./content";
import type { BuilderStep } from "@/components/sections/HamperBuilder";

/** Susun satu tahap konfigurator dari data /api/corporate. */
export function buildStep(
  section: HamperSection,
  label: string,
  prompt: string,
): BuilderStep {
  const options = hamperItemsIn(section).map((i) => ({
    id: i.id,
    name: i.name,
    categoryId: i.category_id,
    type: i.type,
    description: i.description,
    image: asset(i.image_url),
  }));
  const dipakai = new Set(options.map((o) => o.categoryId));
  return {
    key: section,
    label,
    prompt,
    options,
    // Hanya kategori yang benar-benar punya isi — situs lama menampilkan
    // tab kosong untuk kategori tanpa item.
    categories: hamperCategoriesIn(section)
      .filter((c) => dipakai.has(c.id))
      .map((c) => ({ id: c.id, title: c.title })),
  };
}
