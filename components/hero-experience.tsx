"use client";

import type { ComponentType } from "react";
import { useEffect, useRef, useState } from "react";

type HeroCarouselComponent = ComponentType<{ showTopLogo?: boolean; onReady?: () => void }>;

type HeroPhase = "loading" | "transition" | "ready";

const HANDOFF_DURATION_MS = 700;
const MIN_CENTER_HOLD_MS = 240;
const HERO_HANDOFF_SEEN_KEY = "hero-handoff-seen-v3";

let hasAnimatedInRuntime = false;

function getNavigationType() {
  if (typeof window === "undefined" || typeof performance === "undefined") {
    return "navigate";
  }

  const navigationEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  return navigationEntry?.type ?? "navigate";
}

function shouldAnimateHandoff(pathname: string | null) {
  if (typeof window === "undefined") {
    return false;
  }

  const isLocaleHome = pathname ? /^\/(en-us|vi-vn)\/?$/.test(pathname) : false;
  if (!isLocaleHome) {
    return false;
  }

  if (hasAnimatedInRuntime) {
    return false;
  }

  const hasSeenHandoff = window.sessionStorage.getItem(HERO_HANDOFF_SEEN_KEY) === "1";
  if (hasSeenHandoff) {
    hasAnimatedInRuntime = true;
    return false;
  }

  const navigationType = getNavigationType();
  const canAnimateOnThisLoad = navigationType === "navigate" || navigationType === "prerender";

  if (!canAnimateOnThisLoad) {
    return false;
  }

  hasAnimatedInRuntime = true;
  window.sessionStorage.setItem(HERO_HANDOFF_SEEN_KEY, "1");
  return true;
}

function HeroFallback({
  isTransitioning,
  shouldAnimate,
  policyResolved,
}: {
  isTransitioning: boolean;
  shouldAnimate: boolean;
  policyResolved: boolean;
}) {
  const showLogoFallback = policyResolved && shouldAnimate;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      <div
        className={`absolute inset-0 bg-background transition-opacity duration-700 ${
          showLogoFallback && isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      />

      {showLogoFallback ? (
        <>
          <div
            className={`absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 px-6 text-center transition-opacity duration-500 md:hidden ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <h1 className="text-5xl font-bold tracking-tight text-white">dinhstudio</h1>
          </div>

          <h1
            className={`absolute left-1/2 z-30 hidden -translate-x-1/2 font-bold tracking-tight text-white transition-[top,transform,font-size] duration-700 ease-out md:block ${
              isTransitioning
                ? "top-8 translate-y-0 text-2xl"
                : "top-1/2 -translate-y-1/2 text-7xl"
            }`}
          >
            dinhstudio
          </h1>
        </>
      ) : null}
    </div>
  );
}

export function HeroExperience() {
  const [Carousel, setCarousel] = useState<HeroCarouselComponent | null>(null);
  const [phase, setPhase] = useState<HeroPhase>("loading");
  const [carouselReady, setCarouselReady] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [policyResolved, setPolicyResolved] = useState(false);
  const mountedAtRef = useRef<number>(0);

  useEffect(() => {
    mountedAtRef.current = performance.now();
    setShouldAnimate(shouldAnimateHandoff(window.location.pathname));
    setPolicyResolved(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (Carousel) return;

    void import("@/components/hero-carousel").then(({ HeroCarousel }) => {
      if (!cancelled) {
        setCarousel(() => HeroCarousel);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [Carousel]);

  useEffect(() => {
    const preloaded = new window.Image();
    preloaded.decoding = "async";
    preloaded.src = "/carousel/project-3.jpg";
  }, []);

  useEffect(() => {
    if (!Carousel || !carouselReady || !policyResolved) return;

    if (!shouldAnimate) {
      setPhase("ready");
      return;
    }

    const elapsed = performance.now() - mountedAtRef.current;
    const delayBeforeTransition = Math.max(0, MIN_CENTER_HOLD_MS - elapsed);
    const transitionTimer = window.setTimeout(() => {
      setPhase("transition");
    }, delayBeforeTransition);
    const readyTimer = window.setTimeout(() => {
      setPhase("ready");
    }, delayBeforeTransition + HANDOFF_DURATION_MS);

    return () => {
      window.clearTimeout(transitionTimer);
      window.clearTimeout(readyTimer);
    };
  }, [Carousel, carouselReady, policyResolved, shouldAnimate]);

  const showFallback = phase !== "ready";
  const showCarousel = phase === "transition" || phase === "ready";

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {Carousel ? (
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-700 will-change-opacity ${
            showCarousel ? "opacity-100" : "opacity-0"
          }`}
          style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
        >
          <Carousel
            showTopLogo={phase === "ready"}
            onReady={() => setCarouselReady(true)}
          />
        </div>
      ) : null}

      {showFallback ? (
        <HeroFallback
          isTransitioning={phase === "transition"}
          shouldAnimate={shouldAnimate}
          policyResolved={policyResolved}
        />
      ) : null}
    </section>
  );
}
