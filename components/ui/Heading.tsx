import type { ElementType, ReactNode } from "react";

/**
 * Tiga tingkat judul yang benar-benar berbeda. Situs lama memakai satu
 * ukuran (36px) untuk keenam judul section, jadi tak ada yang menonjol.
 *
 * `as` mengikuti struktur semantik; `level` mengatur ukuran. Keduanya
 * sengaja dipisah supaya mengecilkan judul tidak berarti menurunkan
 * level heading.
 */
const LEVELS = {
  display:
    "text-[2.75rem] leading-[1.06] tracking-[-0.015em] md:text-[4.25rem]",
  h2: "text-[2rem] leading-[1.12] tracking-[-0.01em] md:text-[2.625rem]",
  h3: "text-[1.25rem] leading-[1.3] md:text-[1.375rem]",
} as const;

export default function Heading({
  as: Tag = "h2",
  level = "h2",
  children,
  className = "",
}: {
  as?: ElementType;
  level?: keyof typeof LEVELS;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Tag className={`font-display font-normal text-ink ${LEVELS[level]} ${className}`}>
      {children}
    </Tag>
  );
}

/**
 * Eyebrow — satu-satunya tempat huruf kapital semua diizinkan.
 * Garis pendek di kirinya menandai awal section tanpa menambah ornamen.
 */
export function Eyebrow({
  children,
  rule = true,
  className = "",
}: {
  children: ReactNode;
  rule?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3.5 font-sans text-xs uppercase leading-5 tracking-[0.22em] text-soga ${className}`}
    >
      {rule && (
        <span aria-hidden="true" className="block h-px w-7 bg-soga" />
      )}
      {children}
    </p>
  );
}
