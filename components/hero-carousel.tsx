"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselItem {
  id: number;
  title: string;
  image: string;
  link: string;
}

const carouselItems: CarouselItem[] = [
  { id: 1, title: "Artisan Bloom", image: "/carousel/project-1.jpg", link: "/work/artisan-bloom" },
  { id: 2, title: "Neotech Labs", image: "/carousel/project-2.jpg", link: "/work/neotech-labs" },
  { id: 3, title: "Verdant Co", image: "/carousel/project-3.jpg", link: "/work/verdant-co" },
  { id: 4, title: "Lumina Studio", image: "/carousel/project-4.jpg", link: "/work/lumina-studio" },
  { id: 5, title: "Aurora Digital", image: "/carousel/project-5.jpg", link: "/work/aurora-digital" },
];

const TOTAL = carouselItems.length;

// Slot values: -1 = left, 0 = center, 1 = right, ±2 = hidden staging area
type Slot = -2 | -1 | 0 | 1 | 2;

// Returns which "slot" (visual position) each item index occupies,
// given the current active index.
function buildSlotMap(activeIndex: number): Record<number, Slot> {
  const map: Record<number, Slot> = {};
  const prev = (activeIndex - 1 + TOTAL) % TOTAL;
  const next = (activeIndex + 1) % TOTAL;

  carouselItems.forEach((_, i) => {
    if (i === activeIndex) map[i] = 0;
    else if (i === prev) map[i] = -1;
    else if (i === next) map[i] = 1;
    else {
      // Hide everything else off to the left staging area by default
      map[i] = -2;
    }
  });

  return map;
}

// Canvas-based brightness analysis
function analyzeImageBrightness(
  imageSrc: string
): Promise<{ isDark: boolean }> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) { resolve({ isDark: true }); return; }

      const w = Math.min(120, img.width);
      const h = Math.min(90, img.height);
      canvas.width = w;
      canvas.height = h;

      ctx.drawImage(
        img,
        (img.width - w) / 2, (img.height - h) / 2, w, h,
        0, 0, w, h
      );

      const { data } = ctx.getImageData(0, 0, w, h);
      let lum = 0, count = 0;
      for (let i = 0; i < data.length; i += 16) {
        lum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        count++;
      }
      resolve({ isDark: lum / count / 255 < 0.5 });
    };
    img.onerror = () => resolve({ isDark: true });
    img.src = imageSrc;
  });
}

