"use client";
import { useState } from "react";
import Link from "next/link";
import { calcLtc, DEFAULT_LTC_INPUTS, LtcInputs, formatCurrency } from "@/lib/calculations/dscr";
import { DISC } from "@/lib/content/disclosures";

const FIELDS: [keyof LtcInputs, string][] = [
  ["purchasePrice", "Purchase price ($)"],
  ["renovationBudget", "Renovation budget ($)"],
  ["loanAmount", "Requested loan amount ($)"],
];

export default function LtcCalculator() {
  const [v, setV] = useState<LtcInputs>(DEFAULT_LTC_INPUTS);
  const r = calcLtc(v);

  return (
    <div className="grid g2">
      <div className="card">
        <div className="fields">
          {FIELDS.map(([k, label]) => (
            <label key={k}>
              {label}
              <input
                type="number"
                inputMode="decimal"
                value={v[k]}
                onChange={(e) => setV((s) => ({ ...s, [k]: parseFloat(e.target.value) || 0 }))}
              />
            </label>
          ))}
        </div>
      </div>
      <div className="card" aria-live="polite">
        <h3>Estimate</h3>
        <div className="grid g3">
          <div className="stat">
            <b>{formatCurrency(r.totalCost)}</b>
            <span>Total project cost</span>
          </div>
          <div className="stat">
            <b>{r.ltc.toFixed(1)}%</b>
            <span>Loan-to-cost</span>
          </div>
        </div>
        <p className="note">{DISC}</p>
        <Link className="btn" href="/qualify">
          Continue to Pre-Qualify
        </Link>
      </div>
    </div>
  );
}
