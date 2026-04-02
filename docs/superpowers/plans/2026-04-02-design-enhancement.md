# "Modern Warmth" Design Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reskin TelaSourcePH from generic AI-look to a warm, distinctly Filipino "Modern Warmth" aesthetic using Bricolage Grotesque + Cabinet Grotesk fonts, terracotta/amber/cream palette, and staggered animations.

**Architecture:** Pure visual reskin — update Tailwind CSS theme variables in `globals.css`, swap all Tailwind classes in 4 TSX files. No structural/logic changes, no new dependencies beyond Google Fonts link tags. Scroll animations via a lightweight client component with Intersection Observer.

**Tech Stack:** Next.js 15, Tailwind CSS 4.1, Google Fonts (Bricolage Grotesque), CDN font (Cabinet Grotesk), CSS keyframe animations

---

### Task 1: Update Global Styles & Design Tokens

**Files:**
- Modify: `web/app/globals.css`

- [ ] **Step 1: Replace globals.css with new design system**

```css
@import "tailwindcss";

@theme {
  --color-primary: #C4662E;
  --color-primary-dark: #A3522A;
  --color-accent: #DAA520;
  --color-accent-light: #E8B84A;
  --color-accent-dark: #B8911A;
  --color-dark: #2C1810;
  --color-dark-mid: #1E120B;
  --color-cream: #FFF8F0;
  --color-cream-dark: #F5EDE0;
  --color-surface: #FFF8F0;
  --color-text: #3D2B1F;
  --color-text-light: #8A7060;
  --color-text-muted: #B8A08A;
  --color-success: #5A8F4A;
  --color-error: #C44B2E;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family:
    "Cabinet Grotesk",
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  color: var(--color-text);
}

h1, h2, h3, h4, h5, h6 {
  font-family:
    "Bricolage Grotesque",
    system-ui,
    sans-serif;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out both;
}

.animate-delay-100 { animation-delay: 100ms; }
.animate-delay-200 { animation-delay: 200ms; }
.animate-delay-300 { animation-delay: 300ms; }
.animate-delay-400 { animation-delay: 400ms; }

/* Scroll-triggered: hidden by default, revealed by IntersectionObserver */
.scroll-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.scroll-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 2: Verify dev server compiles**

Run: `cd /Users/iansaberon/Documents/projects/exploration/telaSourcePH/web && npx next build --no-lint 2>&1 | head -20`
Expected: No CSS compilation errors

- [ ] **Step 3: Commit**

```bash
cd /Users/iansaberon/Documents/projects/exploration/telaSourcePH
git add web/app/globals.css
git commit -m "style: update design tokens to Modern Warmth palette"
```

---

### Task 2: Update Layout (Header, Footer, Fonts)

**Files:**
- Modify: `web/app/layout.tsx`

- [ ] **Step 1: Replace layout.tsx with new header/footer design**

```tsx
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
              <li>Monday – Saturday</li>
              <li>8:00 AM – 6:00 PM</li>
              <li>Based in Manila, delivering across Luzon</li>
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
```

- [ ] **Step 2: Verify in browser**

Run: Open `http://localhost:3000` — check header shows Bricolage Grotesque logo, footer has deep brown bg with warm cream text, golden "4210" shop address.

- [ ] **Step 3: Commit**

```bash
cd /Users/iansaberon/Documents/projects/exploration/telaSourcePH
git add web/app/layout.tsx
git commit -m "style: redesign header/footer with Modern Warmth theme"
```

---

### Task 3: Create ScrollReveal Client Component

**Files:**
- Create: `web/app/components/scroll-reveal.tsx`

- [ ] **Step 1: Create the scroll reveal wrapper component**

