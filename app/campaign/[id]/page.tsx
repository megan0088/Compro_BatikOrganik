import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import ActionButton from "@/components/ui/ActionButton";
import Container from "@/components/ui/Container";
import RichText from "@/components/ui/RichText";
import Section from "@/components/ui/Section";
import { asset } from "@/lib/assets";
import { campaigns } from "@/lib/content";
import { pageMetadata, plain } from "@/lib/metadata";

export function generateStaticParams() {
  return campaigns.map((c) => ({ id: String(c.id) }));
}

export async function generateMetadata({ params }: PageProps<"/campaign/[id]">) {
  const { id } = await params;
  const c = campaigns.find((x) => String(x.id) === id);
  if (!c) return {};
  return pageMetadata({
    title: c.title,
    description: plain(c.description),
    path: `/campaign/${c.id}`,
  });
}

export default async function CampaignPage({
  params,
}: PageProps<"/campaign/[id]">) {
  const { id } = await params;
  const campaign = campaigns.find((c) => String(c.id) === id);
  if (!campaign) notFound();

  const img = asset(campaign.image_url);

  return (
    <Container>
      <PageHero eyebrow={campaign.name.toUpperCase()} title={campaign.title} />

      {img && (
        <Image
          src={img.src}
          alt={campaign.title}
          width={img.width}
          height={img.height}
          sizes="(max-width: 1240px) 100vw, 1208px"
          priority
          className="w-full rounded-md object-cover"
        />
      )}

      <Section>
        <RichText
          html={campaign.description}
          className="font-display m-auto max-w-[54rem] px-5 lg:text-xl"
        />
        <div className="pt-10">
          <ActionButton href="/collection">Lihat Koleksi</ActionButton>
        </div>
      </Section>
    </Container>
  );
}
