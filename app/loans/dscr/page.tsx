import Link from "next/link";
import { FaqList } from "@/components/layout/AdvisorCallout";
import { FAQ } from "@/lib/content/knowledge-base";

export const metadata = {
  title: "DSCR Financing — Financing Built Around the Property",
  description:
    "DSCR financing looks at rental income and property cash flow to frame purchase, refinance and portfolio scenarios.",
};

const STAGES = ["Property", "Rental income", "Debt service", "DSCR", "Financing scenario"];
const PATHS: [string, string][] = [
  ["Purchase", "Buy a rental using property cash flow."],
  ["Refinance", "Rate & term or cash-out."],
  ["Portfolio", "Blend several properties."],
];

export default function Page() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>Financing Built Around the Property</h1>
          <p>
            DSCR financing looks at rental income and property cash flow to frame purchase, refinance and
            portfolio scenarios.
          </p>
        </div>
      </section>
      <section className="wrap sec pane">
        <div className="grid g3" style={{ marginBottom: 24 }}>
          {STAGES.map((s, i) => (
            <div className="card stat" key={s}>
              <b>{i + 1}</b>
              <span>{s}</span>
            </div>
          ))}
        </div>
        <div className="grid g3">
          {PATHS.map(([t, d]) => (
            <div className="card" key={t}>
              <h3>{t}</h3>
              <p className="mut">{d}</p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 16 }}>
          <Link className="btn" href="/calculators/dscr">
            Open the calculator
          </Link>{" "}
          <Link className="btn ghost" href="/requirements">
            Requirements
          </Link>
        </p>
        <FaqList items={FAQ} />
      </section>
    </>
  );
}
