import type { Metadata } from "next";
import GalleryClient from "./gallery-client";

const SITE_URL = "https://telasourceph.com";

export const metadata: Metadata = {
  title: "Fabric Gallery — Wholesale Fabrics from Divisoria",
  description:
    "Browse our fabric collection — tela by the roll, sourced wholesale from Divisoria. Cotton, polyester, uniform fabrics, and more with live pricing.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Fabric Gallery — TelaSource PH",
    description:
      "Browse our fabric collection — wholesale tela from Divisoria with live pricing.",
    url: "/gallery",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Gallery",
      item: `${SITE_URL}/gallery`,
    },
  ],
};

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <GalleryClient />
    </>
  );
}
