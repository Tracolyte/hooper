// src/components/sections/hero-section.tsx
import React from 'react'; // <--- Import React
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Users, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import DisintegratingImage from "@/components/ui/disintegrating-image";

// +++ Define an interface for the structure of each stat item +++
interface StatItem {
  icon: React.ReactNode; // Use React.ReactNode for JSX elements
  value: string;
  label: string;
  delay: number;
}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export default function HeroSection() {
  const isMobile = useIsMobile();

  const handleLearnMoreClick = () => {
    const problemSection = document.querySelector("#problem-section");
    problemSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleEarlyAccessClick = () => {
    const emailSignupSection = document.querySelector("#email-signup");
    emailSignupSection?.scrollIntoView({ behavior: "smooth" });
  };

  // +++ Apply the interface to the stats array declaration +++
  const stats: StatItem[] = [
    {
      icon: <Users className="w-5 h-5 text-hooper-orange" />,
      value: "20M+",
      label: "Players Nationwide",
      delay: 0.1,
    },
    {
      icon: <MapPin className="w-5 h-5 text-hooper-brown" />,
      value: "5,000+",
      label: "Basketball Courts",
      delay: 0.2,
    },
    {
      icon: <Clock className="w-5 h-5 text-hooper-orange" />,
      value: "24/7",
      label: "Real-time Updates",
      delay: 0.3,
    },
  ];
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  return (
    <section className="relative bg-black pt-24 pb-16 sm:pt-32 sm:pb-20 md:py-32 overflow-hidden">
      {/* Background Gradient */}
      <BackgroundGradientAnimation
        containerClassName="absolute inset-0 z-0"
        className="absolute inset-0 opacity-20"
        interactive={false}
        gradientBackgroundStart="#000000"
        gradientBackgroundEnd="#050505"
        firstColor="hsl(21deg 90% 50% / 30%)"
        secondColor="hsl(31deg 90% 40% / 30%)"
        thirdColor="hsl(41deg 90% 30% / 30%)"
        fourthColor="hsl(11deg 90% 40% / 20%)"
        fifthColor="hsl(21deg 90% 50% / 40%)"
        pointerColor="transparent"
      />

      {/* Disintegrating Image Container */}
      <div className="absolute inset-y-0 left-0 z-[1] w-72 xs:w-80 md:w-96 lg:w-[420px] pointer-events-none select-none flex items-center justify-start">
        <DisintegratingImage
          src="/hero-portrait-stipple.png"
          alt="Portrait disintegrating"
          className="block h-full max-w-none"
          // --- Particle Behavior Props ---
          particleSamplingDensity={2}
          particleDrawSize={1}
          brightnessThreshold={180}
          particleColor="255, 255, 255" // Example: Orange tint
          // --- Scroll Trigger Props ---
          scrollTriggerOffset={0}
          scrollEffectDuration={380} // Shorter duration
          // --- Displacement & Fading ---
          maxDisplacementX={1000}   // Base maximum travel distance
          fadeIntensity={5.5}      // Fade slightly slower or adjust as needed
          canvasPaddingX={1000}     // Ensure enough space for max displacement + spread
          // --- NEW: Acceleration & Spread Control ---
          accelerationPower={3.0}  // Quadratic ease-in (particles speed up)
          spreadFactor={50}       // Early particles travel up to 1 + 1.5 = 2.5x maxDisplacementX
          moveThresholdCurvePower={2} // Make right edge start significantly earlier
        />
      </div>

      {/* Main Hero Content (Ensure z-index is higher than image container) */}
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
           { /* Motion divs for text and buttons */ }
           <motion.div
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Launching Soon Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block rounded-full bg-gradient-to-r from-hooper-orange/20 to-hooper-brown/20 px-4 py-1.5 mb-6"
            >
              <span className="text-sm font-medium tracking-wide text-hooper-orange">
                Launching Soon
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6" // Ensure base text color is white or similar
            >
              Find{" "}
              <span className="bg-gradient-to-r from-hooper-orange via-orange-500 to-orange-600 bg-clip-text text-transparent">
                Basketball Courts
              </span>
              <br className="hidden xs:inline" /> & Games in Real‑Time
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 max-w-2xl"
            >
              Real‑time occupancy data, easy day passes, and player networking
              in one app.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col xs:flex-row gap-4 mb-14"
            >
              <Button
                onClick={handleEarlyAccessClick}
                className="bg-gradient-to-r from-hooper-orange to-hooper-brown text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 h-auto rounded-full hover:shadow-lg hover:shadow-hooper-orange/20 transition-all hover:opacity-90"
              >
                Get Early Access
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="relative inline-flex">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  className="rounded-full pointer-events-none"
                />
                <Button
                  onClick={handleLearnMoreClick}
                  variant="outline"
                  className="relative z-10 bg-white/5 text-white border-white/10 px-6 sm:px-8 py-2.5 sm:py-3 h-auto rounded-full font-semibold hover:bg-white/10 transition-all backdrop-blur-sm"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="w-full max-w-3xl"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5 md:gap-8">
                {/* TypeScript now knows 'stat' is of type StatItem here */}
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + stat.delay, duration: 0.5 }}
                    className={cn(
                      "flex flex-col items-center rounded-xl bg-white/5 p-3 sm:p-4 backdrop-blur-sm border border-white/5 relative",
                      index === 2 &&
                        isMobile &&
                        "col-span-2 mx-auto w-full max-w-[250px]" // Adjusts last item on mobile
                    )}
                  >
                    <GlowingEffect
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                    />
                    <div className="mb-1 rounded-full bg-black/20 p-1.5 sm:p-2">
                      {stat.icon}
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-white"> {/* Ensure text color */}
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400"> {/* Ensure text color */}
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}