function getSlotStyle(slot: Slot): React.CSSProperties {
  // Slots ±2 are invisible staging positions far off-screen
  const OFFSET = 400;  // px between adjacent visible cards
  const STAGE = 900;  // px for hidden staging positions
  const x = slot === -2 ? -STAGE : slot === 2 ? STAGE : slot * OFFSET;
  const rotateY = slot === 0 ? 0 : slot < 0 ? 18 : -18;
  const scale = slot === 0 ? 1 : Math.abs(slot) === 1 ? 0.80 : 0.65;
  const opacity = slot === 0 ? 1 : Math.abs(slot) === 1 ? 0.50 : 0;
  const zIndex = slot === 0 ? 30 : Math.abs(slot) === 1 ? 10 : 0;

  return {
    transform: `translateX(${x}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    zIndex,
    // Hide staging slots from screen readers / hit-testing
    visibility: Math.abs(slot) >= 2 ? "hidden" : "visible",
    pointerEvents: slot === 0 ? "auto" : "none",
    transition:
      "transform 550ms cubic-bezier(0.4, 0, 0.2, 1), opacity 550ms ease, visibility 0ms linear 550ms",
  };
}

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slotMap, setSlotMap] = useState<Record<number, Slot>>(() => buildSlotMap(2));
  const [textColors, setTextColors] = useState<
    Record<number, { primary: string; secondary: string; glow: string }>
  >({});
  const analyzedRef = useRef<Set<number>>(new Set());

  const navigate = useCallback(
    (direction: "prev" | "next") => {
      if (isAnimating) return;
      setIsAnimating(true);

      setActiveIndex((prev) => {
        const next =
          direction === "next"
            ? (prev + 1) % TOTAL
            : (prev - 1 + TOTAL) % TOTAL;

        setSlotMap(buildSlotMap(next));
        return next;
      });

      setTimeout(() => setIsAnimating(false), 550);
    },
    [isAnimating]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);

  // Analyze every image once on mount
  useEffect(() => {
    const run = async () => {
      const updates: typeof textColors = {};
      for (const item of carouselItems) {
        if (analyzedRef.current.has(item.id)) continue;
        const { isDark } = await analyzeImageBrightness(item.image);
        analyzedRef.current.add(item.id);

        if (isDark) {
          updates[item.id] = {
            primary: "#ffffff",
            secondary: "rgba(255,255,255,0.65)",
            glow: "0 0 24px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,1)",
          };
        } else {
          updates[item.id] = {
            primary: "#0a0a0a",
            secondary: "rgba(10,10,10,0.65)",
            glow: "0 0 24px rgba(255,255,255,0.6), 0 2px 8px rgba(255,255,255,0.7), 0 0 2px rgba(255,255,255,1)",
          };
        }
      }
      setTextColors((p) => ({ ...p, ...updates }));
    };
    run();
  }, []);

  const activeItem = carouselItems[activeIndex];
  const activeColor = textColors[activeItem.id] ?? {
    primary: "#ffffff",
    secondary: "rgba(255,255,255,0.65)",
    glow: "0 0 24px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8)",
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
      {/* Logo */}
      <div className="absolute top-8 left-1/2 z-50 -translate-x-1/2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">
          dinhstudio
        </h1>
      </div>

      {/* Carousel track */}
      <div
        className="relative flex h-[400px] w-full items-center justify-center"
        style={{ perspective: "1400px", perspectiveOrigin: "50% 50%" }}
      >
        {/*
          Edge fade masks: dissolve side cards into the background at the
          viewport edges so they never hard-clip or ghost behind the active card.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-40"
          style={{
            background:
              "linear-gradient(to right, var(--background) 0%, transparent 22%, transparent 78%, var(--background) 100%)",
          }}
        />

        {carouselItems.map((item, index) => {
          const slot = (slotMap[index] ?? -2) as Slot;
          const isActive = slot === 0;

          return (
            <div
              key={item.id}            // stable key — React never unmounts/remounts
              className="absolute"
              style={getSlotStyle(slot)}
            >
              <div
                className={`relative overflow-hidden rounded-2xl ${isActive ? "ring-1 ring-white/10 shadow-2xl shadow-black/60" : ""
                  }`}
                style={{
                  width: isActive ? "clamp(280px, 40vw, 420px)" : "clamp(200px, 28vw, 310px)",
                  height: isActive ? "clamp(196px, 28vw, 294px)" : "clamp(140px, 20vw, 218px)",
                  transition: "width 550ms cubic-bezier(0.4,0,0.2,1), height 550ms cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover"
                  priority={isActive}
                  loading="eager"
                />
                {/* Bottom gradient so card edges don't bleed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </div>
          );
        })}

        {/* Active-slide title + CTA — rendered above the edge fade */}
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">
          <h2
            className="mb-5 text-center text-5xl font-bold tracking-tight md:text-6xl font-sans"
            style={{ transition: "text-shadow 500ms ease, color 500ms ease" }}
          >
            {activeItem.title.split(" ").map((word, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  color: i === 0 ? activeColor.primary : activeColor.secondary,
                  textShadow: activeColor.glow,
                  transition: "color 500ms ease, text-shadow 500ms ease",
                  marginRight: "0.3em",
                }}
              >
                {word}
              </span>
            ))}
          </h2>

          <a
            href={activeItem.link}
            className="pointer-events-auto flex h-11 items-center justify-center rounded-full border px-8 text-sm font-medium backdrop-blur-md hover:scale-105 focus-visible:outline-none focus-visible:ring-2"
            style={{
              transition:
                "color 500ms ease, background-color 500ms ease, border-color 500ms ease, box-shadow 500ms ease, transform 200ms ease",
              backgroundColor:
                activeColor.primary === "#ffffff"
                  ? "rgba(255,255,255,0.12)"
                  : "rgba(0,0,0,0.12)",
              borderColor:
                activeColor.primary === "#ffffff"
                  ? "rgba(255,255,255,0.35)"
                  : "rgba(0,0,0,0.35)",
              color: activeColor.primary,
              boxShadow: activeColor.glow,
            }}
          >
            View Case
          </a>
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="absolute bottom-16 z-50 flex items-center gap-2">
        <button
          onClick={() => navigate("prev")}
          disabled={isAnimating}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition-all hover:scale-110 disabled:opacity-50 glow-accent"
          aria-label="Previous project"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => navigate("next")}
          disabled={isAnimating}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition-all hover:scale-110 disabled:opacity-50 glow-accent"
          aria-label="Next project"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Explore */}
      <a
        href="#content"
        className="absolute bottom-32 z-50 flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="text-sm font-medium tracking-wide">Explore</span>
        <div className="h-8 w-px animate-pulse bg-gradient-to-b from-muted-foreground to-transparent" />
      </a>
    </div>
  );
}
