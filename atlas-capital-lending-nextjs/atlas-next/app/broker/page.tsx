"use client";
import { useState } from "react";
import Link from "next/link";
import { submitBrokerDeal, useStore } from "@/lib/store";

const DEAL_STATUS: [string, string, string, string, string, string, string][] = [
  ["D. Okafor", "Tampa, FL", "Purchase", "$318,750", "1.34x", "Under Review", "Insurance page"],
  ["T. Whitcomb", "Pittsburgh, PA", "Portfolio", "$2,100,000", "1.27x", "Underwriting", "None"],
  ["S. Marin", "Brooklyn, NY", "Rate & Term", "$389,000", "1.31x", "Approved", "Closing documents"],
];

export default function BrokerPage() {
  const store = useStore();
  const [toast, setToast] = useState<string | null>(null);

  function submit() {
    submitBrokerDeal();
    setToast("Deal submitted successfully");
    setTimeout(() => setToast(null), 2400);
  }

  const sampleDeals = store.leads.filter((l) => l.name === "Broker sample deal");
  const rows = [
    ...sampleDeals.map((l) => [l.name, "Sample property", l.type, `$${l.amount.toLocaleString()}`, `${l.dscr}x`, "Lead", "Scenario review"]),
    ...DEAL_STATUS,
  ];

  return (
    <section className="wrap sec">
      <h1 style={{ fontSize: "2rem" }}>Broker Portal</h1>
      <div className="grid g4">
        <div className="card stat"><b>11</b><span>Active deals</span></div>
        <div className="card stat"><b>{store.brokerPipeline[1][1]}</b><span>Submitted this month</span></div>
        <div className="card stat"><b>5</b><span>Funded</span></div>
        <div className="card stat"><b>$3.2M</b><span>Referral volume</span></div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Deal pipeline</h3>
        <div className="grid g4">
          {store.brokerPipeline.map(([label, count]) => (
            <div className="stat" key={label}>
              <b>{count}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid g2" style={{ marginTop: 16 }}>
        <div className="card">
          <h3>Submit a deal</h3>
          <button className="btn" onClick={submit}>
            Submit sample deal
          </button>
        </div>
        <div className="card">
          <h3>Account manager</h3>
          <p>
            Jordan Kim
            <br />
            <span className="mut">Your dedicated account manager</span>
          </p>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Deal status &amp; outstanding documents</h3>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Borrower</th>
                <th>Property</th>
                <th>Loan type</th>
                <th>Amount</th>
                <th>DSCR</th>
                <th>Stage</th>
                <th>Outstanding</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid g2" style={{ marginTop: 16 }}>
        <div className="card">
          <h3>Referrals</h3>
          <p className="mut">Submissions flow into the staff CRM as leads with the Broker source.</p>
          <Link href="/staff">View in CRM</Link>
        </div>
        <div className="card">
          <h3>Recent activity</h3>
          <p className="mut">
            {sampleDeals.length > 0 && (
              <>
                Sample deal submitted to the CRM.
                <br />
              </>
            )}
            S. Marin moved to Approved.
            <br />
            T. Whitcomb entered Underwriting.
          </p>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </section>
  );
}
