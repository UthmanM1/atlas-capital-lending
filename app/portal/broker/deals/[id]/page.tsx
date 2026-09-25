"use client";
import { use } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { DEMO_BROKER } from "@/lib/mock-data/deals";
import DealDetail from "@/components/portal/DealDetail";

export default function BrokerDealPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const store = useStore();
  const deal = store.deals.find((d) => d.id === id);

  if (!deal) {
    return (
      <section className="wrap sec" style={{ maxWidth: 480, textAlign: "center" }}>
        <div className="card">
          <h1 style={{ fontSize: "1.6rem" }}>Deal not found</h1>
          <p className="mut">This deal isn&apos;t in the current demo session.</p>
          <Link className="btn" href="/portal/broker">Back to pipeline</Link>
        </div>
      </section>
    );
  }

  return <DealDetail deal={deal} role="Broker" asName={DEMO_BROKER.name} backHref="/portal/broker" backLabel="Pipeline" />;
}
