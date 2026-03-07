import { Navbar } from "@/components/navbar";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar alwaysVisible />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-7xl">
            About
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            A passionate web design studio dedicated to crafting beautiful,
            high-performance digital experiences.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-6 text-balance">
                We believe great design is the foundation of great business.
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <p className="mb-6 text-muted-foreground leading-relaxed">
                dinhstudio was founded on the belief that every business deserves
                a stunning digital presence. We combine thoughtful design with
                cutting-edge technology to create websites that not only look
                beautiful but drive real results.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our approach is collaborative and transparent. We work closely
                with our clients to understand their vision, goals, and audience,
                then translate that understanding into digital experiences that
                exceed expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-12">
            Our Values
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Craftsmanship",
                description:
                  "We take pride in every pixel, every line of code. Quality is never compromised.",
                color: "bg-slate-card",
              },
              {
                title: "Collaboration",
                description:
                  "The best work happens when we work together. Your input shapes our process.",
                color: "bg-olive-card",
              },
              {
                title: "Innovation",
                description:
                  "We stay ahead of trends and technologies to deliver cutting-edge solutions.",
                color: "bg-terracotta-card",
              },
            ].map((value) => (
              <div
                key={value.title}
                className={`${value.color} rounded-2xl p-8`}
              >
                <h3 className="mb-4 text-xl font-bold text-white">
                  {value.title}
                </h3>
                <p className="text-white/80">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-12">
            What we do
          </h2>
          <div className="grid gap-px bg-border md:grid-cols-2">
            {[
              {
                title: "Web Design",
                items: [
                  "UI/UX Design",
                  "Brand Identity",
                  "Design Systems",
                  "Prototyping",
                ],
              },
              {
                title: "Development",
                items: [
                  "Custom Websites",
                  "Web Applications",
                  "E-commerce",
                  "CMS Integration",
                ],
              },
              {
                title: "Strategy",
                items: [
                  "Content Strategy",
                  "SEO Optimization",
                  "User Research",
                  "Analytics",
                ],
              },
              {
                title: "Support",
                items: [
                  "Managed Hosting",
                  "Maintenance",
                  "Performance",
                  "Security",
                ],
              },
            ].map((category) => (
              <div key={category.title} className="bg-background p-8 md:p-12">
                <h3 className="mb-6 text-xl font-bold text-foreground">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item) => (
                    <li key={item} className="text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-card p-8 md:p-12">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8">
              Technologies we love
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                "Next.js",
                "React",
                "TypeScript",
                "Tailwind CSS",
                "Framer Motion",
                "Vercel",
                "Figma",
                "Sanity",
                "Shopify",
                "Node.js",
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                Ready to start a project?
              </h2>
              <p className="text-muted-foreground">
                {"Let's"} create something amazing together.
              </p>
            </div>
            <Link
              href="/contact"
              className="group flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-medium text-accent-foreground transition-all hover:scale-105 glow-accent"
            >
              Get in touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-xl font-bold tracking-tight">dinhstudio</div>
          <div className="flex items-center gap-8">
            <Link
              href="/work"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Work
            </Link>
            <Link
              href="/services"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact
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
