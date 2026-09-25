"use client";
import { useState } from "react";
import { DealDocument } from "@/lib/mock-data/deals";
import { updateDocumentStatus } from "@/lib/store";
import StatusPill from "./StatusPill";

export default function DocumentList({ dealId, documents }: { dealId: string; documents: DealDocument[] }) {
  const [uploading, setUploading] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  function upload(doc: DealDocument, file?: File) {
    setUploading(doc.id);
    // Demo only: no file is transmitted anywhere. This simulates a network round-trip.
    setTimeout(() => {
      updateDocumentStatus(dealId, doc.id, "received");
      setUploading(null);
      setToast(`${file?.name ?? doc.label} received (demo — not actually uploaded anywhere)`);
      setTimeout(() => setToast(null), 2600);
    }, 900);
  }

  return (
    <div className="card">
      <h3>Documents</h3>
      {documents.map((doc) => (
        <div
          key={doc.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            padding: "12px 0",
            borderBottom: "1px solid var(--line)",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div>
              {doc.status === "received" ? "✓" : "○"} {doc.label}{" "}
              {!doc.required && <span className="mut" style={{ fontSize: 12 }}>(optional)</span>}
            </div>
            <div className="mut" style={{ fontSize: 12 }}>
              {doc.required ? "Required" : "Optional"} {doc.date ? `· Uploaded ${doc.date}` : ""}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <StatusPill status={doc.status} />
            {doc.status === "received" ? (
              <button type="button" className="btn ghost sm" onClick={() => upload(doc)}>
                View
              </button>
            ) : uploading === doc.id ? (
              <span className="mut" style={{ fontSize: 13 }}>Uploading…</span>
            ) : (
              <label className="btn sm" style={{ cursor: "pointer" }}>
                Upload
                <input
                  type="file"
                  style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
                  onChange={(e) => upload(doc, e.target.files?.[0])}
                />
              </label>
            )}
          </div>
        </div>
      ))}
      {toast && <p className="note" style={{ marginTop: 10 }}>{toast}</p>}
    </div>
  );
}
