import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Tinggi 48px, sudut siku, tanpa bayangan.
 *
 * Situs lama tidak punya state hover maupun focus sama sekali — tombolnya
 * tidak bisa dioperasikan lewat keyboard. Focus ring memakai soga, satu-satunya
 * aksen yang lolos kontras di latar terang.
 */
const VARIANTS = {
  primary:
    "border border-ink bg-ink text-surface hover:border-soga hover:bg-soga",
  secondary:
    "border border-ink text-ink hover:border-soga hover:bg-soga-quiet",
  ghost:
    "border-b border-hairline pb-1 text-soga hover:border-soga hover:text-ink",
} as const;

const BASE =
  "inline-flex min-h-[48px] items-center justify-center font-sans text-[0.9375rem] tracking-[0.03em] " +
  "transition-colors duration-200 " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soga";

export default function ActionButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
  className?: string;
}) {
  const padding = variant === "ghost" ? "" : "px-7";
  const cls = `${BASE} ${padding} ${VARIANTS[variant]} ${className}`;
  const external = /^https?:\/\//.test(href);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
