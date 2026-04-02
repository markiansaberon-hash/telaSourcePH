# FabricHub PH — Message Templates (Viber / WhatsApp)

## How to Use

Copy-paste these templates into Viber or WhatsApp. Replace the `[bracketed]` placeholders with actual data from Google Sheets.

Save these as "Quick Replies" or "Saved Messages" in your messaging app for faster access.

---

## 1. Order Received Confirmation

**Send when:** Immediately after a new order appears in Google Sheets (or auto-send via Zapier)

```
Hi [Customer Name]! 👋

We received your fabric list (Order #[Order ID]).

Our team is now sourcing your items from our Divisoria suppliers. You'll receive a quotation within 24 hours.

If you have questions, just reply here.

— FabricHub PH
```

---

## 2. Clarification Request

**Send when:** The handwritten list is unclear or you need to confirm details

```
Hi [Customer Name]!

We're working on your order #[Order ID]. Just need to clarify a few things:

[Choose applicable:]
- Item "[fabric name]" — did you mean [option A] or [option B]?
- What unit for "[fabric name]" — yards or meters?
- The quantity for "[fabric name]" is hard to read — is it [X] or [Y]?
- Do you have a preferred color/shade for "[fabric name]"?

Please reply so we can get you an accurate quote. Salamat!

— FabricHub PH
```

---

## 3. Quotation (Standard)

**Send when:** All items have been sourced and priced (Status: Sourcing → Quoted)

```
-----------------------------------------
FABRICHUB PH — QUOTATION
-----------------------------------------
Order #: [Order ID]
Date: [Today's Date]
Customer: [Customer Name]

ITEMS:
1. [Fabric Name] — [Qty] [unit] @ P[price]/[unit] = P[line total]
2. [Fabric Name] — [Qty] [unit] @ P[price]/[unit] = P[line total]
3. [Fabric Name] — [Qty] [unit] @ P[price]/[unit] = P[line total]
4. [Fabric Name] — [Qty] [unit] @ P[price]/[unit] = P[line total]

                    Subtotal: P[subtotal]
                    Delivery Fee: P[delivery fee]
                    ---------
                    TOTAL: P[total]

NOTES:
[Any availability issues, substitutions, etc.]

Prices valid for 3 days (until [date]).

PAYMENT:
GCash: 09XX XXX XXXX (FabricHub PH)
BDO: XXXX-XXXX-XXXX

Reply "CONFIRM" to proceed.
Reply with changes if you want to adjust.

Salamat po!
— FabricHub PH Team
-----------------------------------------
```

---

## 4. Quotation with Issues

**Send when:** Some items are out of stock or have availability problems

```
-----------------------------------------
FABRICHUB PH — QUOTATION
-----------------------------------------
Order #: [Order ID]
Date: [Today's Date]
Customer: [Customer Name]

AVAILABLE ITEMS:
1. [Fabric Name] — [Qty] [unit] @ P[price]/[unit] = P[line total]
2. [Fabric Name] — [Qty] [unit] @ P[price]/[unit] = P[line total]

⚠️ ITEMS WITH ISSUES:
3. [Fabric Name] — Only [available qty] [unit] available (you requested [requested qty]). Want us to:
   a) Get [available qty] now and source the rest next week?
   b) Source all [requested qty] from a different supplier? (+P[extra]/[unit])

4. [Fabric Name] — Currently out of stock. Available alternatives:
   a) [Alternative fabric] @ P[price]/[unit]
   b) Wait [X days] for restock

AVAILABLE SUBTOTAL: P[subtotal]
Delivery Fee: P[fee]
TOTAL (available items): P[total]

Please reply with your choices for items #3 and #4, and we'll finalize your quote.

— FabricHub PH Team
-----------------------------------------
```

---

## 5. Order Confirmed

**Send when:** Customer replies "CONFIRM" or explicitly agrees to the quotation

