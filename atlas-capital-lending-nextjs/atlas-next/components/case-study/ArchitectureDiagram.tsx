import { ARCHITECTURE_DIAGRAM, DiagramNode } from "@/lib/content/case-study";

function Node({ node }: { node: DiagramNode }) {
  return (
    <div className="card" style={{ padding: "10px 12px" }}>
      <b>{node.title}</b>
      {node.note && (
        <div className="mut" style={{ fontSize: 12 }}>
          {node.note}
        </div>
      )}
    </div>
  );
}

const Arrow = () => (
  <div aria-hidden="true" style={{ textAlign: "center", color: "var(--acc)" }}>
    ↓
  </div>
);

export default function ArchitectureDiagram() {
  const d = ARCHITECTURE_DIAGRAM;
  return (
    <div className="grid g3" style={{ alignItems: "start" }}>
      <div>
        <h3>Acquisition to funding</h3>
        {d.acquisitionToFunding.map((n, i) => (
          <div key={n.title}>
            {i > 0 && <Arrow />}
            <Node node={n} />
          </div>
        ))}
      </div>
      <div>
        <h3>Connected surfaces</h3>
        {d.connectedSurfaces.map((n, i) => (
          <div key={n.title}>
            {i > 0 && <Arrow />}
            <Node node={n} />
          </div>
        ))}
        <h3 style={{ marginTop: 16 }}>Search &amp; AI</h3>
        {d.searchAndAi.map((n, i) => (
          <div key={n.title}>
            {i > 0 && <Arrow />}
            <Node node={n} />
          </div>
        ))}
      </div>
      <div>
        <h3>Measurement</h3>
        {d.measurement.map((n) => (
          <Node key={n.title} node={n} />
        ))}
        <p className="mut">{d.measurementNote}</p>
      </div>
    </div>
  );
}
