# FabricHub PH — Google Sheets Backend Template

## Sheet Setup

Create a Google Sheet named: **"FabricHub PH — Order Management"**

Share with all team members (Editor access). Bookmark it.

---

## Tab 1: Orders (Master Tracker)

### Columns

| Col | Header | Format | Data Source | Notes |
|-----|--------|--------|-------------|-------|
| A | Order ID | Text | Formula | Auto-generated: `FH-YYYYMMDD-001` |
| B | Date Submitted | Date | Form/Zapier | Auto-populated from form submission |
| C | Customer Name | Text | Form | |
| D | Phone | Text | Form | Viber/WhatsApp number |
| E | Contact Via | Dropdown | Form | Viber / WhatsApp / Messenger / Text (SMS) / Line |
| F | Location | Text | Form | Delivery area |
| G | Fabric List (Text) | Text | Form | Customer's typed list (if provided) |
| H | Image Link | URL | Form/Drive | Link to uploaded photo in Google Drive |
| I | Status | Dropdown | Manual | New / Sourcing / Quoted / Confirmed / Delivered / Cancelled |
| J | Assigned Staff | Dropdown | Manual | Team member responsible |
| K | Quotation Sent | Date | Manual | Date quotation was sent to customer |
| L | Confirmed Date | Date | Manual | Date customer confirmed |
| M | Delivery Date | Date | Manual | Actual delivery date |
| N | Total Amount (PHP) | Currency | Formula | Auto-calculated from Order Details |
| O | Notes | Text | Manual | Internal notes |

### Formulas

**Order ID (Column A):**
```
=IF(B2="","","FH-" & TEXT(B2,"YYYYMMDD") & "-" & TEXT(ROW()-1,"000"))
```

**Total Amount (Column N):**
```
=IF(A2="","",SUMIF('Order Details'!A:A, A2, 'Order Details'!H:H))
```
This sums the Customer Price column from Order Details for the matching Order ID.

### Data Validation (Dropdowns)

**Contact Via (Column E):**
- List of items: `Viber, WhatsApp, Messenger, Text (SMS), Line`

**Status (Column I):**
- List of items: `New, Sourcing, Quoted, Confirmed, Delivered, Cancelled`

**Assigned Staff (Column J):**
- List of items: Add your team member names (e.g., `Maria, Jose, Anna`)

### Conditional Formatting Rules

Apply to the entire row (A:O), based on Column I value:

| Status | Background Color | Hex Code |
|--------|-----------------|----------|
| New | Light Red | #F4CCCC |
| Sourcing | Light Yellow | #FFF2CC |
| Quoted | Light Blue | #CFE2F3 |
| Confirmed | Light Green | #D9EAD3 |
| Delivered | Light Grey | #D9D9D9 |
| Cancelled | Strikethrough text | — |

**How to set up:** Format → Conditional formatting → Custom formula:
- For "New": `=$I2="New"` → Background: #F4CCCC
- For "Sourcing": `=$I2="Sourcing"` → Background: #FFF2CC
- Repeat for each status

### Filters

Create a **Filter View** (Data → Create filter view) called "New Orders Only":
- Filter Column I where Status = "New"

Create another Filter View called "Active Orders":
- Filter Column I where Status is NOT "Delivered" and NOT "Cancelled"

---

## Tab 2: Order Details (Line Items)

### Columns

| Col | Header | Format | Data Source | Notes |
|-----|--------|--------|-------------|-------|
| A | Order ID | Text | Manual/Dropdown | Must match an Order ID from Orders tab |
| B | Fabric Name | Text | Manual | e.g., "Oxford White", "Katsa Black" |
| C | Quantity | Number | Manual | |
| D | Unit | Dropdown | Manual | Yards / Meters / Rolls / Pieces |
| E | Unit Price (PHP) | Currency | Manual | Supplier's price per unit |
| F | Line Total (PHP) | Currency | Formula | Quantity × Unit Price |
| G | Markup % | Percentage | Manual | Default 15-20% |
| H | Customer Price (PHP) | Currency | Formula | Line Total × (1 + Markup) |
| I | Supplier | Dropdown | Manual | From Suppliers tab |
| J | Availability | Dropdown | Manual | Available / Out of Stock / Partial / Checking |
| K | Notes | Text | Manual | e.g., "Only 40 yards available" |

### Formulas

**Line Total (Column F):**
```
=IF(C2="","",C2*E2)
```

