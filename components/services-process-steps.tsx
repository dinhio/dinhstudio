"use client";

import { useEffect, useRef, useState } from "react";

type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export function ServicesProcessSteps({ steps }: { steps: ProcessStep[] }) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleMediaChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    handleMediaChange();
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let nextActive: number | null = null;
        let highestRatio = 0;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.stepIndex);
          if (!Number.isNaN(index) && entry.intersectionRatio >= highestRatio) {
            highestRatio = entry.intersectionRatio;
            nextActive = index;
          }
        }

        if (nextActive !== null) {
          setActiveIndex(nextActive);
        }
      },
      {
        threshold: 0.6,
      },
    );

    for (const card of cardRefs.current) {
      if (card) observer.observe(card);
    }

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => (
        <article
          key={step.number}
          className="group"
          data-step-index={index}
          ref={(node) => {
            cardRefs.current[index] = node;
          }}
        >
          <div
            className={`mb-4 text-5xl font-bold text-accent transition-opacity ${
              isMobile ? (activeIndex === index ? "opacity-100" : "opacity-30") : "opacity-30"
            } group-hover:opacity-100`}
          >
            {step.number}
          </div>
          <h3 className="mb-2 text-xl font-bold text-foreground">{step.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
        </article>
      ))}
    </div>
  );
}
