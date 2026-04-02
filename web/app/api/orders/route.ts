import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const ADMIN_KEY = process.env.ADMIN_KEY || "telasource2026";

export async function GET(request: NextRequest) {
  // Simple auth via query param
  const key = request.nextUrl.searchParams.get("key");
  if (key !== ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const type = request.nextUrl.searchParams.get("type") || "orders";
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
