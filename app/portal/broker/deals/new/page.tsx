"use client";
import { useState } from "react";
import Link from "next/link";
import { addDeal, logEvent } from "@/lib/store";
import { calcDscr, formatCurrency } from "@/lib/calculations/dscr";
import { US_STATE_ABBR } from "@/lib/content/us-states";
import { Deal, DEMO_BROKER } from "@/lib/mock-data/deals";
import { DemoAuthBadge } from "@/components/portal/PortalNav";

const PROPERTY_TYPES = ["Single family", "2–4 unit", "Condo", "Townhome"];
const CREDIT_RANGES = ["760+", "720–739", "680–719", "640–679"];
const PURPOSES = ["Purchase", "Cash-Out", "Rate & Term"];
const ENTITY_TYPES = ["Individual", "LLC"];

interface FormState {
  borrowerName: string;
  borrowerEmail: string;
  propertyAddress: string;
  propertyState: string;
  propertyType: string;
  purchasePrice: number;
  loanAmount: number;
  rent: number;
  creditRange: string;
  purpose: string;
  entityType: string;
  notes: string;
}

const INITIAL: FormState = {
  borrowerName: "",
  borrowerEmail: "",
  propertyAddress: "",
  propertyState: "",
  propertyType: "Single family",
  purchasePrice: 400000,
  loanAmount: 300000,
  rent: 2900,
  creditRange: "720–739",
  purpose: "Purchase",
  entityType: "LLC",
  notes: "",
};

