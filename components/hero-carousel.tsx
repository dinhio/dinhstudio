"use client";

import { useState, useEffect, useCallback, useRef, useReducer } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

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
type StagingSide = -2 | 2;

// Returns which "slot" (visual position) each item index occupies,
// given the current active index.
function buildSlotMap(activeIndex: number, stagingSide: StagingSide = -2): Record<number, Slot> {
  const map: Record<number, Slot> = {};
  const prev = (activeIndex - 1 + TOTAL) % TOTAL;
  const next = (activeIndex + 1) % TOTAL;

  carouselItems.forEach((_, i) => {
    if (i === activeIndex) map[i] = 0;
    else if (i === prev) map[i] = -1;
    else if (i === next) map[i] = 1;
    else {
      map[i] = stagingSide;
    }
  });

  return map;
}

const CARD_TRANSITION = {
  duration: 0.55,
  ease: [0.4, 0, 0.2, 1],
} as const;

function getSlotVisual(slot: Slot) {
  // Slots ±2 are invisible staging positions far off-screen
  const OFFSET = 400;  // px between adjacent visible cards
  const STAGE = 900;  // px for hidden staging positions
  const x = slot === -2 ? -STAGE : slot === 2 ? STAGE : slot * OFFSET;
  const rotateY = slot === 0 ? 0 : slot < 0 ? 18 : -18;
  const scale = slot === 0 ? 1 : Math.abs(slot) === 1 ? 0.80 : 0.65;
  const opacity = slot === 0 ? 1 : Math.abs(slot) === 1 ? 0.50 : 0;
  const zIndex = slot === 0 ? 30 : Math.abs(slot) === 1 ? 10 : 0;

  return {
    x,
    rotateY,
    scale,
    opacity,
    zIndex,
    visibility: Math.abs(slot) >= 2 ? "hidden" : "visible",
    pointerEvents: slot === 0 ? "auto" : "none",
  };
}

const SWIPE_THRESHOLD = 40; // px required to trigger a swipe

interface CarouselState {
  activeIndex: number;
  isAnimating: boolean;
  slotMap: Record<number, Slot>;
}

type CarouselAction =
  | { type: "start-navigation"; targetIndex: number; stagingSide: StagingSide }
  | { type: "complete-animation" };

function carouselReducer(state: CarouselState, action: CarouselAction): CarouselState {
  if (action.type === "start-navigation") {
    return {
      ...state,
      activeIndex: action.targetIndex,
      isAnimating: true,
      slotMap: buildSlotMap(action.targetIndex, action.stagingSide),
    };
  }

  return {
    ...state,
    isAnimating: false,
  };
}

