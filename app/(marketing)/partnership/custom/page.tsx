import Image from "next/image";
import ActionButton from "@/components/ui/ActionButton";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Container from "@/components/ui/Container";
import Heading, { Eyebrow } from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import { asset } from "@/lib/assets";
import { CONTACT, waLink } from "@/lib/constants";
import { partnershipRows } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Custom Hampers",
  description:
    "Personalisasi bingkisan batik untuk perusahaan — motif, kemasan, dan pesan disesuaikan dengan identitas Anda.",
  path: "/partnership/custom",
});

const header = partnershipRows.find((r) => r.section_part === 1);
const offerings = partnershipRows.filter((r) => r.section_part === 2);

/*
 * Situs lama menaruh formulir di sini yang mengirim ke backend-nya sendiri.
 * Backend itu pensiun bersama situs lama, jadi halaman ini berakhir di
 * WhatsApp — kanal yang memang dipakai tim untuk pemesanan.
 */
export default function CustomHamperPage() {
  const headerImg = asset(header?.image_url);

  return (
    <Container>
      <Breadcrumb
        trail={[
          { label: "Beranda", href: "/" },
          { label: "Partnership", href: "/partnership" },
        ]}
        current="Custom Hampers"
      />

      <div className="flex flex-col gap-10 pb-12 pt-8 md:flex-row md:items-center md:gap-16">
        <div className="flex flex-col items-start gap-5 md:w-1/2">
          <Eyebrow>Bingkisan</Eyebrow>
          <Heading as="h1" className="max-w-[16ch]">
            Custom hampers
          </Heading>
          <p className="max-w-[68ch] font-sans text-[1.0625rem] leading-[1.7] text-ink-soft">
            Personalisasi bingkisan batik bersama BatikOrganik — motif, kemasan,
            dan pesan disesuaikan dengan identitas perusahaan Anda.
          </p>
          <ActionButton
            href={waLink(
              CONTACT.whatsappCorporate,
              "Halo BatikOrganik, saya ingin membuat custom hampers untuk perusahaan.",
            )}
            className="mt-2"
          >
            Konsultasi Gratis
          </ActionButton>
        </div>
        {headerImg && (
          <div className="md:w-1/2">
            <Image
              src={headerImg.src}
              alt="Bingkisan batik kustom BatikOrganik"
              width={headerImg.width}
              height={headerImg.height}
              sizes="(max-width: 768px) 100vw, 560px"
              priority
              className="w-full object-cover"
            />
          </div>
        )}
      </div>

      {offerings.length > 0 && (
        <Section tone="minor" className="!pt-0">
          <Heading as="h2" level="h3" className="pb-8">
            Yang bisa disesuaikan
          </Heading>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-9 md:gap-x-7 lg:grid-cols-4">
            {offerings.map((row) => {
              const img = asset(row.image_url);
              return (
                <li key={row.id} className="flex flex-col gap-3">
                  {img && (
                    <div className="relative aspect-square w-full overflow-hidden bg-surface-deep">
                      <Image
                        src={img.src}
                        alt={row.title ?? row.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 280px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3 className="border-t border-hairline pt-3 font-display text-[1.0625rem] leading-tight">
                    {row.title}
                  </h3>
                </li>
              );
            })}
          </ul>
        </Section>
      )}
    </Container>
  );
}
