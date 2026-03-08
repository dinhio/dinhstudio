export const SUPPORTED_LOCALES = ["en-us", "vi-vn"] as const;

export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "en-us";
export const LOCALE_COOKIE_NAME = "dinh_locale";

const COUNTRY_TO_LOCALE: Record<string, AppLocale> = {
  VN: "vi-vn",
};

export function isValidLocale(locale: string): locale is AppLocale {
  return SUPPORTED_LOCALES.includes(locale.toLowerCase() as AppLocale);
}

export function normalizeLocale(locale: string): string {
  return locale.toLowerCase();
}

export function getLocaleFromPathname(pathname: string): AppLocale | null {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (!segment) return null;

  const normalized = normalizeLocale(segment);
  return isValidLocale(normalized) ? normalized : null;
}

export function getLocaleFromCountry(countryHeader?: string | null): AppLocale | null {
  if (!countryHeader) return null;
  return COUNTRY_TO_LOCALE[countryHeader.toUpperCase()] ?? null;
}

export function getLocaleFromAcceptLanguage(acceptLanguage?: string | null): AppLocale | null {
  if (!acceptLanguage) return null;

  const lower = acceptLanguage.toLowerCase();

  if (lower.includes("vi-vn") || lower.includes("vi")) {
    return "vi-vn";
  }

  if (lower.includes("en-us") || lower.includes("en")) {
    return "en-us";
  }

  return null;
}

export function resolveLocale(options: {
  pathname: string;
  cookieLocale?: string | null;
  country?: string | null;
  acceptLanguage?: string | null;
}): AppLocale {
  const fromPath = getLocaleFromPathname(options.pathname);
  if (fromPath) return fromPath;

  const cookieLocale = options.cookieLocale ? normalizeLocale(options.cookieLocale) : null;
  if (cookieLocale && isValidLocale(cookieLocale)) return cookieLocale;

  const fromCountry = getLocaleFromCountry(options.country);
  if (fromCountry) return fromCountry;

  const fromLanguage = getLocaleFromAcceptLanguage(options.acceptLanguage);
  if (fromLanguage) return fromLanguage;

  return DEFAULT_LOCALE;
}
