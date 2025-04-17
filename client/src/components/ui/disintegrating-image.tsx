// src/components/ui/disintegrating-image.tsx
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  opacity: number;
  moveThreshold: number;
}

interface DisintegratingImageProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  src: string;
  alt?: string;
  particleSamplingDensity?: number;
  particleDrawSize?: number;
  scrollTriggerOffset?: number;
  scrollEffectDuration?: number;
  particleColor?: string;
  brightnessThreshold?: number;
  maxDisplacementX?: number;
  fadeIntensity?: number;
  canvasPaddingX?: number;
  // --- NEW PROPS ---
  /** Power > 1 creates acceleration (ease-in). 1 is linear. < 1 is deceleration (ease-out). */
  accelerationPower?: number;
  /** Multiplier affecting how much further early particles travel compared to late ones. 0 means no spread. */
  spreadFactor?: number;
  /** Power applied to horizontal position for moveThreshold calculation. > 1 makes right side start sooner. */
  moveThresholdCurvePower?: number;
}

const DisintegratingImage: React.FC<DisintegratingImageProps> = ({
  src,
  className,
  particleSamplingDensity = 2,
  particleDrawSize = 1,
  scrollTriggerOffset = 50,
  scrollEffectDuration = 500,
  particleColor = "255, 255, 255",
  brightnessThreshold = 180,
  maxDisplacementX = 150,
  fadeIntensity = 1.5,
  canvasPaddingX = 500,
  accelerationPower = 2, // Default to quadratic acceleration (ease-in)
  spreadFactor = 1.0,    // Default spread factor
  moveThresholdCurvePower = 2, // Default curve power for threshold calculation
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const componentTopRef = useRef<number | null>(null);

  // --- Effect 1: Image Loading (no change) ---
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      imageRef.current = img;
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      setIsImageLoaded(true);
    };
    img.onerror = () => {
      console.error("Failed to load image:", src);
    };
  }, [src]);

  // --- Effect 2: Particle Initialization & Component Top Calculation ---
  useEffect(() => {
    if (!isImageLoaded || !canvasRef.current || !imageRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const effectiveCanvasWidth = dimensions.width + canvasPaddingX;
    if (canvas.width !== effectiveCanvasWidth || canvas.height !== dimensions.height) {
        canvas.width = effectiveCanvasWidth;
        canvas.height = dimensions.height;
    }

    const rect = canvas.getBoundingClientRect();
    componentTopRef.current = rect.top + window.scrollY;

    particlesRef.current = [];

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = dimensions.width;
    tempCanvas.height = dimensions.height;
    const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
    if (!tempCtx) return;

    tempCtx.drawImage(imageRef.current, 0, 0, dimensions.width, dimensions.height);
    const imageData = tempCtx.getImageData(0, 0, dimensions.width, dimensions.height);
    const data = imageData.data;
    const imageWidth = dimensions.width;

    for (let y = 0; y < dimensions.height; y += particleSamplingDensity) {
        for (let x = 0; x < dimensions.width; x += particleSamplingDensity) {
            const index = (y * imageWidth + x) * 4;
            const r = data[index];
            const alpha = data[index + 3];

            if (r > brightnessThreshold && alpha > 128) {
                const normalizedX = x / imageWidth;
                // Use moveThresholdCurvePower prop for threshold calculation
                const moveThresholdBase = 1.0 - normalizedX;
                const moveThreshold = Math.pow(moveThresholdBase, moveThresholdCurvePower);

                particlesRef.current.push({
                    x: x, y: y, originX: x, originY: y,
                    opacity: 1,
                    moveThreshold: Math.max(0, Math.min(1, moveThreshold))
                });
            }
        }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

  }, [isImageLoaded, dimensions, particleSamplingDensity, brightnessThreshold, canvasPaddingX, src, moveThresholdCurvePower]); // Added moveThresholdCurvePower dependency


  // --- Effect 3: Scroll Handling (no change) ---
  const handleScroll = useCallback(() => {
    if (componentTopRef.current === null) {
         if (canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            componentTopRef.current = rect.top + window.scrollY;
            if (componentTopRef.current === null) return;
         } else {
            return;
         }
    }

    const currentScrollY = window.scrollY;
    const triggerStartScrollY = componentTopRef.current + scrollTriggerOffset;
    const triggerEndScrollY = triggerStartScrollY + scrollEffectDuration;

    let progress = 0;
    if (currentScrollY >= triggerStartScrollY) {
        progress = (currentScrollY - triggerStartScrollY) / scrollEffectDuration;
    }
    progress = Math.max(0, Math.min(1, progress));

    setScrollProgress(prevProgress => {
        if (Math.abs(progress - prevProgress) > 0.001 || (progress === 0 && prevProgress !== 0) || (progress === 1 && prevProgress !== 1)) {
            return progress;
        }
        return prevProgress;
    });
  }, [scrollTriggerOffset, scrollEffectDuration]);

  // Effect to recalculate componentTop on resize and setup scroll listener (no change)
  useEffect(() => {
      const updateComponentTop = () => {
          if (canvasRef.current) {
              const rect = canvasRef.current.getBoundingClientRect();
              componentTopRef.current = rect.top + window.scrollY;
              handleScroll();
          }
      };

      if (componentTopRef.current === null && canvasRef.current) {
          updateComponentTop();
      }

      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', updateComponentTop);
      handleScroll();

      return () => {
          window.removeEventListener('scroll', handleScroll);
          window.removeEventListener('resize', updateComponentTop);
          if (animationFrameRef.current) {
              cancelAnimationFrame(animationFrameRef.current);
          }
      };
  }, [handleScroll]);

  // --- Effect 4: Animation Loop (MODIFIED) ---
  const draw = useCallback(() => {
    if (!canvasRef.current || particlesRef.current.length === 0 || !dimensions.width) {
      animationFrameRef.current = null;
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const currentParticles = particlesRef.current;
    const progress = scrollProgress; // Overall scroll progress (0-1)
    let needsAnotherFrame = false;
    const baseParticleColor = particleColor;

    currentParticles.forEach(p => {
      // Calculate the particle's normalized progress (0-1) within its active scroll range
      let normalizedProgress = 0;
      const progressRange = 1 - p.moveThreshold;
      if (progress > p.moveThreshold && progressRange > 0.0001) {
        const effectiveProgress = progress - p.moveThreshold;
        normalizedProgress = Math.min(1, effectiveProgress / progressRange);
      } else if (progress >= 1.0 && p.moveThreshold < 1.0) {
         // Ensure particles that should have moved reach full progress if overall progress is 1
         normalizedProgress = 1.0;
      }

      // *** START: Acceleration & Spread Logic ***

      // 1. Apply acceleration (ease-in) using accelerationPower
      // Power > 1 makes it accelerate, Power = 1 is linear
      const easedNormalizedProgress = Math.pow(normalizedProgress, accelerationPower);

      // 2. Calculate spread factor: particles starting earlier (lower threshold) travel further
      // spreadFactor = 0 -> no spread, all aim for maxDisplacementX
      // spreadFactor = 1 -> particles at threshold 0 aim for 2*maxDisplacementX, threshold 0.5 aim for 1.5*maxDisplacementX etc.
      const effectiveMaxDisplacementX = maxDisplacementX * (1 + (1 - p.moveThreshold) * spreadFactor);

      // 3. Calculate final displacement based on eased progress and effective max distance
      const displacement = easedNormalizedProgress * effectiveMaxDisplacementX;

      // *** END: Acceleration & Spread Logic ***

      p.x = p.originX + displacement;
      p.y = p.originY; // Keep original Y for horizontal disintegration

      // Fade based on the *original* normalized progress (linear fade often looks better)
      // Or you could fade based on easedNormalizedProgress for a different feel
      p.opacity = Math.max(0, 1 - (normalizedProgress * fadeIntensity));

      if (p.opacity > 0.01) {
        ctx.fillStyle = `rgba(${baseParticleColor}, ${p.opacity})`;
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), particleDrawSize, particleDrawSize);
      }

      // Determine if animation needs to continue
      if (normalizedProgress > 0 && normalizedProgress < 1 && p.opacity > 0.01) {
          needsAnotherFrame = true;
      } else if (progress === 0 && p.opacity < 1) { // Needs redraw if resetting
           needsAnotherFrame = true;
      }
    });

    // Request next frame if needed or if scroll is in progress
    if (needsAnotherFrame || (scrollProgress > 0 && scrollProgress < 1)) {
        animationFrameRef.current = requestAnimationFrame(draw);
    } else {
        // Handle final static draw states (progress = 0 or 1)
        if (scrollProgress === 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            currentParticles.forEach(p => {
                // Reset particle state explicitly for the draw
                p.x = p.originX; p.y = p.originY; p.opacity = 1.0;
                if (p.opacity > 0.01) { // Check original visibility criteria might be needed if brightness check was strict
                   ctx.fillStyle = `rgba(${baseParticleColor}, 1)`;
                   ctx.fillRect(Math.floor(p.originX), Math.floor(p.originY), particleDrawSize, particleDrawSize);
                }
            });
        } else if (scrollProgress === 1 && !needsAnotherFrame) {
             // Optional: Could perform a final draw at progress=1 state if needed,
             // but the last frame before this condition should have drawn it correctly.
             // Ensure particles are fully faded/displaced if logic requires.
             // Example: Clear canvas if all particles should be gone.
             // if (fadeIntensity >= 1 && spreadFactor >= 0) { // If particles are expected to fade or move off significantly
             //    ctx.clearRect(0, 0, canvas.width, canvas.height);
             // }
        }
        animationFrameRef.current = null;
    }

  }, [
      scrollProgress, dimensions.width, dimensions.height, particleDrawSize, particleColor,
      maxDisplacementX, fadeIntensity, particleSamplingDensity, // Keep density dependency
      brightnessThreshold, // Keep brightness dependency
      canvasPaddingX, // Keep padding dependency
      accelerationPower, // *** Add new prop ***
      spreadFactor,      // *** Add new prop ***
      moveThresholdCurvePower // Add dependency for moveThreshold calculation used in spread
    ]);

  // Effect to trigger animation loop when scrollProgress changes or image loads (no change)
  useEffect(() => {
    if (isImageLoaded && particlesRef.current.length > 0) {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(draw);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isImageLoaded, draw, scrollProgress]); // Draw is memoized with new dependencies


  // --- Render the Canvas Element (no change) ---
  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width > 0 ? dimensions.width + canvasPaddingX : 300}
      height={dimensions.height > 0 ? dimensions.height : 400}
      className={cn("block", className)}
      {...props}
    />
  );
};

export default DisintegratingImage;