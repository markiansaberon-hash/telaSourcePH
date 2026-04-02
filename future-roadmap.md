# FabricHub PH — Future Improvements Roadmap

## Current State (MVP)

- Wix website with order form
- Google Sheets for order management
- Manual sourcing via Viber/phone calls
- Manual quotation via copy-paste messages
- Manual delivery coordination

---

## Phase 1: Reduce Errors (Month 1-2)

**Goal:** Bring error rate from 5% to under 2%

### Problem: Handwritten Lists Are Hard to Read

**Solution:** Add a structured input option alongside the photo upload.

- Add a repeatable field group in Google Form:
  - Fabric Name (text)
  - Color (text)
  - Quantity (number)
  - Unit (dropdown: yards/meters/rolls)
- Keep the photo upload option as primary (customers prefer it)
- Use the structured fields as a "backup" or for customers who prefer typing
- Implementation: Google Form with "Add another item" section, or switch to Tally.so (free, supports repeatable groups)

### Problem: Wrong Fabric Sourced

**Solution:** Add a verification step before purchasing.

- After sourcing, send the customer a photo of the fabric swatch or sample
- Message: "Is this the Oxford White you need? Please confirm before we buy."
- Only purchase after customer confirms
- This adds ~2-4 hours to turnaround but prevents costly returns

### Problem: Quantity Mistakes

**Solution:** Send back the parsed list for customer verification.

- After reading the handwritten list, type it out in the quotation
- Include a line: "Please verify: Is this what you ordered?"
- Customer confirms the list is correct → then proceed to sourcing

### Problem: Duplicate Items

**Solution:** Add a simple de-duplication check.

- In Google Sheets Order Details, add conditional formatting:
  - Highlight duplicate Fabric Name values within the same Order ID
  - Formula: `=COUNTIFS(A:A, A2, B:B, B2) > 1`
- Staff should review highlighted duplicates before sourcing

### Cost: Free | Effort: Low | Impact: High

---

## Phase 2: Track Supplier Pricing (Month 2-3)

**Goal:** Build a pricing database to quote faster and negotiate better

### Price History Logging

- Already built into the Google Sheets template (Tab 4: Price History)
- **Discipline required:** Log every price check, even for fabrics you don't end up buying
- Over 2-3 months, you'll have enough data to spot trends

### Quick Quote Helper Sheet

Create a new tab: "Quick Quote"

| Fabric Name | Last Known Price | Supplier | Date | Suggested Customer Price (with 15% markup) |
|-------------|-----------------|----------|------|---------------------------------------------|
| Auto-populated via VLOOKUP from Price History |

Formula:
```
=VLOOKUP(A2, 'Price History'!B:D, 3, FALSE) * 1.15
```

This gives you instant estimated pricing without calling the supplier first.

### Price Trend Dashboard

- Use Google Sheets built-in Charts to create:
  - Line chart: Price of top 10 fabrics over time
  - Bar chart: Average price by supplier for same fabric
- Helps identify which suppliers are increasing prices and when to switch

### Supplier Scorecards

Update Reliability Score in Suppliers tab monthly based on:
- Price consistency (do they honor quoted prices?)
- Availability (how often is their stock accurate?)
- Quality (returns/complaints per order)
- Communication (response time)

### Cost: Free | Effort: Medium | Impact: High

---

## Phase 3: Scale to 100+ Orders/Month (Month 3-6)

**Goal:** Handle higher volume without proportionally increasing staff

### 3.1 Upgrade Order Form

**Problem:** Google Forms is limited in UX and branding.

**Solution:** Switch to Tally.so or Jotform

| Feature | Google Forms | Tally.so (Free) | Jotform (Free) |
|---------|-------------|-----------------|-----------------|
| Custom branding | Limited | Yes | Yes |
| Repeatable fields | No | Yes | Yes |
| Conditional logic | Basic | Yes | Yes |
| File upload | Yes | Yes | Yes |
| Auto-connect Sheets | Yes | Via Zapier | Via Zapier |
| Embeddable | Yes | Yes | Yes |

**Recommendation:** Tally.so — free, clean UX, supports repeatable fabric entry fields.

### 3.2 Google Apps Script Automations

Add lightweight automations inside Google Sheets (free, no external tools):

**Auto-Assignment (Round Robin):**
```javascript
// In Apps Script: auto-assign new orders to staff in rotation
function autoAssign() {
  var sheet = SpreadsheetApp.getActive().getSheetByName('Orders');
  var staff = ['Maria', 'Jose', 'Anna'];
  var lastRow = sheet.getLastRow();
  var assignCol = 9; // Column I
  for (var i = 2; i <= lastRow; i++) {
    if (sheet.getRange(i, assignCol).getValue() === '') {
      var staffIndex = (i - 2) % staff.length;
      sheet.getRange(i, assignCol).setValue(staff[staffIndex]);
    }
  }
}
```

**Daily Summary Email:**
```javascript
// Send daily summary of order statuses at 8 AM
function dailySummary() {
  var sheet = SpreadsheetApp.getActive().getSheetByName('Orders');
  var data = sheet.getDataRange().getValues();
  var newCount = data.filter(r => r[7] === 'New').length;
  var sourcingCount = data.filter(r => r[7] === 'Sourcing').length;
  var quotedCount = data.filter(r => r[7] === 'Quoted').length;
  
  var body = 'Good morning! Here is today\'s order summary:\n\n' +
    'New orders: ' + newCount + '\n' +
    'Sourcing: ' + sourcingCount + '\n' +
    'Awaiting confirmation: ' + quotedCount + '\n';
  
  MailApp.sendEmail('team@fabrichubph.com', 'Daily Order Summary', body);
}
```

