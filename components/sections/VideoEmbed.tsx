/**
 * Video YouTube tersemat, seperti di situs live. `loading="lazy"` supaya
 * iframe (±700 KB) tidak ikut memberati muatan awal halaman.
 */
export default function VideoEmbed({
  src,
  title,
  className = "",
}: {
  src: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`relative h-48 w-full overflow-hidden md:h-96 lg:h-[40rem] ${className}`}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
