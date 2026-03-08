import { HeroCarousel } from "@/components/hero-carousel";
import { Navbar } from "@/components/navbar";
import { isValidLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return (
    <main className="min-h-screen bg-background">
      <Navbar hideUntilScroll />

      <section className="px-6 pt-24 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{dictionary.localeName}</span>
            <span aria-hidden>•</span>
            <span>{dictionary.translationStatus}</span>
          </div>
        </div>
      </section>

      {/* Hero Section with 3D Carousel */}
      <HeroCarousel />

      {/* Content Section */}
      <section id="content" className="relative py-32 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Intro Section */}
          <div className="mb-32 grid gap-16 md:grid-cols-2">
            <div>
              <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl text-balance">
                We craft digital experiences that captivate and convert.
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                dinhstudio is a web design and development studio dedicated to
                building beautiful, high-performance websites that help
                businesses stand out in the digital landscape.
              </p>
              <Link
                href="/services"
                className="group flex items-center gap-2 text-foreground font-medium"
              >
                Explore our services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mb-32 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "100%", label: "Client Satisfaction" },
              { value: "5+", label: "Years Experience" },
              { value: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div
                key={index}
                className="border-l border-border pl-6"
              >
                <div className="text-4xl font-bold text-accent md:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Services Preview */}
          <div className="mb-32">
            <div className="mb-12 flex items-end justify-between">
              <h3 className="text-3xl font-bold tracking-tight text-foreground">
                Our Services
              </h3>
              <Link
                href="/services"
                className="group flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                View all
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Kickstart",
                  description: "Start fresh with a brand new website tailored to your vision.",
                  color: "bg-slate-card",
                },
                {
                  title: "Revamp",
                  description: "Transform your existing website into something extraordinary.",
                  color: "bg-olive-card",
                },
                {
                  title: "Sustain",
                  description: "Ongoing hosting, maintenance, and support for your site.",
                  color: "bg-terracotta-card",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className={`${service.color} rounded-2xl p-8 transition-transform hover:scale-[1.02]`}
                >
                  <h4 className="mb-4 text-xl font-bold text-white">
                    {service.title}
                  </h4>
                  <p className="text-white/80">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative overflow-hidden rounded-3xl bg-card p-12 md:p-20">
            <div className="relative z-10 flex flex-col items-center text-center">
              <h3 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                Ready to bring your vision to life?
              </h3>
              <p className="mb-8 max-w-xl text-muted-foreground">
                {"Let's"} collaborate to create a website that truly represents your
                brand and drives results.
              </p>
              <Link
                href="/contact"
                className="flex h-12 items-center justify-center rounded-full bg-accent px-8 font-medium text-accent-foreground transition-all hover:scale-105 glow-accent"
              >
                Get in touch
              </Link>
            </div>
            {/* Background decoration */}
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
          </div>
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
