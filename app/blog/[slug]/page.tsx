import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
      <nav aria-label="Breadcrumb" className="pt-[calc(var(--nav-height)+1.5rem)]">
        <ol className="font-sans font-light flex flex-wrap justify-center gap-2 text-sm uppercase">
          <li>
            <Link href="/" className="hover:opacity-70">
              Beranda
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/blog" className="hover:opacity-70">
              Blog
            </Link>
          </li>
        </ol>
      </nav>

      <article className="m-auto max-w-[54rem] px-5">
        <header className="py-10 text-center">
          <p className="font-sans font-light pb-1 text-sm">
            {dateFmt.format(new Date(post.created_at))} · {post.admin}
          </p>
          <Heading as="h1" className="!text-[1.75rem] !leading-9">
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
            className="w-full rounded-md object-cover"
          />
        )}

        <Section>
          <RichText
            html={post.description}
            className="font-display text-left lg:text-xl"
          />
        </Section>
      </article>
    </Container>
  );
}
