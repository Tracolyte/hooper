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
  accelerationPower?: number;
  spreadFactor?: number;
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
  accelerationPower = 2,
  spreadFactor = 1.0,
  moveThresholdCurvePower = 2,
  style,
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

  // Calculate left padding so negative displacement is visible
  const leftPad = Math.abs(Math.min(0, maxDisplacementX));

  // Load image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      imageRef.current = img;
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      setIsImageLoaded(true);
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        componentTopRef.current = rect.top + window.scrollY;
      }
      setScrollProgress(0);
    };
    img.onerror = () => {
      console.error("Failed to load image:", src);
      setIsImageLoaded(false);
    };
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  // Initialize particles
  useEffect(() => {
    if (!isImageLoaded || !canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Make space on both sides
    const effectiveCanvasWidth = dimensions.width + canvasPaddingX + leftPad;
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
    let imageData;
    try {
      imageData = tempCtx.getImageData(0, 0, dimensions.width, dimensions.height);
    } catch {
      return;
    }
    const data = imageData.data;
    const imageWidth = dimensions.width;

    for (let y = 0; y < dimensions.height; y += particleSamplingDensity) {
      for (let x = 0; x < dimensions.width; x += particleSamplingDensity) {
        const idx = (y * imageWidth + x) * 4;
        const r = data[idx], g = data[idx+1], b = data[idx+2], a = data[idx+3];
        const brightness = (r + g + b) / 3;
        if (brightness > brightnessThreshold && a > 128) {
          const normalizedX = x / imageWidth;
          const moveThresholdBase = maxDisplacementX >= 0 ? 1.0 - normalizedX : normalizedX;
          const moveThreshold = Math.pow(moveThresholdBase, moveThresholdCurvePower);
          particlesRef.current.push({ x, y, originX: x, originY: y, opacity: 1, moveThreshold });
        }
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleScroll();
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(draw);

  }, [isImageLoaded, dimensions, particleSamplingDensity, brightnessThreshold, canvasPaddingX, src, moveThresholdCurvePower, maxDisplacementX]);

  const handleScroll = useCallback(() => {
    if (componentTopRef.current === null && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      componentTopRef.current = rect.top + window.scrollY;
    }
    const currentY = window.scrollY;
    const dur = Math.max(1, scrollEffectDuration);
    const start = (componentTopRef.current ?? 0) + scrollTriggerOffset;
    const end = start + dur;
    let prog = 0;
    if (currentY <= start) prog = 0;
    else if (currentY >= end) prog = 1;
    else prog = (currentY - start) / dur;
    prog = Math.max(0, Math.min(1, prog));
    setScrollProgress(prev => Math.abs(prog - prev) > 0.001 || (prog === 0 && prev !== 0) || (prog === 1 && prev !== 1) ? prog : prev);
  }, [scrollTriggerOffset, scrollEffectDuration]);

  useEffect(() => {
    const updateTop = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        componentTopRef.current = rect.top + window.scrollY;
        handleScroll();
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateTop);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateTop);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [handleScroll]);

  // Draw loop
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isImageLoaded || particlesRef.current.length === 0) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let needsFrame = false;
    particlesRef.current.forEach(p => {
      let nProg = 0;
      const range = 1 - p.moveThreshold;
      if (scrollProgress > p.moveThreshold && range > 0.0001) nProg = Math.min(1, (scrollProgress - p.moveThreshold)/range);
      else if (scrollProgress >= 1 && p.moveThreshold < 0.9999) nProg = 1;
      const eased = Math.pow(nProg, accelerationPower);
      const directionFactor = maxDisplacementX >= 0 ? p.moveThreshold : (1 - p.moveThreshold);
      const effectiveMaxDisplacementX = maxDisplacementX * (1 + directionFactor * spreadFactor);
      const disp = eased * effectiveMaxDisplacementX;
      p.x = p.originX + disp;
      p.opacity = Math.max(0, 1 - nProg * fadeIntensity);
      if (p.opacity > 0.01) {
        ctx.fillStyle = `rgba(${particleColor},${p.opacity})`;
        const drawX = p.originX + disp + leftPad;
        ctx.fillRect(Math.floor(drawX), Math.floor(p.y), particleDrawSize, particleDrawSize);
      }
      if (nProg > 0 && nProg < 1 && p.opacity > 0.01) needsFrame = true;
    });
    if (needsFrame || (scrollProgress > 0 && scrollProgress < 1)) animationFrameRef.current = requestAnimationFrame(draw);
  }, [isImageLoaded, scrollProgress, particleDrawSize, particleColor, maxDisplacementX, fadeIntensity, accelerationPower, spreadFactor, leftPad]);

  // Trigger draw on scrollProgress change
  useEffect(() => {
    if (isImageLoaded && particlesRef.current.length > 0) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = requestAnimationFrame(draw);
    }
    return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); };
  }, [isImageLoaded, draw, scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width > 0 ? dimensions.width + canvasPaddingX + leftPad : 300}
      height={dimensions.height > 0 ? dimensions.height : 150}
      className={cn(
        "block transition-opacity duration-300 ease-in",
        isImageLoaded ? "opacity-100" : "opacity-0",
        className
      )}
      style={{ marginLeft: `-${leftPad}px`, ...style }}
      {...props}
    />
  );
};

export default DisintegratingImage;