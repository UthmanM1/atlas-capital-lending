import Link from "next/link";
import {
  ARCHITECTURE_LAYERS,
  PORTAL_SURFACES,
  SECURITY_CONTROLS,
  SECURITY_DISCLAIMER,
  INTEGRATION_MAP,
} from "@/lib/content/architecture-notes";

export const metadata = {
  title: "Technology",
  description: "The proposed production architecture behind Atlas Capital Lending — clearly separated from what exists in this demo.",
};

export default function TechnologyPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>Built for a Modern Digital Lending Workflow</h1>
          <p>
            This page explains the architecture Atlas Capital Lending is designed around — how the pieces
            would connect in production. It is a proposal, not a claim that these integrations exist today.
          </p>
        </div>
      </section>

      <section className="wrap sec pane">
        <span className="pill">Proposed Production Architecture</span>
        <div className="card" style={{ marginTop: 12, maxWidth: 420 }}>
          {ARCHITECTURE_LAYERS.map((layer, i) => (
            <div key={layer}>
              <div style={{ padding: "10px 12px", background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 4, textAlign: "center" }}>
                {layer}
              </div>
              {i < ARCHITECTURE_LAYERS.length - 1 && (
                <div aria-hidden="true" style={{ textAlign: "center", color: "var(--acc)", padding: "2px 0" }}>↓</div>
              )}
            </div>
          ))}
        </div>

        <h2 style={{ marginTop: 32 }}>Served by three portals</h2>
        <div className="grid g3">
          {PORTAL_SURFACES.map((s, i) => (
            <div className="card" key={s}>
              <h3>{s}</h3>
              <p className="mut" style={{ marginBottom: 0 }}>
                Demo version live at{" "}
                <Link href={["/portal/borrower", "/portal/broker", "/portal/staff"][i]}>
                  {["/portal/borrower", "/portal/broker", "/portal/staff"][i]}
                </Link>
                .
              </p>
            </div>
          ))}
        </div>
        <p className="note" style={{ marginTop: 12 }}>
          The layers above are proposed. What&apos;s actually implemented today is documented at{" "}
          <Link href="/portal/architecture">Portal Architecture Notes</Link>.
        </p>
      </section>

      <section className="wrap sec pane" style={{ paddingTop: 0 }}>
        <h2>Security architecture</h2>
        <p className="mut" style={{ maxWidth: 640 }}>Proposed controls for a production build:</p>
        <div className="grid g3">
          {SECURITY_CONTROLS.map(([title, desc]) => (
            <div className="card" key={title}>
              <h3>{title}</h3>
              <p className="mut" style={{ marginBottom: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
        <p className="note" style={{ marginTop: 16 }}>{SECURITY_DISCLAIMER}</p>
      </section>

      <section className="wrap sec pane" style={{ paddingTop: 0 }}>
        <h2>Integration map</h2>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr><th>Capability</th><th>Demo</th><th>Production option</th></tr>
            </thead>
            <tbody>
              {INTEGRATION_MAP.map((r) => (
                <tr key={r.capability}>
                  <td><b>{r.capability}</b></td>
                  <td className="mut">{r.demo}</td>
                  <td className="mut">{r.production}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 20 }}>
          <Link className="btn ghost" href="/case-study">See the full case study</Link>
        </p>
      </section>
    </>
  );
}
