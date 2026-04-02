# TelaSource PH

A B2B fabric sourcing platform for the Philippines. Customers submit their fabric list via the website, and our team sources from 50+ Divisoria suppliers, consolidates, quotes, and delivers.

**Live site:** https://telasourceph.com

## How It Works

1. Customer submits a fabric list (photo, text, or structured items) at `telasourceph.com/upload`
2. Order saves to Vercel Blob + Telegram notification sent to owner
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
| Domain | Porkbun (`telasourceph.com`) | ~₱500/yr |
| DNS + Email | Cloudflare (email routing) | Free |
| Notifications | Telegram Bot | Free |
| Code Storage | GitHub | Free |

## Infrastructure

```
Customer visits telasourceph.com
    → Cloudflare DNS resolves → Vercel serves the site
    
Customer submits order
    → File uploads to Vercel Blob (client upload, up to 10MB)
    → Order data saves to Vercel Blob as JSON
    → Telegram bot notifies owner with full order details
    → Customer sees confirmation + reference number

Email to orders@telasourceph.com
    → Cloudflare Email Routing → forwards to Gmail
```

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
| `ADMIN_KEY` | Secret key for admin orders API |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token for order notifications |
| `TELEGRAM_CHAT_ID` | Telegram chat ID to receive notifications |

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/submit` | POST | Submit an order (JSON body) |
| `/api/upload` | POST | Client upload handler for Vercel Blob |
| `/api/orders?key=KEY&type=list` | GET | List all orders (JSON) |
| `/api/orders?key=KEY&type=csv` | GET | Download orders as CSV |

## Project Files

| File | Description |
|------|-------------|
| `website-structure.md` | Page-by-page design specs |
| `google-sheets-template.md` | Google Sheets structure (future integration) |
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

## Contact

- Phone: 0917 328 7704
- Email: orders@telasourceph.com
- Shop: 4210, Divisoria, Manila
