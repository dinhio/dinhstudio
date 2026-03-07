"use client";

import { useState, useEffect, useCallback } from "react";
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

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isAnimating, setIsAnimating] = useState(false);

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

  const getItemStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff =
      ((diff + carouselItems.length + Math.floor(carouselItems.length / 2)) %
        carouselItems.length) -
      Math.floor(carouselItems.length / 2);

    const isActive = normalizedDiff === 0;
    const isAdjacent = Math.abs(normalizedDiff) === 1;
    const isVisible = Math.abs(normalizedDiff) <= 2;

    if (!isVisible) {
      return {
        transform: `translateX(${normalizedDiff * 100}%) scale(0.5)`,
        opacity: 0,
        zIndex: 0,
      };
    }

    const translateX = normalizedDiff * 320;
    const rotateY = normalizedDiff * -25;
    const scale = isActive ? 1 : isAdjacent ? 0.85 : 0.7;
    const opacity = isActive ? 1 : isAdjacent ? 0.7 : 0.4;
    const zIndex = isActive ? 30 : isAdjacent ? 20 : 10;

    return {
      transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  const activeItem = carouselItems[activeIndex];

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
      {/* Logo at top center */}
      <div className="absolute top-8 left-1/2 z-50 -translate-x-1/2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          dinhstudio
        </h1>
      </div>

      {/* 3D Carousel */}
      <div className="carousel-container relative flex h-[500px] w-full items-center justify-center">
        {carouselItems.map((item, index) => {
          const style = getItemStyle(index);
          const isActive = index === activeIndex;

          return (
            <div
              key={item.id}
              className="carousel-item absolute transition-all duration-500 ease-out"
              style={{
                transform: style.transform,
                opacity: style.opacity,
                zIndex: style.zIndex,
              }}
            >
              <div
                className={`relative overflow-hidden rounded-2xl ${
                  isActive ? "shadow-2xl shadow-white/10" : ""
                }`}
                style={{
                  width: isActive ? "400px" : "320px",
                  height: isActive ? "280px" : "220px",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                  priority={isActive}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
          );
        })}

        {/* Center content overlay */}
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none">
          <h2 className="mb-4 text-5xl font-bold tracking-tight text-foreground md:text-6xl">
            {activeItem.title.split(" ").map((word, i) => (
              <span
                key={i}
                className={i === 1 ? "text-muted-foreground" : ""}
              >
                {word}{" "}
              </span>
            ))}
          </h2>
          <a
            href={activeItem.link}
            className="pointer-events-auto flex h-12 items-center justify-center rounded-full border border-foreground/20 bg-background/80 px-8 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:bg-foreground hover:text-background"
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
