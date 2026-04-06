import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

const ADMIN_KEY = process.env.ADMIN_KEY || "";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (token !== ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, and WebP images are allowed" },
        { status: 400 },
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File must be under 10MB" },
        { status: 400 },
      );
    }

    const ext = file.name.split(".").pop() || "jpg";
    const filename = `gallery/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const blob = await put(filename, file, {
      access: "public",
      contentType: file.type,
    });

    return NextResponse.json({ url: blob.url });
  } catch {
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 },
    );
  }
}
