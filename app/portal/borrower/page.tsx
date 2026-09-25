"use client";
import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { DEMO_BORROWER_DEAL_ID, DEAL_STAGES } from "@/lib/mock-data/deals";
import { formatCurrency } from "@/lib/calculations/dscr";
import { DemoAuthBadge } from "@/components/portal/PortalNav";
import DocumentList from "@/components/portal/DocumentList";
import MessageThread from "@/components/portal/MessageThread";

const TABS = ["Overview", "Application", "Documents", "Messages", "Appointments"] as const;
type Tab = (typeof TABS)[number];

export default function BorrowerPortalPage() {
  const store = useStore();
  const deal = store.deals.find((d) => d.id === DEMO_BORROWER_DEAL_ID);
  const [tab, setTab] = useState<Tab>("Overview");

  if (!deal) {
    return (
      <section className="wrap sec" style={{ maxWidth: 480, textAlign: "center" }}>
        <div className="card">
          <h1 style={{ fontSize: "1.6rem" }}>No active loan file</h1>
          <p className="mut">This demo borrower doesn&apos;t have an active loan file right now.</p>
          <Link className="btn" href="/loans/dscr-rental-purchase">Start a scenario</Link>
        </div>
      </section>
    );
  }

  const stageName = DEAL_STAGES[deal.stage];
  const nextDoc = deal.documents.find((d) => d.status !== "received");

  return (
    <section className="wrap sec">
      <h1 style={{ fontSize: "2rem" }}>Good morning, {deal.borrower.name.split(" ")[0]}</h1>
      <p className="mut">{deal.propertyAddress}, {deal.propertyCity}, {deal.propertyState} · Your application workspace</p>
      <DemoAuthBadge role="Borrower" name={deal.borrower.name} />

      <nav aria-label="Portal section" style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {TABS.map((t) => (
          <button key={t} type="button" className={`btn sm ${tab === t ? "" : "ghost"}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </nav>

      {tab === "Overview" && (
        <>
          <div className="trk card">
            {DEAL_STAGES.slice(1).map((s, i) => (
              <div key={s} className={i + 1 < deal.stage ? "done" : i + 1 === deal.stage ? "cur" : ""}>
                {s}
              </div>
            ))}
          </div>
          <div className="grid g4" style={{ marginTop: 16 }}>
            <div className="card stat"><b>{stageName}</b><span>Loan status</span></div>
            <div className="card stat"><b>{deal.loanOfficer}</b><span>Loan officer</span></div>
            <div className="card stat"><b>{deal.estimatedClosing}</b><span>Estimated closing</span></div>
            <div className="card stat"><b>{formatCurrency(deal.loanAmount)}</b><span>Loan amount</span></div>
          </div>
          {nextDoc && (
            <div className="card" style={{ marginTop: 16, borderColor: "var(--acc)" }}>
              <span className="pill">Next action</span>
              <h3 style={{ marginTop: 8 }}>Upload {nextDoc.label}</h3>
              <p className="mut">Your file is waiting on this document to keep moving.</p>
              <button className="btn sm" onClick={() => setTab("Documents")}>Complete This Step</button>
            </div>
          )}
          <div className="grid g2" style={{ marginTop: 16 }}>
            <div className="card">
              <h3>Loan summary</h3>
              <table>
                <tbody>
                  <tr><th scope="row">Loan type</th><td>DSCR {deal.purpose}</td></tr>
                  <tr><th scope="row">Purchase price</th><td>{formatCurrency(deal.purchasePrice)}</td></tr>
                  <tr><th scope="row">Loan amount</th><td>{formatCurrency(deal.loanAmount)}</td></tr>
                  <tr><th scope="row">DSCR / LTV</th><td>{deal.dscr.toFixed(2)}x / {deal.ltv.toFixed(0)}%</td></tr>
                </tbody>
              </table>
            </div>
            <div className="card">
              <h3>Loan officer</h3>
              <p className="mut" style={{ marginBottom: 0 }}>{deal.loanOfficer} is your dedicated loan advisor for this file.</p>
            </div>
          </div>
        </>
      )}

      {tab === "Application" && (
        <div className="card">
          <h3>Application checklist</h3>
          {deal.applicationChecklist.map((c) => (
            <div key={c.label} style={{ padding: "8px 0", borderBottom: "1px solid var(--line)" }}>
              {c.done ? "✓" : "○"} {c.label}
            </div>
          ))}
        </div>
      )}

      {tab === "Documents" && <DocumentList dealId={deal.id} documents={deal.documents} />}

      {tab === "Messages" && (
        <MessageThread dealId={deal.id} messages={deal.messages} asRole="Borrower" asName={deal.borrower.name} />
      )}

      {tab === "Appointments" && (
        <div className="card">
          <h3>Upcoming appointment</h3>
          {deal.appointment ? (
            <table>
              <tbody>
                <tr><th scope="row">Type</th><td>{deal.appointment.type}</td></tr>
                <tr><th scope="row">Date</th><td>{deal.appointment.date}</td></tr>
                <tr><th scope="row">Advisor</th><td>{deal.appointment.advisor}</td></tr>
              </tbody>
            </table>
          ) : (
            <p className="mut">No upcoming appointment scheduled.</p>
          )}
          <Link className="btn sm ghost" style={{ marginTop: 10 }} href="/loans/dscr-rental-purchase/book">
            Book a call
          </Link>
        </div>
      )}
    </section>
  );
}
