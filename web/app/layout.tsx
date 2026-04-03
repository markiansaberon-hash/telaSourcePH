import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "TelaSource PH — Fabric Sourcing Made Easy",
  description:
    "Send your fabric list. We source everything from 50+ Divisoria suppliers and deliver to your door.",
};

function Header() {
  return (
    <header className="border-b border-cream-dark bg-white">
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
            <p className="mt-2 text-sm text-accent">
              Shop 4210, Divisoria, Manila
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-semibold">Contact Us</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>Call / Viber / Text: 0917 328 7704</li>
              <li>Facebook: /telasourceph</li>
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
      </head>
      <body className="flex min-h-screen flex-col bg-cream antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
