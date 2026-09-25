import Link from "next/link";
import { AI_SEARCH_TOPICS, AI_SEARCH_EXAMPLE_QUESTIONS, NO_GUARANTEE_AI_SEARCH } from "@/lib/content/seo-strategy";

export const metadata = {
  title: "AI Search Strategy",
  description: "How Atlas Capital Lending's content is structured to be useful for AI-generated search answers.",
};

export default function AiSearchPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>Structured for AI-Generated Answers</h1>
          <p>
            Google AI Overviews, AI Mode, and conversational search tend to favor direct, well-sourced
            answers over keyword-optimized pages. Atlas&apos;s Knowledge Hub is written accordingly.
          </p>
        </div>
      </section>

      <section className="wrap sec pane">
        <h2>What this looks like in practice</h2>
        <div className="grid g2">
          {AI_SEARCH_TOPICS.map(([title, desc]) => (
            <div className="card" key={title}>
              <h3>{title}</h3>
              <p className="mut" style={{ marginBottom: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap sec pane" style={{ paddingTop: 0 }}>
        <h2>Example target questions</h2>
        <p className="mut" style={{ maxWidth: 600 }}>
          Questions the Knowledge Hub is written to answer directly, in the first sentence of the relevant
          article:
        </p>
        <div className="grid g3">
          {AI_SEARCH_EXAMPLE_QUESTIONS.map((q) => (
            <div className="card" key={q}>
              <p style={{ margin: 0 }}>&ldquo;{q}&rdquo;</p>
            </div>
          ))}
        </div>
        <p className="note" style={{ marginTop: 16 }}>{NO_GUARANTEE_AI_SEARCH}</p>
        <p style={{ marginTop: 16 }}>
          <Link className="btn ghost" href="/resources">Browse the Knowledge Hub</Link>{" "}
          <Link className="btn ghost" href="/growth/seo">Back to SEO strategy</Link>
        </p>
      </section>
    </>
  );
}
