"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Gauge from "@/components/calculators/Gauge";
import LeadCaptureForm from "@/components/funnels/LeadCaptureForm";
import {
  calcBuyingPower,
  DEFAULT_BUYING_POWER_INPUTS,
  BuyingPowerInputs,
  formatCurrency,
} from "@/lib/calculations/dscr";
import { DISC } from "@/lib/content/disclosures";
import { US_STATES } from "@/lib/content/us-states";
import { track, FUNNEL_EVENTS } from "@/lib/analytics";
import { saveRentalPurchaseScenario, RPLead, RPQualification } from "@/lib/store";

const PROPERTY_TYPES = ["Single family", "2–4 unit", "Condo", "Townhome"];
const CREDIT_RANGES = ["760+", "720–739", "680–719", "640–679"];
const EXPERIENCE = ["First-time investor", "1–4 properties", "5+ properties"];
const PURPOSES = ["Purchase", "Refinance"];
const QUAL_STEPS = ["Property state", "Property type", "Purchase or refinance", "Property value", "Rental income", "Credit range", "Investor experience"];

type Phase = "calculator" | "qualify" | "lead";

export default function ApplyPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("calculator");
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const startedCalc = useRef(false);

  const [calc, setCalc] = useState<BuyingPowerInputs>(DEFAULT_BUYING_POWER_INPUTS);
  const [qual, setQual] = useState<Omit<RPQualification, "purchasePrice" | "monthlyRent">>({
    propertyState: "",
    propertyType: "",
    purpose: "",
    creditRange: "",
    experience: "",
  });

  const result = calcBuyingPower(calc);

  function touchCalc<K extends keyof BuyingPowerInputs>(key: K, value: string) {
    if (!startedCalc.current) {
      startedCalc.current = true;
      track(FUNNEL_EVENTS.CALCULATOR_STARTED);
    }
    setCalc((s) => ({ ...s, [key]: parseFloat(value) || 0 }));
  }

  function beginQualify() {
    track(FUNNEL_EVENTS.CALCULATOR_COMPLETED, { loanAmount: Math.round(result.loanAmount), dscr: +result.dscr.toFixed(2) });
    track(FUNNEL_EVENTS.QUALIFICATION_STARTED);
    setPhase("qualify");
    setStep(1);
  }

  function validateStep(): string[] {
    const e: string[] = [];
    if (step === 1 && !qual.propertyState) e.push("Choose the property's state.");
    if (step === 2 && !qual.propertyType) e.push("Choose a property type.");
    if (step === 3 && !qual.purpose) e.push("Choose purchase or refinance.");
    if (step === 4 && !(calc.price > 0)) e.push("Enter an estimated purchase price above zero.");
    if (step === 5 && !(calc.rent > 0)) e.push("Enter monthly rental income above zero.");
    if (step === 6 && !qual.creditRange) e.push("Choose an estimated credit range.");
    if (step === 7 && !qual.experience) e.push("Choose your investor experience.");
    return e;
  }

  function nextStep(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateStep();
    if (errs.length) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    track(FUNNEL_EVENTS.QUALIFICATION_STEP, { step, label: QUAL_STEPS[step - 1] });
    if (step < 7) {
      setStep(step + 1);
      return;
    }
    track(FUNNEL_EVENTS.QUALIFICATION_COMPLETED);
    track(FUNNEL_EVENTS.LEAD_STARTED);
    setPhase("lead");
  }

  function submitLead(lead: RPLead) {
    setSubmitting(true);
    track(FUNNEL_EVENTS.LEAD_SUBMITTED, { state: qual.propertyState, propertyType: qual.propertyType });
    // Simulate a brief save so the loading state is visible, like a real submit would be.
    setTimeout(() => {
      const scenario = saveRentalPurchaseScenario(
        { ...qual, purchasePrice: calc.price, monthlyRent: calc.rent } as RPQualification,
        lead,
        result
      );
      setSubmitting(false);
      router.push(`/loans/dscr-rental-purchase/scenario?id=${scenario.id}`);
    }, 700);
  }

  if (phase === "lead") {
    return <LeadCaptureForm onBack={() => setPhase("qualify")} onSubmit={submitLead} submitting={submitting} />;
  }

  return (
    <section className="wrap sec" style={{ maxWidth: 720 }}>
      {phase === "calculator" && (
        <>
          <h1 style={{ fontSize: "2rem" }}>Calculate My Buying Power</h1>
          <p className="mut">Every field below is editable — adjust the numbers to match your scenario.</p>
          <div className="grid g2">
            <div className="card">
              <h3>Deal inputs</h3>
              <div className="fields">
                <label>
                  Property purchase price ($)
                  <input type="number" inputMode="decimal" value={calc.price} onChange={(e) => touchCalc("price", e.target.value)} />
                </label>
                <label>
                  Down payment ($)
                  <input type="number" inputMode="decimal" value={calc.downPayment} onChange={(e) => touchCalc("downPayment", e.target.value)} />
                </label>
                <label>
                  Monthly rental income ($)
                  <input type="number" inputMode="decimal" value={calc.rent} onChange={(e) => touchCalc("rent", e.target.value)} />
                </label>
                <label>
                  Monthly taxes ($)
                  <input type="number" inputMode="decimal" value={calc.tax} onChange={(e) => touchCalc("tax", e.target.value)} />
                </label>
                <label>
                  Monthly insurance ($)
                  <input type="number" inputMode="decimal" value={calc.ins} onChange={(e) => touchCalc("ins", e.target.value)} />
                </label>
                <label>
                  Monthly HOA ($)
                  <input type="number" inputMode="decimal" value={calc.hoa} onChange={(e) => touchCalc("hoa", e.target.value)} />
                </label>
                <label>
                  Interest rate (%)
                  <input type="number" inputMode="decimal" value={calc.rate} onChange={(e) => touchCalc("rate", e.target.value)} />
                </label>
                <label>
                  Loan term (yrs)
                  <select value={calc.term} onChange={(e) => touchCalc("term", e.target.value)}>
                    {[30, 25, 20, 15].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            <div className="card" aria-live="polite">
              <h3>Estimated results</h3>
              <div style={{ textAlign: "center" }}>
                <Gauge dscr={result.dscr} />
              </div>
              <div className="grid g3" style={{ margin: "12px 0" }}>
                <div className="stat">
                  <b>{formatCurrency(result.loanAmount)}</b>
                  <span>Estimated Loan Amount</span>
                </div>
                <div className="stat">
                  <b>{result.dscr.toFixed(2)}</b>
                  <span>Estimated DSCR</span>
                </div>
                <div className="stat">
                  <b>{result.ltv.toFixed(0)}%</b>
                  <span>Estimated LTV</span>
                </div>
                <div className="stat">
                  <b>{formatCurrency(result.pi)}</b>
                  <span>Est. monthly P&amp;I</span>
                </div>
                <div className="stat">
                  <b>{formatCurrency(result.monthlyExpense)}</b>
                  <span>Est. monthly housing expense</span>
                </div>
              </div>
              <p className="note">{DISC}</p>
              <button className="btn" style={{ width: "100%" }} onClick={beginQualify}>
                Continue With This Scenario
              </button>
            </div>
          </div>
        </>
      )}

      {phase === "qualify" && (
        <>
          <div
            className="prog"
            role="progressbar"
            aria-label={`Qualification progress: step ${step} of 7`}
            aria-valuenow={step}
            aria-valuemin={1}
            aria-valuemax={7}
          >
            {QUAL_STEPS.map((_, i) => (
              <i key={i} className={i < step ? "on" : ""} />
            ))}
          </div>
          <div className="mut">
            Step {step} of 7 · {QUAL_STEPS[step - 1]}
          </div>
          <form onSubmit={nextStep} noValidate>
            {step === 1 && (
              <>
                <h2>Where is the property located?</h2>
                <label>
                  Property state
                  <select value={qual.propertyState} onChange={(e) => setQual((s) => ({ ...s, propertyState: e.target.value }))}>
                    <option value="">Select a state</option>
                    {US_STATES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </>
            )}
            {step === 2 && (
              <>
                <h2>What type of property is it?</h2>
                {PROPERTY_TYPES.map((t) => (
                  <label className="opt" key={t}>
                    <input type="radio" name="propertyType" checked={qual.propertyType === t} onChange={() => setQual((s) => ({ ...s, propertyType: t }))} />
                    {t}
                  </label>
                ))}
              </>
            )}
            {step === 3 && (
              <>
                <h2>Is this a purchase or a refinance?</h2>
                {PURPOSES.map((p) => (
                  <label className="opt" key={p}>
                    <input type="radio" name="purpose" checked={qual.purpose === p} onChange={() => setQual((s) => ({ ...s, purpose: p }))} />
                    {p}
                  </label>
                ))}
              </>
            )}
            {step === 4 && (
              <>
                <h2>Confirm the estimated property value</h2>
                <label>
                  Purchase price ($)
                  <input type="number" inputMode="decimal" value={calc.price} onChange={(e) => setCalc((s) => ({ ...s, price: parseFloat(e.target.value) || 0 }))} />
                </label>
              </>
            )}
            {step === 5 && (
              <>
                <h2>Confirm the monthly rental income</h2>
                <label>
                  Monthly rent ($)
                  <input type="number" inputMode="decimal" value={calc.rent} onChange={(e) => setCalc((s) => ({ ...s, rent: parseFloat(e.target.value) || 0 }))} />
                </label>
              </>
            )}
            {step === 6 && (
              <>
                <h2>What&apos;s your estimated credit range?</h2>
                {CREDIT_RANGES.map((c) => (
                  <label className="opt" key={c}>
                    <input type="radio" name="credit" checked={qual.creditRange === c} onChange={() => setQual((s) => ({ ...s, creditRange: c }))} />
                    {c}
                  </label>
                ))}
              </>
            )}
            {step === 7 && (
              <>
                <h2>How much investing experience do you have?</h2>
                {EXPERIENCE.map((x) => (
                  <label className="opt" key={x}>
                    <input type="radio" name="experience" checked={qual.experience === x} onChange={() => setQual((s) => ({ ...s, experience: x }))} />
                    {x}
                  </label>
                ))}
              </>
            )}
            {errors.length > 0 && (
              <div className="err" role="alert">
                {errors.join(" ")}
              </div>
            )}
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button
                type="button"
                className="btn ghost"
                onClick={() => (step === 1 ? setPhase("calculator") : setStep(step - 1))}
              >
                Back
              </button>
              <button className="btn" style={{ flex: 1 }}>
                {step === 7 ? "Continue" : "Save & Continue"}
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
}
