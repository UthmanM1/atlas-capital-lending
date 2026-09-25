"use client";
import { useState } from "react";
import { RPLead } from "@/lib/store";

const CONTACT_METHODS = ["Email", "Phone", "Text"];

export default function LeadCaptureForm({
  initial,
  onBack,
  onSubmit,
  submitting = false,
}: {
  initial?: Partial<RPLead>;
  onBack: () => void;
  onSubmit: (lead: RPLead) => void;
  submitting?: boolean;
}) {
  const [firstName, setFirstName] = useState(initial?.firstName ?? "");
  const [lastName, setLastName] = useState(initial?.lastName ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [preferredContact, setPreferredContact] = useState(initial?.preferredContact ?? "Email");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: string[] = [];
    if (!firstName.trim()) errs.push("Enter your first name.");
    if (!lastName.trim()) errs.push("Enter your last name.");
    if (!/^\S+@\S+\.\S+$/.test(email)) errs.push("Enter a valid email like name@example.com.");
    if (!phone.trim()) errs.push("Enter a phone number.");
    if (!consent) errs.push("Confirm that you agree to be contacted.");
    if (errs.length) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    onSubmit({ firstName, lastName, email, phone, preferredContact });
  }

  return (
    <section className="wrap sec" style={{ maxWidth: 640 }}>
      <h2>Almost there</h2>
      <p className="mut">
        Tell us where to send your saved scenario. This is a portfolio/demo experience — no real lead is
        sent anywhere outside this browser session.
      </p>
      <form onSubmit={submit} noValidate>
        <div className="fields">
          <label>
            First name
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" />
          </label>
          <label>
            Last name
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </label>
          <label>
            Phone
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
          </label>
          <label>
            Preferred contact method
            <select value={preferredContact} onChange={(e) => setPreferredContact(e.target.value)}>
              {CONTACT_METHODS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="opt" style={{ marginTop: 12 }}>
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          I agree to be contacted about my financing scenario. This is a demo — no real contact will be made.
        </label>
        {errors.length > 0 && (
          <div className="err" role="alert">
            {errors.join(" ")}
          </div>
        )}
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button type="button" className="btn ghost" onClick={onBack} disabled={submitting}>
            Back
          </button>
          <button className="btn" style={{ flex: 1 }} disabled={submitting}>
            {submitting ? "Saving…" : "Save My Scenario"}
          </button>
        </div>
      </form>
    </section>
  );
}
