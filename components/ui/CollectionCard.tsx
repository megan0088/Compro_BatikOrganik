import Image from "next/image";
import Link from "next/link";
import type { Asset } from "@/lib/assets";

/**
 * Kartu koleksi: foto 1:1, judul dipisah garis 1px, jumlah item.
 *
 * Mockup awal memakai potret 3:4, tapi aset kategori yang ada aslinya 1600×1600.
 * Memaksanya ke 3:4 memotong 25%, dan memakai `cover_image_url` (banner 2,3:1)
 * memotong 67% — jadi kartu mengikuti bentuk fotonya, bukan sebaliknya.
 * Jumlah item hanya tampil kalau angkanya nyata; kategori kosong tidak
 * diisi angka karangan.
 */
export default function CollectionCard({
  href,
  title,
  image,
  count,
  blurb,
  priority = false,
}: {
  href: string;
  title: string;
  image: Asset | null;
  count?: number;
  blurb?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soga"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-surface-deep">
        {image && (
          <Image
            src={image.src}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            priority={priority}
            className="object-cover transition-opacity duration-200 group-hover:opacity-88"
          />
        )}
      </div>
      <div className="flex items-baseline justify-between gap-3 border-t border-hairline pt-3.5">
        <span className="font-display text-[1.375rem] leading-tight decoration-soga underline-offset-4 group-hover:underline">
          {title}
        </span>
        {count != null && count > 0 && (
          <span className="font-sans text-[0.8125rem] uppercase tracking-[0.1em] text-ink-muted">
            {count} item
          </span>
        )}
      </div>
      {blurb && (
        <p className="hidden font-sans text-[0.9375rem] leading-relaxed text-ink-soft md:block">
          {blurb}
        </p>
      )}
    </Link>
  );
}
