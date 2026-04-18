"use client";

import { useState } from "react";
import Lightbox from "../../components/lightbox";

interface Props {
  images: string[];
  name: string;
  showSaleBadge: boolean;
  saleBadgeText: string;
}

export default function FabricImages({ images, name, showSaleBadge, saleBadgeText }: Props) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-xl border-2 border-dashed border-cream-dark bg-white">
        <p className="text-text-muted">No photo available</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        {showSaleBadge && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
            {saleBadgeText}
          </span>
        )}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="block aspect-[4/3] w-full overflow-hidden rounded-xl bg-cream-dark"
          aria-label={`Open ${name}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[active]} alt={name} className="h-full w-full object-cover" />
        </button>
        {images.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {images.map((src, idx) => (
              <button
                key={`${src}-${idx}`}
                type="button"
                onClick={() => setActive(idx)}
                className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition ${
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
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          index={active}
          alt={name}
          onClose={() => setLightboxOpen(false)}
          onIndexChange={(next) => setActive(next)}
        />
      )}
    </>
  );
}
