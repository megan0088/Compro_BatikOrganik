"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  COLLECTION_NAV,
  COMMUNIQUE_NAV,
  NAV_ICON_LINKS,
  type NavItem,
} from "@/lib/navigation";
import SearchDialog from "./SearchDialog";

export type NavbarLogo = { src: string; width: number; height: number };

/**
 * Bagian interaktif navbar. Logo diturunkan dari `Navbar.tsx` yang server
 * component — supaya JSON konten tidak ikut terbundel ke sisi klien.
 */
export default function NavbarClient({ logo }: { logo: NavbarLogo | null }) {
  const [openMenu, setOpenMenu] = useState<"collection" | "communique" | null>(
    null,
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  /*
   * Hanya beranda yang punya foto hero setinggi layar di belakang navbar.
   * Di sana navbar melayang transparan dengan tanda putih + scrim gelap
   * supaya tetap terbaca di atas foto batik yang ramai; begitu digulir,
   * navbar berubah jadi putih solid. Halaman lain putih sejak awal.
   */
  const pathname = usePathname();
  const overHero = pathname === "/" && !scrolled && openMenu === null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Kunci gulir latar selama menu mobile terbuka.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  // Tutup dropdown saat fokus atau klik keluar dari navbar, dan saat Escape.
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Navigasi utama"
        /*
         * Situs live memakai `top-[-15px]` (sumber celah putih di atas hero,
         * BO-30) dan transparan di semua halaman — logo hitam di atas foto
         * batik praktis tidak terlihat. Di sini: transparan hanya di atas
         * hero, dengan scrim, lalu putih solid setelah digulir.
         */
        className={`fixed top-0 z-30 h-[72px] w-full transition-colors duration-300 md:h-[104px] ${
          overHero
            ? "bg-transparent text-surface"
            : "border-b border-hairline bg-surface text-ink"
        }`}
        onMouseLeave={() => setOpenMenu(null)}
      >
        {overHero && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[140px] bg-gradient-to-b from-ink/55 to-transparent"
          />
        )}
        <div className="relative flex h-full items-center justify-between gap-2 px-3 sm:px-4 md:gap-4">
          {/* Kiri: tautan utama (desktop) / tombol menu (mobile) */}
          <ul className="font-sans hidden items-center uppercase lg:flex xl:flex-1">
            <li>
              <Link href="/gallery" className={topLevelClass}>
                Gallery
              </Link>
            </li>
            <li>
              <Dropdown
                label="Our Collection"
                open={openMenu === "collection"}
                onOpen={() => setOpenMenu("collection")}
                onClose={() => setOpenMenu(null)}
              >
                <ul className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-center gap-x-10 gap-y-2 px-10 py-5">
                  {COLLECTION_NAV.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block whitespace-nowrap py-1 hover:text-soga focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soga"
                        onClick={() => setOpenMenu(null)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Dropdown>
            </li>
            <li>
              <Dropdown
                label="Communiqué"
                open={openMenu === "communique"}
                onOpen={() => setOpenMenu("communique")}
                onClose={() => setOpenMenu(null)}
              >
                <ul className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-2 px-4 py-5">
                  {COMMUNIQUE_NAV.flatMap((group) => group.items).map((item) => (
                    <li key={item.href} className="whitespace-nowrap">
                      <NavLink item={item} onClick={() => setOpenMenu(null)} />
                    </li>
                  ))}
                </ul>
              </Dropdown>
            </li>
            <li>
              <Link href="/blog" className={topLevelClass}>
                Blog
              </Link>
            </li>
          </ul>

          <div className="flex lg:hidden">
            <button
              type="button"
              aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={mobileOpen}
              className={iconClass}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          {/* Tengah: logo */}
          <Link
            href="/"
            aria-label="BatikOrganik, beranda"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:translate-x-0 lg:translate-y-0"
          >
            {logo && (
              <Image
                src={logo.src}
                alt="BatikOrganik"
                width={logo.width}
                height={logo.height}
                priority
                className={`w-auto object-contain transition-[filter] duration-300 h-14 md:h-24 ${
                  overHero ? "brightness-0 invert" : ""
                }`}
              />
            )}
          </Link>

          {/* Kanan: ikon pencarian & belanja. Tidak ada ikon akun —
              situs ini company profile, tidak punya sistem akun. */}
          <ul className="flex items-center justify-end xl:flex-1">
            <li className="p-1 md:p-2">
              <button
                type="button"
                aria-label="Cari koleksi"
                className={iconClass}
                onClick={() => setSearchOpen(true)}
              >
                <SearchIcon />
              </button>
            </li>
            <li className="p-1 md:p-2">
              <a
                href={NAV_ICON_LINKS.shop}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Belanja di Shopee"
                className={iconClass}
              >
                <BagIcon />
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {mobileOpen && (
        <MobileMenu onClose={() => setMobileOpen(false)} logo={logo} />
      )}
      {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
    </>
  );
}

const topLevelClass =
  "inline-block whitespace-nowrap px-3 py-2 hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

/*
 * Sengaja TANPA `inline-block`: kalau dipakai bersama `flex`, yang menang
 * adalah urutan di stylesheet Tailwind, bukan urutan di atribut class —
 * dan `inline-block` menang, membuat chevron jatuh ke baris kedua.
 */
const dropdownTriggerClass =
  "flex shrink-0 items-center gap-1.5 whitespace-nowrap px-3 py-2 hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const iconClass =
  "grid h-11 w-11 place-items-center text-ink hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

function NavLink({
  item,
  onClick,
}: {
  item: NavItem;
  onClick?: () => void;
}) {
  const cls =
    "block py-1 hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        onClick={onClick}
      >
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} className={cls} onClick={onClick}>
      {item.label}
    </Link>
  );
}

