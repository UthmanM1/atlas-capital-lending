"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS: [string, string][] = [
  ["Loans", "/loans/dscr"],
  ["Calculators", "/calculators/dscr"],
  ["Investors", "/investors"],
  ["Brokers", "/brokers"],
  ["Resources", "/resources"],
  ["About", "/about"],
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="bar">
        <Link href="/" className="logo">
          ATLAS
          <small>CAPITAL</small>
        </Link>
        <nav className="primary" aria-label="Primary">
          {LINKS.map(([label, href]) => (
            <Link key={href} href={href} aria-current={pathname.startsWith(href) ? "page" : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="navright">
          <Link href="/portal" className="mut-dark" style={{ fontSize: 14, textDecoration: "none" }}>
            Sign In
          </Link>
          <Link href="/qualify" className="btn sm">
            Get Started
          </Link>
        </div>
        <button
          className="mobile-toggle"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </div>
      {open && (
        <>
          <div className="scrim" onClick={() => setOpen(false)} />
          <div className="drawer open" role="dialog" aria-modal="true" aria-label="Menu">
            <button className="btn ghost sm" onClick={() => setOpen(false)} aria-label="Close menu">
              Close
            </button>
            <nav>
              {LINKS.map(([label, href]) => (
                <Link key={href} href={href} onClick={() => setOpen(false)}>
                  {label}
                </Link>
              ))}
              <Link href="/qualify" className="btn" onClick={() => setOpen(false)}>
                Get Started
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
