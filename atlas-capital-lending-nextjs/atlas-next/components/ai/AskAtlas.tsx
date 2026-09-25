"use client";
import { useState } from "react";
import Link from "next/link";
import { askAtlas, ASK_ATLAS_PROMPTS, ASK_ATLAS_SUFFIX } from "@/lib/content/knowledge-base";

interface Msg {
  q: string;
  a: string;
  link?: string;
  linkLabel?: string;
}

export default function AskAtlas() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);

  function ask(q: string) {
    if (!q.trim()) return;
    setTyping(true);
    setValue("");
    setTimeout(() => {
      setTyping(false);
      const { answer, link, linkLabel } = askAtlas(q);
      setMsgs((m) => [...m, { q, a: answer, link, linkLabel }]);
    }, 500);
  }

  return (
    <>
      <button className="btn ask-fab" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {open ? "Close" : "Ask Atlas"}
      </button>
      {open && (
        <div className="ask-panel" role="dialog" aria-label="Ask Atlas assistant">
          <header>
            <b>Ask Atlas</b>
            <div style={{ fontSize: 12, opacity: 0.75 }}>Answers only from approved content.</div>
          </header>
          <div className="ask-msgs" aria-live="polite">
            {msgs.length === 0 && (
              <p className="mut">
                Ask about DSCR, documents, cash-out or portfolio financing. Atlas does not approve,
                decline or commit to loans.
              </p>
            )}
            {msgs.map((m, i) => (
              <div className="msg" key={i}>
                <b>{m.q}</b>
                <br />
                {m.a} {ASK_ATLAS_SUFFIX}
                <br />
                {m.link && (
                  <>
                    <Link href={m.link}>{m.linkLabel ?? "Learn more"}</Link>{" "}
                  </>
                )}
                <Link href="/qualify">Speak with a Loan Advisor</Link>
              </div>
            ))}
            {typing && <div className="msg mut">Atlas is typing…</div>}
          </div>
          <div className="ask-chips">
            {ASK_ATLAS_PROMPTS.map((p) => (
              <button key={p} type="button" className="btn ghost sm" onClick={() => ask(p)}>
                {p}
              </button>
            ))}
          </div>
          <form
            className="ask-form"
            onSubmit={(e) => {
              e.preventDefault();
              ask(value);
            }}
          >
            <input
              aria-label="Ask a question"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ask a question"
            />
            <button className="btn sm">Ask</button>
          </form>
        </div>
      )}
    </>
  );
}