export function HeroCarousel() {
  const [isDraggingCursor, setIsDraggingCursor] = useState(false);
  const [carouselState, dispatch] = useReducer(carouselReducer, {
    activeIndex: 2,
    isAnimating: false,
    slotMap: buildSlotMap(2),
  });
  const { activeIndex, isAnimating, slotMap } = carouselState;

  // Swipe / drag tracking
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const isDragging = useRef(false);

  const navigate = useCallback(
    (direction: "prev" | "next") => {
      if (isAnimating) return;
      const stagingSide: StagingSide = direction === "next" ? -2 : 2;
      const targetIndex =
        direction === "next"
          ? (activeIndex + 1) % TOTAL
          : (activeIndex - 1 + TOTAL) % TOTAL;

      dispatch({ type: "start-navigation", targetIndex, stagingSide });
      setTimeout(() => dispatch({ type: "complete-animation" }), 550);
    },
    [activeIndex, isAnimating]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);

  // ── Pointer (mouse + stylus) handlers ────────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragStart.current = { x: e.clientX, y: e.clientY };
    isDragging.current = false;
    setIsDraggingCursor(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    if (Math.abs(dx) > 8) isDragging.current = true;
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      setIsDraggingCursor(false);
      if (!dragStart.current) return;
      const dx = e.clientX - dragStart.current.x;
      dragStart.current = null;
      if (!isDragging.current) return;
      if (dx < -SWIPE_THRESHOLD) navigate("next");
      else if (dx > SWIPE_THRESHOLD) navigate("prev");
    },
    [navigate]
  );

  const onPointerCancel = useCallback(() => {
    dragStart.current = null;
    isDragging.current = false;
    setIsDraggingCursor(false);
  }, []);

  // ── Touch handlers (passive-safe, no preventDefault needed here) ─────────
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStart.current.x;
      const dy = t.clientY - touchStart.current.y;
      touchStart.current = null;
      // Only trigger if horizontal swipe is dominant
      if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) navigate("next");
      else navigate("prev");
    },
    [navigate]
  );

  // Keep upcoming slides warm for faster first interactions on slower networks.
  useEffect(() => {
    const prefetchIndices = [
      (activeIndex + 1) % TOTAL,
      (activeIndex + 2) % TOTAL,
      (activeIndex - 1 + TOTAL) % TOTAL,
    ];

    const nextImageUrl = (path: string, width: number) => {
      const params = new URLSearchParams({ url: path, w: String(width), q: "75" });
      return `/_next/image?${params.toString()}`;
    };

    prefetchIndices.forEach((i) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = nextImageUrl(carouselItems[i].image, 828);
    });
  }, [activeIndex]);

  const activeItem = carouselItems[activeIndex];
  const activeColor = {
    primary: "#ffffff",
    secondary: "rgba(255,255,255,0.65)",
    glow: "0 0 24px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8)",
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
      {/* Logo — hidden on mobile to avoid clash with the fixed nav top-bar */}
      <div className="absolute top-8 left-1/2 z-50 -translate-x-1/2 hidden md:block">
        <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">
          dinhstudio
        </h1>
      </div>

      {/* Carousel track — drag / swipe area */}
      <div
        className="relative flex h-[400px] w-full items-center justify-center select-none"
        style={{ perspective: "1400px", perspectiveOrigin: "50% 50%", cursor: isDraggingCursor ? "grabbing" : "grab" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
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
          const isPriority = isActive || slot === 1;
          const visual = getSlotVisual(slot);

          return (
            <motion.div
              key={item.id}
              className="absolute"
              initial={false}
              animate={{
                x: visual.x,
                rotateY: visual.rotateY,
                scale: visual.scale,
                opacity: visual.opacity,
              }}
              transition={CARD_TRANSITION}
              style={{
                zIndex: visual.zIndex,
                visibility: visual.visibility,
                pointerEvents: visual.pointerEvents,
                willChange: "transform, opacity",
              }}
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
                  priority={isPriority}
                  {...(!isPriority ? { loading: "lazy" as const } : {})}
                />
                {/* Bottom gradient so card edges don't bleed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </motion.div>
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
              backgroundColor: "rgba(255,255,255,0.12)",
              borderColor: "rgba(255,255,255,0.35)",
              color: activeColor.primary,
              boxShadow: activeColor.glow,
            }}
          >
            View Case
          </a>
        </div>
      </div>

      {/* Subtle side arrow indicators — positioned at far edges below carousel */}
      <button
        onClick={() => navigate("prev")}
        disabled={isAnimating}
        aria-label="Previous project"
        className="absolute left-4 md:left-8 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/40 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:text-white/80 hover:bg-white/10 disabled:opacity-20"
        style={{ top: "calc(50% + 200px)" }}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={() => navigate("next")}
        disabled={isAnimating}
        aria-label="Next project"
        className="absolute right-4 md:right-8 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/40 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:text-white/80 hover:bg-white/10 disabled:opacity-20"
        style={{ top: "calc(50% + 200px)" }}
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Dot indicators */}
      <div className="absolute z-50 flex items-center gap-1.5" style={{ top: "calc(50% + 220px)" }}>
        {carouselItems.map((item, i) => (
          <button
            key={item.id}
            onClick={() => {
              if (isAnimating || i === activeIndex) return;
              const forwardDistance = (i - activeIndex + TOTAL) % TOTAL;
              const backwardDistance = (activeIndex - i + TOTAL) % TOTAL;
              const inferredDirection = forwardDistance <= backwardDistance ? "next" : "prev";
              const stagingSide: StagingSide = inferredDirection === "next" ? -2 : 2;
              dispatch({ type: "start-navigation", targetIndex: i, stagingSide });
              setTimeout(() => dispatch({ type: "complete-animation" }), 550);
            }}
            aria-label={`Go to ${item.title}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? "20px" : "6px",
              height: "6px",
              backgroundColor: i === activeIndex ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.25)",
            }}
          />
        ))}
      </div>

      {/* Explore */}
      <a
        href="#content"
        className="absolute bottom-10 z-50 flex flex-col items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="animate-pulse text-sm font-medium tracking-widest uppercase">Explore</span>
        {/* Thin downward arrow: stem + chevron tip */}
        <span className="animate-pulse flex flex-col items-center gap-0">
          <span className="block w-px h-5 bg-gradient-to-b from-muted-foreground to-muted-foreground/40" />
          {/* Arrowhead via two angled lines */}
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="opacity-70">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </a>
    </div>
  );
}