```tsx
"use client";

import { useEffect, useRef, ReactNode } from "react";

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`scroll-reveal ${className}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/iansaberon/Documents/projects/exploration/telaSourcePH
git add web/app/components/scroll-reveal.tsx
git commit -m "feat: add ScrollReveal component for scroll-triggered animations"
```

---

### Task 4: Redesign Home Page

**Files:**
- Modify: `web/app/page.tsx`

This is the largest task. The complete file replaces all 6 sections with the Modern Warmth design.

- [ ] **Step 1: Replace page.tsx with redesigned home page**

```tsx
import Link from "next/link";
import ScrollReveal from "./components/scroll-reveal";

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden px-4 py-20 text-cream md:py-32"
      style={{
        background: `
          radial-gradient(ellipse at 20% 30%, rgba(196,102,46,0.15) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 80%, rgba(218,165,32,0.1) 0%, transparent 50%),
          #2C1810
        `,
        backgroundImage: `
          radial-gradient(ellipse at 20% 30%, rgba(196,102,46,0.15) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 80%, rgba(218,165,32,0.1) 0%, transparent 50%),
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30Z' fill='none' stroke='%23C4662E' stroke-width='0.3' opacity='0.06'/%3E%3C/svg%3E")
        `,
      }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="animate-fade-in-up mb-4 text-sm font-semibold tracking-widest text-accent uppercase md:text-base">
          Mabuhay!
        </p>
        <h1 className="animate-fade-in-up animate-delay-100 mb-6 text-[2rem] font-extrabold leading-tight md:text-[3rem] lg:text-[3.5rem]">
          Send us your fabric list.
          <br />
          <span className="text-primary">
            We&apos;ll find the best price for you.
          </span>
        </h1>
        <p className="animate-fade-in-up animate-delay-200 mx-auto mb-10 max-w-2xl text-base text-text-muted md:text-lg">
          Skip the hassle of going to Divisoria. We source from 50+ suppliers,
          get you the best prices, and deliver fast — all from your phone.
        </p>
        <Link
          href="/upload"
          className="animate-fade-in-up animate-delay-300 inline-block rounded-full bg-gradient-to-r from-primary to-accent px-8 py-4 text-lg font-bold text-cream shadow-[0_4px_20px_rgba(196,102,46,0.4)] transition hover:scale-[1.02] hover:shadow-[0_6px_30px_rgba(196,102,46,0.5)]"
        >
          Upload Your List Now
        </Link>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      icon: (
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
      ),
      title: "Send Your List",
      description: "Upload a photo of your handwritten fabric list or type it in our form. It takes less than 2 minutes.",
    },
    {
      number: "2",
      icon: (
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      ),
      title: "We Source It",
      description: "Our team compares prices across 50+ trusted Divisoria suppliers and negotiates the best deal for you. Less hassle, better prices.",
    },
    {
      number: "3",
      icon: (
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h.586c.38 0 .748.138 1.032.393l1.896 1.703c.284.255.652.393 1.032.393h6.158c.38 0 .748-.138 1.032-.393l1.896-1.703a1.5 1.5 0 011.032-.393h.586m-15.25 0V6.375c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v7.875" />
        </svg>
      ),
      title: "We Deliver",
      description: "Receive everything in one consolidated delivery with a full itemized quotation. No surprises.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-cream px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="mb-4 text-center text-[1.75rem] font-extrabold text-text md:text-[2.25rem]">
            How It Works
          </h2>
          <p className="mx-auto mb-14 max-w-xl text-center text-text-light">
            Three simple steps from your list to your door.
          </p>
        </ScrollReveal>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 100}>
              <div className="rounded-xl border border-cream-dark bg-white p-8 text-center shadow-[0_2px_12px_rgba(44,24,16,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(44,24,16,0.1)]">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-cream">
                  {step.icon}
                </div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.65rem] font-bold text-cream">
                    {step.number}
                  </span>
                  <span className="text-xs font-semibold text-primary">
                    Step {step.number}
                  </span>
                </div>
                <h3 className="mb-3 mt-2 text-xl font-bold text-text">
                  {step.title}
                </h3>
                <p className="text-text-light">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Save Time",
      description: "No need to visit Divisoria yourself. We do all the legwork so you can focus on running your business.",
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      ),
      title: "Best Prices",
      description: "We source the best price across 50+ suppliers and negotiate bulk rates you won't get on your own.",
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
      title: "One Delivery",
      description: "All your fabrics from different suppliers consolidated into a single shipment. Fast and efficient.",
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Transparent Pricing",
      description: "Receive an itemized quotation before you confirm. No hidden fees, no surprises.",
    },
  ];

  return (
    <section className="bg-cream-dark px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="mb-4 text-center text-[1.75rem] font-extrabold text-text md:text-[2.25rem]">
            Why Choose TelaSource PH
          </h2>
          <p className="mx-auto mb-14 max-w-xl text-center text-text-light">
            Best prices, less hassle, fast and efficient — we do it all for you.
          </p>
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <ScrollReveal key={benefit.title} delay={i * 80}>
              <div className="rounded-xl bg-white p-6 shadow-[0_2px_12px_rgba(44,24,16,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(44,24,16,0.1)]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {benefit.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-text">
                  {benefit.title}
                </h3>
                <p className="text-sm text-text-light">{benefit.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const stats = [
    { value: "50+", label: "Trusted Suppliers" },
    { value: "50+", label: "Years in Textiles" },
    { value: "200+", label: "Orders Per Month" },
  ];

  return (
    <section className="bg-dark px-4 py-16 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <h2 className="mb-6 text-[1.75rem] font-extrabold text-cream md:text-[2.25rem]">
            Over 50 Years in the Fabric Business
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-base text-text-muted md:text-lg">
            Our family has been in the textile trade for over 50 years. With
            direct relationships with 50+ Divisoria suppliers, we know the market,
            the pricing, and the quality — so you always get the best deal.
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100}>
              <div className="rounded-xl bg-dark-mid px-4 py-8 text-cream">
                <div className="mb-1 text-3xl font-extrabold text-accent md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-text-muted md:text-sm">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="bg-cream px-4 py-16 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <h2 className="mb-4 text-[1.75rem] font-extrabold text-text md:text-[2.25rem]">
            Contact Us
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-text-light">
            Have questions? Visit our shop or give us a call — we&apos;re happy to
            help!
          </p>
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-3">
          <ScrollReveal delay={0}>
            <div className="rounded-xl bg-white p-6 shadow-[0_2px_12px_rgba(44,24,16,0.06)]">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0a2.994 2.994 0 00.344-1.153L3.75 3.75h16.5l.406 4.446a3 3 0 00.344 1.153" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-text">Our Shop</h3>
              <p className="text-lg font-bold text-accent">4210</p>
              <p className="text-sm text-text-light">Divisoria, Manila</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="rounded-xl bg-white p-6 shadow-[0_2px_12px_rgba(44,24,16,0.06)]">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-text">Call or Message</h3>
              <p className="text-lg font-bold text-primary">0917 328 7704</p>
              <p className="text-sm text-text-light">Viber / Call / Text</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="rounded-xl bg-white p-6 shadow-[0_2px_12px_rgba(44,24,16,0.06)]">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-text">Business Hours</h3>
              <p className="text-sm text-text-light">Monday – Saturday</p>
              <p className="text-sm text-text-light">8:00 AM – 6:00 PM</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-dark px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-extrabold text-cream md:text-4xl">
          Ready to source your fabrics?
        </h2>
        <p className="mb-8 text-lg text-cream/80">
          Upload your list now and get a quotation within 24 hours.
        </p>
        <Link
          href="/upload"
          className="inline-block rounded-full bg-cream px-8 py-4 text-lg font-bold text-primary shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
        >
          Upload Your List Now
        </Link>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <BenefitsSection />
      <TrustSection />
      <ContactSection />
      <CTASection />
    </>
  );
}
```

- [ ] **Step 2: Verify in browser**

Run: Open `http://localhost:3000` — check:
- Hero: deep brown bg with fabric weave texture, "Mabuhay!" in gold, terracotta gradient CTA button
- How It Works: warm cream bg, pill step badges, scroll animations
- Benefits: darker cream bg, white cards with warm shadows
- Trust: deep brown bg, golden amber stat numbers
- Contact: warm cream, white cards, golden "4210"
- CTA: terracotta gradient bg, cream button

