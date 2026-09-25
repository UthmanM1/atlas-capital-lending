import Link from "next/link";

export const metadata = {
  title: "For Investors",
  description: "Rental purchase, cash-out refinance and portfolio financing for real estate investors, plus tools to model your numbers.",
};

const FUNNELS: [string, string, string][] = [
  ["Rental Purchase", "Buy with property cash flow, not W-2 income.", "/loans/rental-purchase"],
  ["Cash-Out Refinance", "Turn rental equity into your next acquisition.", "/loans/cash-out"],
  ["Portfolio Loans", "One strategy for a growing portfolio.", "/loans/portfolio"],
];

const TOOLS: [string, string, string][] = [
  ["Calculators", "DSCR, LTV, LTC and ARV, with visible formulas.", "/calculators/dscr"],
  ["Market pages", "Illustrative context across six states.", "/markets"],
  ["Knowledge Hub", "Plain-language guides to DSCR financing.", "/resources"],
  ["Funded deals", "Illustrative investment scenarios.", "/funded-deals"],
];

export default function Page() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>For Rental Property Investors</h1>
          <p>Three financing paths, transparent calculators, and a qualification flow that saves your scenario.</p>
        </div>
      </section>
      <section className="wrap sec">
        <h2>Financing paths</h2>
        <div className="grid g3">
          {FUNNELS.map(([t, d, href]) => (
            <Link key={href} className="card" style={{ textDecoration: "none" }} href={href}>
              <h3>{t}</h3>
              <p className="mut">{d}</p>
              <b>View funnel</b>
            </Link>
          ))}
        </div>
      </section>
      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <h2>Tools & resources</h2>
        <div className="grid g4">
          {TOOLS.map(([t, d, href]) => (
            <Link key={href} className="card" style={{ textDecoration: "none" }} href={href}>
              <h3>{t}</h3>
              <p className="mut">{d}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
