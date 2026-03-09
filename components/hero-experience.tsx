"use client";

import { useEffect, useState } from "react";

type HeroCarouselComponent = React.ComponentType<{ showTopLogo?: boolean; onReady?: () => void }>;

const CAROUSEL_LOAD_DELAY_MS = 1200;
const HANDOFF_DURATION_MS = 700;

function HeroFallback({ isTransitioning }: { isTransitioning: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      <div
        className={`absolute inset-0 bg-background transition-opacity duration-700 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      />
      <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 px-6 text-center md:hidden">
        <h1 className="text-5xl font-bold tracking-tight text-foreground">dinhstudio</h1>
        <p className="mt-4 text-sm tracking-[0.14em] text-muted-foreground uppercase">
          Design Better. Launch Faster.
        </p>
      </div>
      <h1
        className={`absolute left-1/2 z-30 hidden -translate-x-1/2 font-bold tracking-tight text-foreground transition-[top,transform,font-size] duration-700 ease-out md:block ${
          isTransitioning
            ? "top-8 translate-y-0 text-2xl"
            : "top-1/2 -translate-y-1/2 text-7xl"
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
  const [carouselReady, setCarouselReady] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [showFallback, setShowFallback] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (Carousel) return;

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
  }, [Carousel]);

  useEffect(() => {
    if (!Carousel || !carouselReady) return;

    let rafB = 0;
    const rafA = window.requestAnimationFrame(() => {
      rafB = window.requestAnimationFrame(() => {
        setShowCarousel(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(rafA);
      if (rafB) window.cancelAnimationFrame(rafB);
    };
  }, [Carousel, carouselReady]);

  useEffect(() => {
    if (!showCarousel) {
      setShowFallback(true);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowFallback(false);
    }, HANDOFF_DURATION_MS + 80);

    return () => window.clearTimeout(timeoutId);
  }, [showCarousel]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {Carousel ? (
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-700 will-change-opacity ${
            showCarousel ? "opacity-100" : "opacity-0"
          }`}
          style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
        >
          <Carousel showTopLogo={false} onReady={() => setCarouselReady(true)} />
        </div>
      ) : null}
      {showFallback ? <HeroFallback isTransitioning={showCarousel} /> : null}
    </section>
  );
}
