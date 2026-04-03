import { NextRequest, NextResponse } from "next/server";

const ADMIN_KEY = process.env.ADMIN_KEY || "";
const SHEETS_URL = process.env.GOOGLE_SHEETS_WEBHOOK || "";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (token !== ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { orderId, status } = await request.json();
    const res = await fetch(SHEETS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "updateStatus",
        orderId,
        status,
        key: ADMIN_KEY,
      }),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 },
    );
  }
}
