import type { ElementType } from "react";
import ActionButton from "@/components/ui/ActionButton";
import Heading, { Eyebrow } from "@/components/ui/Heading";
import RichText from "@/components/ui/RichText";
import type { HomeRow } from "@/lib/content";

/**
 * Blok teks satu section: eyebrow → judul → caption → tombol.
 *
 * `subtitle` dari API berperan sebagai eyebrow (di ATAS judul, kecil),
 * bukan sub-judul — begitu cara situs lama memakainya, dan itu benar.
 */
export function Caption({
  html,
  className = "",
}: {
  html: string;
  className?: string;
}) {
  return (
    <RichText
      html={html}
      className={`font-sans text-[1.0625rem] leading-[1.7] text-ink-soft ${className}`}
    />
  );
}

export default function CopyBlock({
  row,
  as = "h2",
  level = "h2",
  className = "",
}: {
  row: HomeRow;
  as?: ElementType;
  level?: "display" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-start gap-5 ${className}`}>
      {row.subtitle && <Eyebrow>{row.subtitle}</Eyebrow>}
      {row.title && (
        <Heading as={as} level={level} className="max-w-[18ch]">
          {row.title}
        </Heading>
      )}
      {row.caption && <Caption html={row.caption} />}
      {row.button_label && row.link && (
        <ActionButton href={row.link} className="mt-2">
          {row.button_label}
        </ActionButton>
      )}
    </div>
  );
}
