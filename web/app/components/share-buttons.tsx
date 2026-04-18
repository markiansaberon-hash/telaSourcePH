"use client";

import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
  compact?: boolean;
}

export default function ShareButtons({ url, title, compact = false }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(!compact);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const fbShare = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const messengerShare = `https://www.facebook.com/dialog/send?link=${encodedUrl}&app_id=291494419107518&redirect_uri=${encodedUrl}`;
  const viberShare = `viber://forward?text=${encodedTitle}%20${encodedUrl}`;
  const whatsappShare = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;

  function copyLink(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (compact && !open) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className="inline-flex items-center gap-1 rounded-full border border-cream-dark bg-white px-3 py-1 text-xs font-semibold text-text-light transition hover:border-primary hover:text-primary"
        aria-label="Share"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
        Share
      </button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <a
        href={fbShare}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-1 rounded-full bg-[#1877F2] px-3 py-1 text-xs font-semibold text-white transition hover:opacity-90"
        aria-label="Share on Facebook"
      >
        Facebook
      </a>
      <a
        href={messengerShare}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-1 rounded-full bg-[#0084FF] px-3 py-1 text-xs font-semibold text-white transition hover:opacity-90"
        aria-label="Share on Messenger"
      >
        Messenger
      </a>
      <a
        href={viberShare}
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-1 rounded-full bg-[#7360F2] px-3 py-1 text-xs font-semibold text-white transition hover:opacity-90"
        aria-label="Share on Viber"
      >
        Viber
      </a>
      <a
        href={whatsappShare}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-1 rounded-full bg-[#25D366] px-3 py-1 text-xs font-semibold text-white transition hover:opacity-90"
        aria-label="Share on WhatsApp"
      >
        WhatsApp
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-1 rounded-full border border-cream-dark bg-white px-3 py-1 text-xs font-semibold text-text-light transition hover:border-primary hover:text-primary"
        aria-label="Copy link"
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
