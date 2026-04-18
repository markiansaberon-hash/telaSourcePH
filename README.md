# TelaSource PH

A B2B fabric sourcing platform for the Philippines. Customers submit their fabric list via the website, and our team sources from 50+ Divisoria suppliers, consolidates, quotes, and delivers.

**Live site:** https://telasourceph.com

## How It Works

1. Customer submits a fabric list (photo, text, or structured items) at `telasourceph.com/upload`
2. Order saves to Vercel Blob + Google Sheets + Telegram notification sent to owner
3. Team sources fabrics from 50+ Divisoria suppliers
4. Quotation sent via customer's preferred messaging app
5. Customer confirms and pays (GCash / Bank Transfer)
6. Consolidated delivery

## Tech Stack

| Component | Service | Cost |
|-----------|---------|------|
| Framework | Next.js 15 (App Router) | — |
| Styling | Tailwind CSS v4 | — |
| Hosting | Vercel | Free |
| File Storage | Vercel Blob | Free (256MB) |
| Analytics | Vercel Analytics + Speed Insights | Free (Hobby tier) |
| Order + Catalog DB | Google Sheets + Apps Script | Free |
| Domain | Porkbun (`telasourceph.com`) | ~₱500/yr |
| DNS + Email | Cloudflare (email routing) | Free |
| Notifications | Telegram Bot | Free |
| Code Storage | GitHub | Free |

## Pages

| Path | Purpose |
|------|---------|
| `/` | Homepage with fabric-rolls hero + Tagalog subtext + sections |
| `/upload` | Order form (3 input methods) |
| `/gallery` | Fabric catalog with multi-image cards, On Sale section, shop photos |
| `/sale` | Fabrics filtered to current promos only |
| `/fabric/[slug]` | Per-fabric detail page with Open Graph + Product JSON-LD (FB/Google/ChatGPT-friendly) |
| `/thank-you` | Order confirmation (noindex) |
| `/admin` | Dashboard: List, Kanban, Gallery, Share tabs (cookie auth) |
| `/sitemap.xml` | Auto-generated sitemap including every fabric |
| `/robots.txt` | Disallows `/admin` and `/thank-you` |

## Infrastructure

```
Customer visits telasourceph.com
    → Cloudflare DNS resolves → Vercel serves the site

Customer submits order
    → File uploads to Vercel Blob (client upload, up to 10MB)
    → Order data saves to Vercel Blob (backup) + Google Sheets (source of truth)
    → Telegram bot notifies owner with full order details
    → Customer sees confirmation + reference number

Admin manages orders at /admin
    → List / Kanban / Gallery / Share tabs
    → Multi-image gallery upload: pick a folder → HEIC → JPEG + resize in browser → direct-to-Blob
    → Share tab: one-click FB / Messenger / Viber / WhatsApp per fabric
    → Team can also edit Sheets directly

Email to orders@telasourceph.com
    → Cloudflare Email Routing → forwards to Gmail
```

## Key Features

- **3 input methods** for orders: photo upload, free text, structured items
- **Multi-image fabric gallery**: comma-separated URLs per fabric, thumbnail strip, full-size lightbox
- **Sale pricing**: optional numeric Sale Price (auto-formatted ₱X/yard) + custom Sale Label
- **Auto "On Sale" section** on `/gallery` and dedicated `/sale` page
- **Per-fabric share pages**: `/fabric/[slug]` with Open Graph image/title/price so FB/Messenger/Viber/WhatsApp/ChatGPT previews render richly
- **Admin-only share**: public cards don't show share buttons; admin dashboard generates shareable links
- **Client-side HEIC conversion + resize**: iPhone photos up to 1600px JPEG before upload — no server processing, no Vercel body-size limit
- **SEO**: sitemap, robots, per-page metadata, Organization + LocalBusiness + Product + BreadcrumbList JSON-LD, `lang="en-PH"`
- **Cookieless analytics** via Vercel (no consent banner required)

## Local Development

```bash
cd web
npm install
npm run dev        # http://localhost:3000
```

