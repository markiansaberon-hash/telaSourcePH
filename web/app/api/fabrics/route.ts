import { NextResponse } from "next/server";

const SHEETS_URL = process.env.GOOGLE_SHEETS_WEBHOOK || "";

export async function GET() {
  try {
    const res = await fetch(`${SHEETS_URL}?action=fabrics`, {
      next: { revalidate: 0 },
    });
    const data = await res.json();
    return NextResponse.json(Array.isArray(data) ? data : []);
  } catch {
    return NextResponse.json([]);
  }
}
