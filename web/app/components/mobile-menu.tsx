"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-text-light transition hover:bg-cream-dark hover:text-text"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 border-b border-cream-dark bg-white shadow-lg">
          <div className="mx-auto max-w-6xl px-4 py-3 space-y-1">
            <Link
              href="/#how-it-works"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm text-text-light transition hover:bg-cream-dark hover:text-text"
            >
              How It Works
            </Link>
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm text-text-light transition hover:bg-cream-dark hover:text-text"
            >
              Contact Us
            </Link>
            <Link
              href="/gallery"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm text-text-light transition hover:bg-cream-dark hover:text-text"
            >
              Gallery
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
