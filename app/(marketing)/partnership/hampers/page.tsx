import HamperBuilder from "@/components/sections/HamperBuilder";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Container from "@/components/ui/Container";
import Heading, { Eyebrow } from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import { CONTACT } from "@/lib/constants";
import { buildStep } from "@/lib/hampers";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Hampers Siap Kirim",
  description:
    "Pilih bingkisan batik siap kirim untuk ulang tahun, pernikahan, atau apresiasi tim — lengkap dengan kartu dan pesan.",
  path: "/partnership/hampers",
});

const steps = [
  buildStep("hampers", "Hampers", "Pilih bingkisan yang sudah dirangkai."),
  buildStep("card", "Kartu", "Pilih kartu ucapan yang menyertainya."),
];

export default function HampersPage() {
  return (
    <Container>
      <Breadcrumb
        trail={[
          { label: "Beranda", href: "/" },
          { label: "Partnership", href: "/partnership" },
        ]}
        current="Hampers"
      />
      <div className="flex flex-col items-start gap-5 pb-12 pt-8">
        <Eyebrow>Bingkisan</Eyebrow>
        <Heading as="h1" className="max-w-[18ch]">
          Hampers siap kirim
        </Heading>
        <p className="max-w-[68ch] font-sans text-[1.0625rem] leading-[1.7] text-ink-soft">
          Sudah dirangkai, tinggal pilih. Cocok untuk ulang tahun, hadiah
          pernikahan, dan apresiasi tim.
        </p>
      </div>

      <Section tone="minor" className="!pt-0">
        <HamperBuilder
          steps={steps}
          waNumber={CONTACT.whatsappCorporate}
          intro="Halo BatikOrganik, saya ingin memesan hampers siap kirim."
        />
      </Section>
    </Container>
  );
}
