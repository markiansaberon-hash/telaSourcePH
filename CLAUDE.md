# CLAUDE.md — TelaSourcePH

## Project Overview

TelaSourcePH is a B2B fabric sourcing platform for the Philippines. Customers (fabric shop owners, tailors, resellers) submit fabric lists via the website, and the team sources from 30+ Divisoria suppliers, consolidates, quotes, and delivers.

## Important

- This is a **standalone project**. Never push to `kinetic-technology/risk-console`.
- Push only to the TelaSourcePH GitHub repo (to be configured by owner).

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Storage**: Local CSV files + file uploads (no database)
- **Deployment**: Vercel (free tier)

## Commands

```bash
cd web
npm install          # Install dependencies
npm run dev          # Dev server on localhost:3000
npm run build        # Production build
npm start            # Start production server
```

## Project Structure

```
TelaSourcePH/
├── CLAUDE.md                    # This file
├── README.md                    # Project overview
├── future-roadmap.md            # Phased improvement plan
├── google-sheets-template.md    # Google Sheets structure (for manual tracking)
├── message-templates.md         # Viber/WhatsApp message templates
├── website-structure.md         # Wix/website page specs
├── workflow.md                  # Operational workflow
└── web/                         # Next.js application
    ├── app/
    │   ├── layout.tsx           # Shared header + footer
    │   ├── globals.css          # Tailwind + brand colors
    │   ├── page.tsx             # Homepage
    │   ├── upload/page.tsx      # Order form (3 input methods)
    │   ├── thank-you/page.tsx   # Confirmation page
    │   └── api/
    │       ├── submit/route.ts  # Order submission API
    │       └── orders/route.ts  # CSV download API (admin)
    ├── data/                    # Runtime data (gitignored)
    │   ├── orders.csv           # Order records
    │   ├── order-items.csv      # Structured fabric items
    │   └── uploads/             # Uploaded photos
    ├── package.json
    ├── .env.example
    └── .gitignore

```

## Key Features

- **3 input methods**: Photo upload, text list, or structured item-by-item entry
- **CSV storage**: Orders and items saved to CSV files, downloadable via admin endpoint
- **File uploads**: Stored locally in `data/uploads/`
- **Contact preference**: Customers choose Viber, WhatsApp, Messenger, Text (SMS), or Line
- **Security**: Rate limiting, input sanitization, honeypot bot protection, admin key for downloads

## API Endpoints

- `POST /api/submit` — Submit an order (multipart form data)
- `GET /api/orders?key=ADMIN_KEY` — Download orders CSV
- `GET /api/orders?key=ADMIN_KEY&type=items` — Download order items CSV

## Environment Variables

```
ADMIN_KEY=your-secret-key    # For CSV download access
```

## Coding Style

- TypeScript strict mode
- Tailwind CSS for styling
- Mobile-first design (70%+ users on mobile)
- Keep it simple — this is an MVP, avoid over-engineering
