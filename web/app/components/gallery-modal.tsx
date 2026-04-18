"use client";

import { useState, useEffect, useCallback } from "react";

interface CatalogItem {
  name: string;
  price: string;
  image: string;
  category: string;
  caption: string;
  image_urls?: string;
  sale_price?: string;
  sale_label?: string;
}

function PriceBlock({ price, salePrice, saleLabel }: { price: string; salePrice?: string; saleLabel?: string }) {
  if (salePrice) {
    return (
      <div className="flex flex-wrap items-center gap-1.5">
        {saleLabel && (
          <span className="rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            {saleLabel}
          </span>
        )}
        {price && (
          <span className="text-xs text-text-muted line-through">{price}</span>
        )}
        <span className="text-sm font-bold text-red-600">{salePrice}</span>
      </div>
    );
  }
  return price ? <p className="text-sm font-semibold text-primary">{price}</p> : null;
}

interface GalleryModalProps {
  open: boolean;
  onClose: () => void;
}

export default function GalleryModal({ open, onClose }: GalleryModalProps) {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!open || fetched) return;
    fetch("/api/fabrics")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setItems(data);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
        setFetched(true);
      });
  }, [open, fetched]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  const fabrics = items.filter((i) => i.category === "fabric");
  const shopPhotos = items.filter((i) => i.category === "shop");

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative my-8 w-full max-w-4xl rounded-2xl bg-cream shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl border-b border-primary/10 bg-cream px-6 py-4">
          <div>
            <h2 className="text-2xl font-extrabold text-text">Gallery</h2>
            <p className="text-sm text-text-muted">
              Prices are estimates. Final quote confirmed via Viber/text.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-text-light transition hover:bg-primary/10 hover:text-text"
            aria-label="Close gallery"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <a
            href="/gallery"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-6 flex items-center justify-between gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 transition hover:bg-primary/10"
          >
            <span className="text-sm font-semibold text-primary">
              Open full gallery with fabric photos &rarr;
            </span>
            <span className="text-xs text-text-muted">Opens in new tab</span>
          </a>
          {loading ? (
            <div className="py-12 text-center">
              <p className="text-text-muted">Loading...</p>
            </div>
          ) : (
            <>
              {/* Our Fabrics */}
              <section className="mb-10">
                <h3 className="mb-4 text-xl font-bold text-text">
                  Our Fabrics
                </h3>
                {fabrics.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {fabrics.map((fabric, i) => (
                      <div
                        key={`${fabric.name}-${i}`}
                        className="relative overflow-hidden rounded-xl bg-white shadow-[0_2px_12px_rgba(44,24,16,0.06)]"
                      >
                        {fabric.sale_price && (
                          <span className="absolute right-2 top-2 z-10 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                            Sale
                          </span>
                        )}
                        {fabric.image && (
                          <div className="aspect-[4/3] bg-cream-dark">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={fabric.image}
                              alt={fabric.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-3">
                          <h4 className="font-bold text-text">{fabric.name}</h4>
                          <PriceBlock
                            price={fabric.price}
                            salePrice={fabric.sale_price}
                            saleLabel={fabric.sale_label}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border-2 border-dashed border-cream-dark bg-white p-8 text-center">
                    <p className="text-text-light">Photos coming soon!</p>
                  </div>
                )}
              </section>

              {/* Our Shop */}
              <section>
                <h3 className="mb-4 text-xl font-bold text-text">Our Shop</h3>
                {shopPhotos.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {shopPhotos.map((photo, i) => (
                      <div
                        key={`${photo.name}-${i}`}
                        className="overflow-hidden rounded-xl bg-white shadow-[0_2px_12px_rgba(44,24,16,0.06)]"
                      >
                        {photo.image && (
                          <div className="aspect-[4/3] bg-cream-dark">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={photo.image}
                              alt={photo.caption || photo.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        {(photo.caption || photo.name) && (
                          <div className="p-3">
                            <p className="text-sm text-text-light">
                              {photo.caption || photo.name}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border-2 border-dashed border-cream-dark bg-white p-8 text-center">
                    <p className="text-text-light">Photos coming soon!</p>
                  </div>
                )}
              </section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 rounded-b-2xl border-t border-primary/10 bg-cream px-6 py-4 text-center">
          <button
            onClick={onClose}
            className="rounded-full bg-gradient-to-r from-primary to-accent px-8 py-2.5 text-sm font-bold text-cream shadow transition hover:scale-[1.02]"
          >
            Back to My Order
          </button>
        </div>
      </div>
    </div>
  );
}
