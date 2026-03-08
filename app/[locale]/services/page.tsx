import { Navbar } from "@/components/navbar";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { parseLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const planColors = {
  kickstart: { color: "bg-slate-card", textColor: "text-white" },
  revamp: { color: "bg-olive-card", textColor: "text-white" },
  sustain: { color: "bg-terracotta-card", textColor: "text-white" },
} as const;

export default async function ServicesPage({
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
      <Navbar alwaysVisible />

      <section className="pt-32 pb-16 px-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-7xl">
            {dictionary.services.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {dictionary.services.heroBody}
          </p>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-card p-6 md:p-10">
            <div className="grid gap-6 md:grid-cols-3">
              {dictionary.services.plans.map((plan) => {
                const theme = planColors[plan.id as keyof typeof planColors];
                return (
                  <div
                    key={plan.id}
                    className={`${theme.color} rounded-2xl p-8 transition-transform hover:scale-[1.02]`}
                  >
                    <h2 className={`text-3xl font-bold ${theme.textColor} mb-2`}>
                      {plan.title}
                    </h2>
                    <p className={`text-lg font-medium ${theme.textColor} opacity-70 mb-6`}>
                      {plan.subtitle}
                    </p>
                    <p className={`${theme.textColor} opacity-80 mb-8 text-sm leading-relaxed`}>
                      {plan.description}
                    </p>
                    <div className="space-y-4">
                      {plan.features.map((feature) => (
                        <div
                          key={feature}
                          className={`flex items-center gap-3 ${theme.textColor} opacity-90`}
                        >
                          <Check className="h-4 w-4 shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/20">
                      <Link
                        href={withLocale("/contact")}
                        className={`group flex items-center gap-2 ${theme.textColor} font-medium text-sm`}
                      >
                        {dictionary.services.getStarted}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {dictionary.services.processTitle}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {dictionary.services.processBody}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {dictionary.services.processSteps.map((step) => (
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

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-6">
                {dictionary.services.includedTitle}
              </h2>
              <p className="text-muted-foreground mb-8">
                {dictionary.services.includedBody}
              </p>
              <Link
                href={withLocale("/contact")}
                className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-all hover:scale-105"
              >
                {dictionary.services.discussProject}
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {dictionary.services.includedItems.map((item) => (
                <div key={item.title} className="rounded-xl bg-card p-6">
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

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-12 text-center">
            {dictionary.services.faqTitle}
          </h2>
          <div className="space-y-6">
            {dictionary.services.faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl bg-card p-6">
                <h3 className="mb-3 font-bold text-foreground">{faq.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {dictionary.services.ctaTitle}
          </h2>
          <p className="mb-8 text-muted-foreground">
            {dictionary.services.ctaBody}
          </p>
          <Link
            href={withLocale("/contact")}
            className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 font-medium text-accent-foreground transition-all hover:scale-105 glow-accent"
          >
            {dictionary.services.ctaButton}
          </Link>
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
          <div className="text-sm text-muted-foreground">
            {new Date().getFullYear()} dinhstudio
          </div>
        </div>
      </footer>
    </main>
  );
}
