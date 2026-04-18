import Link from "next/link";
import ScrollReveal from "./components/scroll-reveal";

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 text-cream md:py-32">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-dark"
        style={{
          backgroundImage: "url('/hero-fabrics.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      {/* Dark overlay for text contrast */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="animate-fade-in-up mb-4 text-sm font-semibold tracking-widest text-accent uppercase md:text-base">
          Mabuhay!
        </p>
        <h1 className="animate-fade-in-up animate-delay-100 mb-6 text-[2rem] font-extrabold leading-tight drop-shadow-lg md:text-[3rem] lg:text-[3.5rem]">
          Send us your fabric list.
          <br />
          <span className="text-primary">
            We&apos;ll find the best price for you.
          </span>
        </h1>
        <p className="animate-fade-in-up animate-delay-200 mx-auto mb-10 max-w-2xl text-base text-cream/90 drop-shadow md:text-lg">
          Bulk fabric orders made easy. We source from 50+ Divisoria suppliers,
          get you the best wholesale prices, and deliver fast — all from your phone.
        </p>
        <Link
          href="/upload"
          className="animate-fade-in-up animate-delay-300 inline-block rounded-full bg-gradient-to-r from-primary to-accent px-8 py-4 text-lg font-bold text-cream shadow-[0_4px_20px_rgba(196,102,46,0.4)] transition hover:scale-[1.02] hover:shadow-[0_6px_30px_rgba(196,102,46,0.5)]"
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
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
      ),
      title: "Send Your List",
      description: "Upload a photo of your handwritten fabric list or type it in our form. It takes less than 2 minutes.",
    },
    {
      number: "2",
      icon: (
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      ),
      title: "We Source It",
      description: "Our team compares wholesale prices across 50+ trusted Divisoria suppliers and negotiates the best bulk deal for you. Less hassle, better prices.",
    },
    {
      number: "3",
      icon: (
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h.586c.38 0 .748.138 1.032.393l1.896 1.703c.284.255.652.393 1.032.393h6.158c.38 0 .748-.138 1.032-.393l1.896-1.703a1.5 1.5 0 011.032-.393h.586m-15.25 0V6.375c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v7.875" />
        </svg>
      ),
      title: "We Deliver",
      description: "Receive everything in one consolidated delivery with a full itemized quotation. No surprises.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-cream px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="mb-4 text-center text-[1.75rem] font-extrabold text-text md:text-[2.25rem]">
            How It Works
          </h2>
          <p className="mx-auto mb-14 max-w-xl text-center text-text-light">
            Three simple steps from your list to your door.
          </p>
        </ScrollReveal>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 100}>
              <div className="rounded-xl border border-cream-dark bg-white p-8 text-center shadow-[0_2px_12px_rgba(44,24,16,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(44,24,16,0.1)]">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-cream">
                  {step.icon}
                </div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.65rem] font-bold text-cream">
                    {step.number}
                  </span>
                  <span className="text-xs font-semibold text-primary">
                    Step {step.number}
                  </span>
                </div>
                <h3 className="mb-3 mt-2 text-xl font-bold text-text">
                  {step.title}
                </h3>
                <p className="text-text-light">{step.description}</p>
              </div>
            </ScrollReveal>
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
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Save Time",
      description: "No need to visit Divisoria yourself. We do all the legwork so you can focus on running your business.",
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      ),
      title: "Best Prices",
      description: "We source the best wholesale price across 50+ suppliers and negotiate bulk rates by the roll you won't get on your own.",
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
      title: "One Delivery",
      description: "All your fabrics from different suppliers consolidated into a single shipment. Fast and efficient.",
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Transparent Pricing",
      description: "Receive an itemized quotation before you confirm. No hidden fees, no surprises.",
    },
  ];

  return (
    <section className="bg-cream-dark px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="mb-4 text-center text-[1.75rem] font-extrabold text-text md:text-[2.25rem]">
            Why Choose TelaSource PH
          </h2>
          <p className="mx-auto mb-14 max-w-xl text-center text-text-light">
            Best prices, less hassle, fast and efficient — we do it all for you.
          </p>
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <ScrollReveal key={benefit.title} delay={i * 80}>
              <div className="rounded-xl bg-white p-6 shadow-[0_2px_12px_rgba(44,24,16,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(44,24,16,0.1)]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {benefit.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-text">
                  {benefit.title}
                </h3>
                <p className="text-sm text-text-light">{benefit.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const stats = [
    { value: "50+", label: "Trusted Suppliers" },
    { value: "50+", label: "Years in Textiles" },
    { value: "500+", label: "Orders Per Month" },
  ];

  return (
    <section className="bg-dark px-4 py-16 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <h2 className="mb-6 text-[1.75rem] font-extrabold text-cream md:text-[2.25rem]">
            Over 50 Years in the Fabric Business
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-base text-text-muted md:text-lg">
            Our family has been in the textile trade for over 50 years. With
            direct relationships with 50+ Divisoria suppliers, we know the market,
            the pricing, and the quality — so you always get the best deal.
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100}>
              <div className="rounded-xl bg-dark-mid px-4 py-8 text-cream">
                <div className="mb-1 text-3xl font-extrabold text-accent md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-text-muted md:text-sm">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="bg-cream px-4 py-16 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <h2 className="mb-4 text-[1.75rem] font-extrabold text-text md:text-[2.25rem]">
            Contact Us
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-text-light">
            Have questions? Visit our shop or give us a call — we&apos;re happy to
            help!
          </p>
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-3">
          <ScrollReveal delay={0}>
            <div className="rounded-xl bg-white p-6 shadow-[0_2px_12px_rgba(44,24,16,0.06)]">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0a2.994 2.994 0 00.344-1.153L3.75 3.75h16.5l.406 4.446a3 3 0 00.344 1.153" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-text">Our Shop</h3>
              <a
                href="https://maps.app.goo.gl/LZMX8ichNB4nTyEBA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold text-accent underline transition hover:text-primary"
              >
                Shop 4110, Divisoria
              </a>
              <p className="text-sm text-text-light">Manila</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="rounded-xl bg-white p-6 shadow-[0_2px_12px_rgba(44,24,16,0.06)]">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-text">Call or Message</h3>
              <p className="text-lg font-bold text-primary">0917 328 7704</p>
              <p className="text-sm text-text-light">Viber / Call / Text</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="rounded-xl bg-white p-6 shadow-[0_2px_12px_rgba(44,24,16,0.06)]">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-text">Business Hours</h3>
              <p className="text-sm text-text-light">Monday – Sunday</p>
              <p className="text-sm text-text-light">8:00 AM – 5:00 PM</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-dark px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-extrabold text-cream md:text-4xl">
          Ready to source your fabrics?
        </h2>
        <p className="mb-8 text-lg text-cream/80">
          Upload your list now and get a quotation within 24 hours.
        </p>
        <Link
          href="/upload"
          className="inline-block rounded-full bg-cream px-8 py-4 text-lg font-bold text-primary shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
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
      <ContactSection />
      <CTASection />
    </>
  );
}
