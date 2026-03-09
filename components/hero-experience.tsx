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
      <div
        className={`absolute left-1/2 z-30 px-6 text-center transition-all duration-700 ease-out ${
          isTransitioning
            ? "top-8 -translate-x-1/2 translate-y-0 opacity-0"
            : "top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100"
        }`}
      >
        <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-7xl">
          dinhstudio
        </h1>
        <p className="mt-4 text-sm tracking-[0.14em] text-muted-foreground uppercase md:text-base">
          Design Better. Launch Faster.
        </p>
      </div>
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
          <Carousel showTopLogo={false} />
        </div>
      ) : null}
      <HeroFallback isTransitioning={showCarousel} />
    </section>
  );
}
