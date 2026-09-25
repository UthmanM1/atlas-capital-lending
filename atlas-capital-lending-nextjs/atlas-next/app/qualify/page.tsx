"use client";
import { useState } from "react";
import Link from "next/link";
import { calcDscr, DEFAULT_DSCR_INPUTS, DscrInputs, formatCurrency } from "@/lib/calculations/dscr";
import { logEvent, saveScenario, useStore } from "@/lib/store";

const STEPS = ["Goal", "Property", "Financing", "Investor", "Contact", "Review"];
const GOALS = ["Rental purchase", "Cash-out refinance", "Rate & term refinance", "Portfolio", "Not sure"];
const PROPERTY_TYPES = ["Single family", "2–4 unit", "Condo", "Townhome"];
const CREDIT_RANGES = ["760+", "720–739", "680–719", "640–679"];
const EXPERIENCE = ["", "First-time investor", "1–4 properties", "5+ properties"];
const ENTITY = ["", "Individual", "LLC"];

interface QState {
  goal: string;
  exp: string;
  entity: string;
  name: string;
  email: string;
  phone: string;
  consent: boolean;
}

export default function QualifyPage() {
  const store = useStore();
  const [step, setStep] = useState(1);
  const [deal, setDeal] = useState<DscrInputs>(DEFAULT_DSCR_INPUTS);
  const [q, setQ] = useState<QState>({ goal: "", exp: "", entity: "", name: "", email: "", phone: "", consent: false });
  const [errors, setErrors] = useState<string[]>([]);

  const r = calcDscr(deal);

  function validate(): string[] {
    const e: string[] = [];
    if (step === 1 && !q.goal) e.push("Choose what you want to finance.");
    if (step === 2 && !(deal.addr.trim() && deal.price > 0 && deal.rent > 0))
      e.push("Enter the address, a purchase price and monthly rent.");
    if (step === 3 && !(deal.loan > 0 && deal.rate > 0)) e.push("Enter a loan amount and interest rate above zero.");
    if (step === 4 && !(q.exp && q.entity)) e.push("Select your experience and borrowing entity.");
    if (step === 5) {
      if (!q.name.trim()) e.push("Enter your name.");
      if (!/^\S+@\S+\.\S+$/.test(q.email)) e.push("Enter a valid email like name@example.com.");
      if (!q.consent) e.push("Confirm that you agree to be contacted.");
    }
    return e;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const errs = validate();
    if (errs.length) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    if (step < 6) {
      if (step === 1) logEvent("qualification_started");
      setStep(step + 1);
      return;
    }
    saveScenario({ name: q.name, goal: q.goal, loan: deal.loan, dscr: r.dscr, ltv: r.ltv });
  }

  if (store.savedScenarioId) {
    return (
      <section className="wrap sec" style={{ maxWidth: 640 }}>
        <div className="card">
          <span className="pill">Scenario saved</span>
          <h1 style={{ fontSize: "2rem", marginTop: 10 }}>Your scenario has been saved.</h1>
          <table>
            <tbody>
              <tr><th scope="row">Scenario ID</th><td>{store.savedScenarioId}</td></tr>
              <tr><th scope="row">Loan type</th><td>{q.goal}</td></tr>
              <tr><th scope="row">Estimated loan amount</th><td>{formatCurrency(deal.loan)}</td></tr>
              <tr><th scope="row">DSCR</th><td>{r.dscr.toFixed(2)}x</td></tr>
              <tr><th scope="row">LTV</th><td>{r.ltv.toFixed(1)}%</td></tr>
              <tr><th scope="row">Next step</th><td>A loan advisor reviews your scenario</td></tr>
            </tbody>
          </table>
          <p className="note">Your scenario is saved for this session. This is not an application, approval or commitment to lend.</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link className="btn" href="/portal">Open borrower portal</Link>
            <Link className="btn ghost" href="/staff">See it in the CRM</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="wrap sec" style={{ maxWidth: 640 }}>
      <div
        className="prog"
        role="progressbar"
        aria-label={`Qualification progress: step ${step} of 6`}
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={6}
      >
        {STEPS.map((_, i) => (
          <i key={i} className={i < step ? "on" : ""} />
        ))}
      </div>
      <div className="mut">
        Step {step} of 6 · {STEPS[step - 1]}
      </div>
      <form onSubmit={onSubmit} noValidate>
        {step === 1 && (
          <>
            <h2>What are you looking to finance?</h2>
            {GOALS.map((g) => (
              <label className="opt" key={g}>
                <input type="radio" name="g" value={g} checked={q.goal === g} onChange={() => setQ((s) => ({ ...s, goal: g }))} />
                {g}
              </label>
            ))}
          </>
        )}
        {step === 2 && (
          <>
            <h2>Property information</h2>
            <div className="fields">
              <label>
                Property address
                <input type="text" value={deal.addr} onChange={(e) => setDeal((s) => ({ ...s, addr: e.target.value }))} />
              </label>
              <label>
                Property type
                <select value={deal.type} onChange={(e) => setDeal((s) => ({ ...s, type: e.target.value }))}>
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label>
                Purchase price ($)
                <input type="number" value={deal.price} onChange={(e) => setDeal((s) => ({ ...s, price: parseFloat(e.target.value) || 0 }))} />
              </label>
              <label>
                Monthly rent ($)
                <input type="number" value={deal.rent} onChange={(e) => setDeal((s) => ({ ...s, rent: parseFloat(e.target.value) || 0 }))} />
              </label>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h2>Financing information</h2>
            <div className="fields">
              <label>
                Loan amount ($)
                <input type="number" value={deal.loan} onChange={(e) => setDeal((s) => ({ ...s, loan: parseFloat(e.target.value) || 0 }))} />
              </label>
              <label>
                Interest rate (%)
                <input type="number" value={deal.rate} onChange={(e) => setDeal((s) => ({ ...s, rate: parseFloat(e.target.value) || 0 }))} />
              </label>
              <label>
                Credit score range
                <select value={deal.credit} onChange={(e) => setDeal((s) => ({ ...s, credit: e.target.value }))}>
                  {CREDIT_RANGES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <h2>Investor information</h2>
            <div className="fields">
              <label>
                Investing experience
                <select value={q.exp} onChange={(e) => setQ((s) => ({ ...s, exp: e.target.value }))}>
                  {EXPERIENCE.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
              <label>
                Borrowing entity
                <select value={q.entity} onChange={(e) => setQ((s) => ({ ...s, entity: e.target.value }))}>
                  {ENTITY.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
            </div>
          </>
        )}
        {step === 5 && (
          <>
            <h2>Contact details</h2>
            <div className="fields">
              <label>
                Full name
                <input type="text" value={q.name} onChange={(e) => setQ((s) => ({ ...s, name: e.target.value }))} />
              </label>
              <label>
                Email
                <input type="email" value={q.email} onChange={(e) => setQ((s) => ({ ...s, email: e.target.value }))} />
              </label>
              <label>
                Phone
                <input type="tel" value={q.phone} onChange={(e) => setQ((s) => ({ ...s, phone: e.target.value }))} />
              </label>
            </div>
            <label className="opt" style={{ marginTop: 12 }}>
              <input type="checkbox" checked={q.consent} onChange={(e) => setQ((s) => ({ ...s, consent: e.target.checked }))} />
              I agree to be contacted about my financing enquiry.
            </label>
          </>
        )}
        {step === 6 && (
          <>
            <h2>Review your scenario</h2>
            <table>
              <tbody>
                <tr><th scope="row">Goal</th><td>{q.goal}</td></tr>
                <tr><th scope="row">Property</th><td>{deal.addr} ({deal.type})</td></tr>
                <tr><th scope="row">Loan</th><td>{formatCurrency(deal.loan)} at {deal.rate}%</td></tr>
                <tr><th scope="row">DSCR / LTV</th><td>{r.dscr.toFixed(2)}x / {r.ltv.toFixed(1)}%</td></tr>
                <tr><th scope="row">Investor</th><td>{q.exp} · {q.entity}</td></tr>
                <tr><th scope="row">Contact</th><td>{q.name} · {q.email}</td></tr>
              </tbody>
            </table>
          </>
        )}
        {errors.length > 0 && (
          <div className="err" role="alert">
            {errors.join(" ")}
          </div>
        )}
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button type="button" className="btn ghost" disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>
            Back
          </button>
          <button className="btn" style={{ flex: 1 }}>
            {step === 6 ? "Save scenario" : "Continue"}
          </button>
        </div>
      </form>
    </section>
  );
}
