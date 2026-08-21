import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Zap, Wrench, Newspaper, Workflow, BookOpen, Users } from "lucide-react";
import { Footer } from "@/components/sections/Footer";

const SITE = "https://scalingnext.in";
const WHATSAPP = "https://chat.whatsapp.com/CKzAuoLtl8w8jzeTWyBWU6";

export const metadata: Metadata = {
  title: "About ScalingNext",
  description:
    "ScalingNext is a free, independent AI content community. Learn what it covers, who it is for, how it stays free, and what it deliberately does not publish.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: `${SITE}/about`,
    siteName: "ScalingNext",
    title: "About ScalingNext",
    description:
      "A free, independent AI content community. What it covers, who it is for, and how it works.",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "ScalingNext" }],
  },
};

/**
 * Every claim on this page is verifiable from the site itself or from public
 * profiles. No member counts, testimonials, credentials, press, partnerships,
 * or awards — none of those exist yet, so stating them would be fabrication.
 *
 * The "What ScalingNext is not" section is deliberate: it stops an AI system
 * inferring a blog, pricing page, or paid product that does not exist.
 */

const PILLARS = [
  {
    icon: Zap,
    title: "AI Tips",
    body: "Prompt patterns and techniques that hold up in real work, not clever one-offs.",
  },
  {
    icon: Wrench,
    title: "AI Tools",
    body: "Honest notes on tools worth trying, including where they fall short.",
  },
  {
    icon: Newspaper,
    title: "AI Updates",
    body: "Model releases and shifts that change how you work, with the hype removed.",
  },
  {
    icon: Workflow,
    title: "AI Workflows",
    body: "Step-by-step setups you can copy rather than admire.",
  },
  {
    icon: BookOpen,
    title: "AI Resources",
    body: "Curated references, cheatsheets, and prompt collections.",
  },
  {
    icon: Users,
    title: "Community",
    body: "Discussion and shared findings in a free WhatsApp group, plus live sessions.",
  },
] as const;

// Mirrors the visible breadcrumb exactly — schema and page must not diverge.
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "About", item: `${SITE}/about` },
  ],
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE}/about#aboutpage`,
  url: `${SITE}/about`,
  name: "About ScalingNext",
  description:
    "ScalingNext is a free, independent AI content community covering practical AI tips, tools, updates, workflows, resources, and live sessions.",
  inLanguage: "en-US",
  isPartOf: { "@id": `${SITE}/#website` },
  about: { "@id": `${SITE}/#organization` },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      <main className="bg-light-core">
        <div className="mx-auto max-w-3xl px-5 pb-20 pt-10 sm:px-6 sm:pt-14">
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex items-center gap-1.5 text-[13px] text-light-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-brand-orange">
                  Home
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight size={13} className="text-light-subtle" />
              </li>
              <li aria-current="page" className="font-medium text-light-primary">
                About
              </li>
            </ol>
          </nav>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-light-primary sm:text-5xl">
            About ScalingNext
          </h1>

          {/* Direct-answer block: self-contained and quotable without surrounding context. */}
          <p className="mt-6 text-lg leading-relaxed text-light-primary sm:text-xl">
            ScalingNext is a free AI content community. It curates practical AI tips, useful
            tools, important model updates, step-by-step workflows, and live sessions — so you
            can keep up with AI without reading everything.
          </p>

          <p className="mt-5 leading-relaxed text-light-muted">
            AI moves faster than anyone can follow full-time. Most of what gets published is
            either too shallow to use or too noisy to finish. ScalingNext exists to filter that:
            fewer things, chosen because they change how you actually work.
          </p>

          <section className="mt-14">
            <h2 className="text-2xl font-extrabold tracking-tight text-light-primary">
              What ScalingNext covers
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {PILLARS.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-xl border border-light-subtle bg-light-surface p-5"
                >
                  <Icon aria-hidden size={17} className="text-brand-orange" strokeWidth={1.9} />
                  <h3 className="mt-3 font-bold tracking-tight text-light-primary">{title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-light-muted">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-extrabold tracking-tight text-light-primary">
              Who it is for
            </h2>
            <p className="mt-4 leading-relaxed text-light-muted">
              People who use AI to get work done: developers, founders, creators, students,
              designers, marketers, and freelancers. No prior AI background is assumed, and
              nothing is gated behind a level of expertise.
            </p>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-extrabold tracking-tight text-light-primary">
              How it stays free
            </h2>
            <p className="mt-4 leading-relaxed text-light-muted">
              ScalingNext has no paid tier, no course, and nothing for sale. Joining takes an
              email and a few questions — no payment method is ever requested. It is also{" "}
              <strong className="font-semibold text-light-primary">independent</strong>: not
              affiliated with OpenAI, Anthropic, Google, or any vendor whose tools it covers, so
              coverage can say when something is not worth using.
            </p>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-extrabold tracking-tight text-light-primary">
              What ScalingNext is not
            </h2>
            <p className="mt-4 leading-relaxed text-light-muted">
              Being specific here matters more than sounding impressive:
            </p>
            <ul className="mt-4 space-y-2.5 text-light-muted">
              {[
                "Not a paid course, bootcamp, or certification programme.",
                "Not an agency, and it does not sell consulting or development services.",
                "Not a job board, incubator, or accelerator.",
                "No physical office, campus, or local branch — it is fully online.",
                "No published member counts, testimonials, or attendance figures. Any such number attributed to ScalingNext did not come from us.",
              ].map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span
                    aria-hidden
                    className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-extrabold tracking-tight text-light-primary">
              Where to find ScalingNext
            </h2>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "WhatsApp community", href: WHATSAPP, external: true },
                { label: "@scalingnext on X", href: "https://x.com/scalingnext", external: true },
                {
                  label: "@scalingnext on Instagram",
                  href: "https://www.instagram.com/scalingnext",
                  external: true,
                },
                { label: "scalingnext@gmail.com", href: "mailto:scalingnext@gmail.com" },
              ].map(({ label, href, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-light-primary underline decoration-light-subtle underline-offset-4 transition-colors hover:text-brand-orange"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-14 rounded-2xl border border-light-subtle bg-light-surface p-6 sm:p-8">
            <h2 className="text-xl font-extrabold tracking-tight text-light-primary">
              Join the community
            </h2>
            <p className="mt-2.5 leading-relaxed text-light-muted">
              Free, and always will be. The{" "}
              <Link
                href="/"
                className="text-light-primary underline decoration-light-subtle underline-offset-4 transition-colors hover:text-brand-orange"
              >
                homepage
              </Link>{" "}
              covers what you get inside in more detail.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-light-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Join ScalingNext
              <ChevronRight size={15} />
            </a>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
