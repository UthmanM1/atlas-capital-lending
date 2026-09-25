"use client";
import { useState } from "react";
import Link from "next/link";
import {
  calcDscr,
  DEFAULT_DSCR_INPUTS,
  DscrInputs,
  formatCurrency,
} from "@/lib/calculations/dscr";
import { DISC } from "@/lib/content/disclosures";
import Gauge from "./Gauge";

const PROPERTY_TYPES = ["Single family", "2–4 unit", "Condo", "Townhome"];
const LOAN_TERMS = [30, 25, 20, 15];
const AMORT_OPTIONS = ["Fully amortizing", "Interest-only"];
const CREDIT_RANGES = ["760+", "720–739", "680–719", "640–679"];

function Field({
  label,
  value,
  onChange,
  type = "number",
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label>
      {label}
      <input
        type={type}
        inputMode={type === "number" ? "decimal" : undefined}
        step={type === "number" ? "any" : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string | number;
  options: (string | number)[];
  onChange: (v: string) => void;
}) {
  return (
    <label>
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

export default function DscrCalculator({ ctaHref = "/qualify" }: { ctaHref?: string }) {
  const [v, setV] = useState<DscrInputs>(DEFAULT_DSCR_INPUTS);
  const set = <K extends keyof DscrInputs>(k: K, val: string) =>
    setV((s) => ({
      ...s,
      [k]: typeof s[k] === "number" ? parseFloat(val) || 0 : val,
    }));

  const bad = !(v.price > 0 && v.rent > 0 && v.loan > 0);
  const r = calcDscr(v);

  return (
    <div className="grid g2">
      <div className="card">
        <h3>Deal inputs</h3>
        <div className="fields">
          <Field label="Property address" value={v.addr} onChange={(x) => set("addr", x)} type="text" />
          <Select label="Property type" value={v.type} options={PROPERTY_TYPES} onChange={(x) => set("type", x)} />
          <Field label="Purchase price ($)" value={v.price} onChange={(x) => set("price", x)} />
          <Field label="Estimated value ($)" value={v.value} onChange={(x) => set("value", x)} />
          <Field label="Monthly rent ($)" value={v.rent} onChange={(x) => set("rent", x)} />
          <Field label="Annual taxes ($)" value={v.tax} onChange={(x) => set("tax", x)} />
          <Field label="Annual insurance ($)" value={v.ins} onChange={(x) => set("ins", x)} />
          <Field label="Monthly HOA ($)" value={v.hoa} onChange={(x) => set("hoa", x)} />
          <Field label="Vacancy (%)" value={v.vac} onChange={(x) => set("vac", x)} />
          <Field label="Loan amount ($)" value={v.loan} onChange={(x) => set("loan", x)} />
          <Field label="Interest rate (%)" value={v.rate} onChange={(x) => set("rate", x)} />
          <Select label="Loan term (yrs)" value={v.term} options={LOAN_TERMS} onChange={(x) => set("term", x)} />
          <Select label="Amortization" value={v.amort} options={AMORT_OPTIONS} onChange={(x) => set("amort", x)} />
          <Select label="Credit score range" value={v.credit} options={CREDIT_RANGES} onChange={(x) => set("credit", x)} />
        </div>
        <details className="note" open style={{ marginTop: 12 }}>
          <summary>
            <b>Assumptions</b>
          </summary>
          <div className="fields" style={{ marginTop: 8 }}>
            <Field label="Closing costs (% of price)" value={v.cc} onChange={(x) => set("cc", x)} />
          </div>
        </details>
      </div>

      <div className="card" aria-live="polite">
        {bad ? (
          <p className="err" role="alert">
            Enter a purchase price, monthly rent and loan amount above zero to see results.
          </p>
        ) : (
          <>
            <h3>Estimated results</h3>
            <div style={{ textAlign: "center" }}>
              <Gauge dscr={r.dscr} />
              <div className="mut">DSCR (1.25x or higher is shown as strong here; program minimums vary)</div>
            </div>
            <div className="grid g4" style={{ margin: "12px 0" }}>
              <div className="stat">
                <b>{r.ltv.toFixed(1)}%</b>
                <span>LTV</span>
              </div>
              <div className="stat">
                <b>{formatCurrency(r.pitia)}</b>
                <span>Monthly PITIA</span>
              </div>
              <div className="stat">
                <b>{formatCurrency(r.noi)}</b>
                <span>Annual NOI</span>
              </div>
              <div className="stat">
                <b>{formatCurrency(r.cf)}</b>
                <span>Monthly cash flow</span>
              </div>
              <div className="stat">
                <b>{formatCurrency(r.cash)}</b>
                <span>Est. cash required</span>
              </div>
              <div className="stat">
                <b>{formatCurrency(r.pi)}</b>
                <span>P&amp;I</span>
              </div>
            </div>
            <details>
              <summary>Formulas used</summary>
              <p className="mut">
                P&amp;I = L·r/(1−(1+r)<sup>−n</sup>) (interest-only: L·r). PITIA = P&amp;I + taxes/12 +
                insurance/12 + HOA. Effective rent = rent × (1−vacancy). DSCR = effective rent ÷ PITIA.
                NOI = effective rent×12 − taxes − insurance − HOA×12. LTV = loan ÷ lower of price or
                value. Cash required = price − loan + the closing-cost assumption.
              </p>
            </details>
            <p className="note">{DISC}</p>
            <Link className="btn" href={ctaHref}>
              Continue to Pre-Qualify
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
