import Link from "next/link";

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <section className="flex min-h-[60vh] items-center bg-surface px-4 py-20">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success text-white">
          <svg
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-primary md:text-4xl">
          List Received!
        </h1>

        <p className="mb-6 text-lg text-text-light">
          Salamat! We received your fabric list. Our team will review it and send
          you a quotation within <strong>24 hours</strong> via Viber/WhatsApp.
        </p>

        {orderId && (
          <div className="mb-6 rounded-xl bg-white px-6 py-4 shadow-sm">
            <p className="text-sm text-text-light">Your reference number</p>
            <p className="text-xl font-bold text-primary">{orderId}</p>
          </div>
        )}

        <div className="mb-8 rounded-xl bg-primary/5 px-6 py-4">
          <p className="text-sm text-text-light">
            Questions? Message us on Viber
          </p>
          <p className="text-lg font-semibold text-primary">09XX XXX XXXX</p>
        </div>

        <Link
          href="/"
          className="inline-block rounded-xl bg-primary px-8 py-3 font-semibold text-white transition hover:bg-primary-dark"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