```
Hi [Customer Name]!

Your order #[Order ID] is CONFIRMED! ✅

Total: P[total amount]

Payment:
GCash: 09XX XXX XXXX (FabricHub PH)
BDO: XXXX-XXXX-XXXX

[If COD:] Payment will be collected on delivery.
[If prepay:] Please send payment and reply with the screenshot/reference number.

We'll start purchasing your fabrics today and arrange delivery. Expected delivery: [date range].

Salamat po!
— FabricHub PH
```

---

## 6. Payment Received

**Send when:** Customer's payment is confirmed

```
Hi [Customer Name]!

Payment received for Order #[Order ID]. ✅

Amount: P[amount]
Reference: [payment ref number]

We're now purchasing your fabrics. We'll send you a delivery update soon.

Salamat!
— FabricHub PH
```

---

## 7. Delivery Notification

**Send when:** Order is packed and ready for delivery / rider has been dispatched

```
Hi [Customer Name]!

Your order #[Order ID] is on the way! 🚚

Delivery details:
📦 Items: [X] fabric types
📍 Destination: [Location]
🕐 Expected: [Date/Time or "Today by 5PM"]
📱 Rider contact: [Rider's number]

Total: P[amount]
Payment: [Paid ✅ / Collect P[amount] on delivery]

Thank you for choosing FabricHub PH!
```

---

## 8. Delivery Completed

**Send when:** Delivery has been confirmed received

```
Hi [Customer Name]!

Your order #[Order ID] has been delivered! ✅

We hope everything is in order. If you have any issues with the fabrics (wrong item, quantity, quality), please let us know within 24 hours.

For your next order, just visit our website or send your list here anytime!

Salamat sa tiwala! 🙏
— FabricHub PH
```

---

## 9. Follow-Up (No Response to Quotation — 48 hours)

**Send when:** 48 hours after sending quotation with no customer response

```
Hi [Customer Name]!

Just following up on your quotation (Order #[Order ID]) sent last [day/date].

Would you like to proceed, or do you need any changes?

Prices are valid until [expiry date]. Let us know!

— FabricHub PH
```

---

## 10. Follow-Up (2nd Attempt — 72 hours)

**Send when:** 72 hours after quotation, still no response

```
Hi [Customer Name]!

Last follow-up for Order #[Order ID]. 😊

Our quotation expires [tomorrow/today]. If you'd like to proceed, just reply "CONFIRM."

If you'd like to order in the future, we're always here. Just send your list anytime!

— FabricHub PH
```

---

## 11. Repeat Customer Welcome

**Send when:** A returning customer submits a new order

```
Hi [Customer Name]! Welcome back! 👋

We received your new fabric list (Order #[Order ID]).

Since you're a returning customer, we'll prioritize your order. Expect a quotation within [12-24] hours.

Salamat sa patuloy na tiwala!
— FabricHub PH
```

---

## Delivery Fee Guide

Include in quotation based on destination:

| Area | Fee |
|------|-----|
| Metro Manila (nearby) | P150 – P250 |
| Metro Manila (far) | P250 – P400 |
| Bulacan / Cavite / Laguna / Rizal | P350 – P500 |
| Pampanga / Batangas | P450 – P650 |
| Provincial (via courier) | Based on weight + courier rates |

Adjust based on order size. Consider free delivery for orders above P10,000.

---

## Quick Reference: Message Timing

| Trigger | Template | Timing |
|---------|----------|--------|
| New order received | #1 Order Received | Within 1 hour |
| List is unclear | #2 Clarification | Same day |
| Sourcing complete | #3 or #4 Quotation | Within 24 hours of order |
| Customer confirms | #5 Order Confirmed | Immediately |
| Payment received | #6 Payment Received | Within 1 hour |
| Order dispatched | #7 Delivery Notification | When rider leaves |
| Delivery confirmed | #8 Delivery Completed | Same day |
| No reply to quote | #9 Follow-Up | After 48 hours |
| Still no reply | #10 2nd Follow-Up | After 72 hours |
| Returning customer | #11 Repeat Welcome | Within 1 hour |
