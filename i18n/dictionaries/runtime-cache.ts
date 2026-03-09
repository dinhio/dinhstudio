import { unstable_cache } from "next/cache";
import type { AppLocale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";

export const getCachedDictionary = unstable_cache(
  async (locale: AppLocale): Promise<Dictionary> => getDictionary(locale),
  ["dictionary-by-locale"],
  { revalidate: 3600 },
);
