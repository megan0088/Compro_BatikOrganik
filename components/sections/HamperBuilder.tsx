"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import ActionButton from "@/components/ui/ActionButton";
import Heading from "@/components/ui/Heading";
import type { Asset } from "@/lib/assets";

export type BuilderOption = {
  id: number;
  name: string;
  categoryId: number;
  type: string | null;
  description: string | null;
  image: Asset | null;
};

export type BuilderStep = {
  key: string;
  label: string;
  prompt: string;
  options: BuilderOption[];
  categories: { id: number; title: string }[];
};

/**
 * Konfigurator bingkisan: pilih tiap tahap, tulis pesan, lalu kirim.
 *
 * Situs lama mengirim pilihan ini ke backend-nya sendiri. Backend itu ikut
 * pensiun bersama situs lama, jadi di sini hasilnya dirangkum menjadi pesan
 * WhatsApp yang sudah terisi — tim menerima rincian yang sama tanpa perlu
 * server, dan pembeli tidak kehilangan langkah apa pun.
 */
export default function HamperBuilder({
  steps,
  waNumber,
  intro,
}: {
  steps: BuilderStep[];
  waNumber: string;
  intro: string;
}) {
  const [picked, setPicked] = useState<Record<string, BuilderOption>>({});
  const [filter, setFilter] = useState<Record<string, number | "all">>({});
  const [message, setMessage] = useState("");

  const waHref = useMemo(() => {
    const baris = steps
      .map((s) => (picked[s.key] ? `${s.label}: ${picked[s.key].name}` : null))
      .filter(Boolean);
    const teks = [
      intro,
      ...(baris.length ? ["", ...baris] : []),
      ...(message.trim() ? ["", `Pesan pada kartu: ${message.trim()}`] : []),
    ].join("\n");
    return `https://api.whatsapp.com/send/?phone=${waNumber}&text=${encodeURIComponent(teks)}`;
  }, [picked, message, steps, waNumber, intro]);

  const sudahDipilih = Object.keys(picked).length;

  return (
    <div className="flex flex-col gap-14">
      {steps.map((step) => {
        const aktif = filter[step.key] ?? "all";
        const daftar =
          aktif === "all"
            ? step.options
            : step.options.filter((o) => o.categoryId === aktif);

        return (
          <section key={step.key} className="flex flex-col gap-6">
            <div className="flex flex-col items-start gap-3">
              <Heading as="h2" level="h3">
                {step.label}
              </Heading>
              <p className="font-sans text-[1.0625rem] leading-[1.7] text-ink-soft">
                {step.prompt}
              </p>
            </div>

            {step.categories.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {[{ id: "all" as const, title: "Semua" }, ...step.categories].map(
                  (c) => {
                    const dipilih = aktif === c.id;
                    return (
                      <li key={String(c.id)}>
                        <button
                          type="button"
                          onClick={() =>
                            setFilter((f) => ({ ...f, [step.key]: c.id }))
                          }
                          aria-pressed={dipilih}
                          className={`min-h-[40px] border px-4 font-sans text-[0.875rem] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soga ${
                            dipilih
                              ? "border-soga bg-soga text-surface"
                              : "border-hairline text-ink-soft hover:border-soga hover:text-ink"
                          }`}
                        >
                          {c.title}
                        </button>
                      </li>
                    );
                  },
                )}
              </ul>
            )}

            {daftar.length > 0 ? (
              <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 lg:grid-cols-4">
                {daftar.map((o) => {
                  const dipilih = picked[step.key]?.id === o.id;
                  return (
                    <li key={o.id}>
                      <button
                        type="button"
                        onClick={() =>
                          setPicked((p) =>
                            p[step.key]?.id === o.id
                              ? Object.fromEntries(
                                  Object.entries(p).filter(
                                    ([k]) => k !== step.key,
                                  ),
                                )
                              : { ...p, [step.key]: o },
                          )
                        }
                        aria-pressed={dipilih}
                        className="group flex w-full flex-col gap-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soga"
                      >
                        <span
                          className={`relative block aspect-square w-full overflow-hidden bg-surface-deep ring-inset transition-all ${
                            dipilih ? "ring-2 ring-soga" : "ring-0"
                          }`}
                        >
                          {o.image && (
                            <Image
                              src={o.image.src}
                              alt={o.name}
                              fill
                              sizes="(max-width: 640px) 50vw, 280px"
                              className="object-cover transition-opacity group-hover:opacity-88"
                            />
                          )}
                        </span>
                        <span className="flex items-baseline justify-between gap-2 border-t border-hairline pt-2.5">
                          <span className="font-display text-[1.0625rem] leading-tight">
                            {o.name}
                          </span>
                          {dipilih && (
                            <span className="font-sans text-[0.75rem] uppercase tracking-[0.14em] text-soga">
                              dipilih
                            </span>
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="font-sans text-[0.9375rem] text-ink-muted">
                Belum ada pilihan untuk kategori ini.
              </p>
            )}
          </section>
        );
      })}

      <section className="flex flex-col gap-5 border-t border-hairline pt-10">
        <Heading as="h2" level="h3">
          Pesan pada kartu
        </Heading>
        <label htmlFor="pesan" className="sr-only">
          Pesan pada kartu
        </label>
        <textarea
          id="pesan"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis ucapan yang ingin dicetak pada kartu…"
          className="w-full max-w-[68ch] border border-hairline bg-surface px-4 py-3 font-sans text-[1.0625rem] leading-[1.7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soga"
        />

        <div className="flex flex-wrap items-center gap-4">
          <ActionButton href={waHref}>Kirim lewat WhatsApp</ActionButton>
          <p className="font-sans text-[0.875rem] text-ink-muted">
            {sudahDipilih > 0
              ? `${sudahDipilih} dari ${steps.length} pilihan terisi — rinciannya ikut terkirim.`
              : "Boleh langsung kirim; pilihan bisa dibahas lewat percakapan."}
          </p>
        </div>
      </section>
    </div>
  );
}
