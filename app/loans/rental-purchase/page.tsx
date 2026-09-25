import Link from "next/link";
import Pic from "@/components/property/Pic";
import DscrCalculator from "@/components/calculators/DscrCalculator";
import { AdvisorCallout, FinalCta } from "@/components/layout/AdvisorCallout";
import { DUPLEX_IMG } from "@/lib/content/images";

export const metadata = {
  title: "Rental Purchase — Buy Your Next Rental Without W-2 Income",
  description:
    "Qualify a rental purchase on what the property earns. See DSCR, LTV and cash to close before you talk to anyone.",
};

const VALUE_PROPS: [string, string][] = [
  ["Rent-based analysis", "DSCR compares rent with the monthly payment."],
  ["Purchase-ready numbers", "Estimate cash required, with editable closing costs."],
  ["A clear next step", "Save a scenario and an advisor follows up."],
];

const STEPS = [
  "Choose what you want to finance",
  "Add the property and rent",
  "Enter financing details",
  "Tell us about your investing experience",
  "Review and save your scenario",
];

export default function Page() {
  return (
    <>
      <section className="hero">
        <div className="wrap grid g2" style={{ alignItems: "center" }}>
          <div>
            <h1>Buy Your Next Rental Without W-2 Income</h1>
            <p>Qualify on what the property earns. See DSCR, LTV and cash to close before you talk to anyone.</p>
            <Link className="btn" href="/qualify">
              Check My Scenario
            </Link>
          </div>
          <div className="hero-pic">
            <Pic src={DUPLEX_IMG.src} alt={DUPLEX_IMG.alt} ratio="r43" priority />
          </div>
        </div>
      </section>

      <section className="wrap sec">
        <div className="grid g3">
          {VALUE_PROPS.map(([t, d]) => (
            <div className="card" key={t}>
              <h3>{t}</h3>
              <p className="mut">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <h2>Analyze a purchase</h2>
        <DscrCalculator />
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <h2>How qualification works</h2>
        <ol>
          {STEPS.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <AdvisorCallout />
      </section>

      <FinalCta />
    </>
  );
}
