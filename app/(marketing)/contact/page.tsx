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
      <PageHero eyebrow="CONNECT" title="CONTACT & LOCATION">
        <RichText html={contact.about} />
      </PageHero>

      <Section className="!pt-0">
        <div className="grid gap-10 text-left md:grid-cols-2">
          <div>
            <Heading as="h2" className="!text-xl">
              RUMAH BATIK ORGANIK
            </Heading>
            <address className="font-display not-italic pt-4 lg:text-xl">
              {CONTACT.street}
              <br />
              {CONTACT.city}
            </address>
            <ul className="font-sans pt-6">
              <li className="py-1">
                <a
                  href={waLink(CONTACT.whatsappRetail)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="py-1">
                <a href={`mailto:${CONTACT.email}`} className="hover:opacity-70">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
            <ul className="font-sans pt-4 uppercase">
              {Object.entries(SOCIAL).map(([key, href]) => (
                <li key={key} className="py-1">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70"
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
                className="h-[450px] w-full rounded-md border-0"
              />
            </div>
          )}
        </div>
      </Section>
    </Container>
  );
}
