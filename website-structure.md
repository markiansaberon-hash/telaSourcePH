# FabricHub PH — Website Structure (Wix)

## Site Map

```
fabrichubph.com/
├── Homepage          (landing page with CTA)
├── Upload Your List  (order form)
└── Thank You         (confirmation after submission)
```

---

## Page 1: Homepage

### Hero Section

**Layout:** Full-width background image (organized fabric rolls or Divisoria market scene)

```
┌──────────────────────────────────────────────────┐
│                                                    │
│   Send your fabric list.                           │
│   We source everything for you.                    │
│                                                    │
│   No need to go to Divisoria. Upload your list,    │
│   get a quotation, and we deliver.                 │
│                                                    │
│   [ Upload Your List Now ]                         │
│                                                    │
└──────────────────────────────────────────────────┘
```

- **Headline:** "Send your fabric list. We source everything for you."
- **Subtext:** "No need to go to Divisoria. Upload your list, get a quotation, and we deliver."
- **CTA Button:** "Upload Your List Now" → links to /upload
- **Design Notes:**
  - Large, bold headline (40px+)
  - Button should be bright (orange or green) and large enough for mobile tap
  - Keep text minimal — customers should understand in 5 seconds

---

### How It Works Section

**Layout:** 3 columns with icons (or stacked on mobile)

```
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│   📤 Step 1     │  │   🔍 Step 2     │  │   🚚 Step 3     │
│                 │  │                 │  │                 │
│  Send Your List │  │  We Source It   │  │  We Deliver     │
│                 │  │                 │  │                 │
│  Upload a photo │  │  Our team finds │  │  Receive        │
│  of your fabric │  │  the best       │  │  everything in  │
│  list or type   │  │  prices from    │  │  one delivery   │
│  it in our form │  │  30+ Divisoria  │  │  with a full    │
│                 │  │  suppliers      │  │  quotation      │
└────────────────┘  └────────────────┘  └────────────────┘
```

| Step | Icon | Title | Description |
|------|------|-------|-------------|
| 1 | Upload/camera icon | **Send Your List** | Upload a photo of your fabric list or type it in our form |
| 2 | Magnifying glass icon | **We Source It** | Our team finds the best prices from 30+ trusted Divisoria suppliers |
| 3 | Delivery truck icon | **We Deliver** | Receive everything in one consolidated delivery with full quotation |

---

### Why Use FabricHub PH Section

**Layout:** 4 benefit cards in a grid (2x2 on desktop, stacked on mobile)

| Icon | Benefit | Description |
|------|---------|-------------|
| Clock | **Save Time** | No need to visit multiple suppliers. We do the legwork for you. |
| Peso sign | **Better Prices** | We negotiate bulk across orders for competitive rates. |
| Box | **One Delivery** | All your fabrics consolidated in a single shipment. |
| Checklist | **Transparent Pricing** | Itemized quotation before you confirm. No hidden fees. |

---

### Trust Section

**Layout:** Left text + right image (or full-width with centered text)

```
┌──────────────────────────────────────────────────┐
│                                                    │
│   3 Generations in the Fabric Business             │
│                                                    │
│   Our family has been in the textile trade for     │
│   over 30 years. We have direct relationships      │
│   with 30+ Divisoria suppliers. We know the        │
│   market, the pricing, and the quality.            │
│                                                    │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│   │  30+     │ │  3       │ │  500+    │         │
│   │ Suppliers│ │Generations│ │ Orders   │         │
│   └──────────┘ └──────────┘ └──────────┘         │
│                                                    │
└──────────────────────────────────────────────────┘
```

- **Headline:** "3 Generations in the Fabric Business"
- **Body:** "Our family has been in the textile trade for over 30 years. We have direct relationships with 30+ Divisoria suppliers. We know the market, the pricing, and the quality."
- **Stats Row:** `30+ Suppliers | 3 Generations | 500+ Orders Fulfilled`
- **Optional:** Team photo or Divisoria stall photo

---

### Final CTA Section

```
┌──────────────────────────────────────────────────┐
│                                                    │
│   Ready to source your fabrics?                    │
│                                                    │
│   [ Upload Your List Now ]                         │
│                                                    │
└──────────────────────────────────────────────────┘
```

---

### Footer

