import Link from "next/link";
import { SEO_PAGE_GROUPS, TECHNICAL_SEO_TOPICS, NO_RANKING_PROMISE_SEO } from "@/lib/content/seo-strategy";

export const metadata = {
  title: "SEO Strategy",
  description: "The organic search information architecture behind Atlas Capital Lending — page groups, technical SEO, and what's actually implemented.",
};

export default function SeoStrategyPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>Organic Search Strategy</h1>
          <p>
            How Atlas Capital Lending&apos;s content is organized to earn and support organic search
            visibility — most of the pages below already exist in this project.
          </p>
        </div>
      </section>

      <section className="wrap sec pane">
        <h2>Page groups</h2>
        <div className="grid g2">
          {SEO_PAGE_GROUPS.map((g) => (
            <div className="card" key={g.title}>
              <h3>{g.title}</h3>
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                {g.items.map((item) =>
                  item.href ? (
                    <li key={item.label}><Link href={item.href}>{item.label}</Link></li>
                  ) : (
                    <li key={item.label} className="mut">{item.label}</li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap sec pane" style={{ paddingTop: 0 }}>
        <h2>Technical SEO</h2>
        <div className="grid g3">
          {TECHNICAL_SEO_TOPICS.map(([title, desc]) => (
            <div className="card" key={title}>
              <h3>{title}</h3>
              <p className="mut" style={{ marginBottom: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
        <p className="note" style={{ marginTop: 16 }}>{NO_RANKING_PROMISE_SEO}</p>
        <p style={{ marginTop: 16 }}>
          <Link className="btn ghost" href="/growth/ai-search">See the AI search strategy →</Link>
        </p>
      </section>
    </>
  );
}
