import Link from "next/link";
import PropertyCard from "@/components/property/PropertyCard";
import Pic from "@/components/property/Pic";
import { ARTICLES } from "@/lib/content/articles";
import { INTERIOR_3, INTERIOR_1 } from "@/lib/content/images";

export const metadata = {
  title: "Knowledge Hub",
  description: "Plain-language guides to DSCR, LTV, LTC and refinancing for rental property investors.",
};

export default function ResourcesPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap grid g2" style={{ alignItems: "center" }}>
          <div>
            <h1>Knowledge Hub</h1>
            <p>Plain-language guides to DSCR, LTV, LTC and refinancing.</p>
            <Link className="btn" href="/calculators/dscr">
              Run the calculator
            </Link>
          </div>
          <div className="hero-pic">
            <Pic src={INTERIOR_3.src} alt={INTERIOR_3.alt} ratio="r43" priority />
          </div>
        </div>
      </section>
      <section className="wrap sec">
        <div className="card imgcard" style={{ marginBottom: 16 }}>
          <Pic src={INTERIOR_1.src} alt={INTERIOR_1.alt} ratio="r169" />
          <div className="cardbody">
            <span className="pill">Featured guide</span>
            <h2 style={{ marginTop: 6 }}>
              <Link href={`/resources/${ARTICLES[0].slug}`}>Complete Guide to DSCR Rental Loans</Link>
            </h2>
          </div>
        </div>
        <div className="grid g2">
          {ARTICLES.map((a) => (
            <PropertyCard
              key={a.slug}
              href={`/resources/${a.slug}`}
              image={a.image}
              alt={a.alt}
              ratio="r169"
              title={a.title}
              subtitle={`${a.excerpt}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
