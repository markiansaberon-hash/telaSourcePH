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

function PriceBlock({
  price,
  salePrice,
  saleLabel,
  yardsPerRoll,
}: {
  price: string | number;
  salePrice?: string | number;
  saleLabel?: string;
  yardsPerRoll?: string | number;
}) {
  const hasPrice = price !== undefined && price !== null && String(price) !== "";
  const hasSale = salePrice !== undefined && salePrice !== null && String(salePrice) !== "";
  const priceDisplay = hasPrice ? formatPrice(price) : "";
  const saleDisplay = hasSale ? formatPrice(salePrice!) : "";
  const yardsDisplay = formatYards(yardsPerRoll);

  return (
    <div className="space-y-0.5">
      {saleDisplay ? (
        <div className="flex flex-wrap items-center gap-2">
          {saleLabel && (
            <span className="rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              {saleLabel}
            </span>
          )}
          {priceDisplay && <span className="text-xs text-text-muted line-through">{priceDisplay}</span>}
          <span className="text-base font-bold text-red-600">{saleDisplay}</span>
        </div>
      ) : priceDisplay ? (
        <p className="text-sm font-semibold text-primary">{priceDisplay}</p>
      ) : null}
      {yardsDisplay && <p className="text-xs text-text-muted">{yardsDisplay}</p>}
    </div>
  );
}

interface FabricCardProps {
  fabric: CatalogItem;
  onOpen: (images: string[], index: number, alt: string) => void;
}

function FabricCard({ fabric, onOpen }: FabricCardProps) {
  const gallery = splitImageUrls(fabric.image_urls);
  const fallback = fabric.image ? [fabric.image] : [];
  const images = gallery.length > 0 ? gallery : fallback;
  const [active, setActive] = useState(0);

  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow-[0_2px_12px_rgba(44,24,16,0.06)]">
      {fabric.sale_price && (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
          Sale
        </span>
      )}
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
        <PriceBlock
          price={fabric.price}
          salePrice={fabric.sale_price}
          saleLabel={fabric.sale_label}
          yardsPerRoll={fabric.yards_per_roll}
        />
      </div>
    </div>
  );
}

export default function GalleryPage() {
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

  const fabrics = items.filter((i) => i.category === "fabric");
  const saleFabrics = fabrics.filter((f) => f.sale_price && String(f.sale_price).trim() !== "");
  const regularFabrics = fabrics.filter((f) => !f.sale_price || String(f.sale_price).trim() === "");
  const shopPhotos = items.filter((i) => i.category === "shop");

  const openLightbox = (images: string[], index: number, alt: string) =>
    setLightbox({ images, index, alt });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Hero */}
      <ScrollReveal>
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-extrabold text-text">
            Gallery
          </h1>
          <p className="text-lg text-text-light">
            Browse our fabric collection and see our shop in Divisoria.
          </p>
          <p className="mt-2 text-sm text-text-muted">
            Prices are estimates and subject to change. Final quote confirmed via Viber/text.
          </p>
          <p className="mt-1 text-xs text-text-muted">Tap any photo to view full size.</p>
        </div>
      </ScrollReveal>

      {/* On Sale */}
      {!loading && saleFabrics.length > 0 && (
        <section className="mb-16">
          <ScrollReveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                On Sale
              </span>
              <h2 className="text-2xl font-bold text-text">Promos & Discounts</h2>
            </div>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {saleFabrics.map((fabric, i) => (
              <ScrollReveal key={`sale-${fabric.name}-${i}`} delay={i * 80}>
                <FabricCard fabric={fabric} onOpen={openLightbox} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* Our Fabrics — only non-sale items; skipped entirely when everything is on sale */}
      {loading ? (
        <section className="mb-16">
          <ScrollReveal>
            <h2 className="mb-6 text-2xl font-bold text-text">Our Fabrics</h2>
          </ScrollReveal>
          <div className="py-12 text-center">
            <p className="text-text-muted">Loading...</p>
          </div>
        </section>
      ) : regularFabrics.length > 0 ? (
        <section className="mb-16">
          <ScrollReveal>
            <h2 className="mb-6 text-2xl font-bold text-text">Our Fabrics</h2>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {regularFabrics.map((fabric, i) => (
              <ScrollReveal key={`${fabric.name}-${i}`} delay={i * 80}>
                <FabricCard fabric={fabric} onOpen={openLightbox} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      ) : fabrics.length === 0 ? (
        <section className="mb-16">
          <ScrollReveal>
            <h2 className="mb-6 text-2xl font-bold text-text">Our Fabrics</h2>
          </ScrollReveal>
          <div className="rounded-xl border-2 border-dashed border-cream-dark bg-white p-12 text-center">
            <p className="text-text-light">Photos coming soon!</p>
          </div>
        </section>
      ) : null}

      {/* Our Shop */}
      <section>
        <ScrollReveal>
          <h2 className="mb-6 text-2xl font-bold text-text">Our Shop</h2>
        </ScrollReveal>
        {loading ? (
          <div className="py-12 text-center">
            <p className="text-text-muted">Loading...</p>
          </div>
        ) : shopPhotos.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shopPhotos.map((photo, i) => (
              <ScrollReveal key={`${photo.name}-${i}`} delay={i * 80}>
                <div className="overflow-hidden rounded-xl bg-white shadow-[0_2px_12px_rgba(44,24,16,0.06)]">
                  {photo.image && (
                    <button
                      type="button"
                      onClick={() => openLightbox([photo.image], 0, photo.caption || photo.name)}
                      className="block aspect-[4/3] w-full bg-cream-dark"
                      aria-label={`Open ${photo.caption || photo.name}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.image}
                        alt={photo.caption || photo.name}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  )}
                  {(photo.caption || photo.name) && (
                    <div className="p-4">
                      <p className="text-sm text-text-light">{photo.caption || photo.name}</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border-2 border-dashed border-cream-dark bg-white p-12 text-center">
            <p className="text-text-light">Photos coming soon!</p>
          </div>
        )}
      </section>

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
