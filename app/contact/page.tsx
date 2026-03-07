import { Navbar } from "@/components/navbar";
import { Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar alwaysVisible />

      {/* Main Content */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Decorative element */}
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-accent/10 flex items-center justify-center">
                <Mail className="h-10 w-10 text-accent" />
              </div>
              <div className="absolute -inset-4 rounded-full bg-accent/5 animate-pulse" />
            </div>
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-7xl mb-6 text-balance">
            {"Let's"} work together
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Have a project in mind? {"We'd"} love to hear about it. Drop us a line
            and {"let's"} start a conversation about bringing your vision to life.
          </p>

          {/* Email CTA */}
          <a
            href="mailto:hello@dinhstudio.com"
            className="group inline-flex items-center gap-4 rounded-2xl bg-card p-8 transition-all hover:bg-card/80 hover:scale-[1.02]"
          >
            <div className="flex flex-col items-start">
              <span className="text-sm text-muted-foreground mb-1">
                Email us at
              </span>
              <span className="text-2xl font-bold text-foreground md:text-3xl">
                hello@dinhstudio.com
              </span>
            </div>
            <ArrowUpRight className="h-6 w-6 text-accent transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>

          {/* Additional info */}
          <div className="mt-16 grid gap-8 md:grid-cols-3 max-w-3xl mx-auto">
            <div className="text-center">
              <h3 className="text-lg font-bold text-foreground mb-2">
                Response Time
              </h3>
              <p className="text-sm text-muted-foreground">
                We typically respond within 24-48 hours
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-foreground mb-2">
                Based In
              </h3>
              <p className="text-sm text-muted-foreground">
                Working globally from anywhere
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-foreground mb-2">
                Availability
              </h3>
              <p className="text-sm text-muted-foreground">
                Currently accepting new projects
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8 text-center">
            What happens next?
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Discovery Call",
                description:
                  "We'll schedule a call to discuss your project goals, timeline, and budget.",
              },
              {
                step: "2",
                title: "Proposal",
                description:
                  "You'll receive a detailed proposal outlining our approach, timeline, and investment.",
              },
              {
                step: "3",
                title: "Kick-off",
                description:
                  "Once approved, we'll begin the creative process and bring your vision to life.",
              },
            ].map((item) => (
              <div key={item.step} className="rounded-xl bg-card p-6 text-center">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold">
                  {item.step}
                </div>
                <h3 className="mb-2 font-bold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
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
