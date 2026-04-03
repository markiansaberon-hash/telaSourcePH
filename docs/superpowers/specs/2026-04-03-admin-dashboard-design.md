# Admin Dashboard Design Spec

## Context

TelaSourcePH needs an admin dashboard to manage incoming fabric orders. Currently orders can only be viewed via raw JSON API or Google Sheets. The team needs a web-based dashboard to view orders, update statuses, and add internal comments — while keeping Google Sheets as the single source of truth so non-tech team members can also manage orders there.

## Users

- Ian (owner) + 1-2 team members
- Shared password authentication (same ADMIN_KEY)
- Phase 2: individual staff logins if order volume grows

## Architecture

**Google Sheets = single source of truth.** The dashboard reads from and writes to Sheets via Google Apps Script endpoints. Vercel Blob remains for file storage only.

```
New order → Blob (files) + Sheets (data) + Telegram (notification)

Dashboard reads → Apps Script GET → returns all rows from Sheet
Dashboard writes → Apps Script POST → updates specific row in Sheet
Team edits Sheet directly → dashboard sees changes on next load/refresh
```

## Authentication

- Route: `/admin`
- Password prompt on first visit
- Validates against `ADMIN_KEY` environment variable via server-side API
- Sets HTTP-only cookie (24-hour expiry) on success
- Logout button clears cookie
- No user accounts, no roles — shared password

## Google Sheets Structure

Row 1 headers (add Comments column K to existing sheet):

| Col | Header | Example |
|-----|--------|---------|
| A | Order ID | TS-20260402-123 |
| B | Date | 2026-04-02T14:30:00Z |
| C | Name | Juan dela Cruz |
| D | Phone | 09171234567 |
| E | Contact Via | Viber |
| F | Location | Manila |
| G | Fabric List | Oxford white 50 rolls... |
| H | Image URL | https://blob.vercel-storage.com/... |
| I | Notes | Need by Friday |
| J | Status | New |
| K | Comments | [2026-04-03 10:30] Waiting for supplier X |

## Apps Script Endpoints

Update the existing Apps Script to handle multiple actions:

### GET (read all orders)
- Returns all rows as JSON array
- Sorted newest first by date
- Called by dashboard on page load + every 60 seconds

### POST — action: "newOrder" (existing behavior)
- Appends new row from form submission
- No changes needed

### POST — action: "updateStatus"
- Body: `{ action: "updateStatus", orderId: "TS-xxx", status: "In Progress", key: "ADMIN_KEY" }`
- Finds row by Order ID (column A), updates Status column (J)
- Returns `{ result: "ok" }`

### POST — action: "addComment"
- Body: `{ action: "addComment", orderId: "TS-xxx", comment: "text here", key: "ADMIN_KEY" }`
- Finds row by Order ID, prepends timestamped comment to Comments column (K)
- Format: `[YYYY-MM-DD HH:mm] comment text`
- Multiple comments stack in one cell, newest first
- Returns `{ result: "ok" }`

### Authentication for read/write
- GET requests require `?key=ADMIN_KEY` query param
- POST update/comment actions require `key` field in body
- New order POST does not require key (public form submission)

## Dashboard Pages & Components

### `/admin` — Main Dashboard

**Layout:** Standalone layout, no public site header/footer. Shows:
- "TelaSource PH Admin" header with logout button
- View toggle: List | Kanban (top-right)
- Auto-refresh indicator (every 60 seconds)

### List View (default)

**Status filter tabs:**
- All | New | In Progress | Ready | Delivered | Paid | Cancelled
- Each tab shows count badge (e.g. "New (3)")

**Orders table:**
| Column | Content |
|--------|---------|
| Order ID | TS-20260402-123 |
| Date | Apr 2, 2026 (formatted) |
| Name | Juan dela Cruz |
| Phone | 0917 123 4567 |
| Location | Manila |
| Status | Badge with color |

**Click row → expand to show:**
- Fabric list (text)
- Structured items (if any) as a mini table
- Uploaded photo (clickable thumbnail, opens in new tab)
- Customer notes
- Status dropdown (select new status → saves to Sheets)
- Internal comments list (timestamped)
- "Add comment" text input + submit button

### Kanban View

**6 columns:** New, In Progress, Ready, Delivered, Paid, Cancelled

**Cards show:**
- Order ID
- Customer name
- Phone
- Date (relative: "2 hours ago")

**Click card** → opens same expanded detail view (modal or slide panel)

**Drag and drop** between columns → updates status in Sheets

### Status Colors

| Status | Color |
|--------|-------|
| New | Blue/primary |
| In Progress | Amber/accent |
| Ready | Green/success |
| Delivered | Teal |
| Paid | Dark green |
| Cancelled | Red/error |

## Design

- Same "Modern Warmth" palette (terracotta, cream, warm browns)
- Bricolage Grotesque headings, Cabinet Grotesk body
- More utilitarian/clean than public site — less decorative, more data-focused
- Mobile responsive — list view stacks, kanban scrolls horizontally

## API Routes (Next.js)

### `GET /api/admin/orders`
- Requires admin cookie
- Proxies to Apps Script GET endpoint
- Returns JSON array of orders

### `POST /api/admin/update-status`
- Requires admin cookie
- Body: `{ orderId, status }`
- Proxies to Apps Script with action: updateStatus

### `POST /api/admin/add-comment`
- Requires admin cookie
- Body: `{ orderId, comment }`
- Proxies to Apps Script with action: addComment

### `POST /api/admin/auth`
- Body: `{ key }`
- Validates against ADMIN_KEY env var
- Sets HTTP-only cookie on success

### `POST /api/admin/logout`
- Clears admin cookie

## Files to Create/Modify

**Create:**
- `web/app/admin/page.tsx` — Main dashboard page (client component)
- `web/app/admin/layout.tsx` — Admin-specific layout (no public nav)
- `web/app/api/admin/orders/route.ts` — Proxy to Sheets GET
- `web/app/api/admin/update-status/route.ts` — Proxy to Sheets update
- `web/app/api/admin/add-comment/route.ts` — Proxy to Sheets comment
- `web/app/api/admin/auth/route.ts` — Login endpoint
- `web/app/api/admin/logout/route.ts` — Logout endpoint

**Modify:**
- Google Apps Script — Add doGet, updateStatus, addComment handlers
- Google Sheet — Add Comments column (K)

**No changes to:**
- Public pages (home, upload, thank-you)
- Existing submit/upload APIs

## Environment Variables

No new env vars needed. Reuses existing:
- `ADMIN_KEY` — for authentication
- `GOOGLE_SHEETS_WEBHOOK` — Apps Script URL (used for both read and write)

## Verification

1. Login: visit `/admin`, enter key, see dashboard
2. List view: see all orders, filter by status tabs, counts update
3. Expand order: see full details, photo, items, notes
4. Change status: select new status → saves to Sheets → verify in Sheet
5. Add comment: type comment → saves to Sheets → verify in Sheet
6. Kanban view: toggle to kanban, see columns, drag card → status updates
7. Sheets edit: change status in Sheet directly → refresh dashboard → see update
8. Auto-refresh: wait 60 seconds → new orders appear without manual refresh
9. Mobile: check both views on phone-width browser
10. Logout: click logout → redirected to password prompt
