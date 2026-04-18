"use client";

import { useState, useEffect } from "react";
import ScrollReveal from "../components/scroll-reveal";
import Lightbox from "../components/lightbox";

interface CatalogItem {
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

function splitImageUrls(raw?: string): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function isNumeric(v?: string | number) {
  if (v === undefined || v === null || v === "") return false;
  const s = String(v).trim().replace(/,/g, "");
  return /^\d+(\.\d+)?$/.test(s);
}

function formatPrice(v: string | number): string {
  const s = String(v);
  return isNumeric(s) ? `₱${Number(s.replace(/,/g, ""))}/yard` : s;
}

function formatYards(v?: string | number): string | null {
  if (v === undefined || v === null || v === "") return null;
  const s = String(v);
  if (isNumeric(s)) return `${Number(s.replace(/,/g, ""))} yards per roll`;
  return s;
}

interface FabricCardProps {
  fabric: CatalogItem;
  onOpen: (images: string[], index: number, alt: string) => void;
}

function SaleFabricCard({ fabric, onOpen }: FabricCardProps) {
  const gallery = splitImageUrls(fabric.image_urls);
  const fallback = fabric.image ? [fabric.image] : [];
  const images = gallery.length > 0 ? gallery : fallback;
  const [active, setActive] = useState(0);

  const hasPrice = fabric.price !== undefined && fabric.price !== null && String(fabric.price) !== "";
  const hasSale = fabric.sale_price !== undefined && fabric.sale_price !== null && String(fabric.sale_price) !== "";
  const priceDisplay = hasPrice ? formatPrice(fabric.price) : "";
  const saleDisplay = hasSale ? formatPrice(fabric.sale_price!) : "";
  const yardsDisplay = formatYards(fabric.yards_per_roll);

  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow-[0_2px_12px_rgba(44,24,16,0.06)]">
      <span className="absolute right-3 top-3 z-10 rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
        Sale
      </span>
      {images.length > 0 && (
        <button
          type="button"
          onClick={() => onOpen(images, active, fabric.name)}
          className="block aspect-[4/3] w-full bg-cream-dark"
          aria-label={`Open ${fabric.name}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[active]}
            alt={fabric.name}
            className="h-full w-full object-cover"
          />
        </button>
      )}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-t border-cream-dark bg-cream/40 p-2">
          {images.map((src, idx) => (
            <button
              key={`${src}-${idx}`}
              type="button"
              onClick={() => setActive(idx)}
              className={`h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border-2 transition ${
                idx === active ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="p-4">
        <h3 className="font-bold text-text">{fabric.name}</h3>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          {fabric.sale_label && (
            <span className="rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              {fabric.sale_label}
            </span>
          )}
          {priceDisplay && <span className="text-xs text-text-muted line-through">{priceDisplay}</span>}
          {saleDisplay && <span className="text-base font-bold text-red-600">{saleDisplay}</span>}
        </div>
        {yardsDisplay && <p className="mt-0.5 text-xs text-text-muted">{yardsDisplay}</p>}
      </div>
    </div>
  );
}

export default function SalePage() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number; alt: string } | null>(null);

  useEffect(() => {
    fetch("/api/fabrics")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setItems(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const saleFabrics = items.filter(
    (i) => i.category === "fabric" && i.sale_price && String(i.sale_price).trim() !== "",
  );

  const openLightbox = (images: string[], index: number, alt: string) =>
    setLightbox({ images, index, alt });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <ScrollReveal>
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
            On Sale
          </span>
          <h1 className="mt-3 text-4xl font-extrabold text-text">Seasonal Promos & Discounts</h1>
          <p className="mt-2 text-lg text-text-light">
            Limited stock — these fabrics need to move this year.
          </p>
          <p className="mt-1 text-sm text-text-muted">Tap any photo to view full size.</p>
        </div>
      </ScrollReveal>

      {loading ? (
        <div className="py-12 text-center">
          <p className="text-text-muted">Loading...</p>
        </div>
      ) : saleFabrics.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {saleFabrics.map((fabric, i) => (
            <ScrollReveal key={`${fabric.name}-${i}`} delay={i * 80}>
              <SaleFabricCard fabric={fabric} onOpen={openLightbox} />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border-2 border-dashed border-cream-dark bg-white p-12 text-center">
          <p className="text-text-light">No active promos right now. Check back soon!</p>
        </div>
      )}

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
          onIndexChange={(next) => setLightbox((prev) => (prev ? { ...prev, index: next } : prev))}
        />
      )}
    </div>
  );
}
