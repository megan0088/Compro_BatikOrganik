import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import { asset } from "@/lib/assets";
import { batikMotifs, contact } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Peta Jejak Batik",
  description:
    "Dua puluh satu motif batik etnik BatikOrganik dan daerah asalnya — dari Serambi Aceh sampai Sumba.",
  path: "/map-batik",
});

const mapImage = asset("/static/media/PETA INDONESIA tanpa titik.jpg");

export default function MapBatikPage() {
  const regions = [...new Set(batikMotifs.map((m) => m.region))];

  return (
    <Container>
      <PageHero eyebrow="Philosophy of Batik" title="Jejak Batik">
        <div
          className="rich-text"
          dangerouslySetInnerHTML={{ __html: contact.caption_contact }}
        />
      </PageHero>

      {mapImage && (
        <Image
          src={mapImage.src}
          alt="Peta Indonesia sebagai latar jejak motif batik"
          width={mapImage.width}
          height={mapImage.height}
          sizes="(max-width: 1240px) 100vw, 1208px"
          priority
          className="w-full object-contain"
        />
      )}

      <Section tone="minor">
        <Heading as="h2" level="h3">
          {batikMotifs.length} motif · {regions.length} daerah
        </Heading>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-9 pt-10 md:gap-x-7 md:gap-y-12 lg:grid-cols-3">
          {batikMotifs.map((m, i) => {
            const img = asset(m.image_url);
            return (
              <li key={`${m.id}-${i}`}>
                {img && (
                  <Image
                    src={img.src}
                    alt={m.motif}
                    width={img.width}
                    height={img.height}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="aspect-square w-full object-cover"
                  />
                )}
                <h3 className="border-t border-hairline pt-3.5 font-display text-[1.25rem] leading-tight">
                  {m.motif.replace(/^Motif\s+/i, "")}
                </h3>
                <p className="pt-1 font-sans text-[0.8125rem] uppercase tracking-[0.1em] text-ink-muted">
                  {m.region}
                </p>
              </li>
            );
          })}
        </ul>
      </Section>
    </Container>
  );
}
