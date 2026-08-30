import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import RichText from "@/components/ui/RichText";
import Section from "@/components/ui/Section";
import { asset } from "@/lib/assets";
import { SITE } from "@/lib/constants";
import { blogSlugs, postBySlug } from "@/lib/content";
import { pageMetadata, plain } from "@/lib/metadata";

/**
 * Situs lama tidak memberi slug pada artikel — payload /api/blog hanya punya
 * judul. Slug diturunkan dari judul lewat `slugify`, jadi URL-nya baru; belum
 * ada URL lama yang perlu dipertahankan.
 */
export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};
  const img = asset(post.image_url);
  return pageMetadata({
    title: post.title,
    description: plain(post.description),
    path: `/blog/${slug}`,
    image: img?.src,
  });
}

const dateFmt = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const img = asset(post.image_url);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.created_at,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    ...(img ? { image: [`${SITE.url}${img.src}`] } : {}),
  };

  return (
    <Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb
        trail={[
          { label: "Beranda", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
        current={post.title.slice(0, 40)}
      />

      <article className="max-w-[68ch]">
        <header className="flex flex-col items-start gap-4 py-10">
          <p className="font-sans text-[0.8125rem] uppercase tracking-[0.14em] text-ink-muted">
            {dateFmt.format(new Date(post.created_at))} · {post.admin}
          </p>
          <Heading as="h1" className="max-w-[24ch]">
            {post.title}
          </Heading>
        </header>

        {img && (
          <Image
            src={img.src}
            alt={post.title}
            width={img.width}
            height={img.height}
            sizes="(max-width: 864px) 100vw, 824px"
            priority
            className="w-full object-cover"
          />
        )}

        <Section>
          <RichText
            html={post.description}
            className="font-sans text-[1.0625rem] leading-[1.75] text-ink-soft"
          />
        </Section>
      </article>
    </Container>
  );
}
