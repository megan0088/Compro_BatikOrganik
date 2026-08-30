"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { SEARCH_TARGETS } from "@/lib/navigation";

/**
 * Modal "Search Our Collection!" seperti di situs live. Pencariannya lokal
 * atas daftar halaman — situs live pun tidak memanggil backend untuk ini.
 *
 * Komponen ini dipasang hanya saat modal terbuka, jadi kolom pencarian
 * selalu mulai kosong tanpa perlu me-reset state dari dalam effect.
 */
export default function SearchDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCH_TARGETS;
    return SEARCH_TARGETS.filter((t) => t.label.toLowerCase().includes(q));
  }, [query]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cari koleksi"
        className="w-72 rounded-xl bg-surface p-3 shadow md:w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-display pb-2 text-center text-xl">
          Search Our Collection!
        </p>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Batik, Women, Craft…"
          aria-label="Kata kunci pencarian"
          className="font-sans w-full border border-hairline px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        />
        <ul className="mt-3 max-h-64 overflow-y-auto text-left">
          {results.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                onClick={onClose}
                className="block px-2 py-2 uppercase hover:bg-surface-warm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {r.label}
              </Link>
            </li>
          ))}
          {results.length === 0 && (
            <li className="px-2 py-2 text-ink/70">Tidak ada hasil.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
