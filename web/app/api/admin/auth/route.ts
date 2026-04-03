import { NextRequest, NextResponse } from "next/server";

const ADMIN_KEY = process.env.ADMIN_KEY || "";

export async function POST(request: NextRequest) {
  try {
    const { key } = await request.json();

    if (!key || key !== ADMIN_KEY) {
      return NextResponse.json(
        { error: "Invalid admin key" },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ result: "ok" });
    response.cookies.set("admin_token", ADMIN_KEY, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 },
    );
  }
}
