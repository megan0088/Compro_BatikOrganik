import type { ReactNode } from "react";

/**
 * Lebar isi. Perataan sengaja TIDAK dipaksa rata tengah di sini seperti
 * situs lama (`text-center` di kontainer): paragraf panjang rata tengah
 * membuat mata kehilangan tepi kiri tiap ganti baris. Blok yang memang
 * pendek meminta `text-center` sendiri.
 */
export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1240px] px-5 md:px-10 ${className}`}>
      {children}
    </div>
  );
}
