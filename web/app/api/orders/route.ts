import { NextRequest, NextResponse } from "next/server";
import { readFile, readdir } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_DIR = path.join(DATA_DIR, "orders");
const ADMIN_KEY = process.env.ADMIN_KEY || "telasource2026";

export async function GET(request: NextRequest) {
  // Simple auth via query param
  const key = request.nextUrl.searchParams.get("key");
  if (key !== ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const type = request.nextUrl.searchParams.get("type") || "orders";
  const orderId = request.nextUrl.searchParams.get("id");

  // Fetch a single order's info.json
  if (type === "order" && orderId) {
    try {
      const infoPath = path.join(ORDERS_DIR, orderId, "info.json");
      const info = await readFile(infoPath, "utf-8");
      return NextResponse.json(JSON.parse(info));
    } catch {
      return NextResponse.json(
        { error: "Order not found." },
        { status: 404 },
      );
    }
  }

  // Fetch a single order's items.json
  if (type === "order-items" && orderId) {
    try {
      const itemsPath = path.join(ORDERS_DIR, orderId, "items.json");
      const items = await readFile(itemsPath, "utf-8");
      return NextResponse.json(JSON.parse(items));
    } catch {
      return NextResponse.json(
        { error: "No items found for this order." },
        { status: 404 },
      );
    }
  }

  // List all order folders
  if (type === "list") {
    try {
      const folders = await readdir(ORDERS_DIR);
      const orders = [];
      for (const folder of folders.sort().reverse()) {
        try {
          const info = await readFile(
            path.join(ORDERS_DIR, folder, "info.json"),
            "utf-8",
          );
          orders.push(JSON.parse(info));
        } catch {
          // Skip folders without info.json
        }
      }
      return NextResponse.json(orders);
    } catch {
      return NextResponse.json([]);
    }
  }

  // Download consolidated CSV (default behavior)
  const filename = type === "items" ? "order-items.csv" : "orders.csv";
  const filePath = path.join(DATA_DIR, filename);

  try {
    const csv = await readFile(filePath, "utf-8");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "No orders yet." },
      { status: 404 },
    );
  }
}
