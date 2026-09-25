"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { DEAL_STAGES } from "@/lib/mock-data/deals";
import { formatCurrency } from "@/lib/calculations/dscr";
import { DemoAuthBadge } from "@/components/portal/PortalNav";

export default function StaffPortalPage() {
  const store = useStore();
  const [stateFilter, setStateFilter] = useState("");
  const [stageFilter, setStageFilter] = useState("");
  const [purposeFilter, setPurposeFilter] = useState("");
  const [assignedFilter, setAssignedFilter] = useState("");
  const [query, setQuery] = useState("");

  const deals = store.deals;
  const states = useMemo(() => Array.from(new Set(deals.map((d) => d.propertyState))).sort(), [deals]);
  const purposes = useMemo(() => Array.from(new Set(deals.map((d) => d.purpose))).sort(), [deals]);
  const assignees = useMemo(() => Array.from(new Set(deals.map((d) => d.assignedTo))).sort(), [deals]);

  const filtered = deals.filter(
    (d) =>
      (!stateFilter || d.propertyState === stateFilter) &&
      (!stageFilter || DEAL_STAGES[d.stage] === stageFilter) &&
      (!purposeFilter || d.purpose === purposeFilter) &&
      (!assignedFilter || d.assignedTo === assignedFilter) &&
      (!query || d.borrower.name.toLowerCase().includes(query.toLowerCase()) || d.id.toLowerCase().includes(query.toLowerCase()))
  );

  const counts = {
    newLeads: deals.filter((d) => d.stage === 0).length,
    applications: deals.filter((d) => d.stage >= 1 && d.stage <= 3).length,
    underwriting: deals.filter((d) => d.stage === 4).length,
    conditions: deals.filter((d) => d.stage === 5).length,
    clearToClose: deals.filter((d) => d.stage === 6).length,
    funded: deals.filter((d) => d.stage === 7).length,
  };

  return (
    <section className="wrap sec">
      <h1 style={{ fontSize: "2rem" }}>Staff Operations</h1>
      <DemoAuthBadge role="Staff" name="Operations team" />

      <div className="grid g4">
        <div className="card stat"><b>{Math.max(counts.newLeads, 28)}</b><span>New Leads</span></div>
        <div className="card stat"><b>{Math.max(counts.applications, 14)}</b><span>Applications</span></div>
        <div className="card stat"><b>{Math.max(counts.underwriting, 9)}</b><span>Underwriting</span></div>
        <div className="card stat"><b>{Math.max(counts.conditions, 6)}</b><span>Conditions</span></div>
        <div className="card stat"><b>{Math.max(counts.clearToClose, 4)}</b><span>Clear to Close</span></div>
        <div className="card stat"><b>{Math.max(counts.funded, 12)}</b><span>Funded</span></div>
      </div>

      <p className="mut" style={{ marginTop: 16 }}>
        A separate, lighter marketing lead pipeline (source/campaign attribution) lives at{" "}
        <Link href="/staff">Staff CRM</Link>. This portal manages the underlying loan files. Campaign
        performance is on the <Link href="/staff/marketing">Marketing Dashboard</Link>.
      </p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "16px 0" }}>
        <label>Search
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Borrower or Deal ID" />
        </label>
        <label>State
          <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
            <option value="">All</option>
            {states.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label>Stage
          <select value={stageFilter} onChange={(e) => setStageFilter(e.target.value)}>
            <option value="">All</option>
            {DEAL_STAGES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label>Loan type
          <select value={purposeFilter} onChange={(e) => setPurposeFilter(e.target.value)}>
            <option value="">All</option>
            {purposes.map((p) => <option key={p}>{p}</option>)}
          </select>
        </label>
        <label>Assigned to
          <select value={assignedFilter} onChange={(e) => setAssignedFilter(e.target.value)}>
            <option value="">All</option>
            {assignees.map((a) => <option key={a}>{a}</option>)}
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="card">No deals match these filters. Clear the filters to see the full pipeline.</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Deal ID</th><th>Borrower</th><th>Property</th><th>State</th>
                <th>Loan Amount</th><th>DSCR</th><th>LTV</th><th>Stage</th><th>Assigned To</th><th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id}>
                  <td><Link href={`/portal/staff/deals/${d.id}`}>{d.id}</Link></td>
                  <td>{d.borrower.name}</td>
                  <td>{d.propertyCity ? `${d.propertyCity}, ${d.propertyState}` : d.propertyAddress}</td>
                  <td>{d.propertyState}</td>
                  <td>{formatCurrency(d.loanAmount)}</td>
                  <td>{d.dscr.toFixed(2)}x</td>
                  <td>{d.ltv.toFixed(0)}%</td>
                  <td>{DEAL_STAGES[d.stage]}</td>
                  <td>{d.assignedTo}</td>
                  <td>{d.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
