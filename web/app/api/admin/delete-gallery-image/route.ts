import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";

const ADMIN_KEY = process.env.ADMIN_KEY || "";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (token !== ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { url } = (await request.json()) as { url?: string };
    if (!url || !url.includes("/gallery/")) {
      return NextResponse.json({ error: "Invalid url" }, { status: 400 });
    }
    await del(url);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Delete failed" },
      { status: 500 },
    );
  }
}