```
┌──────────────────────────────────────────────────┐
│  FabricHub PH                                      │
│                                                    │
│  Viber/WhatsApp: 09XX XXX XXXX                     │
│  Facebook: facebook.com/fabrichubph                │
│  Email: orders@fabrichubph.com                     │
│                                                    │
│  Hours: Mon–Sat, 8AM–6PM                           │
│  Based in Manila, delivering across Luzon          │
└──────────────────────────────────────────────────┘
```

---

## Page 2: Upload Your List (Order Form)

### Page Header

- **Title:** "Submit Your Fabric List"
- **Subtitle:** "Upload a photo or type your list below. We'll get back to you within 24 hours with a quotation."

### Form Fields

| # | Field | Type | Required | Placeholder / Helper Text |
|---|-------|------|----------|--------------------------|
| 1 | Full Name | Text input | Yes | "Your full name" |
| 2 | Phone Number (Viber/WhatsApp) | Text input | Yes | "09XX XXX XXXX" |
| 3 | Location / Delivery Area | Dropdown | Yes | Options: Manila, Bulacan, Cavite, Laguna, Rizal, Pampanga, Cebu, Other |
| 4 | Upload Fabric List (Photo) | File upload | Yes | Helper: "Take a clear photo of your handwritten list" / Accept: JPG, PNG, PDF / Max: 10MB |
| 5 | Type Your List (Optional) | Textarea | No | "e.g. Oxford white 50 yards, Katsa black 20 yards" |
| 6 | Special Notes | Textarea | No | "e.g. Need by Friday, prefer supplier X, same quality as last order" |

### Submit Button

- Label: **"Submit My List"**
- Color: Same bright CTA color as homepage
- Size: Full-width on mobile

### Implementation Options

**Option A: Embedded Google Form (Recommended for MVP)**
- Create a Google Form with the fields above
- Embed in Wix using an HTML iframe component
- Responses automatically go to Google Sheets
- File uploads go to form owner's Google Drive
- Free, no Zapier needed
- Limitation: styling is limited to Google Form themes

**Option B: Wix Forms + Zapier**
- Use native Wix Form builder (more control over design)
- Connect to Google Sheets via Zapier free tier (100 tasks/month)
- File uploads stored in Wix media
- Need to manually copy image links or set up Zapier to handle them
- Better design control but requires Zapier setup

**Recommendation:** Start with Option A (Google Form embed) for zero cost and simplicity. Switch to Option B once you need better branding or exceed Google Form limitations.

### Design Notes

- Form should be above the fold on desktop
- On mobile, form should be the only content (no distracting sidebar)
- Add a small note below the form: "Your information is safe with us. We only use it to process your order."

---

## Page 3: Thank You / Success Page

### Layout

```
┌──────────────────────────────────────────────────┐
│                                                    │
│               ✓ (large checkmark)                  │
│                                                    │
│           List Received!                           │
│                                                    │
│   Salamat! We received your fabric list.           │
│   Our team will review it and send you a           │
│   quotation within 24 hours via Viber/WhatsApp.    │
│                                                    │
│   Questions? Message us:                           │
│   Viber: 09XX XXX XXXX                             │
│                                                    │
│   [ Back to Home ]                                 │
│                                                    │
└──────────────────────────────────────────────────┘
```

- **Icon:** Large green checkmark
- **Headline:** "List Received!"
- **Body:** "Salamat! We received your fabric list. Our team will review it and send you a quotation within 24 hours via Viber/WhatsApp."
- **Contact:** "Questions? Message us on Viber: 09XX XXX XXXX"
- **Button:** "Back to Home" → links to homepage

---

## Design Guidelines (Wix)

### Colors
- **Primary:** Deep blue (#1B4D7A) or dark teal — professional, trustworthy
- **Accent/CTA:** Bright orange (#FF6B35) or green (#28A745) — for buttons
- **Background:** White or light grey (#F5F5F5)
- **Text:** Dark grey (#333333)

### Typography
- **Headlines:** Bold sans-serif (e.g., Montserrat, Poppins)
- **Body text:** Regular sans-serif, 16px minimum for readability
- **Mobile:** All text must be readable without zooming

### Mobile-First Design
- 70%+ of users will be on mobile (Philippine market)
- Large tap targets (buttons 48px+ height)
- Single-column layout on mobile
- Fast loading — minimize large images
- Test on slow 4G connections

### Wix Template Recommendation
- Use a simple business/service template
- Strip out unnecessary pages (blog, about, etc.)
- Keep navigation to 3 items max: Home, Upload List, Contact
