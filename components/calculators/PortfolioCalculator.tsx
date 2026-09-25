"use client";
import { useState } from "react";
import Link from "next/link";
import {
  calcPortfolio,
  DEFAULT_PORTFOLIO_INPUTS,
  PortfolioInputs,
  formatCurrency,
} from "@/lib/calculations/dscr";
import { DISC } from "@/lib/content/disclosures";

const FIELDS: [keyof PortfolioInputs, string][] = [
  ["n", "Number of properties"],
  ["val", "Portfolio value"],
  ["debt", "Existing debt"],
  ["inc", "Annual rental income"],
  ["dscr", "Average DSCR"],
  ["acq", "Planned acquisitions"],
];

export default function PortfolioCalculator() {
  const [p, setP] = useState<PortfolioInputs>(DEFAULT_PORTFOLIO_INPUTS);
  const r = calcPortfolio(p);

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
                value={p[k]}
                onChange={(e) => setP((s) => ({ ...s, [k]: parseFloat(e.target.value) || 0 }))}
              />
            </label>
          ))}
        </div>
      </div>
      <div className="card" aria-live="polite">
        <h3>Portfolio metrics</h3>
        <div className="grid g3">
          <div className="stat">
            <b>{r.ltv.toFixed(1)}%</b>
            <span>Portfolio LTV</span>
          </div>
          <div className="stat">
            <b>{formatCurrency(r.equity)}</b>
            <span>Equity</span>
          </div>
          <div className="stat">
            <b>{formatCurrency(r.incomePerProperty)}</b>
            <span>Income / property</span>
          </div>
          <div className="stat">
            <b>{r.avgDscr.toFixed(2)}x</b>
            <span>Avg DSCR</span>
          </div>
          <div className="stat">
            <b>{r.propertiesAfterPlan}</b>
            <span>Properties after plan</span>
          </div>
        </div>
        <p className="note">{DISC}</p>
        <Link className="btn" href="/qualify">
          Send to a Loan Advisor
        </Link>
      </div>
    </div>
  );
}
