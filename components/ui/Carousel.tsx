"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Asset } from "@/lib/assets";

export type Slide = { asset: Asset; alt: string };

/**
 * Carousel situs live: satu slide per tampilan, rasio 1208×680 (≈16:9),
 * object-cover, sudut rounded-md, dengan panah prev/next dan titik paginasi.
 *
 * Situs live memakai Swiper + efek 3D "creative". Di sini dipakai scroll-snap
 * native: tidak ada dependensi baru, tetap bisa digeser dengan jari maupun
 * keyboard, dan hemat ~40 KB JavaScript.
 */
export default function Carousel({
  slides,
  priority = false,
  className = "",
}: {
  slides: Slide[];
  priority?: boolean;
  className?: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(i, track.children.length - 1));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (track.clientWidth > 0) {
          setIndex(Math.round(track.scrollLeft / track.clientWidth));
        }
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (slides.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((s, i) => (
          <li key={s.asset.src} className="w-full shrink-0 snap-center">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md">
              <Image
                src={s.asset.src}
                alt={s.alt}
                fill
                sizes="(max-width: 1240px) 100vw, 1208px"
                className="object-cover"
                priority={priority && i === 0}
              />
            </div>
          </li>
        ))}
      </ul>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Slide sebelumnya"
            className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-surface/80 text-ink transition-opacity hover:bg-surface disabled:pointer-events-none disabled:opacity-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <Chevron className="rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index === slides.length - 1}
            aria-label="Slide berikutnya"
            className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-surface/80 text-ink transition-opacity hover:bg-surface disabled:pointer-events-none disabled:opacity-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <Chevron />
          </button>

          {/* Titik paginasi menumpuk di dalam slide, seperti Swiper di situs live. */}
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.asset.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ke slide ${i + 1}`}
                aria-current={i === index}
                className={`h-2 w-2 rounded-full ring-1 ring-ink/20 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                  i === index ? "bg-surface" : "bg-surface/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
