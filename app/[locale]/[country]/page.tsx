import { getDictionary } from "@/i18n/dictionaries";
import { parseLocale } from "@/i18n/config";
import Link from "next/link";
import { notFound } from "next/navigation";

const SUPPORTED_COUNTRIES = new Set(["us", "vn"]);

export default async function CountryPage({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}) {
  const { locale, country } = await params;
  const normalizedLocale = parseLocale(locale);

  if (!normalizedLocale) {
    notFound();
  }

  const normalizedCountry = country.toLowerCase();
  if (!SUPPORTED_COUNTRIES.has(normalizedCountry)) {
    notFound();
  }

  const dictionary = getDictionary(normalizedLocale);

  return (
    <main className="min-h-screen bg-background px-6 py-24">
      <div className="mx-auto max-w-4xl rounded-3xl bg-card p-8 md:p-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Locale + Country Route
        </h1>
        <p className="mt-4 text-muted-foreground">
          Active locale: <span className="font-medium text-foreground">{normalizedLocale}</span>
        </p>
        <p className="mt-2 text-muted-foreground">
          Active country: <span className="font-medium text-foreground">{normalizedCountry.toUpperCase()}</span>
        </p>
        <p className="mt-8 text-muted-foreground">
          {dictionary.vietnamesePlaceholder}
        </p>
        <Link
          href={`/${normalizedLocale}`}
          className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Back to localized homepage
        </Link>
      </div>
    </main>
  );
}
