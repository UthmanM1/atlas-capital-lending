"use client";
import { useState } from "react";
import { calcSimpleLtv } from "@/lib/calculations/dscr";
import { DISC } from "@/lib/content/disclosures";

export default function LtvCalculator() {
  const [value, setValue] = useState(400000);
  const [loan, setLoan] = useState(300000);
  const ltv = calcSimpleLtv({ value, loan });

  return (
    <div className="grid g2">
      <div className="card">
        <div className="fields">
          <label>
            Property value
            <input type="number" inputMode="decimal" value={value} onChange={(e) => setValue(parseFloat(e.target.value) || 0)} />
          </label>
          <label>
            Loan amount
            <input type="number" inputMode="decimal" value={loan} onChange={(e) => setLoan(parseFloat(e.target.value) || 0)} />
          </label>
        </div>
      </div>
      <div className="card" aria-live="polite">
        <h3>Estimate</h3>
        <div className="stat">
          <b>{ltv.toFixed(1)}%</b>
          <span>LTV</span>
        </div>
        <p className="note">{DISC}</p>
      </div>
    </div>
  );
}
