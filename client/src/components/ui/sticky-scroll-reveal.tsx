"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming this utility function exists
import { GlowingEffect } from "@/components/ui/glowing-effect"; // Import the effect

// Helper function cn if not already defined elsewhere
// You can keep your own "@/lib/utils" import if it exists
// import { ClassValue, clsx } from "clsx"
// import { twMerge } from "tailwind-merge"
//
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }


interface StickyScrollRevealProps {
  content: {
    title: string;
    description: string;
    step: number;
    icon?: React.ReactNode;
    color?: "orange" | "blue" | "purple" | "green" | "brown";
  }[];
  contentClassName?: string;
}

export function StickyScrollReveal({
  content,
  contentClassName
}: StickyScrollRevealProps) {
  const [activeItem, setActiveItem] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const colors = {
    orange: "bg-hooper-orange",
    blue: "bg-hooper-blue",
    purple: "bg-purple-500",
    green: "bg-green-500",
    brown: "bg-hooper-brown",
  };

  // Update the active item based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
        const itemsCount = content.length;
        // Prevent division by zero if content is empty
        if (itemsCount === 0) return;
        const stepSize = 1 / itemsCount;
        const currentItem = Math.min(Math.max(Math.floor(latest / stepSize), 0), itemsCount - 1);
        setActiveItem(currentItem);
    });

    return () => unsubscribe();
  }, [scrollYProgress, content.length]);


  // ** REVISED: Reduced scrollable height multiplier for LESS STICKINESS **
  // Changed 100vh multiplier to 50vh. Adjust this value (e.g., 40vh, 60vh) as needed.
  const vhPerItem = 50; // <--- ADJUST THIS VALUE (e.g., 40, 50, 60)
  const bufferHeight = 30; // Optional buffer at the end (vh)
  const componentHeight = `calc(${content.length * vhPerItem}vh + ${bufferHeight}vh)`;


  return (
    <motion.div
      ref={ref}
      className="relative w-full"
      style={{ height: componentHeight }} // Set dynamic height
    >
      {/* Sticky container: Holds both columns */}
      {/* Using min-h-screen on md+ ensures it takes viewport height but can grow */}
      <div className="sticky top-16 md:top-20 flex flex-col md:flex-row md:items-start gap-8 lg:gap-16 xl:gap-24 md:min-h-screen px-4 sm:px-6 lg:px-8 py-10 md:py-16">

        {/* Left Column: Text Content */}
        <div className="w-full md:w-5/12 lg:w-4/12 space-y-10 md:space-y-12 md:mt-8"> {/* Added md:mt-8 for potential alignment */}
          {content.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className={cn(
                "relative pl-12 transition-all duration-300 ease-in-out",
                activeItem === index ? "opacity-100 transform-none" : "opacity-40 md:opacity-50 translate-y-1 md:translate-y-0 md:scale-95",
                contentClassName
              )}
            >
              <div
                className={cn(
                  "absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md transition-transform duration-300 ease-in-out",
                  colors[item.color || "orange"],
                  activeItem === index ? "scale-110" : "scale-100"
                )}
              >
                {item.step}
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">{item.title}</h3>
              <p className="text-hooper-dark-100">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Right Column: Visual Element (The Card) */}
        {/* Using flex alignment to keep card centered in its available space */}
        <div className="w-full md:w-7/12 lg:w-8/12 flex items-center justify-center md:h-[calc(100vh-10rem)]">
          {/* Container for floating effect and the card itself */}
          <div className="relative animate-float w-full max-w-sm sm:max-w-md lg:max-w-lg">
            {/* Decorative background blur */}
            <div className="absolute -inset-1 bg-gradient-to-r from-hooper-orange to-hooper-brown rounded-xl blur opacity-30 pointer-events-none"></div>

            {/* Outer Card Wrapper: NO overflow-hidden. Holds the glow effect. */}
            <div className="relative rounded-xl">
              <GlowingEffect
                spread={30}
                glow={true}
                disabled={false}
                proximity={50}
                inactiveZone={0.1}
                className="rounded-xl" // Match rounding
              />

              {/* Inner Container: Has overflow-hidden to clip image/content */}
              <div className="relative bg-hooper-dark-500 rounded-xl overflow-hidden border border-hooper-dark-300 shadow-2xl aspect-[3/4]"> {/* Using aspect ratio */}
                <img
                  src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  alt="Basketball player dunking"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none"></div>

                {/* Text content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                  <div className="flex items-center mb-2 sm:mb-3">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 mr-2 shadow-[0_0_8px_rgba(52,211,153,0.7)]"></div>
                    <span className="text-white font-medium text-sm sm:text-base">Available Now</span>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 text-white">Riverside Community Center</h3>
                  <div className="flex items-center text-hooper-dark-100 mb-3 sm:mb-4 text-xs sm:text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:h-4 mr-1 sm:mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>2.3 miles away</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-2 sm:p-3 rounded-lg text-center">
                      <div className="text-[10px] sm:text-xs text-hooper-dark-100 uppercase tracking-wider mb-0.5 sm:mb-1">Courts Open</div>
                      <div className="text-base sm:text-lg md:text-xl font-bold text-white">3/4</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-2 sm:p-3 rounded-lg text-center">
                      <div className="text-[10px] sm:text-xs text-hooper-dark-100 uppercase tracking-wider mb-0.5 sm:mb-1">Players Now</div>
                      <div className="text-base sm:text-lg md:text-xl font-bold text-white">12</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}