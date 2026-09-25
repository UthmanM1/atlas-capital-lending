import Image from "next/image";

export type Ratio = "r43" | "r169" | "r32" | "r219";

export default function Pic({
  src,
  alt,
  ratio = "r43",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  ratio?: Ratio;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`pic-box ${ratio}`}>
      <Image
        className="pic"
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
      />
    </div>
  );
}
