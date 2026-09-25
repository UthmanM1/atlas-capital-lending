import Pic from "@/components/property/Pic";
import PortfolioCalculator from "@/components/calculators/PortfolioCalculator";
import { AdvisorCallout, FinalCta } from "@/components/layout/AdvisorCallout";
import { MULTIFAMILY_IMG, MULTIFAMILY_DUSK_IMG } from "@/lib/content/images";
import { PORTFOLIO_PROPERTIES, PORTFOLIO_IMAGES } from "@/lib/mock-data/portal";
import { formatCurrency } from "@/lib/calculations/dscr";

export const metadata = {
  title: "Portfolio Loans — One Financing Strategy for Your Growing Portfolio",
  description: "Blended LTV, average DSCR and equity across every property, in one view.",
};

export default function Page() {
  return (
    <>
      <section className="hero">
        <div className="wrap grid g2" style={{ alignItems: "center" }}>
          <div>
            <h1>One Financing Strategy for Your Growing Portfolio</h1>
            <p>Blended LTV, average DSCR and equity across every property, in one view.</p>
          </div>
          <div className="hero-pic">
            <Pic src={MULTIFAMILY_IMG.src} alt={MULTIFAMILY_IMG.alt} ratio="r43" priority />
          </div>
        </div>
      </section>

      <section className="wrap sec">
        <h2>
          Example portfolio <span className="pill">Illustrative</span>
        </h2>
        <div className="grid g4">
          <div className="stat card"><b>6</b><span>Properties</span></div>
          <div className="stat card"><b>$2.4M</b><span>Portfolio value</span></div>
          <div className="stat card"><b>$1.5M</b><span>Existing debt</span></div>
          <div className="stat card"><b>$900K</b><span>Equity</span></div>
          <div className="stat card"><b>1.26x</b><span>Average DSCR</span></div>
        </div>
        <div className="grid g3" style={{ marginTop: 16 }}>
          {PORTFOLIO_PROPERTIES.map((p, i) => (
            <div className="card imgcard" key={p.city}>
              <Pic src={PORTFOLIO_IMAGES[i].image} alt={PORTFOLIO_IMAGES[i].alt} ratio="r43" />
              <div className="cardbody">
                <h3 style={{ marginTop: 10 }}>
                  Property 0{i + 1} · {p.city}
                </h3>
                <table>
                  <tbody>
                    <tr><th scope="row">Value</th><td>{formatCurrency(p.value)}</td></tr>
                    <tr><th scope="row">Rent</th><td>{formatCurrency(p.rent)}/mo</td></tr>
                    <tr><th scope="row">Debt</th><td>{formatCurrency(p.debt)}</td></tr>
                    <tr><th scope="row">DSCR</th><td>{p.dscr.toFixed(2)}x</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <div className="grid g2" style={{ alignItems: "center" }}>
          <div>
            <h2>Built for portfolio-scale investors</h2>
            <p className="mut">
              As a portfolio grows past a handful of doors, blended LTV and average DSCR matter more than
              any single deal.
            </p>
          </div>
          <Pic src={MULTIFAMILY_DUSK_IMG.src} alt={MULTIFAMILY_DUSK_IMG.alt} ratio="r43" />
        </div>
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <h2>Model your portfolio</h2>
        <PortfolioCalculator />
        <AdvisorCallout />
      </section>

      <FinalCta />
    </>
  );
}
