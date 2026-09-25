import Pic from "@/components/property/Pic";
import CashOutCalculator from "@/components/calculators/CashOutCalculator";
import { AdvisorCallout, FinalCta } from "@/components/layout/AdvisorCallout";
import { CASHOUT_IMG, INTERIOR_2 } from "@/lib/content/images";
import { formatCurrency } from "@/lib/calculations/dscr";

const EQUITY_ROWS: [string, number, string][] = [
  ["Property value", 680000, "var(--navy)"],
  ["Current debt", 320000, "var(--mut)"],
  ["Illustrative maximum at 75% LTV", 510000, "var(--acc)"],
  ["Illustrative available equity", 190000, "var(--amb)"],
];

const USES: [string, string][] = [
  ["Next acquisition", "Use equity toward a down payment."],
  ["Renovations", "Fund improvements that support rent."],
  ["Reserves", "Build liquidity across a portfolio."],
];

export const metadata = {
  title: "Cash-Out Refinance — Turn Rental Equity Into Your Next Investment",
  description: "See how much equity a rental could unlock before you decide. Illustrative estimates only.",
};

export default function Page() {
  return (
    <>
      <section className="hero">
        <div className="wrap grid g2" style={{ alignItems: "center" }}>
          <div>
            <h1>Turn Rental Equity Into Your Next Investment</h1>
            <p>See how much equity a rental could unlock before you decide.</p>
          </div>
          <div className="hero-pic">
            <Pic src={CASHOUT_IMG.src} alt={CASHOUT_IMG.alt} ratio="r43" priority />
          </div>
        </div>
      </section>

      <section className="wrap sec">
        <h2>
          Equity at a glance <span className="pill">Illustrative</span>
        </h2>
        <div className="card">
          {EQUITY_ROWS.map(([label, amt, color]) => (
            <div key={label} style={{ margin: "12px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                <span>{label}</span>
                <b>{formatCurrency(amt)}</b>
              </div>
              <div className="bar2">
                <i style={{ width: `${amt / 6.8}%`, background: color }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <h2>Model your refinance</h2>
        <CashOutCalculator />
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <h2>Common uses of funds</h2>
        <div className="grid g3">
          {USES.map(([t, d]) => (
            <div className="card" key={t}>
              <h3>{t}</h3>
              <p className="mut">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <div className="grid g2" style={{ alignItems: "center" }}>
          <Pic src={INTERIOR_2.src} alt={INTERIOR_2.alt} ratio="r43" />
          <div>
            <h2>An established rental, put to work</h2>
            <p className="mut">
              A cash-out refinance keeps the property in service as a rental while freeing equity for the
              next acquisition or improvement.
            </p>
          </div>
        </div>
        <AdvisorCallout />
      </section>

      <FinalCta label="Explore My Options" />
    </>
  );
}
