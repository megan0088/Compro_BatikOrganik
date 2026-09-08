"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Menampilkan poster dulu, memuat iframe hanya setelah diklik.
 *
 * Satu iframe YouTube menarik ±700 KB skrip pihak ketiga saat halaman dibuka —
 * itu sebabnya versi sebelumnya hanya memasang satu video dari tiga yang ada.
 * Dengan facade ini ketiganya bisa kembali: posternya WebP lokal ±45 KB,
 * lazy-load, dan iframe baru dimuat kalau pengunjung memang ingin menonton.
 */
export default function VideoFacade({
  videoId,
  poster,
  title,
  className = "",
}: {
  videoId: string;
  poster: { src: string; width: number; height: number } | null;
  title: string;
  className?: string;
}) {
  const [main, setMain] = useState(false);

  return (
    <div
      className={`relative h-48 w-full overflow-hidden bg-surface-deep md:h-96 lg:h-[40rem] ${className}`}
    >
      {main ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setMain(true)}
          aria-label={`Putar video: ${title}`}
          className="group absolute inset-0 h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soga"
        >
          {poster && (
            <Image
              src={poster.src}
              alt=""
              fill
              sizes="(max-width: 1240px) 100vw, 1208px"
              loading="lazy"
              className="object-cover transition-opacity group-hover:opacity-90"
            />
          )}
          <span
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center bg-ink/25 transition-colors group-hover:bg-ink/35"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-surface/90 shadow-sm transition-transform group-hover:scale-105 md:h-20 md:w-20">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" className="ml-1 text-ink">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
