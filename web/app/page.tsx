import Link from "next/link";

function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary to-primary-dark px-4 py-20 text-white md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          Send your fabric list.
          <br />
          <span className="text-accent">We source everything for you.</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300 md:text-xl">
          No need to go to Divisoria. Upload your list, get a quotation, and we
          deliver — all from your phone.
        </p>
        <Link
          href="/upload"
          className="inline-block rounded-xl bg-accent px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-accent-dark hover:shadow-xl"
        >
          Upload Your List Now
        </Link>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      icon: (
        <svg
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
      ),
      title: "Send Your List",
      description:
        "Upload a photo of your handwritten fabric list or type it in our form. It takes less than 2 minutes.",
    },
    {
      number: "2",
      icon: (
        <svg
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      ),
      title: "We Source It",
      description:
        "Our team finds the best prices from 30+ trusted Divisoria suppliers. We compare and negotiate for you.",
    },
    {
      number: "3",
      icon: (
        <svg
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h.586c.38 0 .748.138 1.032.393l1.896 1.703c.284.255.652.393 1.032.393h6.158c.38 0 .748-.138 1.032-.393l1.896-1.703a1.5 1.5 0 011.032-.393h.586m-15.25 0V6.375c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v7.875"
          />
        </svg>
      ),
      title: "We Deliver",
      description:
        "Receive everything in one consolidated delivery with a full itemized quotation. No surprises.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-white px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-primary md:text-4xl">
          How It Works
        </h2>
        <p className="mx-auto mb-14 max-w-xl text-center text-text-light">
          Three simple steps from your list to your door.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-gray-100 bg-surface p-8 text-center transition hover:shadow-lg"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                {step.icon}
              </div>
              <div className="mb-2 text-sm font-semibold text-accent">
                Step {step.number}
              </div>
              <h3 className="mb-3 text-xl font-bold text-primary">
                {step.title}
              </h3>
              <p className="text-text-light">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Save Time",
      description:
        "No need to visit multiple suppliers. We do the legwork for you so you can focus on your business.",
    },
    {
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
          />
        </svg>
      ),
      title: "Better Prices",
      description:
        "We negotiate bulk across multiple orders for competitive rates you won't get on your own.",
    },
    {
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
      ),
      title: "One Delivery",
      description:
        "All your fabrics from different suppliers consolidated into a single shipment.",
    },
    {
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Transparent Pricing",
      description:
        "Receive an itemized quotation before you confirm. No hidden fees, no surprises.",
    },
  ];

  return (
    <section className="bg-surface px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-primary md:text-4xl">
          Why Use FabricHub PH
        </h2>
        <p className="mx-auto mb-14 max-w-xl text-center text-text-light">
          We handle the hard part so you don&apos;t have to.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {benefit.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold text-primary">
                {benefit.title}
              </h3>
              <p className="text-sm text-text-light">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const stats = [
    { value: "30+", label: "Trusted Suppliers" },
    { value: "3", label: "Generations" },
    { value: "500+", label: "Orders Fulfilled" },
  ];

  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-3xl font-bold text-primary md:text-4xl">
          3 Generations in the Fabric Business
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-lg text-text-light">
          Our family has been in the textile trade for over 30 years. We have
          direct relationships with 30+ Divisoria suppliers. We know the market,
          the pricing, and the quality.
        </p>
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-primary px-4 py-8 text-white"
            >
              <div className="mb-1 text-3xl font-bold md:text-4xl">
                {stat.value}
              </div>
              <div className="text-sm text-gray-300 md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-accent px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          Ready to source your fabrics?
        </h2>
        <p className="mb-8 text-lg text-white/80">
          Upload your list now and get a quotation within 24 hours.
        </p>
        <Link
          href="/upload"
          className="inline-block rounded-xl bg-white px-8 py-4 text-lg font-bold text-accent shadow-lg transition hover:bg-gray-100 hover:shadow-xl"
        >
          Upload Your List Now
        </Link>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <BenefitsSection />
      <TrustSection />
      <CTASection />
    </>
  );
}
