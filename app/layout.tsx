import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navigation/NavBar";
import Footer from "@/components/layout/Footer";
import AskAtlas from "@/components/ai/AskAtlas";

const SITE_URL = "https://atlas-capital-lending.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Atlas Capital Lending — DSCR Financing for Rental Investors",
    template: "%s | Atlas Capital Lending",
  },
  description:
    "DSCR financing designed for real estate investors: rental purchase, cash-out refinance and portfolio loans, with transparent calculators and a guided qualification flow.",
  openGraph: {
    type: "website",
    siteName: "Atlas Capital Lending",
    title: "Atlas Capital Lending — DSCR Financing for Rental Investors",
    description:
      "DSCR financing designed for real estate investors who want a faster, clearer path from property analysis to funding.",
    images: ["/images/atlas/hero/atlas-hero-rental-property.webp"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <NavBar />
        <main id="main">{children}</main>
        <Footer />
        <AskAtlas />
      </body>
    </html>
  );
}
