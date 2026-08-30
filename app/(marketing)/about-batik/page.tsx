import PageHero from "@/components/sections/PageHero";
import SplitRow from "@/components/sections/SplitRow";
import Container from "@/components/ui/Container";
import { aboutBatikRows } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Tentang Batik",
  description:
    "Batik cap, batik kombinasi, dan cara merawat kain batik pewarna alam: pencucian, penjemuran, dan penyimpanan.",
  path: "/about-batik",
});

export default function AboutBatikPage() {
  return (
    <>
      <Container>
        <PageHero eyebrow="PROCESS" title="TENTANG BATIK" />
      </Container>
      {aboutBatikRows.map((row, i) => (
        <SplitRow key={row.id} row={row} flip={i % 2 === 1} headingAs="h2" />
      ))}
    </>
  );
}
