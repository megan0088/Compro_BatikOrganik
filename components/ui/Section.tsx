import type { ReactNode } from "react";

/**
 * Empat tingkat ritme, bukan satu. Situs lama memakai
 * `py-10 md:py-16 lg:py-20` untuk SEMUA section — semuanya terasa sama
 * penting, artinya tidak ada yang menonjol.
 */
const TONES = {
  major: "py-[var(--space-major)]",
  default: "py-[var(--space-default)]",
  minor: "py-[var(--space-minor)]",
  flush: "py-0",
} as const;

export default function Section({
  children,
  tone = "default",
  className = "",
  id,
}: {
  children: ReactNode;
  tone?: keyof typeof TONES;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`${TONES[tone]} ${className}`}>
      {children}
    </section>
  );
}
