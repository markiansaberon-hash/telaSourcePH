import { NextRequest, NextResponse } from "next/server";
import { writeFile, appendFile, mkdir } from "fs/promises";
import path from "path";

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

// Escape value for CSV (handle commas, quotes, newlines)
function csvEscape(value: string): string {
  if (
    value.includes(",") ||
    value.includes('"') ||
    value.includes("\n") ||
    value.includes("\r")
  ) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Data directory (persists across requests)
const DATA_DIR = path.join(process.cwd(), "data");
const UPLOADS_DIR = path.join(DATA_DIR, "uploads");
const ORDERS_CSV = path.join(DATA_DIR, "orders.csv");
const ORDER_ITEMS_CSV = path.join(DATA_DIR, "order-items.csv");

const ORDERS_HEADER =
  "Order ID,Date Submitted,Customer Name,Phone,Contact Via,Location,Fabric List (Text),Image File,Status,Assigned Staff,Quotation Sent,Confirmed Date,Delivery Date,Total Amount,Notes";
const ITEMS_HEADER =
  "Order ID,Fabric Name,Quantity,Unit";

async function ensureDataDir(): Promise<void> {
  await mkdir(UPLOADS_DIR, { recursive: true });

  // Create CSV files with headers if they don't exist
  try {
    await writeFile(ORDERS_CSV, ORDERS_HEADER + "\n", { flag: "wx" });
  } catch {
    // File already exists — that's fine
  }
  try {
    await writeFile(ORDER_ITEMS_CSV, ITEMS_HEADER + "\n", { flag: "wx" });
  } catch {
    // File already exists
  }
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

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        { error: "Invalid request. Please use the upload form." },
        { status: 400 },
      );
    }

    // Extract and validate fields
    const name = sanitize(String(formData.get("name") || ""));
    const phone = String(formData.get("phone") || "").replace(/[\s-]/g, "");
    const contactMethod = sanitize(
      String(formData.get("contactMethod") || ""),
    );
    const location = sanitize(String(formData.get("location") || ""));
    const fabricList = sanitize(String(formData.get("fabricList") || ""));
    const fabricItems = sanitize(String(formData.get("fabricItems") || ""));
    const notes = sanitize(String(formData.get("notes") || ""));
    const file = formData.get("file") as File | null;

    // Honeypot check (hidden field — if filled, it's a bot)
    const honeypot = formData.get("website");
    if (honeypot) {
      return NextResponse.json({ orderId: "TS-00000000-000" });
    }

    // Validation
    if (!name || !phone || !contactMethod || !location) {
      return NextResponse.json(
        {
          error: "Name, phone, contact method, and location are required.",
        },
        { status: 400 },
      );
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        {
          error:
            "Please enter a valid Philippine phone number (09XX XXX XXXX).",
        },
        { status: 400 },
      );
    }

    // At least one input method required: file, text list, or structured items
    const hasFile = file && file.size > 0;
    const hasTextList = fabricList.length > 0;
    const hasStructuredItems = fabricItems.length > 0;

    if (!hasFile && !hasTextList && !hasStructuredItems) {
      return NextResponse.json(
        {
          error:
            "Please upload a photo, type your list, or add fabric items.",
        },
        { status: 400 },
      );
    }

    if (hasFile) {
      if (!ALLOWED_FILE_TYPES.includes(file!.type)) {
        return NextResponse.json(
          {
            error: "Invalid file type. Please upload JPG, PNG, WebP, or PDF.",
          },
          { status: 400 },
        );
      }
      if (file!.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "File is too large. Maximum size is 10MB." },
          { status: 400 },
        );
      }
    }

    // Record attempt for rate limiting
    recordSubmission(ip);

    // Generate order ID
    const orderId = generateOrderId();
    const dateSubmitted = new Date().toISOString();

    // Ensure data directories exist
    await ensureDataDir();

    // Save uploaded file
    let imageFilename = "";
    if (hasFile) {
      const ext =
        file!.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") ||
        "jpg";
      imageFilename = `${orderId}.${ext}`;
      const buffer = Buffer.from(await file!.arrayBuffer());
      await writeFile(path.join(UPLOADS_DIR, imageFilename), buffer);
    }

    // Append order to CSV
    const orderRow = [
      orderId,
      dateSubmitted,
      name,
      phone,
      contactMethod,
      location,
      fabricList,
      imageFilename,
      "New",
      "", // Assigned Staff
      "", // Quotation Sent
      "", // Confirmed Date
      "", // Delivery Date
      "", // Total Amount
      notes,
    ]
      .map(csvEscape)
      .join(",");

    await appendFile(ORDERS_CSV, orderRow + "\n");

    // Append structured fabric items to order-items CSV
    if (hasStructuredItems) {
      try {
        const items = JSON.parse(fabricItems) as Array<{
          name: string;
          quantity: string;
          unit: string;
        }>;
        const itemRows = items
          .filter((item) => item.name.trim())
          .map((item) =>
            [
              orderId,
              sanitize(item.name),
              sanitize(item.quantity),
              sanitize(item.unit),
            ]
              .map(csvEscape)
              .join(","),
          )
          .join("\n");

        if (itemRows) {
          await appendFile(ORDER_ITEMS_CSV, itemRows + "\n");
        }
      } catch {
        // If JSON parsing fails, skip structured items — the text list or photo still works
      }
    }

    return NextResponse.json({ orderId });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
