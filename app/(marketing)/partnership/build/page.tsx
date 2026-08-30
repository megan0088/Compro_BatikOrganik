import HamperBuilder from "@/components/sections/HamperBuilder";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Container from "@/components/ui/Container";
import Heading, { Eyebrow } from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import { CONTACT } from "@/lib/constants";
import { buildStep } from "@/lib/hampers";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Rangkai Hampers Sendiri",
  description:
    "Susun bingkisan batik sesuai keinginan — pilih kemasan, isian, kartu, lalu tulis pesannya.",
  path: "/partnership/build",
});

const steps = [
  buildStep("packaging", "Kemasan", "Pilih kotak atau kemasannya lebih dulu."),
  buildStep("gift", "Isian", "Pilih apa yang masuk ke dalamnya."),
  buildStep("card", "Kartu", "Pilih kartu ucapan yang menyertainya."),
];

export default function BuildHamperPage() {
  return (
    <Container>
      <Breadcrumb
        trail={[
          { label: "Beranda", href: "/" },
          { label: "Partnership", href: "/partnership" },
        ]}
        current="Rangkai Sendiri"
      />
      <div className="flex flex-col items-start gap-5 pb-12 pt-8">
        <Eyebrow>Bingkisan</Eyebrow>
        <Heading as="h1" className="max-w-[18ch]">
          Rangkai hampers sendiri
        </Heading>
        <p className="max-w-[68ch] font-sans text-[1.0625rem] leading-[1.7] text-ink-soft">
          Tiga langkah: pilih kemasan, tentukan isinya, lalu kartu dan pesannya.
        </p>
      </div>

      <Section tone="minor" className="!pt-0">
        <HamperBuilder
          steps={steps}
          waNumber={CONTACT.whatsappCorporate}
          intro="Halo BatikOrganik, saya ingin merangkai hampers sendiri."
        />
      </Section>
    </Container>
  );
}
