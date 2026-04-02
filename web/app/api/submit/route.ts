import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

// Rate limiting: simple in-memory store
const submissions = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // max 5 submissions per hour per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = submissions.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  submissions.set(ip, recent);
  return recent.length >= RATE_LIMIT_MAX;
}

function recordSubmission(ip: string): void {
  const timestamps = submissions.get(ip) || [];
  timestamps.push(Date.now());
  submissions.set(ip, timestamps);
}

// Generate order ID: TS-YYYYMMDD-XXX
function generateOrderId(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const random = String(Math.floor(Math.random() * 999) + 1).padStart(3, "0");
  return `TS-${date}-${random}`;
}

// Validate phone: Philippine mobile format
function isValidPhone(phone: string): boolean {
  return /^09\d{9}$/.test(phone.replace(/[\s-]/g, ""));
}

// Sanitize text input
function sanitize(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 5000);
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 },
      );
    }

    let body: {
      name?: string;
      phone?: string;
      contactMethod?: string;
      location?: string;
      fabricList?: string;
      fabricItems?: string;
      notes?: string;
      imageUrl?: string;
    };

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request." },
        { status: 400 },
      );
    }

    // Extract and validate fields
    const name = sanitize(String(body.name || ""));
    const phone = String(body.phone || "").replace(/[\s-]/g, "");
    const contactMethod = sanitize(String(body.contactMethod || ""));
    const location = sanitize(String(body.location || ""));
    const fabricList = sanitize(String(body.fabricList || ""));
    const fabricItemsRaw = sanitize(String(body.fabricItems || ""));
    const notes = sanitize(String(body.notes || ""));
    const imageUrl = String(body.imageUrl || "");

    // Validation
    if (!name || !phone || !contactMethod || !location) {
      return NextResponse.json(
        { error: "Name, phone, contact method, and location are required." },
        { status: 400 },
      );
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid Philippine phone number (09XX XXX XXXX)." },
        { status: 400 },
      );
    }

    // At least one input method required
    const hasTextList = fabricList.length > 0;
    const hasStructuredItems = fabricItemsRaw.length > 0;
    const hasImage = imageUrl.length > 0;

    if (!hasImage && !hasTextList && !hasStructuredItems) {
      return NextResponse.json(
        { error: "Please upload a photo, type your list, or add fabric items." },
        { status: 400 },
      );
    }

    // Record attempt for rate limiting
    recordSubmission(ip);

    // Generate order ID
    const orderId = generateOrderId();
    const dateSubmitted = new Date().toISOString();

    // Parse structured items
    let parsedItems: Array<{ name: string; quantity: string; unit: string }> = [];
    if (hasStructuredItems) {
      try {
        const items = JSON.parse(fabricItemsRaw);
        parsedItems = items.filter(
          (item: { name: string }) => item.name.trim(),
        );
      } catch {
        // Skip if JSON parsing fails
      }
    }

    // Save order data to Vercel Blob
    const orderInfo = {
      orderId,
      dateSubmitted,
      customerName: name,
      phone,
      contactMethod,
      location,
      fabricListText: fabricList,
      imageUrl,
      items: parsedItems.length > 0 ? parsedItems : undefined,
      notes,
      status: "New",
    };

    await put(
      `orders/${orderId}/info.json`,
      JSON.stringify(orderInfo, null, 2),
      { access: "public", contentType: "application/json" },
    );

    // Also save to log for easy listing
    await put(
      `orders/log/${orderId}.json`,
      JSON.stringify(orderInfo),
      { access: "public", contentType: "application/json" },
    );

    return NextResponse.json({ orderId });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
