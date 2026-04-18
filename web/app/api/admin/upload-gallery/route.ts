import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import heicConvert from "heic-convert";

export const runtime = "nodejs";
export const maxDuration = 60;

const ADMIN_KEY = process.env.ADMIN_KEY || "";
const MAX_BYTES = 15 * 1024 * 1024;

const EXT_TO_MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  heic: "image/heic",
  heif: "image/heif",
};

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "image";
}

function detectMime(file: File) {
  if (file.type) return file.type.toLowerCase();
  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  return EXT_TO_MIME[ext] || "";
}

async function processFile(file: File) {
  const mime = detectMime(file);
  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  const isHeic = mime.includes("heic") || mime.includes("heif") || ext === "heic" || ext === "heif";

  let buffer = Buffer.from(await file.arrayBuffer());
  let outMime = mime;
  let outExt = ext;

  if (isHeic) {
    const jpg = await heicConvert({
      buffer: buffer as unknown as ArrayBufferLike,
      format: "JPEG",
      quality: 0.85,
    });
    buffer = Buffer.from(jpg);
    outMime = "image/jpeg";
    outExt = "jpg";
  } else if (!["image/jpeg", "image/png", "image/webp"].includes(outMime)) {
    throw new Error(`Unsupported type: ${file.name}`);
  }

  return { buffer, mime: outMime, ext: outExt };
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (token !== ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const entries = formData.getAll("files");
    const paths = formData.getAll("paths") as string[];

    if (entries.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const results: Array<{ url: string; originalName: string; folder: string }> = [];
    const errors: string[] = [];

    for (let i = 0; i < entries.length; i++) {
      const file = entries[i] as File;
      if (!(file instanceof File)) continue;

      if (file.size > MAX_BYTES) {
        errors.push(`${file.name}: over 15MB`);
        continue;
      }

      const relPath = paths[i] || file.name;
      const segments = relPath.split("/").filter(Boolean);
      const folder = segments.length > 1 ? segments[0] : "";

      try {
        const { buffer, mime, ext } = await processFile(file);
        const slug = slugify(file.name);
        const folderSlug = folder ? `${slugify(folder)}/` : "";
        const blob = await put(`gallery/${folderSlug}${slug}.${ext}`, buffer, {
          access: "public",
          contentType: mime,
          addRandomSuffix: true,
        });
        results.push({ url: blob.url, originalName: file.name, folder });
      } catch (err) {
        errors.push(`${file.name}: ${err instanceof Error ? err.message : "failed"}`);
      }
    }

    return NextResponse.json({ results, errors });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
