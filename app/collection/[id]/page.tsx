import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import ActionButton from "@/components/ui/ActionButton";
import Container from "@/components/ui/Container";
import RichText from "@/components/ui/RichText";
import Section from "@/components/ui/Section";
import { asset } from "@/lib/assets";
import { CONTACT, waLink } from "@/lib/constants";
import { categories, itemsForCategory } from "@/lib/content";
import { pageMetadata, plain } from "@/lib/metadata";

/** URL /collection/1 … /collection/6 dipertahankan seperti situs lama. */
export function generateStaticParams() {
  return categories.map((c) => ({ id: String(c.id) }));
}

export async function generateMetadata({ params }: PageProps<"/collection/[id]">) {
  const { id } = await params;
  const c = categories.find((x) => String(x.id) === id);
  if (!c) return {};
  return pageMetadata({
    title: `Koleksi ${c.title}`,
    description: plain(c.description),
    path: `/collection/${c.id}`,
  });
}

export default async function CollectionDetail({
  params,
}: PageProps<"/collection/[id]">) {
  const { id } = await params;
  const category = categories.find((c) => String(c.id) === id);
  if (!category) notFound();

  const items = itemsForCategory(category.id);
  const cover = asset(category.image_url);

  return (
    <Container>
      <nav aria-label="Breadcrumb" className="pt-[calc(var(--nav-height)+1.5rem)]">
        <ol className="font-sans font-light flex justify-center gap-2 text-sm uppercase">
          <li>
            <Link href="/" className="hover:opacity-70">
              Beranda
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/collection" className="hover:opacity-70">
              Our Collection
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{category.title}</li>
        </ol>
      </nav>

      <PageHero title={category.title.toUpperCase()}>
        <RichText html={category.description} />
      </PageHero>

      {cover && (
        <Image
          src={cover.src}
          alt={`Koleksi ${category.title}`}
          width={cover.width}
          height={cover.height}
          sizes="(max-width: 1240px) 100vw, 1208px"
          priority
          className="w-full rounded-md object-cover"
        />
      )}

      <Section>
        {items.length > 0 ? (
          <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const img = asset(item.image_url);
              return (
                <li key={item.id}>
                  {img && (
                    <Image
                      src={img.src}
                      alt={item.name}
                      width={img.width}
                      height={img.height}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                      className="aspect-[3/4] w-full rounded-md object-cover"
                    />
                  )}
                  <h2 className="font-display pt-4 text-xl uppercase tracking-[0.1em]">
                    {item.name}
                  </h2>
                  <RichText
                    html={item.description}
                    className="font-display pt-2"
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="font-display lg:text-xl">
            Koleksi ini sedang disiapkan. Hubungi kami untuk katalog terbaru.
          </p>
        )}

        <div className="pt-12">
          <ActionButton
            href={waLink(
              CONTACT.whatsappRetail,
              `Halo BatikOrganik, saya tertarik dengan koleksi ${category.title}.`,
            )}
          >
            Tanya Koleksi {category.title}
          </ActionButton>
        </div>
      </Section>
    </Container>
  );
}
