import Image from "next/image";
import ActionButton from "@/components/ui/ActionButton";
import Heading, { Eyebrow } from "@/components/ui/Heading";
import RichText from "@/components/ui/RichText";
import { asset } from "@/lib/assets";
import type { SectionRow } from "@/lib/content";

/**
 * Blok dua kolom teks | foto, dipakai berulang di About, Gallery, dan
 * Partnership. Sisi foto berpindah selang-seling supaya ritmenya tidak
 * monoton — itu satu-satunya variasi yang halaman panjang ini butuhkan.
 */
export default function SplitRow({
  row,
  flip = false,
  headingAs = "h2",
}: {
  row: SectionRow;
  flip?: boolean;
  headingAs?: "h2" | "h3";
}) {
  const img = asset(row.image_url);
  const hasText = row.title || row.caption || row.subtitle;

  const text = hasText ? (
    <div className="flex flex-col items-start gap-5 md:w-1/2">
      {row.subtitle && <Eyebrow>{row.subtitle}</Eyebrow>}
      {row.title && (
        <Heading as={headingAs} level="h2" className="max-w-[18ch]">
          {row.title}
        </Heading>
      )}
      {row.caption && (
        <RichText
          html={row.caption}
          className="font-sans text-[1.0625rem] leading-[1.7] text-ink-soft"
        />
      )}
      {row.button_label && row.link && (
        <ActionButton href={row.link} variant="secondary" className="mt-2">
          {row.button_label}
        </ActionButton>
      )}
    </div>
  ) : null;

  const media = img ? (
    <div className="md:w-1/2">
      <Image
        src={img.src}
        alt={row.title ?? row.name}
        width={img.width}
        height={img.height}
        sizes="(max-width: 768px) 100vw, 560px"
        className="w-full object-cover"
      />
    </div>
  ) : null;

  if (!text && !media) return null;

  return (
    <div
      className={`mx-auto flex w-full max-w-[1240px] flex-col gap-10 px-5 py-[var(--space-default)] md:flex-row md:items-center md:gap-16 md:px-10 ${
        flip ? "md:flex-row-reverse" : ""
      }`}
    >
      {text}
      {media}
    </div>
  );
}
