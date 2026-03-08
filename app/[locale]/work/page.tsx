import { Navbar } from "@/components/navbar";
import { ArrowUpRight, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  link: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: "neotech-labs",
    title: "Neotech Labs",
    category: "Tech Startup",
    description:
      "A complete brand identity and website redesign for a cutting-edge AI research company.",
    image: "/carousel/project-2.jpg",
    testimonial: {
      quote:
        "dinhstudio transformed our digital presence completely. The new website perfectly captures our innovative spirit and has significantly improved our conversion rates.",
      author: "Sarah Chen",
      role: "CEO, Neotech Labs",
    },
    link: "/work/neotech-labs",
    featured: true,
  },
  {
    id: "artisan-bloom",
    title: "Artisan Bloom",
    category: "E-commerce",
    description:
      "An elegant e-commerce platform for a boutique floral design studio.",
    image: "/carousel/project-1.jpg",
    testimonial: {
      quote:
        "Working with dinhstudio was a dream. They understood our aesthetic perfectly and delivered a website that our customers love.",
      author: "Emma Richards",
      role: "Founder, Artisan Bloom",
    },
    link: "/work/artisan-bloom",
  },
  {
    id: "verdant-co",
    title: "Verdant Co",
    category: "Sustainability",
    description:
      "A mission-driven website for an environmental consulting firm.",
    image: "/carousel/project-3.jpg",
    testimonial: {
      quote:
        "The team at dinhstudio created a website that truly reflects our commitment to sustainability. The design is both beautiful and functional.",
      author: "Michael Torres",
      role: "Director, Verdant Co",
    },
    link: "/work/verdant-co",
  },
  {
    id: "lumina-studio",
    title: "Lumina Studio",
    category: "Photography",
    description:
      "A stunning portfolio website for an award-winning photography studio.",
    image: "/carousel/project-4.jpg",
    testimonial: {
      quote:
        "As visual artists ourselves, we had high expectations. dinhstudio exceeded them all with a portfolio site that showcases our work beautifully.",
      author: "David Park",
      role: "Creative Director, Lumina Studio",
    },
    link: "/work/lumina-studio",
  },
  {
    id: "aurora-digital",
    title: "Aurora Digital",
    category: "Digital Agency",
    description:
      "A bold, modern website for a digital marketing agency.",
    image: "/carousel/project-5.jpg",
    testimonial: {
      quote:
        "dinhstudio delivered a website that positions us as industry leaders. The design language is exactly what we envisioned.",
      author: "Jessica Williams",
      role: "Partner, Aurora Digital",
    },
    link: "/work/aurora-digital",
  },
];

export default function WorkPage() {
  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <main className="min-h-screen bg-background">
      <Navbar alwaysVisible />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-7xl">
            Our Work
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            A selection of projects {"we've"} had the pleasure of working on. Each
            one represents a unique collaboration and a story worth telling.
          </p>
        </div>
      </section>

      {/* Featured Project */}
      {featuredProject && (
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-7xl">
            <Link
              href={featuredProject.link}
              className="group relative block overflow-hidden rounded-3xl bg-card"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-[4/3] md:aspect-auto">
                  <Image
                    src={featuredProject.image}
                    alt={featuredProject.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-card via-card/50 to-transparent md:bg-gradient-to-l" />
                </div>
                <div className="relative flex flex-col justify-center p-8 md:p-12">
                  <span className="mb-4 inline-block text-sm font-medium text-accent">
                    Featured Project
                  </span>
                  <h2 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
                    {featuredProject.title}
                  </h2>
                  <span className="mb-4 text-sm text-muted-foreground">
                    {featuredProject.category}
                  </span>
                  <p className="mb-8 text-muted-foreground">
                    {featuredProject.description}
                  </p>

                  {/* Testimonial */}
                  <div className="border-l-2 border-accent pl-6">
                    <Quote className="mb-3 h-5 w-5 text-accent" />
                    <p className="mb-4 text-sm italic text-foreground/80">
                      {`"${featuredProject.testimonial.quote}"`}
                    </p>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {featuredProject.testimonial.author}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {featuredProject.testimonial.role}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center gap-2 text-foreground">
                    <span className="text-sm font-medium">View Project</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Other Projects Grid */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2">
            {otherProjects.map((project) => (
              <Link
                key={project.id}
                href={project.link}
                className="group relative overflow-hidden rounded-2xl bg-card"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                </div>
                <div className="relative p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {project.title}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {project.category}
                      </span>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <p className="mb-6 text-sm text-muted-foreground">
                    {project.description}
                  </p>

                  {/* Testimonial */}
                  <div className="border-t border-border pt-6">
                    <p className="mb-3 text-sm italic text-foreground/70">
                      {`"${project.testimonial.quote.slice(0, 120)}..."`}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xs font-medium text-muted-foreground">
                          {project.testimonial.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-foreground">
                          {project.testimonial.author}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {project.testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Want to be our next success story?
          </h2>
          <p className="mb-8 text-muted-foreground">
            {"Let's"} create something amazing together.
          </p>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 font-medium text-accent-foreground transition-all hover:scale-105 glow-accent"
          >
            Start your project
          </Link>
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
