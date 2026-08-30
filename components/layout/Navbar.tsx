import { asset } from "@/lib/assets";
import { contact } from "@/lib/content";
import NavbarClient from "./NavbarClient";

/**
 * Pembungkus server: membaca logo dari konten, lalu menyerahkannya ke
 * NavbarClient sebagai prop. Kalau keduanya digabung, seluruh
 * `content/api/*.json` ikut ke bundle browser.
 */
export default function Navbar() {
  return <NavbarClient logo={asset(contact.logo_img)} />;
}
