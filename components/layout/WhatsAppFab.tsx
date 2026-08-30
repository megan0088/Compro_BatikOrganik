import { CONTACT, waLink } from "@/lib/constants";

/**
 * Tombol "Need help?" melayang di kanan bawah, sama seperti situs live.
 *
 * Parameter `text` diisi supaya tim tahu percakapan datang dari situs —
 * situs lama mengirim tanpa konteks apa pun, jadi sumber lead-nya hilang.
 */
export default function WhatsAppFab() {
  return (
    <div className="fixed bottom-2 right-1 z-20 md:bottom-4 md:right-2">
      <a
        href={waLink(
          CONTACT.whatsappRetail,
          "Halo BatikOrganik, saya ingin bertanya tentang koleksi.",
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="font-sans flex min-h-[44px] items-center gap-2 rounded border border-hairline bg-surface px-3 py-2 text-ink shadow-sm hover:bg-surface-warm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <WhatsAppIcon />
        <span>Need help?</span>
      </a>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.25 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.2 3.72.59.25 1.04.4 1.4.52.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}
