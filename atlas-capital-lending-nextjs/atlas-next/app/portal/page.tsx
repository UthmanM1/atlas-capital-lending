"use client";
import { useState } from "react";
import { APPLICATION_STAGES, BORROWER_LOAN_SUMMARY } from "@/lib/mock-data/portal";
import { logEvent, setDocTaskStatus, useStore } from "@/lib/store";

export default function PortalPage() {
  const store = useStore();
  const [toast, setToast] = useState<string | null>(null);

  function upload(i: number) {
    setDocTaskStatus(i, 1);
    setTimeout(() => {
      setDocTaskStatus(i, 2);
      logEvent("document_uploaded", "Borrower portal");
      setToast("Document received");
      setTimeout(() => setToast(null), 2400);
    }, 1200);
  }

  function bookAppointment() {
    logEvent("appointment_booked", "Portal");
    setToast("Appointment booked for Thu 10:30");
    setTimeout(() => setToast(null), 2400);
  }

  const outstanding = store.docTasks.find((t) => t.status === 0);

  return (
    <section className="wrap sec">
      <h1 style={{ fontSize: "2rem" }}>Good morning, Michael</h1>
      <p className="mut">123 Main Street, Tampa, FL · Your application workspace</p>
      <div className="trk card">
        {APPLICATION_STAGES.map((s, i) => (
          <div key={s} className={i < 2 ? "done" : i === 2 ? "cur" : ""}>
            {s}
          </div>
        ))}
      </div>

      <div className="grid g2" style={{ marginTop: 16 }}>
        <div className="card">
          <h3>Required documents &amp; conditions</h3>
          {store.docTasks.map((t, i) => (
            <div
              key={t.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 8,
                padding: "10px 0",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <div>
                {t.label}
                <div className="mut">Due {t.due}</div>
              </div>
              {t.status === 2 ? (
                <span className="pill">Received</span>
              ) : t.status === 1 ? (
                <div style={{ width: 90 }} className="bar2">
                  <i style={{ width: "60%" }} />
                </div>
              ) : (
                <button className="btn sm" onClick={() => upload(i)}>
                  Upload
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="card">
          <h3>Loan details</h3>
          <table>
            <tbody>
              {BORROWER_LOAN_SUMMARY.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn ghost sm" style={{ marginTop: 10 }} onClick={bookAppointment}>
            Book an appointment
          </button>
          <p className="mut">Messages: 1 new from A. Reyes</p>
        </div>
      </div>

      {outstanding && (
        <div className="card" style={{ marginTop: 16, borderColor: "var(--acc)" }}>
          <span className="pill">Action required</span>
          <h3 style={{ marginTop: 8 }}>{outstanding.label}</h3>
          <p className="mut">Due {outstanding.due} · Uploads are handled through the secure upload control above.</p>
        </div>
      )}

      <div className="grid g2" style={{ marginTop: 16 }}>
        <div className="card">
          <h3>Saved scenario</h3>
          <p className="mut">
            Scenario ID: {store.savedScenarioId || "ATL-482019"}
            <br />
            Loan $318,750 · 7.25% · 1.34x DSCR
          </p>
        </div>
        <div className="card">
          <h3>Property summary</h3>
          <p className="mut">
            123 Main Street, Tampa, FL
            <br />
            Single family · Rent $3,100/mo
          </p>
        </div>
        <div className="card">
          <h3>Messages</h3>
          <p className="mut">
            <b>A. Reyes:</b> Please upload your insurance page when you can.
          </p>
        </div>
        <div className="card">
          <h3>Activity</h3>
          <p className="mut">Scenario saved · Application submitted · Bank statements received</p>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </section>
  );
}
