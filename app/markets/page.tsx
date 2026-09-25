import Link from "next/link";
import Pic from "@/components/property/Pic";
import PropertyCard from "@/components/property/PropertyCard";
import { MARKETS, MARKET_DISCLAIMER } from "@/lib/content/markets";
import { HERO_IMG } from "@/lib/content/images";

export const metadata = {
  title: "Markets",
  description: "Six illustrative market pages for rental property investors. State availability and licensing must be confirmed before launch.",
};

export default function MarketsPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap grid g2" style={{ alignItems: "center" }}>
          <div>
            <h1>Markets</h1>
            <p>Six illustrative market pages. State availability and licensing must be confirmed before launch.</p>
            <Link className="btn" href="/qualify">
              Check My Scenario
            </Link>
          </div>
          <div className="hero-pic">
            <Pic src={HERO_IMG.src} alt={HERO_IMG.alt} ratio="r43" priority />
          </div>
        </div>
      </section>
      <section className="wrap sec">
        <div className="grid g3">
          {MARKETS.map((m) => (
            <PropertyCard
              key={m.slug}
              href={`/markets/${m.slug}`}
              image={m.image}
              alt={m.alt}
              title={m.name}
              pill="Example market page"
            />
          ))}
        </div>
        <p className="note" style={{ marginTop: 16 }}>
          {MARKET_DISCLAIMER}
        </p>
      </section>
    </>
  );
}
