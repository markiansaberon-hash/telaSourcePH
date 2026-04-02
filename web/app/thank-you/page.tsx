import Link from "next/link";

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <section className="flex min-h-[60vh] items-center bg-cream px-4 py-20">
      <div className="mx-auto max-w-lg text-center">
        <div className="animate-fade-in-up mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success text-white">
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

        <h1 className="animate-fade-in-up animate-delay-100 mb-4 text-3xl font-extrabold text-text md:text-4xl">
          List Received!
        </h1>

        <p className="animate-fade-in-up animate-delay-200 mb-6 text-lg text-text-light">
          Salamat! We received your fabric list. Our team will review it and send
          you a quotation within <strong className="text-text">24 hours</strong> through your preferred
          messaging app.
        </p>

        {orderId && (
          <div className="animate-fade-in-up animate-delay-300 mb-6 rounded-xl border-l-4 border-accent bg-white px-6 py-4 shadow-[0_2px_12px_rgba(44,24,16,0.06)]">
            <p className="text-sm text-text-light">Your reference number</p>
            <p className="text-xl font-bold text-text">{orderId}</p>
          </div>
        )}

        <div className="animate-fade-in-up animate-delay-300 mb-8 rounded-xl bg-cream-dark px-6 py-4">
          <p className="text-sm text-text-light">
            Questions? Call or message us
          </p>
          <p className="text-lg font-bold text-primary">0917 328 7704</p>
        </div>

        <Link
          href="/"
          className="animate-fade-in-up animate-delay-400 inline-block rounded-full bg-primary px-8 py-3 font-semibold text-cream transition hover:bg-primary-dark"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
