import type { Asset } from "@/lib/assets";

/**
 * Hero adalah elemen LCP dan berkas terbesar di halaman. Hosting statis tidak
 * punya Image Optimization API, jadi `next/image` hanya bisa mengirim SATU
 * berkas untuk semua perangkat — HP ikut mengunduh versi desktop 201 KB.
 *
 * `<picture>` dengan srcset menyelesaikannya tanpa server: browser memilih
 * sendiri (54 KB di HP, 107 KB di tablet, 193 KB di desktop). Varian dibuat
 * oleh scripts/gen-hero-variants.mjs.
 */
export default function HeroImage({
  image,
  alt,
}: {
  image: Asset;
  alt: string;
}) {
  const base = image.src.replace(/\.webp$/, "");
  return (
    <picture>
      <source media="(max-width: 640px)" srcSet={`${base}-640.webp`} type="image/webp" />
      <source media="(max-width: 1024px)" srcSet={`${base}-960.webp`} type="image/webp" />
      <source srcSet={`${base}-1400.webp`} type="image/webp" />
      <img
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </picture>
  );
}
