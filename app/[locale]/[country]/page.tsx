import { parseLocale, SUPPORTED_LOCALES } from "@/i18n/config";
import { getCachedDictionary } from "@/i18n/dictionaries/runtime-cache";
import Link from "next/link";
import { notFound } from "next/navigation";

const COUNTRIES = ["us", "vn"] as const;
const SUPPORTED_COUNTRIES = new Set<string>(COUNTRIES);

export const revalidate = 3600;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    COUNTRIES.map((country) => ({ locale, country })),
  );
}

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

  const dictionary = await getCachedDictionary(normalizedLocale);

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
