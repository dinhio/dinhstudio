import type { AppLocale } from "@/i18n/config";
import { enUS } from "@/i18n/dictionaries/en-us";
import { viVN } from "@/i18n/dictionaries/vi-vn";

export const dictionaries = {
  "en-us": enUS,
  "vi-vn": viVN,
} as const satisfies Record<AppLocale, {
  localeName: string;
  translationStatus: string;
  vietnamesePlaceholder: string;
}>;

export type Dictionary = (typeof dictionaries)[AppLocale];

export function getDictionary(locale: AppLocale): Dictionary {
  return dictionaries[locale];
}
