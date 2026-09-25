"use client";
import { useState } from "react";
import Link from "next/link";
import { PIPELINE_STAGES, LOAN_TYPES } from "@/lib/mock-data/crm";
import { CONVERSION_JOURNEY } from "@/lib/content/case-study";
import { advanceLeadStage, useStore } from "@/lib/store";

function LeadDetail({ leadId }: { leadId: string }) {
  const store = useStore();
  const lead = store.leads.find((l) => l.id === leadId);
  if (!lead) return null;
  const stepsDone = [4, 4, 5, 5, 6, 6, 7][lead.stage];
  const journey = ["Ad", "Landing Page", "Qualification", "CRM", "Application", "Underwriting", "Funded"];
  const isGoogle = lead.source === "Google";

  const rows: [string, string][] = [
    ["Source", lead.source],
    ["Medium", isGoogle ? "CPC" : lead.source === "Broker" ? "Referral" : "Organic / direct"],
    ["Campaign", lead.campaign],
    ["Keyword", isGoogle ? "dscr rental loan" : "—"],
    ["Landing page", isGoogle ? "/loans/rental-purchase" : "—"],
    ["Device", "Mobile"],
    ["Loan type", lead.type],
    ["Amount", `$${lead.amount.toLocaleString()}`],
    ["DSCR / LTV", `${lead.dscr}x / ${lead.ltv}%`],
    ["State", lead.state],
    ["Advisor", lead.rep],
  ];

  return (
    <div className="card pane" style={{ marginTop: 16 }}>
      <h3>
        {lead.name} <span className="pill">{PIPELINE_STAGES[lead.stage]}</span>
      </h3>
      <div className="grid g2">
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
        <div>
          {journey.map((j, i) => (
            <div key={j} style={{ padding: "5px 0" }}>
              {i < stepsDone ? "✓" : "○"} {j}
            </div>
          ))}
          <button className="btn sm" onClick={() => advanceLeadStage(lead.id)}>
            Advance stage
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StaffCrmPage() {
  const store = useStore();
  const [typeFilter, setTypeFilter] = useState("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const leads = store.leads.filter(
    (l) => (!typeFilter || l.type === typeFilter) && (!query || l.name.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <section className="wrap sec">
      <h1 style={{ fontSize: "2rem" }}>Staff CRM</h1>

      <div className="card" style={{ marginBottom: 14 }}>
        <b>Conversion journey</b>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
          {CONVERSION_JOURNEY.map((step, i) => (
            <span key={step} className="mut" style={{ fontSize: 13 }}>
              {step}
              {i < CONVERSION_JOURNEY.length - 1 ? " →" : ""}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
        <label>
          Loan type
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="">All</option>
            {LOAN_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label>
          Search
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Name" />
        </label>
        <Link className="btn ghost" style={{ marginTop: 20 }} href="/staff/marketing">
          Marketing dashboard
        </Link>
      </div>

      {leads.length === 0 && <div className="card">No leads match these filters. Clear the filters to see the pipeline.</div>}

      <div className="kan">
        {PIPELINE_STAGES.map((stage, i) => (
          <div className="col" key={stage}>
            <h4>
              {stage} ({leads.filter((l) => l.stage === i).length})
            </h4>
            {leads
              .filter((l) => l.stage === i)
              .map((l) => (
                <button
                  key={l.id}
                  className="lead"
                  aria-pressed={l.id === selected}
                  onClick={() => setSelected(l.id)}
                >
                  <b>{l.name}</b>
                  <br />
                  {l.type} · ${l.amount.toLocaleString()}
                  <br />
                  {l.dscr}x · {l.ltv}% · {l.state}
                  <br />
                  <span className="mut">
                    {l.source} · {l.rep} · {l.activity}
                  </span>
                </button>
              ))}
          </div>
        ))}
      </div>

      {selected ? <LeadDetail leadId={selected} /> : <p className="mut">Select a lead to open the record.</p>}
    </section>
  );
}
