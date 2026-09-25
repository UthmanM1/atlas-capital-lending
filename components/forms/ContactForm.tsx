"use client";
import { useState } from "react";
import { logEvent } from "@/lib/store";
import { FaqList } from "@/components/layout/AdvisorCallout";
import { FAQ_EXTENDED } from "@/lib/content/knowledge-base";

const INQUIRY_TYPES = ["Investor inquiry", "Broker inquiry", "General question"];
const OBJECTIVES = ["Rental purchase", "Cash-out refinance", "Rate & term refinance", "Portfolio financing", "Not sure yet"];

export default function ContactForm() {
  const [type, setType] = useState(INQUIRY_TYPES[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [stateField, setStateField] = useState("");
  const [objective, setObjective] = useState(OBJECTIVES[0]);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email) || !message.trim() || !consent) {
      setError("Enter your name, a valid email and a message, and confirm consent.");
      return;
    }
    setError("");
    logEvent("lead_submitted", "Contact form");
    setSent(true);
  }

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>Speak with an advisor</h1>
          <p>Tell us about the property or financing scenario you are considering.</p>
        </div>
      </section>
      <section className="wrap sec pane" id="faq">
        {sent ? (
          <div className="card">
            <span className="pill">Enquiry saved</span>
            <h3 style={{ marginTop: 8 }}>Thanks — we&apos;ve got it.</h3>
            <p className="mut">This is a demonstration form; no message was sent to a real inbox.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate style={{ maxWidth: 640 }}>
            <fieldset style={{ border: 0, padding: 0, margin: "0 0 12px" }}>
              <legend>
                <b>I am contacting you as</b>
              </legend>
              {INQUIRY_TYPES.map((t) => (
                <label className="opt" key={t}>
                  <input type="radio" name="t" value={t} checked={type === t} onChange={() => setType(t)} />
                  {t}
                </label>
              ))}
            </fieldset>
            <div className="fields">
              <label>
                Name
                <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
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
                State
                <input value={stateField} onChange={(e) => setStateField(e.target.value)} autoComplete="address-level1" />
              </label>
            </div>
            <label style={{ marginTop: 12 }}>
              Loan objective
              <select value={objective} onChange={(e) => setObjective(e.target.value)}>
                {OBJECTIVES.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
            <label style={{ marginTop: 12 }}>
              Message
              <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
            </label>
            <label className="opt" style={{ marginTop: 12 }}>
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
              I agree to be contacted about my financing enquiry.
            </label>
            {error && (
              <div className="err" role="alert">
                {error}
              </div>
            )}
            <button className="btn" style={{ marginTop: 12 }}>
              Send enquiry
            </button>
          </form>
        )}
        <h2 style={{ marginTop: 32 }}>Frequently asked questions</h2>
        <FaqList items={FAQ_EXTENDED} />
      </section>
    </>
  );
}
