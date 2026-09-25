export const metadata = {
  title: "How It Works",
  description: "From property analysis to funding, in six steps.",
};

const STEPS = [
  "Analyze the deal with the calculator",
  "Pre-qualify with a saved scenario",
  "Complete the application",
  "Upload documents in the portal",
  "Underwriting review",
  "Approval and closing",
];

export default function Page() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>How It Works</h1>
          <p>From property analysis to funding, in six steps.</p>
        </div>
      </section>
      <section className="wrap sec pane">
        <ol className="grid g3" style={{ listStyle: "none", paddingLeft: 0, counterReset: "step" }}>
          {STEPS.map((s, i) => (
            <li className="card" key={s} style={{ counterIncrement: "step" }}>
              <span className="pill">Step {i + 1}</span>
              <p style={{ marginTop: 10, marginBottom: 0 }}>{s}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
