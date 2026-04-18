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
- **Storage**: Vercel Blob (files + order JSON backup) + Google Sheets (source of truth for orders + fabric catalog)
- **Notifications**: Telegram Bot (@telasource_orders_bot)
- **Hosting**: Vercel (free tier)
- **Analytics**: Vercel Analytics + Speed Insights (cookieless, no consent banner)
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
    │   ├── layout.tsx           # Header, footer, site-wide SEO metadata, JSON-LD, Analytics, sale banner
    │   ├── globals.css          # Tailwind theme (Modern Warmth palette)
    │   ├── page.tsx             # Homepage (hero w/ fabric photo + Tagalog subtext)
    │   ├── sitemap.ts           # Dynamic sitemap.xml (static pages + every fabric)
    │   ├── robots.ts            # robots.txt — disallow /admin + /thank-you
    │   ├── upload/
    │   │   ├── page.tsx         # Server wrapper — exports metadata
    │   │   └── upload-client.tsx# Order form (3 input methods)
    │   ├── gallery/
    │   │   ├── page.tsx         # Server wrapper — metadata + BreadcrumbList JSON-LD
    │   │   └── gallery-client.tsx # Gallery UI (fabric grid + On Sale section + Our Local Partner Store)
    │   ├── sale/
    │   │   ├── page.tsx         # Server wrapper — metadata
    │   │   └── sale-client.tsx  # Sale-only fabric grid
    │   ├── fabric/[slug]/
    │   │   ├── page.tsx         # Server — generateMetadata + Product/Offer JSON-LD
    │   │   └── fabric-images.tsx# Client gallery w/ thumbnails + lightbox
    │   ├── thank-you/page.tsx   # Confirmation page (noindex)
    │   ├── admin/
    │   │   ├── layout.tsx       # Admin layout (noindex, no public nav)
    │   │   └── page.tsx         # Dashboard — List, Kanban, Gallery, Share tabs
    │   ├── lib/
    │   │   └── catalog.ts       # fetchCatalog, slugify, formatPrice, isOnSale, etc.
    │   ├── components/
    │   │   ├── scroll-reveal.tsx # Scroll-triggered animation wrapper
    │   │   ├── mobile-menu.tsx   # Hamburger menu (includes red Sale link)
    │   │   ├── gallery-modal.tsx # Checkout popup (shown from /upload)
    │   │   ├── lightbox.tsx      # Full-size image viewer w/ prev/next + keyboard
    │   │   └── share-buttons.tsx # Facebook, Messenger, Viber, WhatsApp, Copy link
    │   └── api/
    │       ├── submit/route.ts  # Order submission → Blob + Sheets + Telegram
    │       ├── upload/route.ts  # Client upload handler (Vercel Blob)
    │       ├── fabrics/route.ts # Public: fetch fabric catalog from Sheets (5min cache)
    │       ├── orders/route.ts  # Legacy: list orders from Blob
    │       └── admin/
    │           ├── auth/route.ts              # Login (sets cookie)
    │           ├── logout/route.ts            # Logout (clears cookie)
    │           ├── orders/route.ts            # Fetch orders from Sheets
    │           ├── update-status/route.ts     # Update order status
    │           ├── add-comment/route.ts       # Add comment to order
    │           ├── update-fabric-list/route.ts  # Edit fabric list
    │           ├── update-fabric-notes/route.ts # Edit admin fabric notes
    │           ├── delete-order/route.ts      # Delete order row
    │           ├── upload-gallery/route.ts    # Issues client-upload tokens (gated by admin cookie)
    │           ├── gallery-images/route.ts    # List uploaded gallery images
    │           └── delete-gallery-image/route.ts # Delete a blob from storage
    ├── public/
    │   └── hero-fabrics.jpg     # Homepage hero + default OG image
    ├── types/
    │   └── heic-convert.d.ts    # (Retained, unused since client-side HEIC is via heic2any)
    ├── package.json             # deps: heic2any (client HEIC→JPEG), @vercel/analytics, @vercel/speed-insights
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
- **Vercel Blob storage**: Files + order JSON backup (client-direct upload bypasses 4.5MB Vercel body limit)
- **Google Sheets**: Source of truth for orders AND fabric catalog — read/write via Apps Script
- **Admin dashboard**: `/admin` — list view, kanban view, gallery upload, Share tab, status updates, editable fabric list, admin fabric notes, delete orders, internal comments
- **Gallery page**: `/gallery` — multi-image fabric cards with thumbnail strip, auto "On Sale" section, Our Local Partner Store section
- **Sale page**: `/sale` — filtered view showing only fabrics with a sale price or label
- **Fabric detail page**: `/fabric/[slug]` — full Open Graph + Product JSON-LD per fabric (server-rendered for FB/Google/ChatGPT previews)
- **Lightbox**: Tap any image to view full size with prev/next navigation
- **Multi-image per fabric**: comma-separated URLs in column G of the Fabrics sheet
- **Sale pricing**: optional Sale Price (auto-formatted as ₱X/yard) + custom Sale Label (e.g. "SALE", "-20%"); red badge + strikethrough on cards
- **Soft Opening Sale banner**: Site-wide red gradient strip above the header linking to `/sale`
- **Admin-only share**: `/admin` → Share tab generates per-fabric share URLs + FB sharing-debugger refresh link
- **Client-side HEIC + resize**: iPhone photos converted to JPEG and resized to max 1600px in the browser before upload (via heic2any + canvas)
- **Folder upload**: Admin can select a folder (e.g. `Geena/`) — all photos grouped under that fabric name, output as comma-separated URLs for paste into column G
- **SEO foundation**: sitemap.xml, robots.txt, per-page metadata, Organization + LocalBusiness + Product + BreadcrumbList JSON-LD, `lang="en-PH"`, Tagalog subtext on homepage
- **Vercel Analytics + Speed Insights**: cookieless, no consent banner required
- **Mobile hamburger menu**: Navigation links visible on all screen sizes
- **Telegram notifications**: Instant push to group chat on new order
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
  → Update status / edit fabric list / admin notes / delete → Sheets
  → Add comment → Sheets
  → Upload gallery images → Vercel Blob (folder upload + HEIC convert + 1600px resize all client-side)
  → Share tab: one-click Facebook/Messenger/Viber/WhatsApp share per fabric
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
- `POST /api/admin/upload-gallery` — Issues client-upload token for Vercel Blob (client uploads directly)
- `GET /api/admin/gallery-images` — List all uploaded gallery images from Blob
- `POST /api/admin/delete-gallery-image` — Delete a blob (body: `{ url }`)

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
| B | Price | Plain number (e.g. `20`) auto-renders as `₱20/yard`. Text renders as-is. |
| C | Image URL | Single thumbnail (mainly for `shop` rows) |
| D | Category | `fabric` or `shop` |
| E | Caption | Optional sub-note shown under price (e.g. "2026-2027") |
| F | Active | TRUE/FALSE — hides item when FALSE |
| G | Image URLs | Comma-separated URL list for fabric rows (multi-image galleries) |
| H | Sale Price | Plain number — auto-rendered as red `₱X/yard` with strikethrough original |
| I | Sale Label | Custom badge text (e.g. "SALE", "-20%", "PROMO"). Fallback: "Sale" |
| J | Yards per roll | Plain number (e.g. `150`) renders as "150 yards per roll"; text renders as-is ("1 Set") |

