import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Users, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function HeroSection() {
  const isMobile = useIsMobile();

  const handleLearnMoreClick = () => {
    const problemSection = document.querySelector("#problem-section");
    if (problemSection) {
      problemSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const handleEarlyAccessClick = () => {
    const emailSignupSection = document.querySelector("#email-signup");
    if (emailSignupSection) {
      emailSignupSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stats = [
    { 
      icon: <Users className="w-5 h-5 text-hooper-orange" />, 
      value: "20M+", 
      label: "Players Nationwide",
      delay: 0.1
    },
    { 
      icon: <MapPin className="w-5 h-5 text-hooper-brown" />, 
      value: "5,000+", 
      label: "Basketball Courts",
      delay: 0.2
    },
    { 
      icon: <Clock className="w-5 h-5 text-hooper-orange" />, 
      value: "24/7", 
      label: "Real-time Updates",
      delay: 0.3
    }
  ];

  return (
    <section className="relative overflow-hidden bg-black pt-24 pb-16 sm:pt-32 sm:pb-20 md:py-32">
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
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <motion.div 
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block rounded-full bg-gradient-to-r from-hooper-orange/20 to-hooper-brown/20 px-4 py-1.5 mb-6"
            >
              <span className="text-sm font-medium tracking-wide text-hooper-orange">Launching Soon</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6"
            >
              Find <span className="bg-gradient-to-r from-hooper-orange to-hooper-brown bg-clip-text text-transparent">Basketball Courts</span> 
              <br className="hidden xs:inline" /> & Games in Real-Time
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 max-w-2xl"
            >
              
              Real-time occupancy data, easy day passes, and player networking in one app.
            </motion.p>

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
                      index === 2 && isMobile && "col-span-2 mx-auto w-full max-w-[250px]"
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
                    <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
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
