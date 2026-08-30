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
      <PageHero eyebrow="Connect" title="Pertanyaan Umum" />

      {groups.map((group) => (
        <Section key={group} tone="minor" className="!pt-0">
          <Heading as="h2" level="h3">
            {group}
          </Heading>
          <ul className="max-w-[68ch] pt-6">
            {faqs
              .filter((f) => f.type_label === group)
              .map((f) => (
                <li key={f.question} className="border-b border-hairline">
                  <details className="group py-4">
                    <summary className="flex cursor-pointer list-none items-baseline gap-3 font-sans text-[1.0625rem] font-medium leading-[1.6] marker:hidden hover:text-soga focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soga">
                      <span
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-soga transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                      {f.question}
                    </summary>
                    <RichText
                      html={f.answer}
                      className="pl-6 pt-3 font-sans text-[1.0625rem] leading-[1.7] text-ink-soft"
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
