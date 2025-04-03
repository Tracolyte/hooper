"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface StickyScrollRevealProps {
  content: {
    title: string;
    description: string;
    step: number;
    icon?: React.ReactNode;
    color?: "orange" | "blue" | "purple" | "green";
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
  };

  // Update the active item based on scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const progress = scrollYProgress.get();
      const step = 1 / content.length;
      const activeIndex = Math.min(
        Math.floor(progress / step),
        content.length - 1
      );
      
      setActiveItem(activeIndex);
    };

    const unsubscribe = scrollYProgress.on("change", handleScroll);
    return () => unsubscribe();
  }, [scrollYProgress, content.length]);

  return (
    <motion.div
      ref={ref}
      className="relative w-full"
    >
      <div className="sticky top-20 flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-[50%] space-y-12 py-8">
          {content.map((item, index) => (
            <div
              key={index}
              className={cn(
                "relative pl-12 transition-opacity duration-300",
                activeItem === index ? "opacity-100" : "opacity-50",
                contentClassName
              )}
            >
              <div
                className={cn(
                  "absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold",
                  colors[item.color || "orange"]
                )}
              >
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-hooper-dark-100">{item.description}</p>
            </div>
          ))}
        </div>
        
        <div className="w-full md:w-[50%] h-[600px] flex items-center justify-center">
          <div className="relative animate-float">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-hooper-orange to-hooper-blue rounded-xl blur opacity-30"></div>
            <div className="relative bg-hooper-dark-500 rounded-xl overflow-hidden border border-hooper-dark-300">
              <img
                src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Basketball player dunking"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-white font-medium">Available Now</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Riverside Community Center</h3>
                <div className="flex items-center text-hooper-dark-100 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>2.3 miles away</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-hooper-dark-400 p-3 rounded-lg">
                    <div className="text-sm text-hooper-dark-100">Courts Open</div>
                    <div className="text-xl font-bold">3/4</div>
                  </div>
                  <div className="bg-hooper-dark-400 p-3 rounded-lg">
                    <div className="text-sm text-hooper-dark-100">Players</div>
                    <div className="text-xl font-bold">12</div>
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
