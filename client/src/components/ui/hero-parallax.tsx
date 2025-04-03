"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroParallaxProps {
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  imageUrl: string;
}

export function HeroParallax({
  children,
  className,
  overlayClassName,
  imageUrl,
}: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <div
      ref={ref}
      className={cn(
        "w-full overflow-hidden relative",
        className
      )}
    >
      <motion.div
        style={{
          y: yBg,
          scale: 1.05,
          opacity
        }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <img
          src={imageUrl}
          alt="Basketball court with players"
          className="w-full h-full object-cover"
        />
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent",
          overlayClassName
        )}/>
      </motion.div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
