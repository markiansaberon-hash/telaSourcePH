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
- **Storage**: Vercel Blob (files + order JSON backup) + Google Sheets (source of truth for orders)
- **Notifications**: Telegram Bot (@telasource_orders_bot)
- **Hosting**: Vercel (free tier)
- **Domain**: telasourceph.com (Porkbun)
- **DNS + Email**: Cloudflare (free email routing: orders@telasourceph.com → Gmail)

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
├── google-sheets-template.md    # Google Sheets structure
├── message-templates.md         # Viber/WhatsApp message templates
├── website-structure.md         # Page design specs
├── workflow.md                  # Operational workflow
├── design-concepts.html         # A/B/C design comparison page
├── docs/superpowers/
│   ├── specs/                   # Design specifications
│   └── plans/                   # Implementation plans
└── web/                         # Next.js application
    ├── app/
    │   ├── layout.tsx           # Header + footer + fonts + mobile menu
    │   ├── globals.css          # Tailwind theme (Modern Warmth palette)
    │   ├── page.tsx             # Homepage (6 sections)
    │   ├── upload/page.tsx      # Order form (3 input methods)
    │   ├── gallery/page.tsx     # Gallery (fabrics w/ prices + shop photos from Sheets)
    │   ├── thank-you/page.tsx   # Confirmation page
    │   ├── admin/
    │   │   ├── layout.tsx       # Admin layout (noindex, no public nav)
    │   │   └── page.tsx         # Admin dashboard (list + kanban + gallery upload)
    │   ├── components/
    │   │   ├── scroll-reveal.tsx  # Scroll-triggered animation wrapper
    │   │   └── mobile-menu.tsx    # Hamburger menu for mobile nav
    │   └── api/
    │       ├── submit/route.ts  # Order submission → Blob + Sheets + Telegram
    │       ├── upload/route.ts  # Client file upload handler (Vercel Blob)
    │       ├── fabrics/route.ts # Public: fetch fabric catalog from Sheets (5min cache)
    │       ├── orders/route.ts  # Legacy: list orders from Blob
    │       └── admin/
    │           ├── auth/route.ts              # Login (sets cookie)
    │           ├── logout/route.ts            # Logout (clears cookie)
    │           ├── orders/route.ts            # Fetch orders from Sheets
    │           ├── update-status/route.ts     # Update order status in Sheets
    │           ├── add-comment/route.ts       # Add comment to order in Sheets
    │           ├── update-fabric-list/route.ts  # Edit fabric list in Sheets
    │           ├── update-fabric-notes/route.ts # Edit admin fabric notes in Sheets
    │           ├── delete-order/route.ts      # Delete order from Sheets
    │           ├── upload-gallery/route.ts    # Upload gallery image to Vercel Blob
    │           └── gallery-images/route.ts    # List uploaded gallery images from Blob
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
- **Vercel Blob storage**: Files as blobs, order JSON as backup — persistent across deploys
- **Google Sheets**: Source of truth for order data — read/write via Apps Script
- **Admin dashboard**: `/admin` — list view, kanban view, gallery upload, status updates, editable fabric list, admin fabric notes, delete orders, internal comments
- **Gallery page**: `/gallery` — fabric catalog with prices + shop photos, fetched from Google Sheets "Fabrics" tab
- **Mobile hamburger menu**: Navigation links visible on all screen sizes
- **Telegram notifications**: Instant push to group chat on new order
- **Scroll animations**: Intersection Observer + CSS keyframes
- **Email**: orders@telasourceph.com → forwards to Gmail via Cloudflare

## Order Flow

```
Customer submits order at /upload
  → File uploads to Vercel Blob (client upload, up to 10MB)
  → Order data saves to Vercel Blob (JSON backup)
  → Order row appends to Google Sheets (source of truth)
  → Telegram notification sent to owner
  → Customer sees confirmation + reference number

Admin manages orders at /admin
  → Dashboard reads from Google Sheets via Apps Script
  → Update status → writes to Google Sheets
  → Edit fabric list → writes to Google Sheets
  → Add admin fabric notes (supplier/price) → writes to Google Sheets
  → Add comment → writes to Google Sheets
  → Delete order → removes row from Google Sheets
  → Upload gallery images → Vercel Blob
  → Team can also edit Google Sheets directly
```

