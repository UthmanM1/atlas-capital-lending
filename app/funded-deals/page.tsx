import Pic from "@/components/property/Pic";
import { FUNDED_IMAGES, HERO_IMG } from "@/lib/content/images";

export const metadata = {
  title: "Illustrative Portfolio Examples",
  description: "Illustrative investment scenarios — not actual Atlas transactions.",
};

const DEALS: [string, string][] = [
  ["Rental Purchase", "$425K purchase · $318,750 illustrative loan · 75% LTV · 1.34x DSCR"],
  ["Cash-Out", "$680K property · $320K existing debt · $476K illustrative new loan"],
  ["Portfolio", "$2.4M portfolio · $1.5M existing debt · 1.26x average DSCR"],
];

export default function FundedDealsPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap grid g2" style={{ alignItems: "center" }}>
          <div>
            <h1>Illustrative Portfolio Examples</h1>
            <p>Illustrative investment scenarios — not actual Atlas transactions.</p>
          </div>
          <div className="hero-pic">
            <Pic src={HERO_IMG.src} alt={HERO_IMG.alt} ratio="r43" priority />
          </div>
        </div>
      </section>
      <section className="wrap sec">
        <div className="grid g3">
          {DEALS.map(([title, detail], i) => (
            <div className="card imgcard" key={title}>
              <Pic src={FUNDED_IMAGES[i].src} alt={FUNDED_IMAGES[i].alt} ratio="r43" />
              <div className="cardbody">
                <span className="pill">Illustrative investment scenario</span>
                <h3 style={{ marginTop: 6 }}>{title}</h3>
                <p className="mut">{detail}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="note" style={{ marginTop: 16 }}>
          Illustrative only. Requirements, pricing and availability vary by program and are not offers or
          commitments.
        </p>
      </section>
    </>
  );
}
