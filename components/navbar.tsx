"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface NavbarProps {
  alwaysVisible?: boolean;
}

export function Navbar({ alwaysVisible = false }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(alwaysVisible);
  const [hasScrolled, setHasScrolled] = useState(false);

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
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [alwaysVisible]);

  return (
    <>
      {/* Fixed Get in Touch button - always visible */}
      <div className="fixed top-6 right-6 z-50">
        <Link
          href="/contact"
          className="flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-all hover:bg-foreground/90 hover:scale-105"
        >
          Get in touch
        </Link>
      </div>

      {/* Main navbar - appears after scroll */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 py-4 transition-all duration-300 ${
            hasScrolled || alwaysVisible
              ? "bg-background/80 backdrop-blur-lg"
              : ""
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-70"
          >
            dinhstudio
          </Link>

          {/* Center nav links */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/work"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Work
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
          </div>

          {/* Spacer for the fixed button */}
          <div className="w-[120px]" />
        </div>
      </nav>
    </>
  );
}