## API Endpoints

### Public
- `POST /api/submit` — Submit order (JSON body with optional imageUrl)
- `POST /api/upload` — Client upload handler for Vercel Blob
- `GET /api/fabrics` — Fetch fabric catalog from Sheets "Fabrics" tab (public, 5min cache)

### Admin (cookie auth required)
- `POST /api/admin/auth` — Login, sets HTTP-only cookie (24hr)
- `POST /api/admin/logout` — Logout, clears cookie
- `GET /api/admin/orders` — Fetch all orders from Google Sheets
- `POST /api/admin/update-status` — Update order status in Sheets
- `POST /api/admin/add-comment` — Add timestamped comment in Sheets
- `POST /api/admin/update-fabric-list` — Edit fabric list text in Sheets
- `POST /api/admin/update-fabric-notes` — Edit admin fabric notes in Sheets
- `POST /api/admin/delete-order` — Delete order row from Sheets
- `POST /api/admin/upload-gallery` — Upload gallery image to Vercel Blob
- `GET /api/admin/gallery-images` — List all uploaded gallery images from Blob

### Legacy
- `GET /api/orders?key=ADMIN_KEY&type=list` — Orders from Vercel Blob (JSON)
- `GET /api/orders?key=ADMIN_KEY&type=csv` — Orders from Vercel Blob (CSV)

## Google Sheets Structure

### Tab: "Orders" (was "Sheet1")

| Col | Header | Notes |
|-----|--------|-------|
| A | Order ID | TS-YYYYMMDD-XXX |
| B | Date | ISO timestamp |
| C | Name | Customer name |
| D | Phone | 09XXXXXXXXX |
| E | Contact Via | Viber/WhatsApp/Messenger/Text/Line |
| F | Location | Manila/Bulacan/etc. |
| G | Fabric List | Free text (editable from admin) |
| H | Image URL | Vercel Blob URL |
| I | Notes | Customer notes |
| J | Status | New/In Progress/Ready/Delivered/Paid/Cancelled |
| K | Comments | Timestamped internal comments |
| L | Fabric Notes | Admin-only: supplier names, prices, sourcing notes |

### Tab: "Fabrics" (gallery catalog)

| Col | Header | Notes |
|-----|--------|-------|
| A | Name | Fabric or photo name |
| B | Price | e.g. "PHP 120/yard" |
| C | Image URL | Vercel Blob or Google Drive URL |
| D | Category | "fabric" or "shop" |
| E | Caption | Optional caption (for shop photos) |
| F | Active | TRUE/FALSE — hides item when FALSE |

## Apps Script

URL stored in `GOOGLE_SHEETS_WEBHOOK` env var. Handles:
- `doGet(?action=fabrics)` — Returns active items from "Fabrics" tab (public, no key)
- `doGet(?key=)` — Returns all orders from "Orders" tab as JSON
- `doPost(action: newOrder)` — Appends new order row
- `doPost(action: updateStatus)` — Updates status column (J)
- `doPost(action: addComment)` — Prepends timestamped comment to column (K)
- `doPost(action: updateFabricList)` — Updates fabric list column (G)
- `doPost(action: updateFabricNotes)` — Updates admin fabric notes column (L)
- `doPost(action: deleteOrder)` — Deletes order row

Admin key must be set in Apps Script → Project Settings → Script Properties → `ADMIN_KEY`

## Environment Variables (Vercel)

```
BLOB_READ_WRITE_TOKEN=       # Auto-injected by Vercel Blob store
ADMIN_KEY=                   # Secret key for admin API + Apps Script
TELEGRAM_BOT_TOKEN=          # Telegram bot token
TELEGRAM_CHAT_ID=            # Chat ID for notifications
GOOGLE_SHEETS_WEBHOOK=       # Apps Script web app URL
```

## Deployment

Push to `main` → Vercel auto-deploys → live at telasourceph.com

## Coding Style

- TypeScript strict mode
- Tailwind CSS for styling (use theme colors, not raw hex)
- Mobile-first design (70%+ users on mobile in PH)
- Keep it simple — this is an MVP
