# TelaSource PH — Web App

## Setup

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

```
ADMIN_KEY=your-secret-key
BLOB_READ_WRITE_TOKEN=    # Get from Vercel Blob store
TELEGRAM_BOT_TOKEN=       # From @BotFather on Telegram
TELEGRAM_CHAT_ID=         # Your Telegram chat ID
```

Note: `BLOB_READ_WRITE_TOKEN` is auto-injected when Vercel Blob store is connected to the project. For local development, run `vercel env pull` to get it.

## Deploy to Vercel

Push to GitHub → Vercel auto-deploys. Environment variables are set in Vercel dashboard.

## Storage

All data persists in **Vercel Blob** (not local filesystem):
- `orders/{orderId}/info.json` — order details
- `orders/{orderId}/upload.{ext}` — uploaded photo
- `orders/log/{orderId}.json` — for listing/CSV export
