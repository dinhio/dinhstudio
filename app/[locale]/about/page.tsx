import { Navbar } from "@/components/navbar";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { parseLocale } from "@/i18n/config";
import { getCachedDictionary } from "@/i18n/dictionaries/runtime-cache";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const normalizedLocale = parseLocale(locale);

  if (!normalizedLocale) {
    notFound();
  }

  const dictionary = await getCachedDictionary(normalizedLocale);
  const withLocale = (href: string) => {
    if (href === "/") return `/${normalizedLocale}`;
    return `/${normalizedLocale}${href}`;
  };

  const values = [
    {
      title: dictionary.about.valueCards.craftsmanshipTitle,
      description: dictionary.about.valueCards.craftsmanshipDescription,
      color: "bg-slate-card",
    },
    {
      title: dictionary.about.valueCards.collaborationTitle,
      description: dictionary.about.valueCards.collaborationDescription,
      color: "bg-olive-card",
    },
    {
      title: dictionary.about.valueCards.innovationTitle,
      description: dictionary.about.valueCards.innovationDescription,
      color: "bg-terracotta-card",
    },
  ];

  const capabilities = [
    {
      title: dictionary.about.capabilities.webDesignTitle,
      items: dictionary.about.capabilities.webDesignItems,
    },
    {
      title: dictionary.about.capabilities.developmentTitle,
      items: dictionary.about.capabilities.developmentItems,
    },
    {
      title: dictionary.about.capabilities.strategyTitle,
      items: dictionary.about.capabilities.strategyItems,
    },
    {
      title: dictionary.about.capabilities.supportTitle,
      items: dictionary.about.capabilities.supportItems,
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar alwaysVisible />

      <section className="pt-32 pb-16 px-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-7xl">
            {dictionary.about.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {dictionary.about.heroBody}
          </p>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-6 text-balance">
                {dictionary.about.missionTitle}
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <p className="mb-6 text-muted-foreground leading-relaxed">
                {dictionary.about.missionBodyOne}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {dictionary.about.missionBodyTwo}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-12">
            {dictionary.about.valuesTitle}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className={`${value.color} rounded-2xl p-8`}
              >
                <h3 className="mb-4 text-xl font-bold text-white">
                  {value.title}
                </h3>
                <p className="text-white/80">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-12">
            {dictionary.about.capabilitiesTitle}
          </h2>
          <div className="grid gap-px bg-border md:grid-cols-2">
            {capabilities.map((category) => (
              <div key={category.title} className="bg-background p-8 md:p-12">
                <h3 className="mb-6 text-xl font-bold text-foreground">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item) => (
                    <li key={item} className="text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-card p-8 md:p-12">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8">
              {dictionary.about.techTitle}
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                "Next.js",
                "React",
                "TypeScript",
                "Tailwind CSS",
                "Vercel",
                "Figma",
                "Stripe",
                "Shopify",
                "Polar",
                "Node.js",
                "Framer Motion",
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                {dictionary.about.ctaTitle}
              </h2>
              <p className="text-muted-foreground">
                {dictionary.about.ctaBody}
              </p>
            </div>
            <Link
              href={withLocale("/contact")}
              className="group flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-medium text-accent-foreground transition-all hover:scale-105 glow-accent"
            >
              {dictionary.about.ctaButton}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

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
          <div className="flex items-center text-xs tracking-wide text-muted-foreground">
            <Link
              href="/en-us/about"
              className={`px-0.5 transition-colors ${normalizedLocale === "en-us"
                ? "font-bold text-foreground"
                : "font-medium hover:text-foreground"
                }`}
            >
              EN
            </Link>
            <span className="px-1 text-muted-foreground/70">/</span>
            <Link
              href="/vi-vn/about"
              className={`px-0.5 transition-colors ${normalizedLocale === "vi-vn"
                ? "font-bold text-foreground"
                : "font-medium hover:text-foreground"
                }`}
            >
              VI
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
