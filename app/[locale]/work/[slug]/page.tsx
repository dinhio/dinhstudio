import { Navbar } from "@/components/navbar";
import { parseLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ArrowLeft, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function WorkProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const normalizedLocale = parseLocale(locale);

  if (!normalizedLocale) {
    notFound();
  }

  const dictionary = getDictionary(normalizedLocale);
  const project = dictionary.work.projects.find(
    (item) => item.id === slug || item.link.endsWith(`/${slug}`),
  );

  if (!project) {
    notFound();
  }

  const withLocale = (href: string) => {
    if (href === "/") return `/${normalizedLocale}`;
    return `/${normalizedLocale}${href}`;
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar alwaysVisible />

      <section className="px-6 pt-28 pb-8 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <Link
            href={withLocale("/work")}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {dictionary.nav.work}
          </Link>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.15fr_1fr] md:items-center">
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-card">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <p className="mb-3 text-sm font-medium text-accent">{project.category}</p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-card p-8 md:p-12">
          <Quote className="mb-4 h-6 w-6 text-accent" />
          <p className="text-lg italic leading-relaxed text-foreground/85 md:text-xl">
            {`"${project.testimonial.quote}"`}
          </p>
          <div className="mt-6">
            <p className="font-semibold text-foreground">{project.testimonial.author}</p>
            <p className="text-sm text-muted-foreground">{project.testimonial.role}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
