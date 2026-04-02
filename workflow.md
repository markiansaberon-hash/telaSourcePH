# FabricHub PH — Operational Workflow

## Overview

This document defines the daily operational workflow for the FabricHub PH team — from receiving a customer's fabric list to delivering the order.

---

## Customer Journey

```
┌─────────────────┐
│ Customer submits │
│ fabric list via  │
│ website form     │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Auto-logged to   │
│ Google Sheets    │
│ (Status: New)    │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Customer gets    │
│ Thank You page   │
│ + auto-message   │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Team sources     │
│ fabrics          │
│ (Status: Sourcing)│
└────────┬────────┘
         ▼
┌─────────────────┐
│ Quotation sent   │
│ via Viber/WA     │
│ (Status: Quoted) │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Customer confirms│
│ + pays           │
│ (Status:Confirmed)│
└────────┬────────┘
         ▼
┌─────────────────┐
│ Team purchases + │
│ consolidates     │
│ fabrics          │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Delivery sent    │
│ (Status:Delivered)│
└─────────────────┘
```

---

## Internal Team Workflow (Step-by-Step)

### Step 1: Morning Check — Review New Orders

**When:** Every morning, 8:00 AM
**Who:** Order Manager (or whoever opens the shop first)

1. Open Google Sheets → **Orders** tab
2. Use the "New Orders Only" filter view
3. For each new order:
   - Open the uploaded image (Column G link) — read the fabric list
   - Read the typed list (Column F) if provided
   - Check for any special notes (Column N)

**Output:** Understand what the customer needs.

---

### Step 2: Start Sourcing — Break Down the List

**Status change:** New → **Sourcing**

4. In the **Orders** tab:
   - Change Status (Column H) to "Sourcing"
   - Assign a staff member (Column I)

5. Go to the **Order Details** tab and create line items:
   - Select the Order ID from the dropdown (Column A)
   - Enter each fabric as a separate row:
     - Fabric Name (e.g., "Oxford White")
     - Quantity (e.g., 50)
     - Unit (e.g., Yards)
   - Set Availability to "Checking"

**Tip:** If the handwritten list is unclear, message the customer on Viber to clarify BEFORE sourcing. This prevents errors.

---

### Step 3: Contact Suppliers

**Who:** Sourcing staff

6. For each line item in Order Details:
   - Check **Suppliers** tab for known sources of that fabric type
   - Check **Price History** tab for recent pricing
   - Contact the supplier via Viber or phone call:
     - "Boss, may Oxford White ka pa? Magkano per yard kung 50 yards?"
   - Record the response in Order Details:
     - Unit Price (Column E)
     - Supplier (Column I)
     - Availability (Column J): Available / Out of Stock / Partial

7. If a fabric is **out of stock** at the preferred supplier:
   - Try alternative suppliers (check Suppliers tab for others with same fabric type)
   - Note the alternative and any price difference

8. Log the price in the **Price History** tab:
   - Date, Fabric Name, Supplier, Unit Price, Unit

---

### Step 4: Prepare Quotation

**Who:** Order Manager

9. Review all line items for the order in **Order Details**
10. Verify markup percentage (Column G) — default 15%, adjust if needed
11. Customer Price (Column H) is auto-calculated
12. Check the auto-calculated **Total Amount** in the Orders tab (Column M)
13. Note any issues:
    - Items out of stock
    - Partial availability
    - Price changes from last order

---

### Step 5: Send Quotation

**Status change:** Sourcing → **Quoted**

14. Copy the quotation message template (see `message-templates.md`)
15. Fill in the details from Order Details
16. Send to customer via **Viber or WhatsApp**
17. In the Orders tab:
    - Change Status to "Quoted"
    - Enter Quotation Sent date (Column J)

**Important:** Always include:
- Itemized list with prices
- Delivery fee
- Total amount
- Payment instructions
- Validity period (e.g., "Prices valid for 3 days")
- Any notes about availability issues

---

### Step 6: Handle Customer Response

**Scenario A: Customer Confirms**
- Status change: Quoted → **Confirmed**
- Log Confirmed Date (Column K)
- Proceed to Step 7

**Scenario B: Customer Requests Changes**
- Update line items in Order Details
- Re-calculate totals
- Send updated quotation
- Keep status as "Quoted"

**Scenario C: No Response (48 hours)**
- Send follow-up message (see `message-templates.md`)
- If no response after 2nd follow-up (72 hours total), set status to "Cancelled"

---

### Step 7: Purchase Fabrics

**Who:** Purchasing staff (goes to Divisoria)

18. Print or screenshot the Order Details for confirmed orders
19. Visit suppliers and purchase fabrics:
    - Verify fabric quality matches what was quoted
    - Confirm quantity
    - Get receipt
20. **Quality check:** Take a photo of purchased fabrics
    - Optional: Send photo to customer for verification before delivery
21. Consolidate all items for the order

---

### Step 8: Arrange Delivery

22. Package all fabrics for the order together
23. Label the package with: Order ID, Customer Name, Phone
24. Arrange delivery:
    - **Metro Manila:** Lalamove, Grab, or in-house rider
    - **Provincial:** LBC, J&T, or bus cargo
25. Send delivery notification to customer (see `message-templates.md`)
26. In the Orders tab:
    - Change Status to "Delivered"
    - Enter Delivery Date (Column L)

---

### Step 9: Post-Delivery Follow-Up

27. After 1-2 days, send a follow-up message:
    - "Hi [Name], did you receive your order? Is everything okay?"
    - Ask for feedback
28. Log any issues (wrong fabric, quantity mismatch) in Notes

---

## Daily Routine Summary

| Time | Activity |
|------|----------|
| 8:00 AM | Check new orders, start sourcing |
| 9:00 AM – 12:00 PM | Contact suppliers, get prices |
| 12:00 PM – 1:00 PM | Prepare and send quotations |
| 1:00 PM – 3:00 PM | Process confirmed orders (purchase) |
| 3:00 PM – 5:00 PM | Arrange deliveries, follow-ups |
| 5:00 PM | End-of-day status update in Sheets |

---

## Error Prevention Checklist

Before sending a quotation:
- [ ] Double-check fabric names against the customer's original list/photo
- [ ] Verify quantities match what the customer requested
- [ ] Confirm unit (yards vs. meters vs. rolls) — ask if unclear
- [ ] Check for duplicate items in the list
- [ ] Verify supplier availability is current (checked today)

Before purchasing:
- [ ] Order is confirmed (Status = Confirmed)
- [ ] Customer has paid or payment terms are agreed
- [ ] Fabric specifications are clear (color, weight, type)

Before delivery:
- [ ] All items in the order are present
- [ ] Package is labeled with Order ID and customer info
- [ ] Delivery notification sent to customer

---

## Status Definitions

| Status | Meaning | Who Changes It |
|--------|---------|----------------|
| **New** | Order just received, not yet reviewed | Auto (from form) |
| **Sourcing** | Team is contacting suppliers for prices/availability | Order Manager |
| **Quoted** | Quotation sent to customer, waiting for response | Order Manager |
| **Confirmed** | Customer confirmed and agreed to proceed | Order Manager |
| **Delivered** | Order has been delivered to customer | Delivery staff |
| **Cancelled** | Order cancelled (by customer or no response) | Order Manager |