function Dropdown({
  label,
  open,
  onOpen,
  onClose,
  children,
}: {
  label: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const id = useId();
  return (
    <div onMouseEnter={onOpen} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => (open ? onClose() : onOpen())}
        className={`${dropdownTriggerClass} uppercase`}
      >
        {label}
        <ChevronDown className={open ? "rotate-180" : ""} />
      </button>
      {/*
        Panel melebar penuh di bawah navbar dan isinya satu baris. Versi
        sebelumnya kotak lebar tetap (560/620px) dengan deskripsi
        ter-line-clamp — teksnya terpotong dan tidak bisa digeser.
      */}
      <div
        id={id}
        hidden={!open}
        className="fixed inset-x-0 top-[var(--nav-height)] border-y border-hairline bg-surface text-ink shadow-sm"
      >
        {children}
      </div>
    </div>
  );
}

function MobileMenu({
  onClose,
  logo,
}: {
  onClose: () => void;
  logo: NavbarLogo | null;
}) {
  return (
    <div className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-surface px-6 pb-24 lg:hidden">
      {/* Baris atas setinggi navbar, supaya tombol tutup persis menggantikan hamburger. */}
      <div className="flex h-[72px] items-center justify-between">
        {logo && (
          <Image
            src={logo.src}
            alt="BatikOrganik"
            width={logo.width}
            height={logo.height}
            className="h-14 w-auto object-contain"
          />
        )}
        <button
          type="button"
          aria-label="Tutup menu"
          className={iconClass}
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>
      <ul className="font-sans mt-2 uppercase">
        <li className="border-b border-hairline py-3">
          <Link href="/gallery" onClick={onClose}>
            Gallery
          </Link>
        </li>
        <li className="border-b border-hairline py-3">
          <p className="font-sans font-medium pb-2 font-semibold">
            Our Collection
          </p>
          <ul className="pl-4">
            {COLLECTION_NAV.map((item) => (
              <li key={item.href} className="py-1">
                <Link href={item.href} onClick={onClose}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        {COMMUNIQUE_NAV.map((group) => (
          <li key={group.label} className="border-b border-hairline py-3">
            <p className="font-sans font-medium pb-2 font-semibold">
              {group.label}
            </p>
            <ul className="pl-4">
              {group.items.map((item) => (
                <li key={item.href} className="py-1">
                  <NavLink item={item} onClick={onClose} />
                </li>
              ))}
            </ul>
          </li>
        ))}
        <li className="py-3">
          <Link href="/blog" onClick={onClose}>
            Blog
          </Link>
        </li>
      </ul>
    </div>
  );
}

/* Ikon inline menggantikan ionicons dari unpkg, yang memblokir render di situs lama. */
const svg = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  width: 22,
  height: 22,
};

function SearchIcon() {
  return (
    <svg {...svg}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg {...svg}>
      <path d="M6 7h12l1 13H5L6 7Z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg {...svg}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg {...svg}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg {...svg} width={16} height={16} className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
