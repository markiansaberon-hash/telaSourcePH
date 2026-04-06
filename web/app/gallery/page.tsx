"use client";

import { useState, useEffect } from "react";
import ScrollReveal from "../components/scroll-reveal";

interface CatalogItem {
  name: string;
  price: string;
  image: string;
  category: string;
  caption: string;
}

export default function GalleryPage() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);

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
  const shopPhotos = items.filter((i) => i.category === "shop");

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
        </div>
      </ScrollReveal>

      {/* Our Fabrics */}
      <section className="mb-16">
        <ScrollReveal>
          <h2 className="mb-6 text-2xl font-bold text-text">Our Fabrics</h2>
        </ScrollReveal>
        {loading ? (
          <div className="py-12 text-center">
            <p className="text-text-muted">Loading...</p>
          </div>
        ) : fabrics.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fabrics.map((fabric, i) => (
              <ScrollReveal key={`${fabric.name}-${i}`} delay={i * 80}>
                <div className="overflow-hidden rounded-xl bg-white shadow-[0_2px_12px_rgba(44,24,16,0.06)]">
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
                  <div className="p-4">
                    <h3 className="font-bold text-text">{fabric.name}</h3>
                    {fabric.price && (
                      <p className="text-sm font-semibold text-primary">{fabric.price}</p>
                    )}
                  </div>
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
    </div>
  );
}