**Customer Price (Column H):**
```
=IF(F2="","",F2*(1+G2))
```

### Data Validation

**Order ID (Column A):**
- List from range: `Orders!A2:A` (creates dropdown of existing Order IDs)

**Unit (Column D):**
- List of items: `Yards, Meters, Rolls, Pieces`

**Availability (Column J):**
- List of items: `Available, Out of Stock, Partial, Checking`

**Supplier (Column I):**
- List from range: `Suppliers!B2:B` (supplier names from Suppliers tab)

### Default Values

- **Markup % (Column G):** Pre-fill with `0.15` (15%) — adjust per item as needed

---

## Tab 3: Suppliers

### Columns

| Col | Header | Format | Notes |
|-----|--------|--------|-------|
| A | Supplier ID | Text | Format: S-001, S-002, etc. |
| B | Supplier Name | Text | Store or stall name |
| C | Contact Person | Text | Primary contact |
| D | Phone / Viber | Text | Contact number |
| E | Location | Text | Divisoria stall number, building, or area |
| F | Fabric Speciality | Text | e.g., "Cotton, Oxford, Linen" |
| G | Payment Terms | Text | e.g., "Cash on pickup", "7-day credit" |
| H | Last Updated | Date | When this record was last verified |
| I | Reliability Score | Dropdown | A (Excellent) / B (Good) / C (Fair) / D (Unreliable) |
| J | Notes | Text | e.g., "Closed Sundays", "Best for bulk Oxford" |

### Data Validation

**Reliability Score (Column I):**
- List of items: `A - Excellent, B - Good, C - Fair, D - Unreliable`

### Sample Data

| ID | Name | Contact | Phone | Location | Speciality | Terms | Reliability |
|----|------|---------|-------|----------|------------|-------|-------------|
| S-001 | Tela ni Aling Rosa | Rosa Santos | 09171234567 | 168 Mall, Stall 23 | Cotton, Oxford, TC | Cash on pickup | A - Excellent |
| S-002 | JM Fabrics | Jun Mendoza | 09181234567 | Tabora St, 2nd floor | Linen, Silk, Satin | 7-day credit | B - Good |
| S-003 | Divisoria Textile Hub | Mike Tan | 09191234567 | 999 Mall, Stall 5 | Katsa, Canvas, Denim | Cash on pickup | A - Excellent |

---

## Tab 4: Price History

### Columns

| Col | Header | Format | Notes |
|-----|--------|--------|-------|
| A | Date | Date | When the price was checked |
| B | Fabric Name | Text | Standardized name |
| C | Supplier | Text | Supplier name |
| D | Unit Price (PHP) | Currency | Price per unit |
| E | Unit | Text | Yards / Meters / Rolls |
| F | Notes | Text | e.g., "Price increased", "Promo price" |

### Usage

Log every price check here, even if you don't use that supplier for the order. Over time this becomes your pricing intelligence database.

### Useful Formula — Latest Price Lookup

Add this to a helper area or a separate "Quick Quote" section:

```
=IFERROR(INDEX(D:D, MATCH(1, (B:B="Oxford White")*(C:C="Tela ni Aling Rosa"), 0)), "No data")
```

This is an array formula (press Ctrl+Shift+Enter) that finds the most recent price for a specific fabric from a specific supplier.

**Simpler alternative** — sort by Date descending, then use:
```
=VLOOKUP("Oxford White", B:D, 3, FALSE)
```
This returns the first match (most recent if sorted).

---

## Setup Checklist

1. [ ] Create Google Sheet with 4 tabs named exactly: `Orders`, `Order Details`, `Suppliers`, `Price History`
2. [ ] Set up columns and headers for each tab as specified above
3. [ ] Add formulas to calculated columns (Order ID, Line Total, Customer Price, Total Amount)
4. [ ] Set up data validation dropdowns for all dropdown columns
5. [ ] Apply conditional formatting to Orders tab based on Status
6. [ ] Create Filter Views: "New Orders Only" and "Active Orders"
7. [ ] Add sample supplier data to Suppliers tab
8. [ ] Pre-fill Markup % column with 0.15 default
9. [ ] Share sheet with all team members (Editor access)
10. [ ] Connect Google Form or Wix Form to auto-populate Orders tab
11. [ ] Test: submit a test form entry and verify it appears in the Orders tab
12. [ ] Protect formula columns from accidental editing (Data → Protected ranges)
