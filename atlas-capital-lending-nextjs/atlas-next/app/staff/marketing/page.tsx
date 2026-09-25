"use client";
import { CAMPAIGNS, totalMarketing } from "@/lib/mock-data/marketing";
import { CONVERSION_JOURNEY } from "@/lib/content/case-study";
import { formatCurrency } from "@/lib/calculations/dscr";
import { useStore } from "@/lib/store";

const FUNNEL: [string, number][] = [
  ["Clicks", 1000],
  ["Leads", 318],
  ["Qualified", 126],
  ["Applications", 58],
  ["Funded", 19],
];
const DEVICES: [string, number][] = [
  ["Mobile", 68],
  ["Desktop", 27],
  ["Tablet", 5],
];
const SOURCES: [string, number, number][] = [
  ["Google Search", 186, 11],
  ["Meta", 54, 2],
  ["Organic", 48, 3],
  ["Broker", 30, 3],
];
const KEYWORDS: [string, number, number][] = [
  ["dscr rental loan", 412, 131],
  ["dscr cash out refinance", 233, 74],
  ["investment property loan no income", 188, 52],
];

export default function MarketingPage() {
  const store = useStore();
  const t = totalMarketing();

  return (
    <section className="wrap sec">
      <h1 style={{ fontSize: "2rem" }}>Marketing &amp; acquisition</h1>
      <p className="mut">Acquisition performance across investor campaigns. All figures are illustrative.</p>

      <div className="grid g4">
        <div className="card stat"><b>{formatCurrency(t.spend)}</b><span>Spend</span></div>
        <div className="card stat"><b>{t.leads}</b><span>Leads</span></div>
        <div className="card stat"><b>{t.qualified}</b><span>Qualified</span></div>
        <div className="card stat"><b>{t.applications}</b><span>Applications</span></div>
        <div className="card stat"><b>{t.funded}</b><span>Funded</span></div>
        <div className="card stat"><b>{formatCurrency(t.spend / t.leads)}</b><span>Cost / lead</span></div>
        <div className="card stat"><b>{formatCurrency(t.spend / t.funded)}</b><span>Cost / funded</span></div>
      </div>

      <div className="grid g2" style={{ marginTop: 16 }}>
        <div className="card">
          <h3>Leads by campaign</h3>
          {CAMPAIGNS.map((c) => (
            <div key={c.campaign} style={{ margin: "10px 0" }}>
              {c.campaign} · {c.leads}
              <div className="bar2">
                <i style={{ width: `${(c.leads / 142) * 100}%` }} />
              </div>
            </div>
          ))}
          <table>
            <thead>
              <tr><th>Campaign</th><th>CPL</th><th>Cost / funded</th></tr>
            </thead>
            <tbody>
              {CAMPAIGNS.map((c) => (
                <tr key={c.campaign}>
                  <td>{c.campaign}</td>
                  <td>{formatCurrency(c.spend / c.leads)}</td>
                  <td>{formatCurrency(c.spend / c.funded)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card">
          <h3>Event stream</h3>
          {store.events.slice(0, 9).map((e, i) => (
            <div key={i} style={{ padding: "6px 0", borderBottom: "1px solid var(--line)" }}>
              <code>{e.name}</code> <span className="mut">{e.time} · {e.meta}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid g2" style={{ marginTop: 16 }}>
        <div className="card">
          <h3>Funnel conversion</h3>
          {FUNNEL.map(([label, value], i) => (
            <div key={label} style={{ margin: "8px 0" }}>
              {label} · {value}
              {i > 0 && (
                <span className="mut"> ({((value / FUNNEL[i - 1][1]) * 100).toFixed(1)}% of previous)</span>
              )}
              <div className="bar2">
                <i style={{ width: `${value / 10}%` }} />
              </div>
            </div>
          ))}
          <p className="mut">Illustrative sample data.</p>
        </div>
        <div className="card">
          <h3>Device breakdown</h3>
          {DEVICES.map(([label, pct]) => (
            <div key={label} style={{ margin: "8px 0" }}>
              {label} · {pct}%
              <div className="bar2">
                <i style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <h3>Source performance</h3>
          <table>
            <thead><tr><th>Source</th><th>Leads</th><th>Funded</th></tr></thead>
            <tbody>
              {SOURCES.map(([s, leads, funded]) => (
                <tr key={s}><td>{s}</td><td>{leads}</td><td>{funded}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card">
          <h3>Keyword examples</h3>
          <table>
            <thead><tr><th>Keyword</th><th>Clicks</th><th>Leads</th></tr></thead>
            <tbody>
              {KEYWORDS.map(([k, clicks, leads]) => (
                <tr key={k}><td>{k}</td><td>{clicks}</td><td>{leads}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Event path</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {CONVERSION_JOURNEY.map((step, i) => (
            <span key={step} className="mut" style={{ fontSize: 13 }}>
              {step}
              {i < CONVERSION_JOURNEY.length - 1 ? " →" : ""}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
