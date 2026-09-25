"use client";
import { useState } from "react";
import Link from "next/link";
import { calcCashOut, DEFAULT_CASHOUT_INPUTS, CashOutInputs, formatCurrency } from "@/lib/calculations/dscr";
import { DISC } from "@/lib/content/disclosures";
import Gauge from "./Gauge";

const FIELDS: [keyof CashOutInputs, string][] = [
  ["val", "Property value"],
  ["bal", "Current loan balance"],
  ["rent", "Monthly rent"],
  ["cash", "Desired cash-out"],
  ["rate", "Interest rate (%)"],
  ["oth", "Taxes, insurance & HOA ($/mo, assumption)"],
];

export default function CashOutCalculator({ ctaLabel = "Explore My Options", ctaHref = "/qualify" }) {
  const [x, setX] = useState<CashOutInputs>(DEFAULT_CASHOUT_INPUTS);
  const r = calcCashOut(x);

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
                value={x[k]}
                onChange={(e) => setX((s) => ({ ...s, [k]: parseFloat(e.target.value) || 0 }))}
              />
            </label>
          ))}
        </div>
      </div>
      <div className="card" aria-live="polite">
        <h3>Estimates</h3>
        <div style={{ textAlign: "center" }}>
          <Gauge dscr={r.dscr} />
        </div>
        <div className="grid g3">
          <div className="stat">
            <b>{r.ltv.toFixed(1)}%</b>
            <span>LTV</span>
          </div>
          <div className="stat">
            <b>{formatCurrency(r.equity)}</b>
            <span>Equity at 75% LTV</span>
          </div>
          <div className="stat">
            <b>{formatCurrency(r.loan)}</b>
            <span>Est. loan</span>
          </div>
        </div>
        {r.overLtv && (
          <p className="err" role="alert">
            Above 75% LTV in this scenario. Lower the cash-out amount.
          </p>
        )}
        <p className="note">{DISC} Uses your taxes/insurance/HOA assumption.</p>
        <Link className="btn" href={ctaHref}>
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}