- [ ] **Step 3: Commit**

```bash
cd /Users/iansaberon/Documents/projects/exploration/telaSourcePH
git add web/app/page.tsx web/app/components/scroll-reveal.tsx
git commit -m "style: redesign home page with Modern Warmth aesthetic"
```

---

### Task 5: Restyle Upload Form

**Files:**
- Modify: `web/app/upload/page.tsx`

- [ ] **Step 1: Update Tailwind classes for warm styling**

Only CSS class changes — no logic changes. Replace the `inputClass` and section/form wrapper classes:

Replace the `inputClass` constant (line 190-191):
```tsx
const inputClass =
  "w-full rounded-lg border border-[#D4C4B0] bg-white px-4 py-3 text-base text-text transition focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none";
```

Replace the outer `<section>` class (line 193-194):
```tsx
<section className="bg-cream px-4 py-12 md:py-20">
```

Replace the heading class (line 197):
```tsx
<h1 className="mb-3 text-3xl font-extrabold text-text md:text-4xl">
```

Replace the form wrapper class (line 208):
```tsx
className="space-y-6 rounded-xl bg-white p-6 shadow-[0_2px_12px_rgba(44,24,16,0.06)] md:p-10"
```

Replace label classes — change all `text-primary` on labels to `text-text`:
```tsx
className="mb-1.5 block text-sm font-semibold text-text"
```

Replace the file upload zone class (line 341):
```tsx
className="cursor-pointer rounded-lg border-2 border-dashed border-primary/30 bg-cream p-6 text-center transition hover:border-primary hover:bg-primary/5"
```

Replace the "accent" text on file upload preview:
```tsx
<p className="text-xs text-primary">Click to change</p>
```

Replace the submit button class (line 524-527):
```tsx
className="w-full rounded-full bg-gradient-to-r from-primary to-accent px-6 py-4 text-lg font-bold text-cream shadow-[0_4px_20px_rgba(196,102,46,0.35)] transition hover:scale-[1.02] hover:shadow-[0_6px_30px_rgba(196,102,46,0.45)] disabled:cursor-not-allowed disabled:opacity-60"
```

Replace fabric item row border (line 411):
```tsx
className="flex items-start gap-2 rounded-lg border border-cream-dark bg-cream p-3"
```

