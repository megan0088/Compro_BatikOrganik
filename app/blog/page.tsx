import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { asset } from "@/lib/assets";
import { blogPosts, slugify } from "@/lib/content";
import { pageMetadata, plain } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Kabar dan cerita dari BatikOrganik — kegiatan, kolaborasi, dan pengetahuan seputar batik pewarna alam.",
  path: "/blog",
});

const dateFmt = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

export default function BlogIndex() {
  const posts = [...blogPosts].sort(
    (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at),
  );

  return (
    <Container>
      <PageHero eyebrow="Jurnal" title="Blog">
        <p>Kabar, kolaborasi, dan cerita dari balik meja kerja BatikOrganik.</p>
      </PageHero>
      <Section tone="minor" className="!pt-0">
        <ul className="grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const img = asset(post.image_url);
            const slug = slugify(post.title);
            return (
              <li key={slug} className="text-left">
                <Link
                  href={`/blog/${slug}`}
                  className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  {img && (
                    <Image
                      src={img.src}
                      alt={post.title}
                      width={img.width}
                      height={img.height}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                      className="aspect-video w-full object-cover transition-opacity group-hover:opacity-90"
                    />
                  )}
                  <p className="pt-3 font-sans text-[0.8125rem] uppercase tracking-[0.14em] text-ink-muted">
                    {dateFmt.format(new Date(post.created_at))}
                  </p>
                  <h2 className="pt-1 font-display text-[1.375rem] leading-tight decoration-soga underline-offset-4 group-hover:underline">
                    {post.title}
                  </h2>
                  <p className="pt-2 font-sans text-[0.9375rem] leading-relaxed text-ink-soft">
                    {plain(post.description, 140)}
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
