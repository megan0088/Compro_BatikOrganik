import Image from "next/image";
import CopyBlock, { Caption } from "@/components/sections/CopyBlock";
import VideoEmbed from "@/components/sections/VideoEmbed";
import ActionButton from "@/components/ui/ActionButton";
import CollectionCard from "@/components/ui/CollectionCard";
import Container from "@/components/ui/Container";
import Heading, { Eyebrow } from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import { asset } from "@/lib/assets";
import { SHOP } from "@/lib/constants";
import {
  categories,
  itemsForCategory,
  partCopy,
  partRows,
  partSlides,
  type HomeRow,
} from "@/lib/content";

/** Buang tag HTML dari deskripsi kategori untuk dipakai sebagai blurb kartu. */
const plain = (html: string, max = 96) => {
  const t = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t;
};

/**
 * Grid foto statis menggantikan carousel. Situs lama menyembunyikan 24 foto
 * produk di balik slide pertama yang jarang digeser orang.
 */
function PhotoGrid({
  rows,
  label,
  columns = "md:grid-cols-3",
}: {
  rows: HomeRow[];
  label: string;
  columns?: string;
}) {
  const shots = rows.flatMap((r, i) => {
    const a = asset(r.image_url);
    return a ? [{ a, alt: `${label} — foto ${i + 1}` }] : [];
  });
  if (shots.length === 0) return null;

  return (
    <ul className={`grid grid-cols-2 gap-3 md:gap-4 ${columns}`}>
      {shots.map((s) => (
        <li key={s.a.src} className="relative aspect-video overflow-hidden bg-surface-deep">
          <Image
            src={s.a.src}
            alt={s.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            className="object-cover"
          />
        </li>
      ))}
    </ul>
  );
}

const videoOf = (part: number) =>
  partRows(part).find((r) => r.with_video === 1)?.link ?? null;

export default function Home() {
  const hero = asset(partRows(1)[0]?.image_url);

  const s2 = partCopy(2)[0]; // BATIK ORGANIK
  const s3 = partCopy(3)[0]; // EKSPLORASI ANUGERAH DARI ALAM
  const [s4a, s4b] = partCopy(4); // JELAJAHI ESTETIKA NUSANTARA
  const s5 = partCopy(5)[0]; // DEDIKASI PARA PENGRAJIN
  const s6 = partCopy(6)[0]; // BERBAGI CINTA MELALUI PENANAMAN POHON
  const s7 = partCopy(7)[0]; // BINGKISAN BATIK
  const s8 = partCopy(8)[0]; // News Banner

  const s4aImg = asset(s4a?.image_url);
  const s4bImg = asset(s4b?.image_url);
  const s6Img = asset(s6?.image_url);
  const s8Img = asset(s8?.image_url);
  const sponsors = partRows(3).filter(
    (r) => r.name === "tencel" || r.name === "apr",
  );

  return (
    <>
      {/*
        1 — Hero. Situs lama menaruh foto setinggi layar TANPA judul dan tanpa
        CTA: ruang paling berharga di seluruh situs terbuang, dan pengunjung
        harus menggulir satu layar penuh sebelum tahu ini menjual apa.
      */}
      <section className="relative h-[85svh] min-h-[560px] w-full overflow-hidden lg:h-screen">
        {hero && (
          <Image
            src={hero.src}
            alt="Koleksi kain BatikOrganik ditata di ruang pamer"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/50 to-ink/10"
        />
        <Container className="relative flex h-full flex-col justify-end pb-16 md:justify-center md:pb-0">
          <div className="flex max-w-[46rem] flex-col items-start gap-6">
            <p className="flex items-center gap-3.5 font-sans text-xs uppercase leading-5 tracking-[0.22em] text-soga-quiet">
              <span aria-hidden="true" className="block h-px w-10 bg-soga" />
              Indonesia Artsy Batik
            </p>
            <h1 className="font-display text-[2.75rem] font-normal leading-[1.06] tracking-[-0.015em] text-surface md:text-[4.25rem]">
              Batik pewarna alam, ditenun dari kisah Nusantara
            </h1>
            <p className="max-w-[34rem] font-sans text-[1.0625rem] leading-[1.7] text-surface/85 md:text-lg">
              Motif etnik dari serat eucalyptus dan acacia, dikerjakan tangan
              pengrajin di Cipaku, Bogor — sejak 2013.
            </p>
            <div className="flex flex-wrap gap-3.5 pt-2">
              <ActionButton
                href="/collection"
                className="!border-surface !bg-surface !text-ink hover:!border-soga-quiet hover:!bg-soga-quiet"
              >
                Lihat Koleksi
              </ActionButton>
              <ActionButton
                href={SHOP.shopee}
                variant="secondary"
                className="!border-surface/55 !text-surface hover:!border-surface hover:!bg-surface/10"
              >
                Belanja di Shopee
              </ActionButton>
            </div>
          </div>
        </Container>
      </section>

      {/* 2 — Koleksi: enam kategori sebagai grid, bukan carousel. */}
      <Section tone="major">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 pb-12 md:flex-row md:items-end md:gap-16">
            <div className="flex flex-col items-start gap-4">
              <Eyebrow>Koleksi</Eyebrow>
              <Heading as="h2" className="max-w-[16ch]">
                Enam jalan masuk ke satu warisan
              </Heading>
            </div>
            <p className="max-w-[34rem] font-sans text-[1.0625rem] leading-[1.7] text-ink-soft">
              Setiap motif adalah kisah yang dijalin benang tradisi — batik cap,
              batik tulis, dan tenun, dalam bahasa yang dipakai hari ini.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-9 md:gap-x-7 md:gap-y-12 lg:grid-cols-3">
            {categories.map((c, i) => (
              <li key={c.id}>
                <CollectionCard
                  href={`/collection/${c.id}`}
                  title={c.title}
                  image={asset(c.image_url)}
                  count={itemsForCategory(c.id).length}
                  blurb={plain(c.description)}
                  priority={i < 3}
                />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 3 — Cerita brand: teks kiri, foto kanan, di bidang hangat. */}
      {s2 && (
        <Section tone="default" className="bg-surface-warm">
          <Container>
            <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
              <CopyBlock row={s2} className="md:w-1/2" />
              <div className="md:w-1/2">
                <PhotoGrid
                  rows={partSlides(2).slice(0, 4)}
                  label="Koleksi BatikOrganik"
                  columns="md:grid-cols-2"
                />
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* 4 — Anugerah dari alam: dibalik, plus logo serat mitra. */}
      {s3 && (
        <Section tone="default">
          <Container>
            <div className="flex flex-col gap-10 md:flex-row-reverse md:items-center md:gap-16">
              <CopyBlock row={s3} className="md:w-1/2" />
              <div className="md:w-1/2">
                <PhotoGrid
                  rows={partSlides(3).filter(
                    (r) => r.name !== "tencel" && r.name !== "apr",
                  )}
                  label="Kain serat organik"
                  columns="md:grid-cols-2"
                />
              </div>
            </div>
            {sponsors.length > 0 && (
              <ul className="flex flex-wrap items-center gap-10 border-t border-hairline pt-10 md:mt-14">
                {sponsors.map((r) => {
                  const a = asset(r.image_url);
                  if (!a) return null;
                  return (
                    <li key={r.id}>
                      <Image
                        src={a.src}
                        alt={`Logo ${r.name.toUpperCase()}`}
                        width={a.width}
                        height={a.height}
                        sizes="150px"
                        className="h-11 w-auto object-contain md:h-14"
                      />
                    </li>
                  );
                })}
              </ul>
            )}
          </Container>
        </Section>
      )}

      {/* 5 — Estetika Nusantara: dua kolom bergambar. */}
      {(s4a || s4b) && (
        <Section tone="default" className="bg-surface-warm">
          <Container>
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              {s4a && (
                <div className="flex flex-col gap-8">
                  {s4aImg && (
                    <Image
                      src={s4aImg.src}
                      alt="Motif batik khas Nusantara"
                      width={s4aImg.width}
                      height={s4aImg.height}
                      sizes="(max-width: 768px) 100vw, 560px"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  )}
                  <CopyBlock row={s4a} />
                </div>
              )}
              {s4b && (
                <div className="flex flex-col gap-8">
                  {s4bImg && (
                    <Image
                      src={s4bImg.src}
                      alt="Kain batik bernuansa sogan"
                      width={s4bImg.width}
                      height={s4bImg.height}
                      sizes="(max-width: 768px) 100vw, 560px"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  )}
                  <CopyBlock row={s4b} />
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* 6 — Pengrajin: teks dan foto orang membatik berdampingan. */}
      {s5 && (() => {
        const bts = partSlides(5)
          .map((r) => ({ r, a: asset(r.image_url) }))
          .filter((x) => x.a !== null);
        const beside = bts[0];
        const strip = bts.slice(1, 4);
        return (
          <Section tone="flush">
            <div className="bg-indigo-deep py-[var(--space-default)] text-surface">
              <Container>
                <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
                  <div className="flex flex-col items-start gap-5 md:w-1/2">
                    <p className="flex items-center gap-3.5 font-sans text-xs uppercase leading-5 tracking-[0.22em] text-soga-quiet">
                      <span aria-hidden="true" className="block h-px w-7 bg-soga-quiet" />
                      Pengrajin
                    </p>
                    <Heading as="h2" className="!text-surface max-w-[18ch]">
                      {s5.title}
                    </Heading>
                    {s5.caption && (
                      <Caption html={s5.caption} className="!text-surface/85" />
                    )}
                    {s5.button_label && s5.link && (
                      <ActionButton
                        href={s5.link}
                        variant="secondary"
                        className="mt-2 !border-surface/55 !text-surface hover:!border-surface hover:!bg-surface/10"
                      >
                        {s5.button_label}
                      </ActionButton>
                    )}
                  </div>
                  {beside?.a && (
                    <div className="md:w-1/2">
                      <Image
                        src={beside.a.src}
                        alt="Pengrajin sedang membatik di Rumah Batik Organik"
                        width={beside.a.width}
                        height={beside.a.height}
                        sizes="(max-width: 768px) 100vw, 560px"
                        className="w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </Container>
            </div>
            {strip.length > 0 && (
              <ul className="grid grid-cols-3">
                {strip.map(({ r, a }, i) => (
                  <li key={r.id} className="relative aspect-video overflow-hidden bg-surface-deep">
                    <Image
                      src={a!.src}
                      alt={`Proses pembuatan batik — foto ${i + 1}`}
                      fill
                      sizes="33vw"
                      className="object-cover"
                    />
                  </li>
                ))}
              </ul>
            )}
          </Section>
        );
      })()}

      {/* 7 — Penanaman pohon: pita ringkas di bidang soga. */}
      {s6 && (
        <Section tone="minor" className="bg-soga-quiet">
          <Container>
            <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
              {s6Img && (
                <Image
                  src={s6Img.src}
                  alt="Kegiatan penanaman pohon bersama Lindungi Hutan"
                  width={s6Img.width}
                  height={s6Img.height}
                  sizes="(max-width: 768px) 100vw, 460px"
                  className="aspect-[4/3] w-full object-cover md:w-2/5"
                />
              )}
              <div className="flex flex-col items-start gap-5 md:w-3/5">
                <Heading as="h2" level="h3" className="max-w-[24ch]">
                  {s6.title}
                </Heading>
                {s6.caption && <Caption html={s6.caption} />}
                {s6.button_label && s6.link && (
                  <ActionButton href={s6.link} variant="ghost" className="mt-1">
                    {s6.button_label}
                  </ActionButton>
                )}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* 8 — Bingkisan batik: pita ringkas. */}
      {s7 && (
        <Section tone="minor">
          <Container>
            <div className="flex flex-col items-start gap-8">
              <div className="flex w-full flex-col items-start justify-between gap-5 md:flex-row md:items-end">
                <div className="flex flex-col items-start gap-4">
                  {s7.subtitle && <Eyebrow>{s7.subtitle}</Eyebrow>}
                  <Heading as="h2" level="h3">{s7.title}</Heading>
                </div>
                {s7.button_label && s7.link && (
                  <ActionButton href={s7.link} variant="secondary">
                    {s7.button_label}
                  </ActionButton>
                )}
              </div>
              <PhotoGrid rows={partSlides(7).slice(0, 3)} label="Bingkisan batik" />
            </div>
          </Container>
        </Section>
      )}

      {/* 9 — Video profil, satu saja. Situs lama menyematkan tiga iframe berat. */}
      {videoOf(2) && (
        <Section tone="minor" className="bg-surface-warm">
          <Container>
            <VideoEmbed src={videoOf(2)!} title="Profil BatikOrganik" />
          </Container>
        </Section>
      )}

      {/* 10 — Motif kustom untuk perusahaan. */}
      {s8 && (
        <section className="relative w-full">
          {s8Img && (
            <Image
              src={s8Img.src}
              alt="Batik dengan motif kustom untuk identitas perusahaan"
              width={s8Img.width}
              height={s8Img.height}
              sizes="100vw"
              className="h-[480px] w-full object-cover object-top md:h-[560px]"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/55 to-ink/15">
            <Container className="flex h-full flex-col justify-center">
              <div className="flex max-w-[38rem] flex-col items-start gap-5">
                {s8.subtitle && (
                  <p className="flex items-center gap-3.5 font-sans text-xs uppercase leading-5 tracking-[0.22em] text-soga-quiet">
                    <span aria-hidden="true" className="block h-px w-7 bg-soga" />
                    {s8.subtitle}
                  </p>
                )}
                <Heading as="h2" className="!text-surface max-w-[18ch]">
                  {s8.title}
                </Heading>
                {s8.button_label && s8.link && (
                  <ActionButton
                    href={s8.link}
                    className="mt-2 !border-surface !bg-surface !text-ink hover:!border-soga-quiet hover:!bg-soga-quiet"
                  >
                    {s8.button_label}
                  </ActionButton>
                )}
              </div>
            </Container>
          </div>
        </section>
      )}
    </>
  );
}
