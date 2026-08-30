import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { asset } from "@/lib/assets";
import { categories, itemsForCategory } from "@/lib/content";
import { pageMetadata, plain } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Our Collection",
  description:
    "Enam koleksi BatikOrganik: Batik, Women, Men, Organic Fiber, Craft, dan Gift — batik pewarna alam dengan motif etnik Nusantara.",
  path: "/collection",
});

export default function CollectionIndex() {
  return (
    <Container>
      <PageHero eyebrow="INDONESIA ARTSY BATIK" title="OUR COLLECTION" />
      <Section className="!pt-0">
        <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const img = asset(c.image_url);
            const count = itemsForCategory(c.id).length;
            return (
              <li key={c.id}>
                <Link
                  href={`/collection/${c.id}`}
                  className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  {img && (
                    <Image
                      src={img.src}
                      alt={c.title}
                      width={img.width}
                      height={img.height}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                      className="aspect-square w-full object-cover transition-opacity group-hover:opacity-90"
                    />
                  )}
                  <p className="font-display pt-4 text-xl uppercase tracking-[0.1em]">
                    {c.title}
                  </p>
                  {count > 0 && (
                    <p className="font-sans font-light pt-1 text-sm">
                      {count} item
                    </p>
                  )}
                  <p className="font-display m-auto max-w-[36rem] pt-2">
                    {plain(c.description, 120)}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>
    </Container>
  );
}