## Environment Variables

Set in Vercel dashboard (Settings → Environment Variables):

| Variable | Purpose |
|----------|---------|
| `BLOB_READ_WRITE_TOKEN` | Auto-injected by Vercel Blob store |
| `ADMIN_KEY` | Secret key for admin dashboard + API |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token for order notifications |
| `TELEGRAM_CHAT_ID` | Telegram chat ID to receive notifications |
| `GOOGLE_SHEETS_WEBHOOK` | Apps Script web app URL for Sheets read/write |

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/submit` | POST | Submit an order (JSON body) |
| `/api/upload` | POST | Client upload handler for Vercel Blob |
| `/api/fabrics` | GET | Fetch fabric catalog from Sheets (public, 5min cache) |
| `/api/admin/auth` | POST | Admin login (sets cookie) |
| `/api/admin/orders` | GET | Fetch orders from Sheets (cookie auth) |
| `/api/admin/update-status` | POST | Update order status (cookie auth) |
| `/api/admin/add-comment` | POST | Add comment to order (cookie auth) |
| `/api/admin/update-fabric-list` | POST | Edit fabric list (cookie auth) |
| `/api/admin/update-fabric-notes` | POST | Edit admin fabric notes (cookie auth) |
| `/api/admin/delete-order` | POST | Delete order (cookie auth) |
| `/api/admin/upload-gallery` | POST | Issues client-upload token (cookie auth) |
| `/api/admin/gallery-images` | GET | List gallery images from Blob (cookie auth) |
| `/api/admin/delete-gallery-image` | POST | Delete a blob (cookie auth) |

## Google Sheets: "Fabrics" tab columns

| Col | Header | Type / Notes |
|-----|--------|--------------|
| A | Name | Text |
| B | Price | Number (auto `₱X/yard`) or text fallback |
| C | Image URL | Single image (shop rows) |
| D | Category | `fabric` or `shop` |
| E | Caption | Small sub-note under price |
| F | Active | TRUE/FALSE |
| G | Image URLs | Comma-separated list for fabric rows |
| H | Sale Price | Number (auto red `₱X/yard`) or text |
| I | Sale Label | Badge text (e.g. `SALE`, `-20%`, `PROMO`) |
| J | Yards per roll | Number or text |

An item appears in `/sale` and gets the SALE badge if either H or I has a value.

## Project Files

| File | Description |
|------|-------------|
| `CLAUDE.md` | Detailed developer reference |
| `website-structure.md` | Page-by-page design specs |
| `google-sheets-template.md` | Google Sheets structure |
| `workflow.md` | Operational workflow for the team |
| `message-templates.md` | Viber/WhatsApp message templates |
| `future-roadmap.md` | Phased improvement plan |
| `docs/superpowers/specs/` | Design specs |
| `docs/superpowers/plans/` | Implementation plans |

## Accounts & Services

| Service | Account | Dashboard |
|---------|---------|-----------|
| GitHub | markiansaberon-hash | github.com/markiansaberon-hash/telaSourcePH |
| Vercel | (linked to GitHub) | vercel.com |
| Porkbun | (domain owner) | porkbun.com |
| Cloudflare | (DNS + email) | cloudflare.com |
| Telegram Bot | @telasource_orders_bot | t.me/telasource_orders_bot |

## Marketing

Use the `/marketingtelasourceph` slash command (in Claude Code) to generate a week of Facebook post templates with date suggestions, captions in Taglish, and distribution guidance (page, personal wall, groups). Off-site SEO levers in order of impact:

1. **Google Business Profile** — register at business.google.com, link to `telasourceph.com`
2. **Google Search Console** — submit `https://telasourceph.com/sitemap.xml`
3. **Facebook Page + Groups** — post via admin Share tab; use groups for free reach
4. **Customer reviews** on Google Maps — moves local search rankings fast

## Contact

- Phone: 0917 328 7704
- Email: orders@telasourceph.com
- Shop: 4110, Divisoria, Manila
- Facebook: /4110textilefabric, /telasourcePH
