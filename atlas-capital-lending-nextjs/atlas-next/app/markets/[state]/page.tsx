import Link from "next/link";
import { notFound } from "next/navigation";
import Pic from "@/components/property/Pic";
import { MARKETS, MARKET_DISCLAIMER } from "@/lib/content/markets";

export function generateStaticParams() {
  return MARKETS.map((m) => ({ state: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const market = MARKETS.find((m) => m.slug === state);
  if (!market) return {};
  return { title: `${market.name} Investor Market`, description: MARKET_DISCLAIMER };
}

export default async function MarketDetailPage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const market = MARKETS.find((m) => m.slug === state);
  if (!market) notFound();

  return (
    <>
      <section className="hero">
        <div className="wrap grid g2" style={{ alignItems: "center" }}>
          <div>
            <h1>{market.name} investor market</h1>
            <p>{MARKET_DISCLAIMER}</p>
          </div>
          <div className="hero-pic">
            <Pic src={market.image} alt={market.alt} ratio="r43" priority />
          </div>
        </div>
      </section>
      <section className="wrap sec">
        <div className="grid g3">
          <div className="card">
            <h3>Investor context</h3>
            <p className="mut">{market.context}</p>
          </div>
          <div className="card">
            <h3>Property example</h3>
            <p className="mut">{market.example}</p>
          </div>
          <div className="card">
            <h3>Financing considerations</h3>
            <p className="mut">{market.considerations}</p>
          </div>
        </div>
        <p style={{ marginTop: 16 }}>
          <Link href="/calculators/dscr">Run this example →</Link>
        </p>
        <p className="note">{MARKET_DISCLAIMER}</p>
      </section>
    </>
  );
}
