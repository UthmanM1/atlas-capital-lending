import Link from "next/link";

export const metadata = {
  title: "About",
  description:
    "Atlas Capital Lending is a digital-first approach to real estate investor financing, combining property analysis, qualification, borrower workflows and advisor support.",
};

const POINTS: [string, string][] = [
  ["Investor-focused financing", "Programs framed around how rental investors evaluate property cash flow."],
  ["DSCR lending", "Financing analysis that starts with the property's income."],
  ["Rental property financing", "Purchase and refinance scenarios for single- and multi-unit rentals."],
  ["Refinance strategies", "Rate & term and cash-out options, with equity shown clearly."],
  ["Portfolio investors", "Blended metrics across several properties."],
  ["Broker relationships", "A workspace for submitting and tracking scenarios."],
];

export default function AboutPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>About Atlas Capital</h1>
          <p>
            Atlas Capital Lending is built around a digital-first approach to real estate investor
            financing, combining property analysis, qualification, borrower workflows and advisor support
            in one connected experience.
          </p>
        </div>
      </section>
      <section className="wrap sec pane">
        <div className="grid g3">
          {POINTS.map(([t, d]) => (
            <div className="card" key={t}>
              <h3>{t}</h3>
              <p className="mut">{d}</p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 16 }}>
          <Link className="btn" href="/contact">
            Speak with an advisor
          </Link>
        </p>
        <p className="note" style={{ marginTop: 24 }}>
          This is a technology and UX portfolio project. Atlas Capital Lending is not a licensed lender;
          no company history, founders, employee count or funding details are claimed because none exist
          for this demonstration.
        </p>
      </section>
    </>
  );
}
