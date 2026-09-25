"use client";
import { useState } from "react";
import { calcArv, DEFAULT_ARV_INPUTS, ArvInputs, formatCurrency } from "@/lib/calculations/dscr";
import { DISC } from "@/lib/content/disclosures";

const FIELDS: [keyof ArvInputs, string][] = [
  ["purchasePrice", "Purchase price"],
  ["renovation", "Renovation"],
  ["closingCosts", "Closing costs"],
  ["estimatedArv", "Estimated ARV"],
  ["loanAmount", "Loan amount"],
];

export default function ArvCalculator() {
  const [v, setV] = useState<ArvInputs>(DEFAULT_ARV_INPUTS);
  const r = calcArv(v);

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
        <h3>Estimates</h3>
        <div className="grid g3">
          <div className="stat">
            <b>{formatCurrency(r.totalProjectCost)}</b>
            <span>Total project cost</span>
          </div>
          <div className="stat">
            <b>{formatCurrency(r.estimatedEquity)}</b>
            <span>Estimated equity</span>
          </div>
          <div className="stat">
            <b>{r.ltvAtArv.toFixed(1)}%</b>
            <span>LTV at ARV</span>
          </div>
        </div>
        <p className="note">{DISC}</p>
      </div>
    </div>
  );
}
