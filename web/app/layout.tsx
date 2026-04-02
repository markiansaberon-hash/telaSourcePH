import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "FabricHub PH — Fabric Sourcing Made Easy",
  description:
    "Send your fabric list. We source everything from 30+ Divisoria suppliers and deliver to your door.",
};

function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-primary">
          FabricHub
          <span className="text-accent"> PH</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/#how-it-works"
            className="hidden text-sm text-text-light hover:text-primary sm:block"
          >
            How It Works
          </Link>
          <Link
            href="/upload"
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
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
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-lg font-bold">
              FabricHub <span className="text-accent">PH</span>
            </h3>
            <p className="text-sm text-gray-300">
              Fabric sourcing made easy. Send your list, we do the rest.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-semibold">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Viber/WhatsApp: 09XX XXX XXXX</li>
              <li>Facebook: /fabrichubph</li>
              <li>Email: orders@fabrichubph.com</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold">Hours</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Monday – Saturday</li>
              <li>8:00 AM – 6:00 PM</li>
              <li>Based in Manila, delivering across Luzon</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/20 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} FabricHub PH. All rights reserved.
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
      <body className="flex min-h-screen flex-col bg-white antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
