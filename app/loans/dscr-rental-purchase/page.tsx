import Link from "next/link";
import Pic from "@/components/property/Pic";
import { FaqList } from "@/components/layout/AdvisorCallout";
import { DUPLEX_IMG, INTERIOR_1 } from "@/lib/content/images";
import { formatCurrency } from "@/lib/calculations/dscr";
import LandingViewTracker from "@/components/funnels/LandingViewTracker";

export const metadata = {
  title: "DSCR Rental Purchase — Finance Your Next Rental Property With DSCR",
  description:
    "Qualify a rental purchase on property cash flow, not W-2 income. Calculate your buying power, see an illustrative DSCR and LTV, and save your scenario.",
};

const BENEFITS: [string, string][] = [
  ["Qualify on the property, not your paycheck", "DSCR compares rent to the payment — personal income documentation isn't the main input."],
  ["See your numbers before you talk to anyone", "Loan amount, DSCR and LTV, calculated instantly with visible assumptions."],
  ["A guided path, not a stack of forms", "A short, mobile-friendly flow takes you from a scenario to a saved lead in minutes."],
];

const WHO_ITS_FOR = [
  "First-time rental buyers moving past personal-income-only financing",
  "Investors who already own 1–4 rentals and want to add another",
  "Self-employed or 1099 investors whose tax returns understate cash flow",
  "Investors comparing purchase price and rent scenarios before making an offer",
];

const HOW_IT_WORKS = [
  "Estimate your buying power with the calculator",
  "Walk through a short guided qualification",
  "Save your scenario and share your contact details",
  "Review your DSCR, LTV and estimated loan amount",
  "Book a call with a loan advisor when you're ready",
];

const EXAMPLE_ROWS: [string, string][] = [
  ["Purchase price", formatCurrency(425000)],
  ["Down payment (25%)", formatCurrency(106250)],
  ["Loan amount", formatCurrency(318750)],
  ["Monthly rent", "$3,100"],
  ["Estimated DSCR", "1.24x"],
  ["Estimated LTV", "75%"],
];

const FAQS: [string, string][] = [
  ["Do I need to show W-2 income?", "DSCR financing centers on the property's rent versus its payment. Programs differ on what else they review."],
  ["What credit score do I need?", "Credit ranges affect pricing and terms; there's no single fixed minimum shown here."],
  ["Is this a real loan application?", "No. This is a portfolio demonstration. Nothing here is a loan offer, approval, rate quote, or commitment to lend."],
  ["How is DSCR calculated?", "DSCR = monthly rent ÷ monthly housing payment (principal, interest, taxes, insurance and HOA)."],
];

export default function DscrRentalPurchasePage() {
  return (
    <>
      <LandingViewTracker />
      <section className="hero">
        <div className="wrap grid g2" style={{ alignItems: "center" }}>
          <div>
            <h1>Finance Your Next Rental Property With DSCR</h1>
            <p>
              Qualify based on what the property earns, not your personal income documentation. See an
              illustrative loan amount, DSCR and LTV before you talk to anyone.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="btn" href="/loans/dscr-rental-purchase/apply" data-ev="calculator_started">
                Calculate My Buying Power
              </Link>
              <Link className="btn ghost" style={{ color: "#f3efe6", borderColor: "#ffffff40" }} href="/contact">
                Talk to a Loan Advisor
              </Link>
            </div>
          </div>
          <div className="hero-pic">
            <Pic src={DUPLEX_IMG.src} alt={DUPLEX_IMG.alt} ratio="r43" priority />
          </div>
        </div>
      </section>

      <section className="wrap sec">
        <h2>Why investors use DSCR financing</h2>
        <div className="grid g3">
          {BENEFITS.map(([t, d]) => (
            <div className="card" key={t}>
              <h3>{t}</h3>
              <p className="mut">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <div className="grid g2" style={{ alignItems: "center" }}>
          <div>
            <h2>Who this is for</h2>
            <ul className="mut" style={{ paddingLeft: 18, lineHeight: 1.9 }}>
              {WHO_ITS_FOR.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <Pic src={INTERIOR_1.src} alt={INTERIOR_1.alt} ratio="r43" />
        </div>
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <h2>How the process works</h2>
        <ol className="grid g3" style={{ listStyle: "none", paddingLeft: 0 }}>
          {HOW_IT_WORKS.map((s, i) => (
            <li className="card" key={s}>
              <span className="pill">Step {i + 1}</span>
              <p style={{ marginTop: 10, marginBottom: 0 }}>{s}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <h2>
          Example scenario <span className="pill">Illustrative</span>
        </h2>
        <div className="card" style={{ maxWidth: 520 }}>
          <table>
            <tbody>
              {EXAMPLE_ROWS.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note" style={{ marginTop: 12 }}>
          Illustrative estimate only. This calculator does not constitute a loan offer, approval, or
          commitment.
        </p>
        <Link className="btn" style={{ marginTop: 12, display: "inline-block" }} href="/loans/dscr-rental-purchase/apply">
          Calculate My Buying Power
        </Link>
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <h2>Frequently asked questions</h2>
        <FaqList items={FAQS} />
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <h2>How this scenario is built</h2>
        <p className="mut" style={{ maxWidth: 640 }}>
          Every formula shown in the calculator and qualification flow is visible and editable — there&apos;s
          no hidden scoring model. This is a technology and UX demonstration, not a real lending platform;
          see how a paid-search campaign would drive this exact funnel in the{" "}
          <Link href="/case-studies/dscr-rental-purchase-campaign">campaign demonstration</Link>.
        </p>
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <div className="card" style={{ background: "var(--accbg)", borderColor: "var(--acc)", textAlign: "center" }}>
          <h3 style={{ marginTop: 0 }}>Ready to see your numbers?</h3>
          <Link className="btn" href="/loans/dscr-rental-purchase/apply">
            Calculate My Buying Power
          </Link>
        </div>
      </section>
    </>
  );
}
