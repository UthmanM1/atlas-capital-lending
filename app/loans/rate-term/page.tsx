import Link from "next/link";
import Pic from "@/components/property/Pic";
import { FaqList } from "@/components/layout/AdvisorCallout";
import { FAQ } from "@/lib/content/knowledge-base";
import { MULTIFAMILY_DUSK_IMG } from "@/lib/content/images";

export const metadata = {
  title: "Rate & Term Refinance — Refinance Your Rental for a Better Structure",
  description: "Rate & term refinancing changes the loan without taking cash out.",
};

const POINTS: [string, string][] = [
  ["Lower the payment", "A lower rate can raise DSCR."],
  ["Change the term", "Compare 15-, 20- and 30-year payments."],
  ["Keep it simple", "No cash-out means a lower loan balance."],
];

export default function Page() {
  return (
    <>
      <section className="hero">
        <div className="wrap grid g2" style={{ alignItems: "center" }}>
          <div>
            <h1>Refinance Your Rental for a Better Structure</h1>
            <p>Rate &amp; term refinancing changes the loan without taking cash out.</p>
          </div>
          <div className="hero-pic">
            <Pic src={MULTIFAMILY_DUSK_IMG.src} alt={MULTIFAMILY_DUSK_IMG.alt} ratio="r43" priority />
          </div>
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
          <Link href="/calculators/ltv">Compare with the LTV calculator →</Link>
        </p>
        <FaqList items={FAQ.slice(1)} />
      </section>
    </>
  );
}
