import { Navbar } from "@/components/navbar";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ServicePlan {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  color: string;
  textColor: string;
}

const servicePlans: ServicePlan[] = [
  {
    id: "kickstart",
    title: "Kickstart",
    subtitle: "Start Fresh",
    description:
      "Launch your digital presence with a brand new website tailored to your unique vision and business goals.",
    features: [
      "Brand Discovery Session",
      "Custom Design Concepts",
      "Responsive Development",
      "Content Strategy",
      "SEO Foundation",
      "Launch Support",
      "30-Day Post-Launch Care",
    ],
    color: "bg-slate-card",
    textColor: "text-white",
  },
  {
    id: "revamp",
    title: "Revamp",
    subtitle: "Transform & Elevate",
    description:
      "Breathe new life into your existing website with a complete redesign that modernizes your digital presence.",
    features: [
      "Site Audit & Analysis",
      "UX Improvements",
      "Modern Redesign",
      "Performance Optimization",
      "Content Migration",
      "SEO Enhancement",
      "Analytics Setup",
    ],
    color: "bg-olive-card",
    textColor: "text-white",
  },
  {
    id: "sustain",
    title: "Sustain",
    subtitle: "Ongoing Partnership",
    description:
      "Keep your website running smoothly with reliable hosting, maintenance, and continuous support.",
    features: [
      "Managed Hosting",
      "Security Monitoring",
      "Regular Backups",
      "Performance Updates",
      "Content Updates",
      "Priority Support",
      "Monthly Reports",
    ],
    color: "bg-terracotta-card",
    textColor: "text-white",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start by understanding your business, goals, and vision through in-depth conversations.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "We develop a comprehensive plan that aligns your digital presence with your business objectives.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Our designers craft beautiful, user-centered interfaces that reflect your brand identity.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "We build your website with clean code, ensuring speed, security, and scalability.",
  },
  {
    number: "05",
    title: "Launch",
    description:
      "After thorough testing, we deploy your site and provide training for your team.",
  },
  {
    number: "06",
    title: "Support",
    description:
      "We continue to support you with maintenance, updates, and strategic guidance.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar alwaysVisible />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-7xl">
            Services
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Whether {"you're"} starting from scratch, reimagining your existing
            presence, or need ongoing support, we have a solution tailored for
            you.
          </p>
        </div>
      </section>

      {/* Service Plans */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-card p-6 md:p-10">
            <div className="grid gap-6 md:grid-cols-3">
              {servicePlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`${plan.color} rounded-2xl p-8 transition-transform hover:scale-[1.02]`}
                >
                  <h2 className={`text-3xl font-bold ${plan.textColor} mb-2`}>
                    {plan.title}
                  </h2>
                  <p
                    className={`text-lg font-medium ${plan.textColor} opacity-70 mb-6`}
                  >
                    {plan.subtitle}
                  </p>
                  <p className={`${plan.textColor} opacity-80 mb-8 text-sm leading-relaxed`}>
                    {plan.description}
                  </p>
                  <div className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 ${plan.textColor} opacity-90`}
                      >
                        <Check className="h-4 w-4 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/20">
                    <Link
                      href="/contact"
                      className={`group flex items-center gap-2 ${plan.textColor} font-medium text-sm`}
                    >
                      Get started
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Our Process
            </h2>
            <p className="mt-4 text-muted-foreground">
              A proven methodology that ensures every project is delivered with
              excellence and attention to detail.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step) => (
              <div key={step.number} className="group">
                <div className="mb-4 text-5xl font-bold text-accent opacity-30 transition-opacity group-hover:opacity-100">
                  {step.number}
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-6">
                Every project includes
              </h2>
              <p className="text-muted-foreground mb-8">
                Regardless of which service you choose, every project comes with
                our commitment to quality and your success.
              </p>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-all hover:scale-105"
              >
                Discuss your project
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  title: "Mobile-First Design",
                  description: "Optimized for all devices and screen sizes",
                },
                {
                  title: "Performance Focus",
                  description: "Fast loading times and smooth interactions",
                },
                {
                  title: "SEO Ready",
                  description: "Built with search engine visibility in mind",
                },
                {
                  title: "Accessibility",
                  description: "WCAG compliant for inclusive experiences",
                },
                {
                  title: "Secure & Scalable",
                  description: "Enterprise-grade security and infrastructure",
                },
                {
                  title: "Documentation",
                  description: "Complete guides for managing your site",
                },
              ].map((item, index) => (
                <div key={index} className="rounded-xl bg-card p-6">
                  <h3 className="mb-2 font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                question: "How long does a typical project take?",
                answer:
                  "Project timelines vary based on scope and complexity. A Kickstart project typically takes 6-10 weeks, while a Revamp can be completed in 4-8 weeks.",
              },
              {
                question: "What platforms do you work with?",
                answer:
                  "We specialize in modern web technologies including Next.js, React, and headless CMS solutions. We can also work with platforms like Shopify and WordPress.",
              },
              {
                question: "Do you offer payment plans?",
                answer:
                  "Yes, we offer flexible payment options including milestone-based payments and monthly installments for larger projects.",
              },
              {
                question: "What's included in the Sustain plan?",
                answer:
                  "The Sustain plan includes managed hosting, regular backups, security monitoring, performance updates, content updates, and priority support.",
              },
            ].map((faq, index) => (
              <div key={index} className="rounded-xl bg-card p-6">
                <h3 className="mb-3 font-bold text-foreground">{faq.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Ready to get started?
          </h2>
          <p className="mb-8 text-muted-foreground">
            {"Let's"} discuss your project and find the perfect solution for your
            needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 font-medium text-accent-foreground transition-all hover:scale-105 glow-accent"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-xl font-bold tracking-tight">dinhstudio</div>
          <div className="flex items-center gap-8">
            <Link
              href="/work"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Work
            </Link>
            <Link
              href="/services"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            {new Date().getFullYear()} dinhstudio
          </div>
        </div>
      </footer>
    </main>
  );
}
