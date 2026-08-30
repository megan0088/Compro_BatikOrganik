/**
 * Caption dari API berupa HTML (<p>, <em>, &nbsp;) yang ditulis lewat panel
 * admin. Kontennya milik sendiri, bukan input publik, jadi dirender apa adanya
 * — sama seperti situs live.
 *
 * Font dan perataan sengaja tidak ditetapkan di sini: keduanya diwarisi dari
 * pembungkus, karena situs live memakai gaya berbeda per bagian.
 */
export default function RichText({
  html,
  className = "",
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={`rich-text ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
