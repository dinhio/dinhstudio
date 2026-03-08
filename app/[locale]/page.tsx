import { HeroCarousel } from "@/components/hero-carousel";
import { Navbar } from "@/components/navbar";
import { parseLocale } from "@/i18n/config";
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
  const normalizedLocale = parseLocale(locale);

  if (!normalizedLocale) {
    notFound();
  }

  const dictionary = getDictionary(normalizedLocale);
  const withLocale = (href: string) => {
    if (href === "/") return `/${normalizedLocale}`;
    return `/${normalizedLocale}${href}`;
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar hideUntilScroll />

      {/* Hero Section with 3D Carousel */}
      <HeroCarousel />

      {/* Content Section */}
      <section id="content" className="relative py-32 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Intro Section */}
          <div className="mb-32 grid gap-16 md:grid-cols-2">
            <div>
              <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl text-balance">
                {dictionary.home.introHeading}
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                {dictionary.home.introBody}
              </p>
              <Link
                href={withLocale("/services")}
                className="group flex items-center gap-2 text-foreground font-medium"
              >
                {dictionary.home.exploreServices}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mb-32 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "50+", label: dictionary.home.stats.projectsDelivered },
              { value: "100%", label: dictionary.home.stats.clientSatisfaction },
              { value: "5+", label: dictionary.home.stats.yearsExperience },
              { value: "24/7", label: dictionary.home.stats.supportAvailable },
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
                {dictionary.home.servicesTitle}
              </h3>
              <Link
                href={withLocale("/services")}
                className="group flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                {dictionary.home.viewAll}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: dictionary.home.serviceCards.kickstartTitle,
                  description: dictionary.home.serviceCards.kickstartDescription,
                  color: "bg-slate-card",
                },
                {
                  title: dictionary.home.serviceCards.revampTitle,
                  description: dictionary.home.serviceCards.revampDescription,
                  color: "bg-olive-card",
                },
                {
                  title: dictionary.home.serviceCards.sustainTitle,
                  description: dictionary.home.serviceCards.sustainDescription,
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
                {dictionary.home.ctaHeading}
              </h3>
              <p className="mb-8 max-w-xl text-muted-foreground">
                {dictionary.home.ctaBody}
              </p>
              <Link
                href={withLocale("/contact")}
                className="flex h-12 items-center justify-center rounded-full bg-accent px-8 font-medium text-accent-foreground transition-all hover:scale-105 glow-accent"
              >
                {dictionary.home.ctaButton}
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
              href={withLocale("/work")}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {dictionary.nav.work}
            </Link>
            <Link
              href={withLocale("/services")}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {dictionary.nav.services}
            </Link>
            <Link
              href={withLocale("/about")}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {dictionary.nav.about}
            </Link>
            <Link
              href={withLocale("/contact")}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {dictionary.nav.contact}
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
