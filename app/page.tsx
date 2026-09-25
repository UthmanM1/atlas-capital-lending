import Link from "next/link";
import Pic from "@/components/property/Pic";
import DscrCalculator from "@/components/calculators/DscrCalculator";
import { HERO_IMG, SUPPORT_IMG, INTERIOR_1 } from "@/lib/content/images";

export const metadata = {
  title: "Real Estate Financing for Rental Investors",
  description:
    "DSCR financing designed for real estate investors who want a faster, clearer path from property analysis to funding.",
};

const FUNNELS: [string, string, string][] = [
  ["Rental Purchase", "Buy with property cash flow, not W-2 income.", "/loans/rental-purchase"],
  ["Cash-Out Refinance", "Turn rental equity into your next acquisition.", "/loans/cash-out"],
  ["Portfolio Loans", "One strategy for a growing portfolio.", "/loans/portfolio"],
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap grid g2" style={{ alignItems: "center" }}>
          <div>
            <h1>Finance the Property. Scale the Portfolio.</h1>
            <p>
              DSCR financing designed for real estate investors who want a faster, clearer path from
              property analysis to funding.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="btn" href="/calculators/dscr">
                Analyze My Deal
              </Link>
              <Link
                className="btn ghost"
                style={{ color: "#f3efe6", borderColor: "#ffffff40" }}
                href="/qualify"
              >
                Talk to a Loan Advisor
              </Link>
            </div>
          </div>
          <div className="hero-pic" style={{ position: "relative" }}>
            <Pic src={HERO_IMG.src} alt={HERO_IMG.alt} ratio="r43" priority />
            <div
              style={{
                position: "absolute",
                left: 12,
                right: 12,
                bottom: 12,
                background: "#0f1b2dcc",
                backdropFilter: "blur(2px)",
                borderRadius: 6,
                padding: "10px 12px",
              }}
            >
              <span className="pill" style={{ background: "#ffffff1f", color: "#f3efe6", fontSize: 11 }}>
                Illustrative portfolio example
              </span>
              <h3 style={{ margin: "6px 0 8px", color: "#f3efe6", fontSize: ".95rem" }}>
                123 Main Street, Tampa, FL
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
                <div className="stat">
                  <b style={{ color: "#f3efe6", fontSize: "1.05rem" }}>$425K</b>
                  <span style={{ color: "#c3ccd6", fontSize: 11 }}>Purchase</span>
                </div>
                <div className="stat">
                  <b style={{ color: "#f3efe6", fontSize: "1.05rem" }}>75%</b>
                  <span style={{ color: "#c3ccd6", fontSize: 11 }}>LTV</span>
                </div>
                <div className="stat">
                  <b style={{ color: "#f3efe6", fontSize: "1.05rem" }}>1.34x</b>
                  <span style={{ color: "#c3ccd6", fontSize: 11 }}>DSCR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap sec">
        <div className="grid g2" style={{ alignItems: "center" }}>
          <Pic src={SUPPORT_IMG.src} alt={SUPPORT_IMG.alt} ratio="r43" />
          <div>
            <h2>Built for rental property investors</h2>
            <p className="mut">
              Whether you&apos;re buying your first rental or your fifteenth, Atlas Capital Lending
              centers financing on what the property earns.
            </p>
            <ul className="mut" style={{ paddingLeft: 18, lineHeight: 1.8 }}>
              <li>Rental purchases qualified on property cash flow</li>
              <li>DSCR financing with transparent, editable assumptions</li>
              <li>A short investor qualification flow that saves your scenario</li>
            </ul>
            <Link className="btn ghost" href="/loans/dscr">
              How DSCR financing works
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <h2>Choose your financing path</h2>
        <div className="grid g3">
          {FUNNELS.map(([title, blurb, href]) => (
            <Link key={href} className="card" style={{ textDecoration: "none" }} href={href}>
              <h3>{title}</h3>
              <p className="mut">{blurb}</p>
              <b>View funnel</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <h2>Try the calculator</h2>
        <DscrCalculator />
      </section>

      <section className="wrap sec">
        <div className="grid g2" style={{ alignItems: "center" }}>
          <Pic src={INTERIOR_1.src} alt={INTERIOR_1.alt} ratio="r43" />
          <div>
            <h2>A connected investor experience</h2>
            <p className="mut">
              Save a scenario once and pick it back up in the borrower portal, with the same numbers an
              advisor sees.
            </p>
            <div className="grid g2" style={{ marginTop: 6 }}>
              <Link className="card" href="/portal/borrower">
                Borrower portal
              </Link>
              <Link className="card" href="/portal/broker">
                Broker portal
              </Link>
              <Link className="card" href="/staff">
                Staff CRM
              </Link>
              <Link className="card" href="/staff/marketing">
                Marketing dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap sec">
        <div className="card" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <div>
            <h3 style={{ margin: 0 }}>See a full walkthrough</h3>
            <p className="mut" style={{ margin: "4px 0 0" }}>
              Explore the acquisition-to-funding architecture in the case study.
            </p>
          </div>
          <Link className="btn" href="/case-study">
            View case study
          </Link>
        </div>
      </section>
    </>
  );
}
