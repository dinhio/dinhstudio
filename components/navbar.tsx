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
  const [bgOpacity, setBgOpacity] = useState(alwaysVisible ? 1 : 0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (alwaysVisible) {
      setBgOpacity(1);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Fade background in over the first 120px of scroll
      const opacity = Math.min(scrollY / 120, 1);
      setBgOpacity(opacity);
      if (mobileOpen && scrollY > 10) setMobileOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [alwaysVisible, mobileOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/*
        ── Single unified fixed navbar ──────────────────────────────────────
        One element for all screen sizes. Background fades in on scroll.
        Desktop shows centre links; mobile hides them behind hamburger.
      */}
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Fading background layer — separate div so text/button opacity is never affected */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 md:backdrop-blur-md"
          style={{
            backgroundColor: "var(--background)",
            opacity: bgOpacity,
            transition: "opacity 200ms linear",
            willChange: "opacity",
          }}
        />

        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-70 font-sans"
          >
            dinhstudio
          </Link>

          {/* Desktop centre nav links */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side — desktop: Get in touch | mobile: Get in touch + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="flex h-9 items-center justify-center rounded-full bg-foreground px-4 text-sm font-medium text-background transition-all hover:bg-foreground/90 hover:scale-105"
            >
              Get in touch
            </Link>

            {/* Hamburger — mobile only */}
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
        </div>
      </header>

      {/* ── Mobile full-screen overlay menu ──────────────────────────────── */}
      {/* z-[45] — above page content but below the z-50 header so logo/button stay on top */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed inset-0 z-[45] flex flex-col bg-background md:hidden"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 300ms ease",
        }}
      >
        {/* Spacer so links sit below the header bar */}
        <div className="h-[65px]" />

        {/* Nav links */}
        <nav className="flex flex-1 flex-col items-start justify-center gap-8 px-8" aria-label="Mobile navigation">
          {navLinks.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="text-4xl font-bold text-foreground transition-colors hover:text-muted-foreground"
              style={{
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateY(0)" : "translateY(12px)",
                transition: `transform 350ms ease ${i * 60 + 50}ms, opacity 350ms ease ${i * 60 + 50}ms, color 200ms ease`,
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
