import Link from "next/link";
import { CONTACT, SITE, SOCIAL, waLink } from "@/lib/constants";

const HELP_LINKS = [
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Testimonial", href: "/review" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: SOCIAL.instagram, Icon: InstagramIcon },
  { label: "TikTok", href: SOCIAL.tiktok, Icon: TikTokIcon },
  { label: "YouTube", href: SOCIAL.youtube, Icon: YouTubeIcon },
  { label: "Facebook", href: SOCIAL.facebook, Icon: FacebookIcon },
  { label: "WhatsApp", href: waLink(CONTACT.whatsappRetail), Icon: WhatsAppIcon },
];

export default function Footer() {
  return (
    <footer className="font-sans">
      <div className="mx-auto flex w-full flex-col p-4 md:p-14">
        <div className="items-start justify-between gap-10 text-center sm:flex sm:text-left">
          <div>
            <p className="font-display pb-3 text-xl uppercase">Help</p>
            <ul>
              {HELP_LINKS.map((l) => (
                <li key={l.href} className="py-1">
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="py-1">
                <a
                  href={waLink(CONTACT.whatsappRetail)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="py-1">
                <a href={`mailto:${CONTACT.email}`} className={linkClass}>
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-8 max-w-xl sm:mt-0">
            <p className="font-display pb-3 text-xl uppercase">About Us</p>
            <p className="text-[1.125rem] leading-7">{SITE.description}</p>
            <ul className="mt-5 flex justify-center gap-2 sm:justify-start">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center text-ink hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/*
        pb besar di mobile: tombol "Need help?" melayang di kanan bawah dan
        menutupi baris hak cipta kalau tidak diberi ruang.
      */}
      <div className="mx-auto flex w-full flex-col bg-surface-warm px-5 pb-24 pt-8 md:p-14">
        <p className="text-center">
          © {new Date().getFullYear()}, {SITE.name}
        </p>
      </div>
    </footer>
  );
}

const linkClass =
  "hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const ico = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true };

function InstagramIcon() {
  return (
    <svg {...ico}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 5.68a4.16 4.16 0 1 0 0 8.32 4.16 4.16 0 0 0 0-8.32Zm0 6.86a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.3-7.02a.97.97 0 1 1-1.94 0 .97.97 0 0 1 1.94 0Z" />
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg {...ico}>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.1v12.4a2.59 2.59 0 1 1-1.83-2.48v-3.2a5.75 5.75 0 1 0 4.93 5.69V9.4a7.34 7.34 0 0 0 4.28 1.37V7.67a4.28 4.28 0 0 1-3.22-1.85Z" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg {...ico}>
      <path d="M23 12s0-3.2-.4-4.74a2.5 2.5 0 0 0-1.76-1.76C19.3 5.1 12 5.1 12 5.1s-7.3 0-8.84.4A2.5 2.5 0 0 0 1.4 7.26C1 8.8 1 12 1 12s0 3.2.4 4.74c.22.85.87 1.5 1.76 1.76 1.54.4 8.84.4 8.84.4s7.3 0 8.84-.4a2.5 2.5 0 0 0 1.76-1.76C23 15.2 23 12 23 12Zm-13.3 3.04V8.96L15.5 12l-5.8 3.04Z" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg {...ico}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg {...ico}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.25 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.2 3.72.59.25 1.04.4 1.4.52.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}
