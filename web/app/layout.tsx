import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import MobileMenu from "./components/mobile-menu";
import "./globals.css";

const SITE_URL = "https://telasourceph.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TelaSource PH — Wholesale Fabric Sourcing from Divisoria",
    template: "%s | TelaSource PH",
  },
  description:
    "Send your fabric list. We source wholesale tela from 50+ Divisoria suppliers and deliver across the Philippines — Manila, Luzon, Visayas, Mindanao.",
  keywords: [
    "tela",
    "fabric",
    "Divisoria",
    "wholesale fabric Philippines",
    "bulk fabric Manila",
    "Philippine fabric supplier",
    "tela Divisoria",
    "uniform fabric Philippines",
    "cotton Divisoria",
    "fabric sourcing Manila",
  ],
  openGraph: {
    type: "website",
    siteName: "TelaSource PH",
    locale: "en_PH",
    url: SITE_URL,
    title: "TelaSource PH — Wholesale Fabric Sourcing from Divisoria",
    description:
      "Bulk fabric orders made easy. We source from 50+ Divisoria suppliers and deliver nationwide.",
    images: [{ url: "/hero-fabrics.jpg", width: 2048, height: 1365, alt: "Fabric rolls at TelaSource PH" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TelaSource PH — Wholesale Fabric Sourcing from Divisoria",
    description:
      "Send your fabric list. We source from 50+ Divisoria suppliers.",
    images: ["/hero-fabrics.jpg"],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

function Header() {
  return (
    <header className="relative border-b border-cream-dark bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-text">
          TelaSource
          <span className="text-primary"> PH</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/#how-it-works"
            className="hidden text-sm text-text-light transition hover:text-primary sm:block"
          >
            How It Works
          </Link>
          <Link
            href="/#contact"
            className="hidden text-sm text-text-light transition hover:text-primary sm:block"
          >
            Contact Us
          </Link>
          <Link
            href="/gallery"
            className="hidden text-sm text-text-light transition hover:text-primary sm:block"
          >
            Gallery
          </Link>
          <Link
            href="/sale"
            className="hidden text-sm font-semibold text-red-600 transition hover:text-red-700 sm:block"
          >
            Sale
          </Link>
          <MobileMenu />
          <Link
            href="/upload"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-primary-dark"
          >
            Upload Your List
          </Link>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-dark text-cream">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-lg font-bold">
              TelaSource <span className="text-primary">PH</span>
            </h3>
            <p className="text-sm text-text-muted">
              Fabric sourcing made easy. Send your list, we do the rest.
            </p>
            <a
              href="https://maps.app.goo.gl/LZMX8ichNB4nTyEBA"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-accent underline transition hover:text-primary"
            >
              Shop 4110, Divisoria, Manila
            </a>
          </div>
          <div>
            <h4 className="mb-3 font-semibold">Contact Us</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>Call / Viber / Text: 0917 328 7704</li>
              <li>
                Facebook:{" "}
                <a href="https://www.facebook.com/4110textilefabric" target="_blank" rel="noopener noreferrer" className="underline transition hover:text-primary">/4110textilefabric</a>
              </li>
              <li>
                <a href="https://www.facebook.com/telasourcePH" target="_blank" rel="noopener noreferrer" className="underline transition hover:text-primary">/telasourcePH</a>
              </li>
              <li>Email: orders@telasourceph.com</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold">Hours</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>Monday – Sunday</li>
              <li>8:00 AM – 5:00 PM</li>
              <li>Based in Manila, delivering across Luzon, Visayas, Mindanao</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-cream/10 pt-6 text-center text-sm text-text-muted">
          &copy; {new Date().getFullYear()} TelaSource PH. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "TelaSource PH",
      url: SITE_URL,
      logo: `${SITE_URL}/hero-fabrics.jpg`,
      sameAs: [
        "https://www.facebook.com/telasourcePH",
        "https://www.facebook.com/4110textilefabric",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+63-917-328-7704",
        contactType: "customer service",
        areaServed: "PH",
        availableLanguage: ["en", "fil"],
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "TelaSource PH",
      image: `${SITE_URL}/hero-fabrics.jpg`,
      url: SITE_URL,
      telephone: "+63-917-328-7704",
      email: "orders@telasourceph.com",
      priceRange: "₱₱",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Shop 4110, Divisoria",
        addressLocality: "Manila",
        addressRegion: "NCR",
        addressCountry: "PH",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "08:00",
          closes: "17:00",
        },
      ],
      sameAs: [
        "https://www.facebook.com/telasourcePH",
        "https://www.facebook.com/4110textilefabric",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-PH">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/cabinet-grotesk"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-cream antialiased">
        <Link
          href="/sale"
          className="block bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 text-center text-xs font-semibold text-white transition hover:from-red-700 hover:to-red-600 sm:text-sm"
        >
          🎉 Soft Opening Sale — special launch prices on every fabric. View offers &rarr;
        </Link>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
