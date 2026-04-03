import { NextRequest, NextResponse } from "next/server";

const ADMIN_KEY = process.env.ADMIN_KEY || "";
const SHEETS_URL = process.env.GOOGLE_SHEETS_WEBHOOK || "";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (token !== ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(
      `${SHEETS_URL}?key=${encodeURIComponent(ADMIN_KEY)}`,
      { cache: "no-store" },
    );
    const orders = await res.json();
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