Replace "Add Another Fabric" button (line 475-478):
```tsx
className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary/30 py-3 text-sm font-medium text-primary transition hover:border-primary hover:bg-primary/5"
```

Replace error box (line 518):
```tsx
className="rounded-lg bg-error/10 px-4 py-3 text-sm text-error"
```

Replace required asterisk — change all `text-red-500` to `text-error`:
```tsx
<span className="text-error">*</span>
```

Replace inner input borders in fabric items — change `border-gray-300` to `border-[#D4C4B0]` and `focus:border-primary`:
```tsx
className="mb-2 w-full rounded border border-[#D4C4B0] px-3 py-2 text-sm focus:border-primary focus:outline-none"
```
```tsx
className="w-20 rounded border border-[#D4C4B0] px-3 py-2 text-sm focus:border-primary focus:outline-none"
```
```tsx
className="rounded border border-[#D4C4B0] px-3 py-2 text-sm focus:border-primary focus:outline-none"
```

Replace the section divider (line 315):
```tsx
className="border-t border-primary/20 pt-2"
```

- [ ] **Step 2: Verify in browser**

Run: Open `http://localhost:3000/upload` — check warm cream bg, terracotta focus rings, pill-shaped gradient submit button, warm input borders.

- [ ] **Step 3: Commit**

```bash
cd /Users/iansaberon/Documents/projects/exploration/telaSourcePH
git add web/app/upload/page.tsx
git commit -m "style: restyle upload form with warm palette"
```

---

### Task 6: Restyle Thank You Page

**Files:**
- Modify: `web/app/thank-you/page.tsx`

- [ ] **Step 1: Replace thank-you page with warm styling**

```tsx
import Link from "next/link";

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <section className="flex min-h-[60vh] items-center bg-cream px-4 py-20">
      <div className="mx-auto max-w-lg text-center">
        <div className="animate-fade-in-up mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success text-white">
          <svg
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        <h1 className="animate-fade-in-up animate-delay-100 mb-4 text-3xl font-extrabold text-text md:text-4xl">
          List Received!
        </h1>

        <p className="animate-fade-in-up animate-delay-200 mb-6 text-lg text-text-light">
          Salamat! We received your fabric list. Our team will review it and send
          you a quotation within <strong className="text-text">24 hours</strong> through your preferred
          messaging app.
        </p>

        {orderId && (
          <div className="animate-fade-in-up animate-delay-300 mb-6 rounded-xl border-l-4 border-accent bg-white px-6 py-4 shadow-[0_2px_12px_rgba(44,24,16,0.06)]">
            <p className="text-sm text-text-light">Your reference number</p>
            <p className="text-xl font-bold text-text">{orderId}</p>
          </div>
        )}

        <div className="animate-fade-in-up animate-delay-300 mb-8 rounded-xl bg-cream-dark px-6 py-4">
          <p className="text-sm text-text-light">
            Questions? Call or message us
          </p>
          <p className="text-lg font-bold text-primary">0917 328 7704</p>
        </div>

        <Link
          href="/"
          className="animate-fade-in-up animate-delay-400 inline-block rounded-full bg-primary px-8 py-3 font-semibold text-cream transition hover:bg-primary-dark"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Run: Open `http://localhost:3000/thank-you?orderId=TS-20260402-001` — check warm cream bg, earthy green check, golden left-border on reference card, terracotta phone, staggered fade animations.

- [ ] **Step 3: Commit**

```bash
cd /Users/iansaberon/Documents/projects/exploration/telaSourcePH
git add web/app/thank-you/page.tsx
git commit -m "style: restyle thank-you page with Modern Warmth theme"
```

---

### Task 7: Final Verification

- [ ] **Step 1: Full site walkthrough**

Open each page and verify:
1. `http://localhost:3000` — Home: all 6 sections styled, scroll animations work, no blue/Inter remnants
2. `http://localhost:3000/upload` — Form: warm inputs, terracotta focus, gradient submit button
3. `http://localhost:3000/thank-you?orderId=TS-TEST-001` — Warm confirmation page
4. Test form submission end-to-end: fill form → submit → lands on thank-you with order ID
5. Mobile responsive: resize browser to 375px width, check all sections stack properly

- [ ] **Step 2: Check for any remaining old colors**

Run: `cd /Users/iansaberon/Documents/projects/exploration/telaSourcePH/web && grep -rn "bg-white\|text-gray-300\|border-gray-200\|border-gray-100\|bg-gray" app/ --include="*.tsx" | head -20`

Review any matches — some `bg-white` is expected (cards), but `text-gray-300` or `border-gray-200` should be replaced with warm equivalents.

- [ ] **Step 3: Final commit if any cleanup needed**

```bash
cd /Users/iansaberon/Documents/projects/exploration/telaSourcePH
git add -A
git commit -m "style: final cleanup for Modern Warmth design"
```
