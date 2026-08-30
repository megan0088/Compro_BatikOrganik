import PageHero from "@/components/sections/PageHero";
import ActionButton from "@/components/ui/ActionButton";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import RichText from "@/components/ui/RichText";
import Section from "@/components/ui/Section";
import { CONTACT, SOCIAL, waLink } from "@/lib/constants";
import { contact } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact & Location",
  description: `Rumah Batik Organik di ${CONTACT.street}, ${CONTACT.city}. Hubungi ${CONTACT.phoneDisplay} atau ${CONTACT.email}.`,
  path: "/contact",
});

/**
 * URL peta diambil dari `map_iframe` milik API. Hanya src-nya yang dipakai —
 * markup mentah dari API mengandung `style={{border:"0"}}` (JSX yang bocor ke
 * string HTML) sehingga tidak bisa dirender apa adanya.
 */
const mapSrc = contact.map_iframe.match(/src="([^"]+)"/)?.[1] ?? null;

export default function ContactPage() {
  return (
    <Container>
      <PageHero eyebrow="Connect" title="Contact & Location">
        <RichText html={contact.about} />
      </PageHero>

      <Section tone="minor" className="!pt-0">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <Heading as="h2" level="h3">
              Rumah Batik Organik
            </Heading>
            <address className="font-sans not-italic pt-4 text-[1.0625rem] leading-[1.7] text-ink-soft">
              {CONTACT.street}
              <br />
              {CONTACT.city}
            </address>
            <ul className="font-sans pt-6 text-[1.0625rem]">
              <li className="py-1">
                <a
                  href={waLink(CONTACT.whatsappRetail)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-soga"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="py-1">
                <a href={`mailto:${CONTACT.email}`} className="hover:text-soga">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
            <ul className="flex flex-wrap gap-x-5 gap-y-1 pt-5 font-sans text-[0.8125rem] uppercase tracking-[0.14em] text-ink-muted">
              {Object.entries(SOCIAL).map(([key, href]) => (
                <li key={key} className="py-1">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-soga"
                  >
                    {key}
                  </a>
                </li>
              ))}
            </ul>
            <div className="pt-8">
              <ActionButton
                href={waLink(
                  CONTACT.whatsappRetail,
                  "Halo BatikOrganik, saya ingin berkunjung ke Rumah Batik Organik.",
                )}
              >
                {contact.cta_label || "Book Now"}
              </ActionButton>
            </div>
          </div>

          {mapSrc && (
            <div>
              <iframe
                src={mapSrc}
                title="Peta lokasi Rumah Batik Organik"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[420px] w-full border border-hairline md:h-full md:min-h-[460px]"
              />
            </div>
          )}
        </div>
      </Section>
    </Container>
  );
}
