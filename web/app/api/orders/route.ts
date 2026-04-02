import { NextRequest, NextResponse } from "next/server";
import { list } from "@vercel/blob";

const ADMIN_KEY = process.env.ADMIN_KEY || "telasource2026";

export async function GET(request: NextRequest) {
  // Simple auth via query param
  const key = request.nextUrl.searchParams.get("key");
  if (key !== ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const type = request.nextUrl.searchParams.get("type") || "list";

  // List all orders from Vercel Blob
  if (type === "list") {
    try {
      const { blobs } = await list({ prefix: "orders/log/" });
      const orders = await Promise.all(
        blobs.map(async (blob) => {
          const res = await fetch(blob.url);
          return res.json();
        }),
      );
      // Sort newest first
      orders.sort(
        (a, b) =>
          new Date(b.dateSubmitted).getTime() -
          new Date(a.dateSubmitted).getTime(),
      );
      return NextResponse.json(orders);
    } catch {
      return NextResponse.json([]);
    }
  }

  // Download as CSV
  if (type === "csv") {
    try {
      const { blobs } = await list({ prefix: "orders/log/" });
      const orders = await Promise.all(
        blobs.map(async (blob) => {
          const res = await fetch(blob.url);
          return res.json();
        }),
      );
      orders.sort(
        (a, b) =>
          new Date(b.dateSubmitted).getTime() -
          new Date(a.dateSubmitted).getTime(),
      );

      const header =
        "Order ID,Date Submitted,Customer Name,Phone,Contact Via,Location,Fabric List,Image URL,Status,Notes";
      const rows = orders.map((o) =>
        [
          o.orderId,
          o.dateSubmitted,
          o.customerName,
          o.phone,
          o.contactMethod,
          o.location,
          `"${(o.fabricListText || "").replace(/"/g, '""')}"`,
          o.imageUrl || "",
          o.status,
          `"${(o.notes || "").replace(/"/g, '""')}"`,
        ].join(","),
      );
      const csv = [header, ...rows].join("\n");

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": 'attachment; filename="orders.csv"',
        },
      });
    } catch {
      return NextResponse.json({ error: "No orders yet." }, { status: 404 });
    }
  }

  return NextResponse.json({ error: "Invalid type. Use list or csv." }, { status: 400 });
}
