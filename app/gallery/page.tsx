import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import SplitRow from "@/components/sections/SplitRow";
import Container from "@/components/ui/Container";
import RichText from "@/components/ui/RichText";
import Section from "@/components/ui/Section";
import { asset } from "@/lib/assets";
import { galleryRows } from "@/lib/content";
import { pageMetadata, plain } from "@/lib/metadata";

const header = galleryRows.find((r) => r.is_header === 1) ?? galleryRows[0];
const body = galleryRows.filter((r) => r !== header);

export const metadata = pageMetadata({
  title: "Gallery",
  description: header?.caption
    ? plain(header.caption)
    : "Galeri foto Rumah Batik Organik di Cipaku, Bogor Selatan.",
  path: "/gallery",
});

export default function GalleryPage() {
  const photos = body.filter((r) => r.image_url && !r.title && !r.caption);
  const stories = body.filter((r) => r.title || r.caption);

  return (
    <>
      <Container>
        <PageHero eyebrow={header?.subtitle} title={header?.title ?? "GALLERY"}>
          {header?.caption && <RichText html={header.caption} />}
        </PageHero>
      </Container>

      {stories.map((row, i) => (
        <SplitRow key={row.id} row={row} flip={i % 2 === 1} />
      ))}

      {photos.length > 0 && (
        <Container>
          <Section className="!pt-0">
            <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>li]:mb-6 [&>li]:break-inside-avoid">
              {photos.map((row) => {
                const img = asset(row.image_url);
                if (!img) return null;
                return (
                  <li key={row.id}>
                    <Image
                      src={img.src}
                      alt={row.name}
                      width={img.width}
                      height={img.height}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                      className="w-full rounded-md object-cover"
                    />
                  </li>
                );
              })}
            </ul>
          </Section>
        </Container>
      )}
    </>
  );
}