Sale rule: A row appears in `/sale` and shows the red SALE badge if **either** Sale Price (H) OR Sale Label (I) has a value.

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

`getFabrics()` reads columns A–J and returns `{ name, price, image, category, caption, image_urls, sale_price, sale_label, yards_per_roll, active }`.

Admin key must be set in Apps Script → Project Settings → Script Properties → `ADMIN_KEY`.

## Environment Variables (Vercel)

```
BLOB_READ_WRITE_TOKEN=       # Auto-injected by Vercel Blob store
ADMIN_KEY=                   # Secret key for admin API + Apps Script
TELEGRAM_BOT_TOKEN=          # Telegram bot token
TELEGRAM_CHAT_ID=            # Chat ID for notifications
GOOGLE_SHEETS_WEBHOOK=       # Apps Script web app URL
```

## Marketing / Off-site SEO

Google hasn't indexed the site by default — owner actions:

1. **Google Business Profile** (Maps): register at business.google.com, add shop address + photos + link to `telasourceph.com`. Biggest single lever for PH local search.
2. **Google Search Console**: add site + submit `https://telasourceph.com/sitemap.xml`.
3. **Facebook Page posts** via the admin Share tab — one fabric per post, link to `/fabric/<slug>` or `/sale`.
4. **Groups**: post in PH sewing / school-uniform / buy-sell Groups (not competitor business Pages).
5. Use the `/marketingtelasourceph` slash command to generate weekly Facebook content plans + post templates.

## Deployment

Push to `main` → Vercel auto-deploys → live at telasourceph.com.

## Coding Style

- TypeScript strict mode
- Tailwind CSS for styling (use theme colors, not raw hex)
- Mobile-first design (70%+ users on mobile in PH)
- Keep it simple — this is an MVP
- Server components for any page that needs SEO metadata; split into `<page>-client.tsx` for interactive bodies
