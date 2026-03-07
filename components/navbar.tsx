"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  alwaysVisible?: boolean;
}

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

export function Navbar({ alwaysVisible = false }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(alwaysVisible);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (alwaysVisible) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrolled = window.scrollY > heroHeight * 0.8;
      setIsVisible(scrolled);
      setHasScrolled(window.scrollY > 50);
      // Close mobile menu on scroll
      if (mobileOpen) setMobileOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [alwaysVisible, mobileOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Fixed top bar: logo (mobile) + Get in Touch ── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 md:hidden">
        {/* Mobile logo — visible only before the nav slides in */}
        <Link
          href="/"
          className={`text-xl font-bold tracking-tight text-foreground transition-all duration-500 ${
            isVisible ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          aria-hidden={isVisible}
          tabIndex={isVisible ? -1 : 0}
        >
          dinhstudio
        </Link>

        {/* Right side: Get in Touch + hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="flex h-9 items-center justify-center rounded-full bg-foreground px-4 text-sm font-medium text-background transition-all hover:bg-foreground/90 hover:scale-105"
          >
            Get in touch
          </Link>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground/10"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Desktop: fixed Get in Touch always visible ── */}
      <div className="fixed top-6 right-6 z-50 hidden md:block">
        <Link
          href="/contact"
          className="flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-all hover:bg-foreground/90 hover:scale-105"
        >
          Get in touch
        </Link>
      </div>

      {/* ── Main navbar — slides in after scroll (desktop + mobile) ── */}
      <nav
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
        aria-hidden={!isVisible}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 py-4 transition-all duration-300 ${
            hasScrolled || alwaysVisible ? "bg-background/80 backdrop-blur-lg" : ""
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-70"
          >
            dinhstudio
          </Link>

          {/* Desktop center nav links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop spacer to balance the fixed button */}
          <div className="hidden w-[120px] md:block" />

          {/* Mobile hamburger inside the scrolled nav bar */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground/10 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile full-screen menu ── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 z-[45] flex flex-col bg-background transition-all duration-400 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Close row */}
        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-xl font-bold tracking-tight text-foreground">dinhstudio</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground/10"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-1 flex-col items-start justify-center gap-8 px-8">
          {navLinks.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="text-4xl font-bold text-foreground transition-colors hover:text-muted-foreground"
              style={{
                transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
                transform: mobileOpen ? "translateY(0)" : "translateY(12px)",
                opacity: mobileOpen ? 1 : 0,
                transition: `transform 350ms ease ${i * 60}ms, opacity 350ms ease ${i * 60}ms, color 200ms ease`,
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="px-8 pb-12">
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="flex h-14 w-full items-center justify-center rounded-full bg-foreground text-base font-medium text-background transition-all hover:bg-foreground/90"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </>
  );
}
