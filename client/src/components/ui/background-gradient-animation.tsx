"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface BackgroundGradientAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: "small" | "medium" | "large";
  blendingValue?: string;
  children?: React.ReactNode;
  interactive?: boolean;
  containerClassName?: string;
}

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(0, 0, 0)",
  gradientBackgroundEnd = "rgb(0, 0, 0)",
  firstColor = "rgb(255, 77, 0, 0.7)",
  secondColor = "rgb(0, 163, 255, 0.7)",
  thirdColor = "rgb(100, 0, 255, 0.7)",
  fourthColor = "rgb(0, 200, 150, 0.7)",
  fifthColor = "rgb(200, 50, 50, 0.7)",
  pointerColor = "rgb(255, 255, 255)",
  size = "medium",
  blendingValue = "hard-light",
  className,
  containerClassName,
  interactive = true,
  children,
  ...props
}: BackgroundGradientAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (!isHovering) return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setCursorPosition({ x, y });
    }
  };

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    // Set initial positions for the gradients
    setCursorPosition({ x: 0.5, y: 0.5 });
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMoveDocument = (e: MouseEvent) => {
      handleMouseMove(e);
    };

    if (interactive && isHovering) {
      document.addEventListener("mousemove", handleMouseMoveDocument);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMoveDocument);
    };
  }, [isHovering, interactive, isTouchDevice]);

  const sizeClass = size === "small" 
    ? "w-[200px] h-[200px]" 
    : size === "medium"
    ? "w-[400px] h-[400px]"
    : "w-[600px] h-[600px]";

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden flex items-center justify-center",
        containerClassName
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 overflow-hidden blur-lg transition-opacity",
          isHovering ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `radial-gradient(circle at ${cursorPosition.x * 100}% ${
            cursorPosition.y * 100
          }%, ${pointerColor}, transparent)`,
        }}
      />
      <div
        className={cn(
          "flex items-center justify-center pointer-events-none absolute inset-0",
          className
        )}
        style={{
          background: `linear-gradient(${gradientBackgroundStart}, ${gradientBackgroundEnd})`,
        }}
      >
        <svg
          className={cn(
            "flex animate-pulse opacity-70 transition-opacity blur-2xl",
            sizeClass,
            isHovering ? "opacity-90" : "opacity-70"
          )}
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <circle
              cx={200}
              cy={200}
              r={150}
              fill={firstColor}
              style={{
                transformOrigin: "center center",
                transform: `translate(${(cursorPosition.x - 0.5) * 30}px, ${
                  (cursorPosition.y - 0.5) * 30
                }px)`,
                mixBlendMode: blendingValue as any,
              }}
            />
            <circle
              cx={200}
              cy={200}
              r={120}
              fill={secondColor}
              style={{
                transformOrigin: "center center",
                transform: `translate(${(cursorPosition.x - 0.5) * -50}px, ${
                  (cursorPosition.y - 0.5) * -20
                }px)`,
                mixBlendMode: blendingValue as any,
              }}
            />
            <circle
              cx={200}
              cy={200}
              r={100}
              fill={thirdColor}
              style={{
                transformOrigin: "center center",
                transform: `translate(${(cursorPosition.x - 0.5) * 30}px, ${
                  (cursorPosition.y - 0.5) * -40
                }px)`,
                mixBlendMode: blendingValue as any,
              }}
            />
            <circle
              cx={200}
              cy={200}
              r={70}
              fill={fourthColor}
              style={{
                transformOrigin: "center center",
                transform: `translate(${(cursorPosition.x - 0.5) * -20}px, ${
                  (cursorPosition.y - 0.5) * 40
                }px)`,
                mixBlendMode: blendingValue as any,
              }}
            />
            <circle
              cx={200}
              cy={200}
              r={50}
              fill={fifthColor}
              style={{
                transformOrigin: "center center",
                transform: `translate(${(cursorPosition.x - 0.5) * 40}px, ${
                  (cursorPosition.y - 0.5) * 20
                }px)`,
                mixBlendMode: blendingValue as any,
              }}
            />
          </g>
        </svg>
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};
