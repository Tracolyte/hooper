import React from 'react';
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Users, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import DisintegratingImage from "@/components/ui/disintegrating-image";

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

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

  return (
    <section className="relative bg-black pt-24 pb-16 sm:pt-32 sm:pb-20 md:py-32 overflow-hidden">
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

      {/* LEFT image - Hidden on mobile */}
      <div className={cn(
          "absolute inset-y-0 left-0 z-[1] w-72 xs:w-80 md:w-96 lg:w-[420px] pointer-events-none select-none flex items-center justify-start",
          isMobile && "hidden" // This hides the left image on mobile
      )}>
        <DisintegratingImage
          src="/hero-portrait-stipple.png"
          alt="Portrait disintegrating"
          className="block h-full max-w-none opacity-75"
          particleSamplingDensity={2}
          particleDrawSize={1}
          brightnessThreshold={180}
          particleColor="255, 255, 255"
          scrollTriggerOffset={0}
          scrollEffectDuration={380}
          maxDisplacementX={1000}
          fadeIntensity={4.5}
          canvasPaddingX={1000}
          accelerationPower={3.0}
          spreadFactor={50}
          moveThresholdCurvePower={2}
        />
      </div>

      {/* RIGHT image - Adjusted for mobile */}
      <div className={cn(
          "absolute z-[1] pointer-events-none select-none",
          isMobile 
            ? "top-[8vh] right-[2vw] w-[45vw] max-w-[160px] h-auto" // Mobile: Positioned upper-right, responsive width
            : "top-1/2 left-2/3 w-full h-full" // Desktop: Original classes
      )}>
        <DisintegratingImage
          src="/basketball-stipple.png"
          alt="Basketball disintegrating"
          className={cn(
              "block opacity-75",
              isMobile ? "w-full h-auto" : "" // Mobile: Image scales to fit its container
          )}
          particleSamplingDensity={isMobile ? 2 : 4} // Optional: reduce density on mobile for performance
          particleDrawSize={1}
          brightnessThreshold={100}
          particleColor="255, 255, 255"
          scrollTriggerOffset={-400}
          scrollEffectDuration={280}
          maxDisplacementX={-1000}
          fadeIntensity={4.5}
          canvasPaddingX={0}
          accelerationPower={3.0}
          spreadFactor={50}
          moveThresholdCurvePower={1}
        />
      </div>

      {/* Main Hero Content (Ensure z-index is higher than image containers) */}
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
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6"
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
                  className="relative z-10 bg-white/5 text-white border-white/10 px-6 sm:px-8 py-2.5 sm:py-3 h-auto rounded-full font-semibold hover:bg-white/10 hover:text-hooper-orange transition-all backdrop-blur-sm"
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
                        "col-span-2 mx-auto w-full max-w-[250px]"
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
                    <div className="text-xl sm:text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">
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