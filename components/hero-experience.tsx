"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type HeroCarouselComponent = React.ComponentType;

const CAROUSEL_LOAD_DELAY_MS = 1200;

function HeroFallback() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background">
      <Image
        src="/carousel/project-3.jpg"
        alt="Featured project"
        fill
        priority
        quality={72}
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/25 to-background/75" />
      <div className="relative z-10 px-6 text-center">
        <p className="text-sm tracking-[0.22em] text-white/75 uppercase">Selected Work</p>
        <h1 className="mt-5 text-5xl font-bold tracking-tight text-white md:text-7xl">
          dinhstudio
        </h1>
        <a
          href="#content"
          className="mt-10 inline-flex items-center text-sm font-medium tracking-wide text-white/90 transition-opacity hover:opacity-80"
        >
          Explore
        </a>
      </div>
    </section>
  );
}

export function HeroExperience() {
  const [Carousel, setCarousel] = useState<HeroCarouselComponent | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    if (!mediaQuery.matches) return;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let idleId: number | null = null;

    const loadCarousel = () => {
      void import("@/components/hero-carousel").then(({ HeroCarousel }) => {
        if (!cancelled) {
          setCarousel(() => HeroCarousel);
        }
      });
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(loadCarousel, { timeout: CAROUSEL_LOAD_DELAY_MS });
    } else {
      timeoutId = setTimeout(loadCarousel, CAROUSEL_LOAD_DELAY_MS);
    }

    return () => {
      cancelled = true;
      if (idleId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  if (Carousel) {
    return <Carousel />;
  }

  return <HeroFallback />;
}
