"use client";

import { useEffect, useState } from "react";

type HeroCarouselComponent = React.ComponentType<{ showTopLogo?: boolean }>;

const CAROUSEL_LOAD_DELAY_MS = 1200;

function HeroFallback({ isTransitioning }: { isTransitioning: boolean }) {
  return (
    <div
      className={`absolute inset-0 z-20 overflow-hidden bg-background transition-opacity duration-700 ${
        isTransitioning ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 px-6 text-center md:hidden">
        <h1 className="text-5xl font-bold tracking-tight text-foreground">dinhstudio</h1>
        <p className="mt-4 text-sm tracking-[0.14em] text-muted-foreground uppercase">
          Design Better. Launch Faster.
        </p>
      </div>
      <h1
        className={`absolute left-1/2 z-30 hidden -translate-x-1/2 font-bold tracking-tight text-foreground transition-all duration-700 ease-out md:block ${
          isTransitioning
            ? "top-8 translate-y-0 text-2xl opacity-0"
            : "top-1/2 -translate-y-1/2 text-7xl opacity-100"
        }`}
      >
        dinhstudio
      </h1>
      <p
        className={`absolute left-1/2 z-30 hidden -translate-x-1/2 text-base tracking-[0.14em] text-muted-foreground uppercase transition-all duration-700 ease-out md:block ${
          isTransitioning
            ? "top-[4.65rem] translate-y-0 opacity-0"
            : "top-[calc(50%+3.5rem)] -translate-y-1/2 opacity-100"
        }`}
      >
        Design Better. Launch Faster.
      </p>
    </div>
  );
}

export function HeroExperience() {
  const [Carousel, setCarousel] = useState<HeroCarouselComponent | null>(null);
  const [showCarousel, setShowCarousel] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timeoutId = setTimeout(() => {
      void import("@/components/hero-carousel").then(({ HeroCarousel }) => {
        if (!cancelled) {
          setCarousel(() => HeroCarousel);
        }
      });
    }, CAROUSEL_LOAD_DELAY_MS);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!Carousel) return;

    const rafId = window.requestAnimationFrame(() => {
      setShowCarousel(true);
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [Carousel]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {Carousel ? (
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-700 ${
            showCarousel ? "opacity-100" : "opacity-0"
          }`}
        >
          <Carousel showTopLogo />
        </div>
      ) : null}
      <HeroFallback isTransitioning={showCarousel} />
    </section>
  );
}
