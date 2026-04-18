import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  fetchCatalog,
  formatPrice,
  formatYards,
  hasValue,
  isNumeric,
  slugify,
  splitImageUrls,
} from "../../lib/catalog";
import FabricImages from "./fabric-images";

const SITE_URL = "https://telasourceph.com";

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function findFabric(slug: string) {
  const items = await fetchCatalog();
  return items.find((f) => f.category === "fabric" && slugify(f.name) === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const fabric = await findFabric(slug);
  if (!fabric) {
    return { title: "Fabric not found — TelaSource PH" };
  }

  const gallery = splitImageUrls(fabric.image_urls);
  const fallback = fabric.image ? [fabric.image] : [];
  const images = gallery.length > 0 ? gallery : fallback;

  const priceStr = hasValue(fabric.price) ? formatPrice(fabric.price) : "";
  const saleStr = hasValue(fabric.sale_price) ? formatPrice(fabric.sale_price!) : "";
  const priceLine = saleStr
    ? `${saleStr}${priceStr ? ` (was ${priceStr})` : ""}`
    : priceStr;

  const title = `${fabric.name}${priceLine ? " — " + priceLine : ""}`;
  const description =
    (fabric.caption ? `${fabric.caption}. ` : "") +
    "Wholesale fabric sourced from Divisoria. Order by sending us your list.";
  const url = `/fabric/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: images.map((src) => ({ url: src })),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
    alternates: { canonical: url },
  };
}

export default async function FabricPage({ params }: PageProps) {
  const { slug } = await params;
  const fabric = await findFabric(slug);
  if (!fabric) notFound();

  const gallery = splitImageUrls(fabric.image_urls);
  const fallback = fabric.image ? [fabric.image] : [];
  const images = gallery.length > 0 ? gallery : fallback;

  const priceStr = hasValue(fabric.price) ? formatPrice(fabric.price) : "";
  const saleStr = hasValue(fabric.sale_price) ? formatPrice(fabric.sale_price!) : "";
  const yardsStr = formatYards(fabric.yards_per_roll);
  const showSaleBadge = hasValue(fabric.sale_price) || hasValue(fabric.sale_label);
  const saleBadgeText =
    hasValue(fabric.sale_label) ? String(fabric.sale_label) : "Sale";

  // Product JSON-LD
  const numericSalePrice =
    hasValue(fabric.sale_price) && isNumeric(fabric.sale_price)
      ? Number(String(fabric.sale_price).replace(/,/g, ""))
      : null;
  const numericPrice =
    hasValue(fabric.price) && isNumeric(fabric.price)
      ? Number(String(fabric.price).replace(/,/g, ""))
      : null;
  const ldPrice = numericSalePrice ?? numericPrice;

  const productJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: fabric.name,
    image: images.length > 0 ? images : undefined,
    description:
      (fabric.caption ? `${fabric.caption}. ` : "") +
      "Wholesale fabric from Divisoria by TelaSource PH.",
    brand: { "@type": "Brand", name: "TelaSource PH" },
    url: `${SITE_URL}/fabric/${slug}`,
  };
  if (ldPrice !== null) {
    productJsonLd.offers = {
      "@type": "Offer",
      url: `${SITE_URL}/fabric/${slug}`,
      priceCurrency: "PHP",
      price: ldPrice,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: ldPrice,
        priceCurrency: "PHP",
        unitText: "yard",
      },
      availability: "https://schema.org/InStock",
    };
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <nav className="mb-6 text-sm text-text-muted">
        <Link href="/gallery" className="hover:text-primary">
          Gallery
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{fabric.name}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        <FabricImages images={images} name={fabric.name} showSaleBadge={showSaleBadge} saleBadgeText={saleBadgeText} />

        <div>
          <h1 className="mb-2 text-3xl font-extrabold text-text">{fabric.name}</h1>

          <div className="mb-4">
            {saleStr ? (
              <div className="flex flex-wrap items-baseline gap-3">
                {priceStr && (
                  <span className="text-base text-text-muted line-through">{priceStr}</span>
                )}
                <span className="text-2xl font-bold text-red-600">{saleStr}</span>
              </div>
            ) : priceStr ? (
              <p className="text-xl font-semibold text-primary">{priceStr}</p>
            ) : null}
            {yardsStr && <p className="mt-1 text-sm text-text-muted">{yardsStr}</p>}
            {fabric.caption && (
              <p className="mt-1 text-sm text-text-muted">{fabric.caption}</p>
            )}
          </div>

          <Link
            href="/upload"
            className="inline-block rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-bold text-cream shadow transition hover:scale-[1.02]"
          >
            Order This Fabric
          </Link>
        </div>
      </div>
    </div>
  );
}
