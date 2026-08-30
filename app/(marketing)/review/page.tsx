import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { asset } from "@/lib/assets";
import { testimonials } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Testimonial",
  description:
    "Ulasan pembeli BatikOrganik dari Google Maps, Shopee, dan pesan langsung.",
  path: "/review",
});

export default function ReviewPage() {
  return (
    <Container>
      <PageHero eyebrow="ABOUT" title="TESTIMONIAL">
        <p>
          Ulasan yang ditulis pembeli BatikOrganik di Google Maps, Shopee, dan
          pesan langsung.
        </p>
      </PageHero>

      <Section className="!pt-0">
        <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>li]:mb-6 [&>li]:break-inside-avoid">
          {testimonials.map((t) => {
            const img = asset(t.image_url);
            if (!img) return null;
            return (
              <li key={t.id}>
                <Image
                  src={img.src}
                  alt={`Tangkapan layar ulasan pembeli (${t.source})`}
                  width={img.width}
                  height={img.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  className="w-full rounded-md border border-hairline"
                />
              </li>
            );
          })}
        </ul>
      </Section>
    </Container>
  );
}
