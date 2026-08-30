import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import ActionButton from "@/components/ui/ActionButton";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import RichText from "@/components/ui/RichText";
import Section from "@/components/ui/Section";
import { asset } from "@/lib/assets";
import { CONTACT, waLink } from "@/lib/constants";
import { partnerLogos, partnershipRows } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Partnership",
  description:
    "Kerja sama batik korporat BatikOrganik: handpicked collection, signature series, motif kustom, dan seragam batik perusahaan.",
  path: "/partnership",
});

const header = partnershipRows.find((r) => r.section_part === 1);
const offerings = partnershipRows.filter((r) => r.section_part === 2);
const clientHeading = partnershipRows.find((r) => r.section_part === 3);
const stat = partnershipRows.find((r) => r.section_part === 4);

export default function PartnershipPage() {
  const headerImg = asset(header?.image_url);

  return (
    <Container>
      <PageHero
        eyebrow={header?.subtitle}
        title={header?.title ?? "Partnership"}
      >
        {header?.caption && <RichText html={header.caption} />}
      </PageHero>

      {headerImg && (
        <Image
          src={headerImg.src}
          alt={header?.title ?? "Kerja sama korporat BatikOrganik"}
          width={headerImg.width}
          height={headerImg.height}
          sizes="(max-width: 1240px) 100vw, 1208px"
          priority
          className="w-full object-cover"
        />
      )}

      {offerings.length > 0 && (
        <Section>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-9 md:gap-x-7 lg:grid-cols-4">
            {offerings.map((row) => {
              const img = asset(row.image_url);
              return (
                <li key={row.id}>
                  {img && (
                    <Image
                      src={img.src}
                      alt={row.title ?? row.name}
                      width={img.width}
                      height={img.height}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                      className="aspect-square w-full object-cover"
                    />
                  )}
                  <h2 className="border-t border-hairline pt-3.5 font-display text-[1.25rem] leading-tight">
                    {row.title}
                  </h2>
                  {row.caption && (
                    <RichText html={row.caption} className="pt-2 font-sans text-[0.9375rem] leading-relaxed text-ink-soft" />
                  )}
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      {partnerLogos.length > 0 && (
        <Section className="!pt-0">
          <Heading as="h2">{clientHeading?.title ?? "OUR CLIENT"}</Heading>
          {stat?.title && (
            <p className="pt-4 font-display text-[2rem] leading-tight text-soga">
              {stat.title}
            </p>
          )}
          <ul className="flex flex-wrap items-center justify-center gap-8 pt-10 md:gap-12">
            {partnerLogos.map((logo) => {
              const img = asset(logo.image_url);
              if (!img) return null;
              return (
                <li key={logo.id}>
                  <Image
                    src={img.src}
                    alt={logo.name}
                    width={img.width}
                    height={img.height}
                    sizes="140px"
                    className="h-12 w-auto object-contain md:h-16"
                  />
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      {/* Jalur masuk ke tiga alur bingkisan. Tanpa ini halaman-halaman itu
          hanya bisa dicapai lewat URL lama. */}
      <Section tone="minor" className="!pt-0">
        <Heading as="h2" level="h3" className="pb-8">
          Mulai dari mana?
        </Heading>
        <ul className="grid gap-6 md:grid-cols-3">
          {[
            {
              href: "/partnership/hampers",
              title: "Hampers siap kirim",
              blurb: "Sudah dirangkai, tinggal pilih dan tambahkan kartu.",
            },
            {
              href: "/partnership/build",
              title: "Rangkai sendiri",
              blurb: "Pilih kemasan, isian, dan kartunya satu per satu.",
            },
            {
              href: "/partnership/custom",
              title: "Custom untuk perusahaan",
              blurb: "Motif dan kemasan disesuaikan dengan identitas Anda.",
            },
          ].map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="group flex h-full flex-col gap-2 border-t border-hairline pt-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soga"
              >
                <span className="font-display text-[1.25rem] leading-tight decoration-soga underline-offset-4 group-hover:underline">
                  {c.title}
                </span>
                <span className="font-sans text-[0.9375rem] leading-relaxed text-ink-soft">
                  {c.blurb}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="!pt-0">
        <ActionButton
          href={waLink(
            CONTACT.whatsappCorporate,
            "Halo BatikOrganik, saya ingin membahas kerja sama korporat.",
          )}
        >
          Diskusikan Kerja Sama
        </ActionButton>
      </Section>
    </Container>
  );
}
