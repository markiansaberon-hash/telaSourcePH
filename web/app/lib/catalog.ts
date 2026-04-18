export interface CatalogItem {
  name: string;
  price: string | number;
  image: string;
  category: string;
  caption: string;
  image_urls?: string;
  sale_price?: string | number;
  sale_label?: string;
  yards_per_roll?: string | number;
}

export function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "fabric"
  );
}

export function splitImageUrls(raw?: string): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function isNumeric(v?: string | number) {
  if (v === undefined || v === null || v === "") return false;
  const s = String(v).trim().replace(/,/g, "");
  return /^\d+(\.\d+)?$/.test(s);
}

export function formatPrice(v: string | number): string {
  const s = String(v);
  return isNumeric(s) ? `₱${Number(s.replace(/,/g, ""))}/yard` : s;
}

export function formatYards(v?: string | number): string | null {
  if (v === undefined || v === null || v === "") return null;
  const s = String(v);
  if (isNumeric(s)) return `${Number(s.replace(/,/g, ""))} yards per roll`;
  return s;
}

export function hasValue(v?: string | number): boolean {
  return v !== undefined && v !== null && String(v).trim() !== "";
}

export function isOnSale(f: CatalogItem): boolean {
  return hasValue(f.sale_price) || hasValue(f.sale_label);
}

export async function fetchCatalog(): Promise<CatalogItem[]> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK;
  if (!url) return [];
  try {
    const res = await fetch(`${url}?action=fabrics`, { next: { revalidate: 300 } });
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
