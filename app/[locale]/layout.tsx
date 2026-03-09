import { isValidLocale, SUPPORTED_LOCALES } from "@/i18n/config";
import { notFound } from "next/navigation";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return children;
}
