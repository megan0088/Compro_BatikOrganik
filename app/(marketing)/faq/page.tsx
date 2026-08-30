import PageHero from "@/components/sections/PageHero";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import RichText from "@/components/ui/RichText";
import Section from "@/components/ui/Section";
import { faqs } from "@/lib/content";
import { pageMetadata, plain } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "FAQ",
  description:
    "Pertanyaan umum tentang batik cap, batik tulis, kain pewarna alam, perawatan, pemesanan, dan pengiriman BatikOrganik.",
  path: "/faq",
});

/** JSON-LD FAQPage — berpeluang tampil sebagai rich result di Google. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: plain(f.answer, 5000) },
  })),
};

export default function FaqPage() {
  const groups = [...new Set(faqs.map((f) => f.type_label))];

  return (
    <Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero eyebrow="CONNECT" title="FAQ" />

      {groups.map((group) => (
        <Section key={group} className="!pt-0">
          <Heading as="h2" className="!text-xl">
            {group.toUpperCase()}
          </Heading>
          <ul className="m-auto max-w-[54rem] pt-6 text-left">
            {faqs
              .filter((f) => f.type_label === group)
              .map((f) => (
                <li key={f.question} className="border-b border-hairline">
                  <details className="group py-4">
                    <summary className="font-sans font-medium cursor-pointer list-none text-[1.125rem] leading-7 marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                      {f.question}
                    </summary>
                    <RichText
                      html={f.answer}
                      className="font-display pt-3 lg:text-xl"
                    />
                  </details>
                </li>
              ))}
          </ul>
        </Section>
      ))}
    </Container>
  );
}
