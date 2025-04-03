import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Button } from "@/components/ui/button";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { motion } from "framer-motion";
import { ArrowRight, Activity, MapPin, Clock } from "lucide-react";

export default function HeroSection() {
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
      icon: <Activity className="w-5 h-5 text-hooper-orange" />, 
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
    <section className="relative overflow-hidden bg-black py-20 md:py-32">
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
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div 
            className="flex flex-col justify-center"
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
              className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6"
            >
              Find <span className="bg-gradient-to-r from-hooper-orange to-hooper-brown bg-clip-text text-transparent">Basketball Courts</span> <br />& Games in Real-Time
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="max-w-2xl text-lg md:text-xl text-gray-300 mb-8"
            >
              Hooper connects you to available courts and pickup games nearby.
              Real-time occupancy data, easy day passes, and player networking in one app.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Button
                onClick={handleEarlyAccessClick}
                className="bg-gradient-to-r from-hooper-orange to-hooper-brown text-white font-semibold px-8 py-3 h-auto rounded-full hover:shadow-lg hover:shadow-hooper-orange/20 transition-all hover:opacity-90"
              >
                Get Early Access
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={handleLearnMoreClick}
                variant="outline"
                className="bg-white/5 text-white border-white/10 px-8 py-3 h-auto rounded-full font-semibold hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Learn More
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + stat.delay, duration: 0.5 }}
                    className="flex flex-col items-center rounded-xl bg-white/5 p-4 backdrop-blur-sm border border-white/5"
                  >
                    <div className="mb-1 rounded-full bg-black/20 p-2">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative mx-auto max-w-[600px] lg:ml-auto"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-hooper-orange to-hooper-brown rounded-3xl blur-lg opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-hooper-orange/20 to-hooper-brown/20 rounded-3xl"></div>
            
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-sm">
              <HeroParallax 
                imageUrl="https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                className="h-[500px] rounded-3xl shadow-2xl overflow-hidden"
                overlayClassName="bg-gradient-to-t from-black via-black/70 to-transparent"
              >
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <div className="mb-4 flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-green-500">Available Now</span>
                    </div>
                    <div className="h-1 w-1 rounded-full bg-white/40"></div>
                    <div>2 courts open</div>
                  </div>
                  <div className="mb-2 text-2xl font-bold">Downtown Recreation Center</div>
                  <div className="mb-4 text-gray-300">3.2 miles away • Open until 10:00 PM</div>
                  <Button className="bg-hooper-orange hover:bg-hooper-orange/90 text-white rounded-full px-6">
                    Get Day Pass
                  </Button>
                </div>
              </HeroParallax>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
