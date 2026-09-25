import Link from "next/link";
import { LEGAL } from "@/lib/content/disclosures";

export const metadata = {
  title: "Privacy",
  description: "Important information about this website.",
};

export default function Page() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>Privacy</h1>
          <p>Important information about this website.</p>
        </div>
      </section>
      <section className="wrap sec pane">
        <p>{LEGAL.privacy}</p>
        <Link className="btn ghost" href="/">Back to home</Link>
      </section>
    </>
  );
}
