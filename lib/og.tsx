import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const fontPath = (f: string) =>
  path.join(process.cwd(), "assets", "fonts", f);

/*
 * Fontnya dibaca dari berkas TTF di repo, bukan diunduh saat build:
 * satori (mesin di balik ImageResponse) tidak bisa membaca woff2 yang
 * dipakai next/font, dan build tidak boleh bergantung pada jaringan.
 */
async function fonts() {
  const [display, ui] = await Promise.all([
    readFile(fontPath("newsreader-400.ttf")),
    readFile(fontPath("karla-500.ttf")),
  ]);
  return [
    { name: "Newsreader", data: display, weight: 400 as const, style: "normal" as const },
    { name: "Karla", data: ui, weight: 500 as const, style: "normal" as const },
  ];
}

/**
 * Kartu Open Graph 1200×630 dengan bahasa visual yang sama seperti situs:
 * bidang hangat, garis soga, eyebrow kecil, judul Newsreader.
 *
 * Judul dipotong pada 90 karakter — lebih dari itu ukurannya harus mengecil
 * sampai tidak terbaca lagi di pratinjau WhatsApp yang kecil.
 */
export async function ogImage({
  title,
  eyebrow = "Indonesia Artsy Batik",
  footer = "batikorganik.co.id",
  tagline = "Cipaku, Bogor · Est. 2013",
}: {
  title: string;
  eyebrow?: string;
  footer?: string;
  tagline?: string;
}) {
  const judul = title.length > 90 ? `${title.slice(0, 89).trimEnd()}…` : title;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FEFDFB",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Pita soga di tepi kiri — penanda merek tanpa menaruh logo besar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 14,
            background: "#8C5D32",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 56, height: 2, background: "#8C5D32" }} />
          <div
            style={{
              fontFamily: "Karla",
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#8C5D32",
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div
          style={{
            fontFamily: "Newsreader",
            fontSize: judul.length > 52 ? 68 : 86,
            lineHeight: 1.08,
            letterSpacing: -1.5,
            color: "#17110C",
            maxWidth: 940,
            display: "flex",
          }}
        >
          {judul}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #E2DDD7",
            paddingTop: 28,
          }}
        >
          <div style={{ fontFamily: "Karla", fontSize: 26, color: "#58514C" }}>
            {footer}
          </div>
          <div
            style={{
              fontFamily: "Karla",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#736D69",
            }}
          >
            {tagline}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await fonts() },
  );
}
