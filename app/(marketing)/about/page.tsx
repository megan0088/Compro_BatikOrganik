import PageHero from "@/components/sections/PageHero";
import SplitRow from "@/components/sections/SplitRow";
import VideoFacade from "@/components/sections/VideoFacade";
import Container from "@/components/ui/Container";
import { asset } from "@/lib/assets";
import RichText from "@/components/ui/RichText";
import { SITE } from "@/lib/constants";
import { journeyRows } from "@/lib/content";
import { pageMetadata, plain } from "@/lib/metadata";

const header = journeyRows.find((r) => r.section_part === 1);
const rest = journeyRows.filter((r) => r !== header);

export const metadata = pageMetadata({
  title: "Journey",
  description: header?.caption
    ? plain(header.caption)
    : "Perjalanan BatikOrganik sejak 2013 — warisan budaya yang berevolusi, climate action, dan pemberdayaan pengrajin.",
  path: "/about",
});

export default function AboutPage() {
  // Selang-seling sisi foto dihitung dari posisi di antara baris bergambar saja,
  // supaya baris video di tengah tidak mengacaukan ritmenya.
  const imageRowIds = rest.filter((r) => r.with_video !== 1).map((r) => r.id);
  return (
    <>
      <Container>
        <PageHero
          eyebrow={header?.subtitle ?? SITE.tagline}
          title={header?.title ?? "JOURNEY"}
        >
          {header?.caption && <RichText html={header.caption} />}
        </PageHero>
      </Container>

      {rest.map((row) => {
        if (row.with_video === 1 && row.link) {
          return (
            <Container key={row.id}>
              <VideoFacade
                videoId={row.link.match(/embed\/([A-Za-z0-9_-]+)/)?.[1] ?? ""}
                poster={asset(
                  `/video-poster/${row.link.match(/embed\/([A-Za-z0-9_-]+)/)?.[1]}.webp`,
                )}
                title={row.title ?? `Video ${row.name}`}
                className="mb-20"
              />
            </Container>
          );
        }
        return (
          <SplitRow
            key={row.id}
            row={row}
            flip={imageRowIds.indexOf(row.id) % 2 === 1}
          />
        );
      })}
    </>
  );
}
