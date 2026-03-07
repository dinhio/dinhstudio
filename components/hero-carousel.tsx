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
  {
    id: 1,
    title: "Artisan Bloom",
    image: "/carousel/project-1.jpg",
    link: "/work/artisan-bloom",
  },
  {
    id: 2,
    title: "Neotech Labs",
    image: "/carousel/project-2.jpg",
    link: "/work/neotech-labs",
  },
  {
    id: 3,
    title: "Verdant Co",
    image: "/carousel/project-3.jpg",
    link: "/work/verdant-co",
  },
  {
    id: 4,
    title: "Lumina Studio",
    image: "/carousel/project-4.jpg",
    link: "/work/lumina-studio",
  },
  {
    id: 5,
    title: "Aurora Digital",
    image: "/carousel/project-5.jpg",
    link: "/work/aurora-digital",
  },
];

// Analyze image brightness to determine optimal text color
function analyzeImageBrightness(imageSrc: string): Promise<{ isDark: boolean; dominantColor: string }> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve({ isDark: true, dominantColor: "#000000" });
        return;
      }

      // Sample the center region of the image (where text overlays)
      const sampleWidth = Math.min(200, img.width);
      const sampleHeight = Math.min(150, img.height);
      canvas.width = sampleWidth;
      canvas.height = sampleHeight;

      // Draw center portion of image
      const sx = (img.width - sampleWidth) / 2;
      const sy = (img.height - sampleHeight) / 2;
      ctx.drawImage(img, sx, sy, sampleWidth, sampleHeight, 0, 0, sampleWidth, sampleHeight);

      const imageData = ctx.getImageData(0, 0, sampleWidth, sampleHeight);
      const data = imageData.data;

      let totalR = 0, totalG = 0, totalB = 0;
      let pixelCount = 0;

      // Sample every 4th pixel for performance
      for (let i = 0; i < data.length; i += 16) {
        totalR += data[i];
        totalG += data[i + 1];
        totalB += data[i + 2];
        pixelCount++;
      }

      const avgR = totalR / pixelCount;
      const avgG = totalG / pixelCount;
      const avgB = totalB / pixelCount;

      // Calculate relative luminance (WCAG formula)
      const luminance = (0.299 * avgR + 0.587 * avgG + 0.114 * avgB) / 255;
      const isDark = luminance < 0.5;

      const dominantColor = `rgb(${Math.round(avgR)}, ${Math.round(avgG)}, ${Math.round(avgB)})`;

      resolve({ isDark, dominantColor });
    };

    img.onerror = () => {
      resolve({ isDark: true, dominantColor: "#000000" });
    };

    img.src = imageSrc;
  });
}

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isAnimating, setIsAnimating] = useState(false);
  const [textColors, setTextColors] = useState<Record<number, { primary: string; secondary: string }>>({});
  const analyzedRef = useRef<Set<number>>(new Set());

  const navigate = useCallback(
    (direction: "prev" | "next") => {
      if (isAnimating) return;
      setIsAnimating(true);

      if (direction === "next") {
        setActiveIndex((prev) => (prev + 1) % carouselItems.length);
      } else {
        setActiveIndex(
          (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
        );
      }

      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  // Analyze colors for all carousel images on mount
  useEffect(() => {
    const analyzeColors = async () => {
      const colors: Record<number, { primary: string; secondary: string }> = {};
      
      for (const item of carouselItems) {
        if (analyzedRef.current.has(item.id)) continue;
        
        const result = await analyzeImageBrightness(item.image);
        analyzedRef.current.add(item.id);
        
        // Set text colors based on image brightness
        if (result.isDark) {
          // Dark image = light text
          colors[item.id] = {
            primary: "#ffffff",
            secondary: "rgba(255, 255, 255, 0.6)",
          };
        } else {
          // Light image = dark text
          colors[item.id] = {
            primary: "#0a0a0a",
            secondary: "rgba(10, 10, 10, 0.6)",
          };
        }
      }
      
      setTextColors((prev) => ({ ...prev, ...colors }));
    };

    analyzeColors();
  }, []);

  // Only compute slots for prev, active, next — nothing else is rendered
  const getSlots = () => {
    const total = carouselItems.length;
    const prevIndex = (activeIndex - 1 + total) % total;
    const nextIndex = (activeIndex + 1) % total;
    return [
      { item: carouselItems[prevIndex], slot: -1 },
      { item: carouselItems[activeIndex], slot: 0 },
      { item: carouselItems[nextIndex], slot: 1 },
    ];
  };

  const getSlotStyle = (slot: number): React.CSSProperties => {
    const isActive = slot === 0;
    // Active card: 400×280. Side cards: 300×210, offset by ±370px, slight Y perspective tilt.
    const translateX = slot * 370;
    const rotateY = slot * -20;
    const scale = isActive ? 1 : 0.82;
    const opacity = isActive ? 1 : 0.55;
    const zIndex = isActive ? 30 : 10;
    return {
      transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
      transition: "transform 500ms cubic-bezier(0.4,0,0.2,1), opacity 500ms ease",
    };
  };

  const activeItem = carouselItems[activeIndex];
  const activeColors = textColors[activeItem.id] || { primary: "#ffffff", secondary: "rgba(255, 255, 255, 0.6)" };

  const slots = getSlots();

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
      {/* Logo at top center */}
      <div className="absolute top-8 left-1/2 z-50 -translate-x-1/2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          dinhstudio
        </h1>
      </div>

      {/* 3D Carousel — perspective wrapper clips overflow */}
      <div
        className="relative flex h-[380px] w-full items-center justify-center"
        style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}
      >
        {/*
          Mask: hard left/right fade so side cards dissolve at the edge
          rather than hard-clipping or bleeding off screen.
        */}
        <div
          className="pointer-events-none absolute inset-0 z-40"
          style={{
            background:
              "linear-gradient(to right, var(--background) 0%, transparent 18%, transparent 82%, var(--background) 100%)",
          }}
        />

        {slots.map(({ item, slot }) => {
          const isActive = slot === 0;
          return (
            <div
              key={item.id}
              className="absolute"
              style={getSlotStyle(slot)}
            >
              <div
                className={`relative overflow-hidden rounded-2xl ${isActive ? "shadow-2xl shadow-white/10" : ""}`}
                style={{
                  width: isActive ? "400px" : "300px",
                  height: isActive ? "280px" : "210px",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                  priority={isActive}
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
          );
        })}

        {/* Center content overlay — sits above the mask */}
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">
          <h2
            className="mb-4 text-5xl font-bold tracking-tight md:text-6xl"
            style={{
              transition: "color 500ms ease",
              textShadow:
                activeColors.primary === "#ffffff"
                  ? "0 2px 20px rgba(0,0,0,0.5)"
                  : "0 2px 20px rgba(255,255,255,0.3)",
            }}
          >
            {activeItem.title.split(" ").map((word, i) => (
              <span
                key={i}
                style={{
                  color: i === 0 ? activeColors.primary : activeColors.secondary,
                  transition: "color 500ms ease",
                }}
              >
                {word}{" "}
              </span>
            ))}
          </h2>
          <a
            href={activeItem.link}
            className="pointer-events-auto flex h-12 items-center justify-center rounded-full border px-8 text-sm font-medium backdrop-blur-sm hover:scale-105"
            style={{
              transition: "color 500ms ease, background-color 500ms ease, border-color 500ms ease, transform 200ms ease",
              backgroundColor:
                activeColors.primary === "#ffffff"
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(0,0,0,0.15)",
              borderColor:
                activeColors.primary === "#ffffff"
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(0,0,0,0.3)",
              color: activeColors.primary,
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
          className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition-all hover:scale-110 glow-accent"
          aria-label="Previous project"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => navigate("next")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition-all hover:scale-110 glow-accent"
          aria-label="Next project"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Explore button */}
      <a
        href="#content"
        className="absolute bottom-32 z-50 flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="text-sm font-medium">Explore</span>
        <div className="h-8 w-px animate-pulse bg-gradient-to-b from-muted-foreground to-transparent" />
      </a>
    </div>
  );
}
