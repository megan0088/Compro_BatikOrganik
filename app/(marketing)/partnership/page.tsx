import Image from "next/image";
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
        title={header?.title ?? "PARTNERSHIP"}
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
          className="w-full rounded-md object-cover"
        />
      )}

      {offerings.length > 0 && (
        <Section>
          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
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
                      className="aspect-[3/4] w-full rounded-md object-cover"
                    />
                  )}
                  <h2 className="font-display pt-4 text-xl uppercase tracking-[0.1em]">
                    {row.title}
                  </h2>
                  {row.caption && (
                    <RichText html={row.caption} className="font-display pt-2" />
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
            <p className="font-display pt-4 text-xl tracking-[0.1em]">
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
