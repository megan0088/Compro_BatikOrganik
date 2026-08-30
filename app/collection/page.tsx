import PageHero from "@/components/sections/PageHero";
import CollectionCard from "@/components/ui/CollectionCard";
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
      <PageHero eyebrow="Indonesia Artsy Batik" title="Our Collection">
        <p>
          Enam jalan masuk ke satu warisan — batik cap, batik tulis, dan tenun,
          dalam bahasa yang dipakai hari ini.
        </p>
      </PageHero>

      <Section tone="minor" className="!pt-0">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-9 md:gap-x-7 md:gap-y-12 lg:grid-cols-3">
          {categories.map((c, i) => (
            <li key={c.id}>
              <CollectionCard
                href={`/collection/${c.id}`}
                title={c.title}
                image={asset(c.image_url)}
                count={itemsForCategory(c.id).length}
                blurb={plain(c.description, 96)}
                priority={i < 3}
              />
            </li>
          ))}
        </ul>
      </Section>
    </Container>
  );
}
