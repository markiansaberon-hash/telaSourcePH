import { NextRequest, NextResponse } from "next/server";
import { list } from "@vercel/blob";

const ADMIN_KEY = process.env.ADMIN_KEY || "";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (token !== ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { blobs } = await list({ prefix: "gallery/" });
    const images = blobs.map((b) => ({
      url: b.url,
      pathname: b.pathname,
      uploadedAt: b.uploadedAt,
      size: b.size,
    }));
    return NextResponse.json(images);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
