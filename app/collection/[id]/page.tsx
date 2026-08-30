import Image from "next/image";
import { notFound } from "next/navigation";
import ActionButton from "@/components/ui/ActionButton";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Container from "@/components/ui/Container";
import Heading, { Eyebrow } from "@/components/ui/Heading";
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
    <>
      <Container>
        <Breadcrumb
          trail={[
            { label: "Beranda", href: "/" },
            { label: "Our Collection", href: "/collection" },
          ]}
          current={category.title}
        />

        <div className="flex flex-col gap-10 pb-12 pt-8 md:flex-row md:items-center md:gap-16">
          <div className="flex flex-col items-start gap-5 md:w-1/2">
            <Eyebrow>Koleksi</Eyebrow>
            <Heading as="h1" className="max-w-[14ch]">
              {category.title}
            </Heading>
            <RichText
              html={category.description}
              className="font-sans text-[1.0625rem] leading-[1.7] text-ink-soft"
            />
          </div>
          {cover && (
            <div className="md:w-1/2">
              <Image
                src={cover.src}
                alt={`Koleksi ${category.title}`}
                width={cover.width}
                height={cover.height}
                sizes="(max-width: 768px) 100vw, 560px"
                priority
                className="w-full object-cover"
              />
            </div>
          )}
        </div>
      </Container>

      <Container>
        <Section tone="minor" className="!pt-0">
          {items.length > 0 ? (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-9 md:gap-x-7 md:gap-y-12 lg:grid-cols-3">
              {items.map((item) => {
                const img = asset(item.image_url);
                return (
                  <li key={item.id} className="flex flex-col gap-4">
                    {img && (
                      <div className="relative aspect-square w-full overflow-hidden bg-surface-deep">
                        <Image
                          src={img.src}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 380px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-2 border-t border-hairline pt-3.5">
                      <h2 className="font-display text-[1.25rem] leading-tight">
                        {item.name}
                      </h2>
                      <RichText
                        html={item.description}
                        className="font-sans text-[0.9375rem] leading-relaxed text-ink-soft"
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="font-sans text-[1.0625rem] leading-[1.7] text-ink-soft">
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
    </>
  );
}