export default function NewDealPage() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<Deal | null>(null);
  const [draftSaved, setDraftSaved] = useState(false);

  const calc = calcDscr({
    addr: form.propertyAddress,
    type: form.propertyType,
    price: form.purchasePrice,
    value: form.purchasePrice,
    rent: form.rent,
    tax: form.purchasePrice * 0.012,
    ins: form.purchasePrice * 0.004,
    hoa: 0,
    vac: 5,
    loan: form.loanAmount,
    rate: 7.25,
    term: 30,
    amort: "Fully amortizing",
    credit: form.creditRange,
    cc: 3,
  });

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  function validate(): string[] {
    const e: string[] = [];
    if (!form.borrowerName.trim()) e.push("Enter the borrower's name.");
    if (!/^\S+@\S+\.\S+$/.test(form.borrowerEmail)) e.push("Enter a valid borrower email.");
    if (!form.propertyAddress.trim()) e.push("Enter the property address.");
    if (!form.propertyState) e.push("Choose the property state.");
    if (!(form.purchasePrice > 0)) e.push("Enter a purchase price above zero.");
    if (!(form.loanAmount > 0)) e.push("Enter a loan amount above zero.");
    return e;
  }

  function buildDeal(status: "Draft" | "Submitted"): Deal {
    const id = "ATLAS-" + Math.floor(5000 + Math.random() * 4000);
    return {
      id,
      borrower: { id: "demo-" + id, name: form.borrowerName, email: form.borrowerEmail, phone: "—" },
      broker: DEMO_BROKER,
      propertyAddress: form.propertyAddress,
      propertyCity: "",
      propertyState: form.propertyState,
      propertyType: form.propertyType,
      purpose: form.purpose,
      purchasePrice: form.purchasePrice,
      loanAmount: form.loanAmount,
      monthlyRent: form.rent,
      rate: 7.25,
      dscr: +calc.dscr.toFixed(2),
      ltv: +calc.ltv.toFixed(1),
      creditRange: form.creditRange,
      entityType: form.entityType,
      stage: status === "Draft" ? 1 : 2,
      assignedTo: "Unassigned",
      lastUpdated: "Just now",
      loanOfficer: "Unassigned",
      estimatedClosing: "TBD",
      brokerNotes: form.notes || undefined,
      applicationChecklist: [
        { label: "Personal information", done: true },
        { label: "Property information", done: true },
        { label: "Loan request", done: true },
        { label: "Financial information", done: false },
        { label: "Final review", done: false },
      ],
      documents: [
        { id: "d1", label: "Driver's license", status: "pending", required: true, date: null },
        { id: "d2", label: "Bank statements", status: "pending", required: true, date: null },
        { id: "d3", label: "Purchase contract", status: "pending", required: true, date: null },
        { id: "d4", label: "Lease agreement", status: "pending", required: false, date: null },
        { id: "d5", label: "Insurance declaration", status: "pending", required: true, date: null },
      ],
      conditions: [],
      messages: [],
      activity: [
        { id: "a1", label: "Lead created", date: "Just now", actor: DEMO_BROKER.name },
        ...(status === "Submitted" ? [{ id: "a2", label: "Submitted to underwriting", date: "Just now", actor: DEMO_BROKER.name }] : []),
      ],
    };
  }

  function saveDraft(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (errs.length) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    addDeal(buildDeal("Draft"));
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2600);
  }

  function submitDeal(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (errs.length) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    const deal = buildDeal("Submitted");
    addDeal(deal);
    logEvent("lead_submitted", "Broker portal — " + deal.id);
    setSubmitted(deal);
  }

  if (submitted) {
    return (
      <section className="wrap sec" style={{ maxWidth: 520 }}>
        <div className="card">
          <span className="pill">Deal submitted</span>
          <h1 style={{ fontSize: "1.8rem", marginTop: 10 }}>{submitted.id}</h1>
          <table>
            <tbody>
              <tr><th scope="row">Status</th><td>Submitted</td></tr>
              <tr><th scope="row">Borrower</th><td>{submitted.borrower.name}</td></tr>
              <tr><th scope="row">Loan amount</th><td>{formatCurrency(submitted.loanAmount)}</td></tr>
              <tr><th scope="row">DSCR / LTV</th><td>{submitted.dscr}x / {submitted.ltv}%</td></tr>
            </tbody>
          </table>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
            <Link className="btn" href={`/portal/broker/deals/${submitted.id}`}>View deal</Link>
            <Link className="btn ghost" href="/portal/broker">Back to pipeline</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="wrap sec" style={{ maxWidth: 760 }}>
      <h1 style={{ fontSize: "2rem" }}>Submit a Deal</h1>
      <DemoAuthBadge role="Broker" name={DEMO_BROKER.name} />
      <div className="grid g2">
        <div className="card">
          <h3>Deal information</h3>
          <div className="fields">
            <label>Borrower name
              <input value={form.borrowerName} onChange={(e) => set("borrowerName", e.target.value)} />
            </label>
            <label>Borrower email
              <input type="email" value={form.borrowerEmail} onChange={(e) => set("borrowerEmail", e.target.value)} />
            </label>
            <label>Property address
              <input value={form.propertyAddress} onChange={(e) => set("propertyAddress", e.target.value)} />
            </label>
            <label>Property state
              <select value={form.propertyState} onChange={(e) => set("propertyState", e.target.value)}>
                <option value="">Select a state</option>
                {US_STATE_ABBR.map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
            <label>Property type
              <select value={form.propertyType} onChange={(e) => set("propertyType", e.target.value)}>
                {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label>Purchase price ($)
              <input type="number" value={form.purchasePrice} onChange={(e) => set("purchasePrice", parseFloat(e.target.value) || 0)} />
            </label>
            <label>Loan amount ($)
              <input type="number" value={form.loanAmount} onChange={(e) => set("loanAmount", parseFloat(e.target.value) || 0)} />
            </label>
            <label>Estimated rent ($/mo)
              <input type="number" value={form.rent} onChange={(e) => set("rent", parseFloat(e.target.value) || 0)} />
            </label>
            <label>Credit score range
              <select value={form.creditRange} onChange={(e) => set("creditRange", e.target.value)}>
                {CREDIT_RANGES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label>Loan purpose
              <select value={form.purpose} onChange={(e) => set("purpose", e.target.value)}>
                {PURPOSES.map((p) => <option key={p}>{p}</option>)}
              </select>
            </label>
            <label>Entity type
              <select value={form.entityType} onChange={(e) => set("entityType", e.target.value)}>
                {ENTITY_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label>Broker notes
              <textarea rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)} />
            </label>
          </div>
        </div>
        <div className="card" aria-live="polite">
          <h3>Estimated results</h3>
          <div className="grid g2">
            <div className="stat"><b>{calc.ltv.toFixed(1)}%</b><span>LTV</span></div>
            <div className="stat"><b>{calc.dscr.toFixed(2)}x</b><span>DSCR</span></div>
          </div>
          <p className="note">
            Estimated using a default 7.25% / 30-year assumption and approximate tax/insurance — illustrative
            only, not a loan offer or commitment.
          </p>
          {errors.length > 0 && (
            <div className="err" role="alert">{errors.join(" ")}</div>
          )}
          {draftSaved && <p className="note">Draft saved to the pipeline.</p>}
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button type="button" className="btn ghost" onClick={saveDraft}>Save Draft</button>
            <button type="button" className="btn" style={{ flex: 1 }} onClick={submitDeal}>Submit Deal</button>
          </div>
        </div>
      </div>
    </section>
  );
}
