"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useStore, bookRentalPurchaseAppointment } from "@/lib/store";
import { track, FUNNEL_EVENTS } from "@/lib/analytics";

const ADVISOR = "A. Reyes";
const TIMES = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"];
const APPOINTMENT_TYPES = ["Phone call", "Video call"];

function nextWeekdays(count: number): { label: string; value: string }[] {
  const out: { label: string; value: string }[] = [];
  const d = new Date();
  while (out.length < count) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day === 0 || day === 6) continue;
    out.push({
      value: d.toDateString(),
      label: d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }),
    });
  }
  return out;
}

export default function BookPage() {
  const store = useStore();
  const scenario = store.rpScenario;
  const dates = useMemo(() => nextWeekdays(5), []);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [type, setType] = useState(APPOINTMENT_TYPES[0]);
  const [error, setError] = useState("");

  if (!scenario) {
    return (
      <section className="wrap sec" style={{ maxWidth: 520, textAlign: "center" }}>
        <div className="card">
          <h1 style={{ fontSize: "1.6rem" }}>No scenario to book against</h1>
          <p className="mut">Save a DSCR Rental Purchase scenario first, then book a call about it.</p>
          <Link className="btn" href="/loans/dscr-rental-purchase">
            Back to DSCR Rental Purchase
          </Link>
        </div>
      </section>
    );
  }

  if (scenario.appointment) {
    const a = scenario.appointment;
    return (
      <section className="wrap sec" style={{ maxWidth: 520 }}>
        <div className="card">
          <span className="pill">Appointment confirmed</span>
          <h1 style={{ fontSize: "1.8rem", marginTop: 10 }}>You&apos;re booked.</h1>
          <table>
            <tbody>
              <tr><th scope="row">Advisor</th><td>{a.advisor}</td></tr>
              <tr><th scope="row">Date</th><td>{a.date}</td></tr>
              <tr><th scope="row">Time</th><td>{a.time}</td></tr>
              <tr><th scope="row">Type</th><td>{a.type}</td></tr>
              <tr><th scope="row">Scenario</th><td>{scenario.id}</td></tr>
            </tbody>
          </table>
          <p className="note" style={{ marginTop: 12 }}>
            Demo availability — no real calendar was booked and no real advisor will call.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
            <Link className="btn" href="/loans/dscr-rental-purchase/scenario">
              View scenario
            </Link>
            <Link className="btn ghost" href="/portal/borrower">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </section>
    );
  }

  function confirm() {
    if (!date || !time) {
      setError("Choose a date and time to continue.");
      return;
    }
    setError("");
    bookRentalPurchaseAppointment({ date, time, type, advisor: ADVISOR });
    track(FUNNEL_EVENTS.APPOINTMENT_BOOKED, { date, time, type });
  }

  return (
    <section className="wrap sec" style={{ maxWidth: 640 }}>
      <h1 style={{ fontSize: "2rem" }}>Book a Call</h1>
      <p className="mut">
        Scenario {scenario.id} · {scenario.qualification.propertyState}
      </p>

      <div className="card">
        <h3>Advisor</h3>
        <p className="mut" style={{ marginBottom: 0 }}>{ADVISOR} · Demo availability</p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Appointment type</h3>
        {APPOINTMENT_TYPES.map((t) => (
          <label className="opt" key={t}>
            <input type="radio" name="apt-type" checked={type === t} onChange={() => setType(t)} />
            {t}
          </label>
        ))}
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Date</h3>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {dates.map((d) => (
            <button
              key={d.value}
              type="button"
              className={`btn sm ${date === d.value ? "" : "ghost"}`}
              onClick={() => setDate(d.value)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Time</h3>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {TIMES.map((t) => (
            <button
              key={t}
              type="button"
              className={`btn sm ${time === t ? "" : "ghost"}`}
              onClick={() => setTime(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="err" role="alert" style={{ marginTop: 12 }}>
          {error}
        </div>
      )}

      <button className="btn" style={{ marginTop: 16 }} onClick={confirm}>
        Confirm Appointment
      </button>
      <p className="note" style={{ marginTop: 12 }}>
        Demo availability shown. This does not book a real calendar appointment.
      </p>
    </section>
  );
}
