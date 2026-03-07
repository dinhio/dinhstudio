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
  const [navVisible, setNavVisible] = useState(alwaysVisible);
  const [bgOpacity, setBgOpacity] = useState(alwaysVisible ? 1 : 0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (alwaysVisible) {
      setNavVisible(true);
      setBgOpacity(1);
      return;
    }

    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Slide nav in once past 80% of hero
      setNavVisible(scrollY > heroHeight * 0.8);

      // Smoothly ramp background opacity from 0→1 as user scrolls
      // from 10% of hero height to 30% past it
      const start = heroHeight * 0.1;
      const end = heroHeight * 1.3;
      const clamped = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);
      setBgOpacity(clamped);

      // Close mobile menu on scroll
      if (mobileOpen) setMobileOpen(false);
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
      {/* ─── Mobile fixed top bar: logo (left) + "Get in touch" + hamburger (right) ─── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 md:hidden">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-foreground font-sans"
        >
          dinhstudio
        </Link>

        {/* Right side controls */}
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

      {/* ─── Desktop: always-visible "Get in touch" ─── */}
      <div className="fixed top-6 right-6 z-50 hidden md:block">
        <Link
          href="/contact"
          className="flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-all hover:bg-foreground/90 hover:scale-105"
        >
          Get in touch
        </Link>
      </div>

      {/* ─── Main navbar — slides down after scrolling past hero ─── */}
      <nav
        id="main-nav"
        aria-hidden={!navVisible}
        className="fixed top-0 left-0 right-0 z-40 transition-transform duration-500 ease-in-out"
        style={{
          transform: navVisible ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        {/*
          Background is a separate element so opacity can transition
          independently of the nav content (avoids text fading in/out).
        */}
        <div
          aria-hidden
          className="absolute inset-0 backdrop-blur-lg transition-opacity duration-500"
          style={{
            backgroundColor: "var(--background)",
            opacity: bgOpacity * 0.85,
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

          {/* Spacer to visually balance the fixed "Get in touch" button */}
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

      {/* ─── Mobile full-screen overlay menu ─── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed inset-0 z-[45] flex flex-col bg-background md:hidden"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 350ms ease",
        }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-xl font-bold tracking-tight text-foreground font-sans">
            dinhstudio
          </span>
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
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateY(0)" : "translateY(12px)",
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
