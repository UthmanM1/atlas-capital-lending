"use client";
import { useState } from "react";
import { DealMessage } from "@/lib/mock-data/deals";
import { sendDealMessage } from "@/lib/store";

export default function MessageThread({
  dealId,
  messages,
  asRole,
  asName,
}: {
  dealId: string;
  messages: DealMessage[];
  asRole: DealMessage["role"];
  asName: string;
}) {
  const [value, setValue] = useState("");

  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    sendDealMessage(dealId, asName, asRole, value.trim());
    setValue("");
  }

  return (
    <div className="card">
      <h3>Messages</h3>
      <p className="mut" style={{ fontSize: 13 }}>Secure message center — demo only, not a real messaging system.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "10px 0" }}>
        {messages.length === 0 && <p className="mut">No messages yet.</p>}
        {messages.map((m) => (
          <div
            key={m.id}
            className="card"
            style={{ background: m.role === asRole ? "var(--accbg)" : "var(--bg)", padding: "10px 12px" }}
          >
            <b>{m.from}</b> <span className="mut" style={{ fontSize: 12 }}>{m.role} · {m.date}</span>
            <p style={{ margin: "4px 0 0" }}>{m.body}</p>
          </div>
        ))}
      </div>
      <form onSubmit={send} style={{ display: "flex", gap: 8 }}>
        <input
          aria-label="Write a message"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write a reply…"
          style={{ flex: 1, padding: 10, border: "1px solid var(--line)", borderRadius: 4 }}
        />
        <button className="btn sm">Send</button>
      </form>
    </div>
  );
}
