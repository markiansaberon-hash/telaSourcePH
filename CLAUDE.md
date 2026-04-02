# CLAUDE.md — TelaSourcePH

## Project Overview

TelaSourcePH is a B2B fabric sourcing platform for the Philippines. Customers (fabric shop owners, tailors, resellers) submit fabric lists via the website. The team sources from 50+ Divisoria suppliers, consolidates, quotes, and delivers.

**Live site:** https://telasourceph.com
**GitHub:** https://github.com/markiansaberon-hash/telaSourcePH

## Important

- This is a **standalone project**. Never push to `kinetic-technology/risk-console`.
- Push only to `markiansaberon-hash/telaSourcePH`
- Git credential: `isaberon-envisso` (added as collaborator)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Fonts**: Bricolage Grotesque (headings) + Cabinet Grotesk (body)
- **Storage**: Vercel Blob (files + order JSON)
- **Notifications**: Telegram Bot (@telasource_orders_bot)
- **Hosting**: Vercel (free tier)
- **Domain**: telasourceph.com (Porkbun)
- **DNS + Email**: Cloudflare (free email routing → Gmail)

## Commands

```bash
cd web
npm install          # Install dependencies
npm run dev          # Dev server on localhost:3000
npm run build        # Production build
```

## Project Structure

```
TelaSourcePH/
├── CLAUDE.md                    # This file
├── README.md                    # Project overview + infrastructure
├── future-roadmap.md            # Phased improvement plan
├── google-sheets-template.md    # Google Sheets structure (future)
├── message-templates.md         # Viber/WhatsApp message templates
├── website-structure.md         # Page design specs
├── workflow.md                  # Operational workflow
├── design-concepts.html         # A/B/C design comparison page
├── docs/superpowers/
│   ├── specs/                   # Design specifications
│   └── plans/                   # Implementation plans
└── web/                         # Next.js application
    ├── app/
    │   ├── layout.tsx           # Header + footer + font imports
    │   ├── globals.css          # Tailwind theme (Modern Warmth palette)
    │   ├── page.tsx             # Homepage (6 sections)
    │   ├── upload/page.tsx      # Order form (3 input methods)
    │   ├── thank-you/page.tsx   # Confirmation page
    │   ├── components/
    │   │   └── scroll-reveal.tsx # Scroll-triggered animation wrapper
    │   └── api/
    │       ├── submit/route.ts  # Order submission → Blob + Telegram
    │       ├── upload/route.ts  # Client file upload handler (Vercel Blob)
    │       └── orders/route.ts  # Admin: list orders JSON or CSV
    ├── package.json
    ├── .env.example
    └── .gitignore
```

## Design System — "Modern Warmth"

Warm Filipino tindahan personality + modern clean execution.

**Colors:**
- Primary: `#C4662E` (Terracotta)
- Accent: `#DAA520` (Golden amber)
- Dark: `#2C1810` (Deep brown — hero, footer)
- Cream: `#FFF8F0` (Warm cream — backgrounds)
- Text: `#3D2B1F` (Espresso)

**Fonts:** Bricolage Grotesque (headings, 700-800) + Cabinet Grotesk (body, 400)

## Key Features

- **3 input methods**: Photo upload (up to 10MB), text list, or structured item-by-item
- **Vercel Blob storage**: Orders saved as JSON, files as blobs — persistent across deploys
- **Telegram notifications**: Instant push notification on new order with full details
- **Admin API**: View orders as JSON or download as CSV
- **Scroll animations**: Intersection Observer + CSS keyframes
- **Email**: orders@telasourceph.com → forwards to Gmail via Cloudflare

## API Endpoints

- `POST /api/submit` — Submit order (JSON body with optional imageUrl)
- `POST /api/upload` — Client upload handler for Vercel Blob
- `GET /api/orders?key=ADMIN_KEY&type=list` — All orders as JSON
- `GET /api/orders?key=ADMIN_KEY&type=csv` — Download orders CSV

## Environment Variables (Vercel)

```
BLOB_READ_WRITE_TOKEN=   # Auto-injected by Vercel Blob store
ADMIN_KEY=               # Secret key for admin API
TELEGRAM_BOT_TOKEN=      # Telegram bot token
TELEGRAM_CHAT_ID=        # Chat ID for notifications
```

## Deployment

Push to `main` → Vercel auto-deploys → live at telasourceph.com

## Coding Style

- TypeScript strict mode
- Tailwind CSS for styling (use theme colors, not raw hex)
- Mobile-first design (70%+ users on mobile in PH)
- Keep it simple — this is an MVP
