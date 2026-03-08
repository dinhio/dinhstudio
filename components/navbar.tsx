"use client";

import { DEFAULT_LOCALE, parseLocale, type AppLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  alwaysVisible?: boolean;
  hideUntilScroll?: boolean;
}

const localeOptions: Array<{ locale: AppLocale; label: string }> = [
  { locale: "en-us", label: "EN" },
  { locale: "vi-vn", label: "VI" },
];

// Threshold for scroll reveal (viewport height)
const SCROLL_THRESHOLD_VH = 0.85;
// Mouse proximity zone at top of viewport (in pixels)
const MOUSE_PROXIMITY_ZONE = 80;

export function Navbar({ alwaysVisible = false, hideUntilScroll = false }: NavbarProps) {
  const pathname = usePathname() ?? "/";
  const [bgOpacity, setBgOpacity] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Track if mouse is near top of viewport
  const [isMouseNearTop, setIsMouseNearTop] = useState(false);
  // Track if user has scrolled past threshold
  const [hasScrolledPast, setHasScrolledPast] = useState(false);
  // Ref to track hiding timeout
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pathnameSegments = pathname.split("/").filter(Boolean);
  const pathLocale = parseLocale(pathnameSegments[0]);
  const activeLocale: AppLocale = pathLocale ?? DEFAULT_LOCALE;
  const dictionary = getDictionary(activeLocale);
  const navLinks = [
    { href: "/work", label: dictionary.nav.work },
    { href: "/services", label: dictionary.nav.services },
    { href: "/about", label: dictionary.nav.about },
  ];
  const pathWithoutLocale = pathLocale ? `/${pathnameSegments.slice(1).join("/")}` : pathname;
  const normalizedPath = pathWithoutLocale === "/" ? "" : pathWithoutLocale;

  const withLocale = (href: string, locale = activeLocale) => {
    if (href === "/") return `/${locale}`;
    return `/${locale}${href}`;
  };

  const switchLocaleHref = (locale: AppLocale) =>
    normalizedPath ? `/${locale}${normalizedPath}` : `/${locale}`;

  // Desktop-only reveal on homepage: after hero scroll or top-edge mouse movement.
  const shouldShowDesktopNavbar =
    alwaysVisible || !hideUntilScroll || hasScrolledPast || isMouseNearTop;

  // Handle mouse proximity to top
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (alwaysVisible || !hideUntilScroll) return;
    
    const isNearTop = e.clientY <= MOUSE_PROXIMITY_ZONE;
    
    if (isNearTop) {
      // Clear any pending hide timeout
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
      setIsMouseNearTop(true);
    } else if (!hasScrolledPast) {
      // Delay hiding the navbar when mouse leaves the zone
      if (!hideTimeoutRef.current) {
        hideTimeoutRef.current = setTimeout(() => {
          setIsMouseNearTop(false);
          hideTimeoutRef.current = null;
        }, 400);
      }
    }
  }, [alwaysVisible, hideUntilScroll, hasScrolledPast]);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * SCROLL_THRESHOLD_VH;
      
      // Check if scrolled past threshold
      if (hideUntilScroll) {
        if (scrollY > threshold) {
          setHasScrolledPast(true);
        } else if (scrollY < 50) {
          // Reset when scrolled back to top
          setHasScrolledPast(false);
        }
      }
      
      // Fade background in over the first 120px of scroll (when visible)
      const opacity = Math.min(scrollY / 120, 1);
      setBgOpacity(opacity);
      
      if (mobileOpen && scrollY > 10) setMobileOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [alwaysVisible, hideUntilScroll, mobileOpen, isMouseNearTop]);

  const backgroundOpacity =
    alwaysVisible
      ? 0.92
      : hideUntilScroll && !alwaysVisible
        ? (shouldShowDesktopNavbar ? (isMouseNearTop && !hasScrolledPast ? 1 : bgOpacity * 0.92) : 0)
        : bgOpacity * 0.92;

  // Handle mouse move for proximity detection
  useEffect(() => {
    if (!hideUntilScroll || alwaysVisible) return;
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [hideUntilScroll, alwaysVisible, handleMouseMove]);

  // Listen for explore button click
  useEffect(() => {
    if (!hideUntilScroll || alwaysVisible) return;

    const handleExploreClick = () => {
      setHasScrolledPast(true);
    };

    // Listen for custom event dispatched when explore is clicked
    window.addEventListener("navbar-reveal", handleExploreClick);
    return () => window.removeEventListener("navbar-reveal", handleExploreClick);
  }, [hideUntilScroll, alwaysVisible]);

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
      <header className="fixed top-0 left-0 right-0 z-[80]">
        {/* Fading background layer — separate so content opacity is unaffected */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 backdrop-blur-md transition-opacity duration-300"
          style={{
            backgroundColor: "var(--background)",
            opacity: backgroundOpacity,
          }}
        />

        <div
          className={`relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 transition-transform duration-300 md:transition-opacity ${shouldShowDesktopNavbar
            ? "md:translate-y-0 md:opacity-100 md:pointer-events-auto"
            : "md:-translate-y-full md:opacity-0 md:pointer-events-none"
            }`}
        >
          {/* Logo */}
          <Link
            href={withLocale("/")}
            className="text-xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-70 font-sans"
          >
            dinhstudio
          </Link>

          {/* Desktop centre nav links */}
          <nav
            className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex"
            aria-label={dictionary.nav.mainNavigation}
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={withLocale(href)}
                className="pointer-events-auto text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side — desktop: Get in touch | mobile: Get in touch + hamburger */}
          <div className="flex items-center gap-3 md:gap-5">
            <Link
              href={withLocale("/contact")}
              className="flex h-9 items-center justify-center rounded-full bg-foreground px-4 text-sm font-medium text-background transition-all hover:bg-foreground/90 hover:scale-105"
            >
              {dictionary.nav.getInTouch}
            </Link>
            <div className="hidden items-center text-xs tracking-wide text-muted-foreground md:flex">
              {localeOptions.map(({ locale, label }, index) => {
                const isActive = activeLocale === locale;
                return (
                  <span key={locale} className="flex items-center">
                    <Link
                      href={switchLocaleHref(locale)}
                      className={`px-0.5 transition-all ${isActive
                        ? "font-bold text-foreground"
                        : "font-medium hover:text-foreground hover:opacity-85"
                        }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {label}
                    </Link>
                    {index < localeOptions.length - 1 ? (
                      <span className="px-1 text-border">/</span>
                    ) : null}
                  </span>
                );
              })}
            </div>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground/10 md:hidden"
              aria-label={mobileOpen ? dictionary.nav.closeMenu : dictionary.nav.openMenu}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen overlay menu ──────────────────────────────── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={dictionary.nav.navigationMenu}
        className="fixed inset-0 z-40 flex flex-col bg-background md:hidden"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 300ms ease",
        }}
      >
        {/* Spacer so links sit below the header bar */}
        <div className="h-[65px]" />

        {/* Nav links */}
        <nav className="flex flex-1 flex-col items-start justify-center gap-8 px-8" aria-label={dictionary.nav.mobileNavigation}>
          {navLinks.map(({ href, label }, i) => (
            <Link
              key={href}
              href={withLocale(href)}
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
          <div className="mb-4 flex items-center justify-center text-xs tracking-wide text-muted-foreground">
            {localeOptions.map(({ locale, label }, index) => {
              const isActive = activeLocale === locale;
              return (
                <span key={locale} className="flex items-center">
                  <Link
                    href={switchLocaleHref(locale)}
                    onClick={() => setMobileOpen(false)}
                    className={`px-0.5 transition-colors ${isActive
                      ? "font-bold text-foreground"
                      : "font-medium hover:text-foreground"
                      }`}
                  >
                    {label}
                  </Link>
                  {index < localeOptions.length - 1 ? (
                    <span className="px-1 text-border">/</span>
                  ) : null}
                </span>
              );
            })}
          </div>
          <Link
            href={withLocale("/contact")}
            onClick={() => setMobileOpen(false)}
            className="flex h-14 w-full items-center justify-center rounded-full bg-foreground text-base font-medium text-background transition-all hover:bg-foreground/90"
          >
            {dictionary.nav.getInTouch}
          </Link>
        </div>
      </div>
    </>
  );
}