Set up via: Extensions → Apps Script → Triggers → Time-driven (daily at 8 AM)

**Status Change Notification:**
- Trigger on edit: when Status changes to "Confirmed", auto-send email to purchasing staff

### 3.3 WhatsApp Business API

**When:** Processing 50+ orders/month and manual messaging takes >2 hours/day

- Sign up for WhatsApp Business API (via providers like Twilio, MessageBird, or WATI)
- Cost: ~$0.05-0.10 per message (P3-6 per message)
- Set up template messages for:
  - Order confirmation (auto-send on form submission)
  - Quotation (triggered from Sheets)
  - Delivery notification (triggered from Sheets)

### 3.4 Looker Studio Dashboard

- Connect Google Sheets to Google Looker Studio (free)
- Build a dashboard with:
  - Orders per week/month (trend)
  - Revenue per week/month
  - Average order value
  - Quotation-to-confirmation rate
  - Average turnaround time
  - Top fabrics ordered
  - Supplier usage distribution

### 3.5 Payment Links

- Use GCash or Maya QR code links that auto-fill the amount
- Include the payment link in the quotation message
- Track payments in a new "Payments" tab in Sheets

### Cost: P0-500/month | Effort: Medium-High | Impact: High

---

## Phase 4: Automation Triggers (Month 6+)

**When to introduce automation — trigger conditions:**

| Trigger | Threshold | Action |
|---------|-----------|--------|
| Order volume | 50+ orders/month consistently | Automate assignment + confirmations |
| Messaging time | >2 hours/day on messages | Implement WhatsApp Business API |
| Pricing data | 3+ months of Price History | Build auto-quote suggestions |
| Error rate | Still >3% despite Phase 1 | Implement mandatory verification step |
| Staff capacity | >3 people managing orders | Build role-based access in Sheets |

### Automation Priority List

1. **Auto-send order confirmation** — via WhatsApp API on form submission
2. **Auto-generate quotation text** — Apps Script reads Order Details, formats the message
3. **Auto-assign orders** — round-robin via Apps Script (code above)
4. **Price lookup** — auto-fill last known price when fabric name is entered in Order Details
5. **Status change notifications** — auto-message customer when status changes
6. **Payment tracking** — auto-match GCash reference numbers to orders

---

## Phase 5: Custom Platform (Year 2+)

**Only build this when:**
- Processing 200+ orders/month consistently
- Google Sheets becomes a bottleneck (slow, data integrity issues)
- You need features that Sheets can't provide (customer accounts, real-time tracking)
- Revenue justifies the investment (P50,000+ monthly revenue)

### Recommended Stack

| Component | Tool | Why |
|-----------|------|-----|
| Frontend | Next.js + Tailwind | Fast, modern, mobile-first |
| Backend | Supabase (PostgreSQL) | Free tier, real-time, auth built-in |
| Hosting | Vercel | Free for small projects |
| File storage | Supabase Storage or S3 | For fabric list photos |
| Messaging | WhatsApp Business API | Already set up in Phase 4 |

### Features to Build

**Customer Portal:**
- Account creation (phone number login via OTP)
- Submit fabric list (structured form with photo upload)
- View order history
- Track current order status in real-time
- View and accept quotations online
- Pay online (GCash/Maya integration)

**Admin Dashboard:**
- Order management (replaces Google Sheets)
- Auto-quote generator (based on price history)
- Supplier management
- Revenue and performance analytics
- Staff assignment and workload view

**Supplier Portal (Phase 5b):**
- Receive sourcing requests digitally
- Update availability and pricing
- Reduce phone call overhead

### Estimated Cost

| Item | Monthly Cost |
|------|-------------|
| Supabase (free tier) | P0 |
| Vercel (free tier) | P0 |
| Domain | ~P500/year |
| WhatsApp API | ~P1,500-3,000/mo |
| Developer (freelance) | P50,000-100,000 one-time |
| **Total ongoing** | **~P2,000-3,500/mo** |

---

## Summary Timeline

| Phase | Timeline | Key Deliverable | Cost |
|-------|----------|-----------------|------|
| MVP (Current) | Now | Wix + Google Sheets + Manual workflow | Free – P500/mo |
| Phase 1: Error Reduction | Month 1-2 | Verification steps, structured form | Free |
| Phase 2: Pricing Intelligence | Month 2-3 | Price History tracking, Quick Quote | Free |
| Phase 3: Scale | Month 3-6 | Apps Script automation, Looker Studio | P0-500/mo |
| Phase 4: Messaging Automation | Month 6+ | WhatsApp Business API | P1,500-3,000/mo |
| Phase 5: Custom Platform | Year 2+ | Full web app with customer portal | P50,000-100,000 build |

---

## Decision Framework

Before investing in any upgrade, ask:

1. **Is this solving a real problem we have NOW?** (Not a hypothetical future problem)
2. **Can we solve it with a free/low-cost tool first?** (Sheets formula, Zapier, Apps Script)
3. **Will this save us more time/money than it costs?** (ROI > 3 months)
4. **Do we have the volume to justify it?** (Don't automate a 10-order/month process)

**Rule of thumb:** If you're spending more than 1 hour/day on a repetitive task, it's worth automating. If not, keep it manual.
