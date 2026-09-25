import Link from "next/link";
import Pic, { Ratio } from "../property/Pic";

export default function PageHero({
  title,
  subtitle,
  cta,
  image,
  ratio = "r43",
}: {
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  image?: { src: string; alt: string };
  ratio?: Ratio;
}) {
  return (
    <section className="hero">
      <div className={`wrap ${image ? "grid g2" : ""}`} style={{ alignItems: "center" }}>
        <div>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
          {cta && (
            <Link href={cta.href} className="btn">
              {cta.label}
            </Link>
          )}
        </div>
        {image && (
          <div className="hero-pic">
            <Pic src={image.src} alt={image.alt} ratio={ratio} priority />
          </div>
        )}
      </div>
    </section>
  );
}
