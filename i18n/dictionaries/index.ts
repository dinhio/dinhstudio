import type { AppLocale } from "@/i18n/config";
import { enUS, type TranslationDictionary } from "@/i18n/dictionaries/en-us";
import { viVN } from "@/i18n/dictionaries/vi-vn";

export const dictionaries = {
  "en-us": enUS,
  "vi-vn": viVN,
} as const satisfies Record<AppLocale, TranslationDictionary>;

export type Dictionary = TranslationDictionary;

export function getDictionary(locale: AppLocale): Dictionary {
  return dictionaries[locale];
}
