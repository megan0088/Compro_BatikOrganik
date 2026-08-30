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
      <PageHero title="BLOG" />
      <Section className="!pt-0">
        <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
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
                      className="aspect-[4/3] w-full rounded-md object-cover transition-opacity group-hover:opacity-90"
                    />
                  )}
                  <p className="font-sans font-light pt-3 text-sm">
                    {dateFmt.format(new Date(post.created_at))}
                  </p>
                  <h2 className="font-display pt-1 text-xl leading-7">
                    {post.title}
                  </h2>
                  <p className="font-sans pt-2 text-[1.125rem] leading-7">
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
