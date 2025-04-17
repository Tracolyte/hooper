// src/components/ui/disintegrating-image.tsx
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

// Define the structure for each particle
interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  opacity: number;
  moveThreshold: number; // Scroll progress threshold (0-1) when this particle starts moving
}

// Define the props accepted by the component
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

  // --- Effect 1: Image Loading ---
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

    canvas.width = dimensions.width + canvasPaddingX;
    canvas.height = dimensions.height;

    const rect = canvas.getBoundingClientRect();
    componentTopRef.current = rect.top + window.scrollY;

    particlesRef.current = []; // Clear existing particles

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
                // *** MODIFIED LINE: Removed randomness ***
                // Calculate threshold directly based on normalized X position (inverted).
                // Particles with larger x (further right) will have smaller threshold.
                const moveThreshold = 1.0 - (x / imageWidth);

                particlesRef.current.push({
                    x: x, y: y, originX: x, originY: y,
                    opacity: 1,
                    // Ensure threshold is clamped between 0 and 1, although it should be naturally.
                    moveThreshold: Math.max(0, Math.min(1, moveThreshold))
                });
            }
        }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

  }, [isImageLoaded, dimensions, particleSamplingDensity, brightnessThreshold, canvasPaddingX]);

  // --- Effect 3: Scroll Handling ---
  const handleScroll = useCallback(() => {
    if (componentTopRef.current === null) return;
    const currentScrollY = window.scrollY;
    const triggerStartScrollY = componentTopRef.current + scrollTriggerOffset;
    const triggerEndScrollY = triggerStartScrollY + scrollEffectDuration;
    let progress = 0;
    if (currentScrollY >= triggerStartScrollY) {
        progress = (currentScrollY - triggerStartScrollY) / scrollEffectDuration;
    }
    progress = Math.max(0, Math.min(1, progress));
    setScrollProgress(prevProgress => {
        if (Math.abs(progress - prevProgress) > 0.001) { return progress; }
        return prevProgress;
    });
  }, [scrollTriggerOffset, scrollEffectDuration]);

  useEffect(() => {
    if (componentTopRef.current !== null) handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [handleScroll, componentTopRef.current]);


  // --- Effect 4: Animation Loop ---
  const draw = useCallback(() => {
    if (!canvasRef.current || particlesRef.current.length === 0 || !dimensions.width) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const currentParticles = particlesRef.current;
    const progress = scrollProgress;
    let needsAnotherFrame = false;
    const baseParticleColor = particleColor;

    currentParticles.forEach(p => {
      const effectiveProgress = Math.max(0, progress - p.moveThreshold);
      const progressRange = 1 - p.moveThreshold;
      // Avoid division by zero if moveThreshold is exactly 1
      const normalizedProgress = progressRange > 0 ? Math.min(1, effectiveProgress / progressRange) : (effectiveProgress > 0 ? 1 : 0);
      const displacement = normalizedProgress * maxDisplacementX;

      p.x = p.originX + displacement;
      p.y = p.originY;
      p.opacity = Math.max(0, 1 - (normalizedProgress * fadeIntensity));

      if (p.opacity > 0) {
        ctx.fillStyle = `rgba(${baseParticleColor}, ${p.opacity})`;
        ctx.fillRect(Math.floor(p.x), p.y, particleDrawSize, particleDrawSize);
      }

      if (progress > p.moveThreshold && p.opacity > 0) {
          needsAnotherFrame = true;
      }
    });

    if (progress > 0 || needsAnotherFrame) {
      animationFrameRef.current = requestAnimationFrame(draw);
    } else {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
      // Final static draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      currentParticles.forEach(p => {
        p.x = p.originX; p.y = p.originY; p.opacity = 1.0;
        ctx.fillStyle = `rgba(${baseParticleColor}, 1)`;
        ctx.fillRect(p.originX, p.originY, particleDrawSize, particleDrawSize);
      });
    }

  }, [
      scrollProgress, dimensions.width, particleDrawSize, particleColor,
      brightnessThreshold, maxDisplacementX, fadeIntensity, canvasPaddingX,
      particleSamplingDensity // Keep this dependency
    ]);

  // Effect to start/manage animation loop
  useEffect(() => {
    if (isImageLoaded && particlesRef.current.length > 0) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      draw();
    }
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isImageLoaded, draw]);


  // --- Render the Canvas Element ---
  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width > 0 ? dimensions.width + canvasPaddingX : undefined}
      height={dimensions.height > 0 ? dimensions.height : undefined}
      className={cn("block", className)}
      {...props}
    />
  );
};

export default DisintegratingImage;