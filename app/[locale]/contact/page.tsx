import { Navbar } from "@/components/navbar";
import { Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { parseLocale } from "@/i18n/config";
import { getCachedDictionary } from "@/i18n/dictionaries/runtime-cache";

export default async function ContactPage({
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

  return (
    <main className="min-h-screen bg-background">
      <Navbar alwaysVisible />

      <section className="flex min-h-screen flex-col items-center justify-center px-6 py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-accent/10 flex items-center justify-center">
                <Mail className="h-10 w-10 text-accent" />
              </div>
              <div className="absolute -inset-4 rounded-full bg-accent/5 animate-pulse" />
            </div>
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-7xl mb-6 text-balance">
            {dictionary.contact.heroTitle}
          </h1>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            {dictionary.contact.heroBody}
          </p>

          <a
            href="mailto:hello@dinhstudio.com"
            className="group inline-flex items-center gap-4 rounded-2xl bg-card p-8 transition-all hover:bg-card/80 hover:scale-[1.02]"
          >
            <div className="flex flex-col items-start">
              <span className="text-sm text-muted-foreground mb-1">
                {dictionary.contact.emailLabel}
              </span>
              <span className="text-2xl font-bold text-foreground md:text-3xl">
                hello@dinhstudio.com
              </span>
            </div>
            <ArrowUpRight className="h-6 w-6 text-accent transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>

          <div className="mt-16 grid gap-8 md:grid-cols-3 max-w-3xl mx-auto">
            <div className="text-center">
              <h3 className="text-lg font-bold text-foreground mb-2">
                {dictionary.contact.responseTimeTitle}
              </h3>
              <p className="text-sm text-muted-foreground">
                {dictionary.contact.responseTimeBody}
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-foreground mb-2">
                {dictionary.contact.basedInTitle}
              </h3>
              <p className="text-sm text-muted-foreground">
                {dictionary.contact.basedInBody}
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-foreground mb-2">
                {dictionary.contact.availabilityTitle}
              </h3>
              <p className="text-sm text-muted-foreground">
                {dictionary.contact.availabilityBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8 text-center">
            {dictionary.contact.nextTitle}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {dictionary.contact.nextSteps.map((item) => (
              <div key={item.step} className="rounded-xl bg-card p-6 text-center">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold">
                  {item.step}
                </div>
                <h3 className="mb-2 font-bold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
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
              href="/en-us/contact"
              className={`px-0.5 transition-colors ${normalizedLocale === "en-us"
                ? "font-bold text-foreground"
                : "font-medium hover:text-foreground"
                }`}
            >
              EN
            </Link>
            <span className="px-1 text-muted-foreground/70">/</span>
            <Link
              href="/vi-vn/contact"
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
