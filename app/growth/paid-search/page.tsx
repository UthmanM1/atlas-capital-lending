import Link from "next/link";
import { CAMPAIGN_NAME, AD_GROUPS, NEGATIVE_KEYWORDS, CONVERSION_PATH, ILLUSTRATIVE_CAMPAIGN_NOTE } from "@/lib/mock-data/campaign";

export const metadata = {
  title: "Paid Search Case Study",
  description: "Illustrative Google Search campaign structure that would drive the DSCR Rental Purchase funnel.",
};

export default function PaidSearchPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>Paid Search Case Study</h1>
          <p>
            A portfolio demonstration of how a Google Search campaign would drive the{" "}
            <Link href="/loans/dscr-rental-purchase" style={{ color: "#fff", textDecoration: "underline" }}>
              DSCR Rental Purchase funnel
            </Link>
            . No campaign shown here is live or actually running.
          </p>
        </div>
      </section>

      <section className="wrap sec pane">
        <p className="note">{ILLUSTRATIVE_CAMPAIGN_NOTE} No conversion rates, CPL, funded-loan counts or ROI are claimed on this page.</p>

        <h2>Campaign</h2>
        <div className="card" style={{ maxWidth: 360 }}>
          <span className="pill">Search campaign</span>
          <h3 style={{ marginTop: 8 }}>{CAMPAIGN_NAME}</h3>
        </div>

        <h2 style={{ marginTop: 32 }}>Ad groups</h2>
        <div className="grid g2">
          {AD_GROUPS.map((g) => (
            <div className="card" key={g.name}>
              <h3>{g.name}</h3>
              <p className="mut" style={{ fontSize: 13, marginBottom: 4 }}>Keywords</p>
              <p style={{ marginTop: 0 }}>
                {g.keywords.map((k) => (
                  <span key={k} className="pill" style={{ marginRight: 6, marginBottom: 6, display: "inline-block" }}>{k}</span>
                ))}
              </p>
              <div className="card" style={{ background: "var(--bg)", marginTop: 8 }}>
                <span className="mut" style={{ fontSize: 12 }}>Illustrative ad copy</span>
                <p style={{ color: "var(--acc)", fontWeight: 600, margin: "4px 0 2px" }}>{g.headline}</p>
                <p className="mut" style={{ margin: 0, fontSize: 14 }}>{g.description}</p>
                <p className="mut" style={{ margin: "4px 0 0", fontSize: 12 }}>{g.finalUrl}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ marginTop: 32 }}>Negative keywords</h2>
        <p>
          {NEGATIVE_KEYWORDS.map((k) => (
            <span key={k} className="pill" style={{ marginRight: 6, marginBottom: 6, display: "inline-block", background: "#f2e6e2", color: "var(--warn)" }}>− {k}</span>
          ))}
        </p>

        <h2 style={{ marginTop: 32 }}>Conversion path</h2>
        <div className="card">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            {CONVERSION_PATH.map((step, i) => (
              <span key={step} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="pill">{step}</span>
                {i < CONVERSION_PATH.length - 1 && <span aria-hidden="true" style={{ color: "var(--acc)" }}>→</span>}
              </span>
            ))}
          </div>
        </div>

        <p style={{ marginTop: 24 }}>
          <Link className="btn" href="/loans/dscr-rental-purchase">View the funnel this campaign drives</Link>{" "}
          <Link className="btn ghost" href="/growth/analytics">See the analytics framework</Link>
        </p>
      </section>
    </>
  );
}
