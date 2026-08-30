import Link from "next/link";

/** Remah roti rata kiri, sejajar dengan judul halaman di bawahnya. */
export default function Breadcrumb({
  trail,
  current,
}: {
  trail: { label: string; href: string }[];
  current: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="pt-[calc(var(--nav-height)+2rem)]"
    >
      <ol className="flex flex-wrap items-center gap-2 font-sans text-[0.8125rem] uppercase tracking-[0.14em] text-ink-muted">
        {trail.map((t) => (
          <li key={t.href} className="flex items-center gap-2">
            <Link href={t.href} className="hover:text-soga">
              {t.label}
            </Link>
            <span aria-hidden="true" className="text-hairline">
              /
            </span>
          </li>
        ))}
        <li aria-current="page" className="text-ink">
          {current}
        </li>
      </ol>
    </nav>
  );
}
