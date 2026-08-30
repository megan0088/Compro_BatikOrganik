import Heading, { Eyebrow } from "@/components/ui/Heading";

/**
 * Kepala halaman dalam: eyebrow + judul, satu H1 per halaman.
 * Rata kiri — judul pendek boleh rata tengah, isi panjang tidak.
 */
export default function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string | null;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-5 pb-12 pt-[calc(var(--nav-height)+3.5rem)]">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading as="h1" level="h2" className="max-w-[20ch]">
        {title}
      </Heading>
      {children && (
        <div className="font-sans text-[1.0625rem] leading-[1.7] text-ink-soft">
          {children}
        </div>
      )}
    </div>
  );
}
