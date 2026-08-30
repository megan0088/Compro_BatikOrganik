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
      <PageHero eyebrow="PHILOSOPHY OF BATIK" title="JEJAK BATIK">
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

      <Section>
        <Heading as="h2" className="!text-xl">
          {batikMotifs.length} MOTIF · {regions.length} DAERAH
        </Heading>
        <ul className="grid gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
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
                    className="aspect-square w-full rounded-md object-cover"
                  />
                )}
                <h3 className="font-display pt-4 text-xl uppercase tracking-[0.1em]">
                  {m.motif.replace(/^Motif\s+/i, "")}
                </h3>
                <p className="font-sans font-light pt-1 text-sm">{m.region}</p>
              </li>
            );
          })}
        </ul>
      </Section>
    </Container>
  );
}
