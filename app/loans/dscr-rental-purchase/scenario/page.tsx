"use client";
import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { formatCurrency } from "@/lib/calculations/dscr";
import { track, FUNNEL_EVENTS } from "@/lib/analytics";
import CrmHandoffCard from "@/components/funnels/CrmHandoffCard";

export default function ScenarioPage() {
  const store = useStore();
  const scenario = store.rpScenario;
  const [applicationStarted, setApplicationStarted] = useState(false);

  if (!scenario) {
    return (
      <section className="wrap sec" style={{ maxWidth: 520, textAlign: "center" }}>
        <div className="card">
          <h1 style={{ fontSize: "1.6rem" }}>No scenario found</h1>
          <p className="mut">
            You don&apos;t have a saved DSCR Rental Purchase scenario in this session yet. Start the
            calculator to build one.
          </p>
          <Link className="btn" href="/loans/dscr-rental-purchase">
            Back to DSCR Rental Purchase
          </Link>
        </div>
      </section>
    );
  }

  const rows: [string, string][] = [
    ["Scenario ID", scenario.id],
    ["Loan purpose", scenario.qualification.purpose],
    ["Property state", scenario.qualification.propertyState],
    ["Property type", scenario.qualification.propertyType],
    ["Purchase price", formatCurrency(scenario.qualification.purchasePrice)],
    ["Loan amount", formatCurrency(scenario.loanAmount)],
    ["DSCR", `${scenario.dscr.toFixed(2)}x`],
    ["LTV", `${scenario.ltv.toFixed(0)}%`],
    ["Lead status", "Demo Lead Created"],
  ];

  return (
    <section className="wrap sec" style={{ maxWidth: 720 }}>
      <span className="pill">Scenario saved</span>
      <h1 style={{ fontSize: "2rem", marginTop: 10 }}>Your investment scenario is ready.</h1>
      <p className="mut">
        Saved {scenario.createdAt} for {scenario.lead.firstName} {scenario.lead.lastName}.
      </p>

      <div className="grid g2">
        <div className="card">
          <table>
            <tbody>
              {rows.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CrmHandoffCard scenario={scenario} />
      </div>

      <p className="note" style={{ marginTop: 16 }}>
        This is not an application, approval or commitment to lend. Figures are illustrative estimates
        only.
      </p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
        <Link
          className="btn"
          href="/loans/dscr-rental-purchase/book"
          onClick={() => track(FUNNEL_EVENTS.APPOINTMENT_STARTED)}
        >
          Book a Call
        </Link>
        <button
          type="button"
          className="btn ghost"
          onClick={() => {
            track(FUNNEL_EVENTS.APPLICATION_STARTED);
            setApplicationStarted(true);
          }}
        >
          Start Application
        </button>
        <Link className="btn ghost" href="/portal/borrower">
          Return to Dashboard
        </Link>
      </div>

      {applicationStarted && (
        <div className="card" style={{ marginTop: 16 }}>
          <span className="pill">Demo only</span>
          <p style={{ marginTop: 8, marginBottom: 0 }}>
            In a production build, this would hand off into a full loan application. That flow isn&apos;t
            built in this portfolio project — the <code>application_started</code> event has been logged
            to the event stream on the{" "}
            <Link href="/staff/marketing">Marketing Dashboard</Link>.
          </p>
        </div>
      )}
    </section>
  );
}
