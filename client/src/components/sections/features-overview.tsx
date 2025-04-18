import React from "react";
import { motion } from "framer-motion";
import { Shield, Users, CreditCard, MessageSquare, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have this utility function
import { GlowingEffect } from "@/components/ui/glowing-effect"; // Assuming this component exists


const features = [
  {
    title: "Real-Time Occupancy",
    icon: Shield,
    description: "Live data showing which courts are open, how many players are present, and estimated wait times.",
    color: "orange",
    image: "https://images.unsplash.com/photo-1546519638-68e109acd27d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    features: [
      "Live court occupancy sensors",
      "Predicted peak times",
      "Court conditions and features"
    ]
  },
  {
    title: "Game Finding",
    icon: Users,
    description: "Join existing games or create your own. Filter by skill level, game type, and more.",
    color: "brown",
    image: "https://images.unsplash.com/photo-1529693662653-9d480530a697?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    features: [
      "Skill-level matching",
      "Game scheduling",
      "Player ratings and reviews"
    ]
  },
  {
    title: "Easy Day Passes",
    icon: CreditCard,
    description: "Purchase digital day passes for partner facilities directly through the app with no membership required.",
    color: "orange",
    image: "https://images.unsplash.com/photo-1511205451669-bc1e9dd0b590?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    features: [
      "One-click payments",
      "Digital entry passes",
      "Special discounts and offers"
    ]
  },
  {
    title: "Player Groups",
    icon: MessageSquare,
    description: "Create and join groups of players with similar schedules, skill levels, or location preferences.",
    color: "brown",
    image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    features: [
      "Group messaging",
      "Game scheduling",
      "Skill development tracking"
    ]
  }
];

export default function FeaturesOverview() {
  return (
    <section id="features" className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-hooper-orange/10 to-transparent rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-hooper-brown/10 to-transparent rounded-full blur-[120px] transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block rounded-full bg-gradient-to-r from-hooper-orange/20 to-hooper-brown/20 px-4 py-1.5 mb-4">
            <span className="text-sm font-medium tracking-wide text-hooper-orange">Feature-Packed</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Everything You Need to <span className="bg-gradient-to-r from-hooper-orange to-orange-400 bg-clip-text text-transparent">Hoop</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Find games, meet players, and never miss court time with our comprehensive set of features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
            />
          ))}
        </div>

        <motion.div
          className="mt-20 p-6 md:p-10 rounded-3xl bg-gradient-to-br from-black via-black to-hooper-dark-500 border border-white/5 shadow-xl relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Apply GlowingEffect to the bottom card as well */}
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to <span className="bg-gradient-to-r from-hooper-orange to-orange-400 bg-clip-text text-transparent">elevate</span> your game?</h3>
              <p className="text-gray-300 mb-6">
                Join thousands of players already using Hooper to find courts and games near them.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  className="bg-gradient-to-r from-hooper-orange to-hooper-brown text-white font-medium px-8 py-3 rounded-full hover:opacity-90 transition-all"
                  onClick={() => {
                    const emailSignupSection = document.querySelector("#email-signup");
                    if (emailSignupSection) {
                      emailSignupSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Get Early Access
                </button>
                <div className="relative inline-flex">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    className="rounded-full pointer-events-none"
                  />
                  <button
                    className="relative z-10 bg-white/5 border border-white/10 text-white font-medium px-8 py-3 rounded-full hover:bg-white/10 transition-all"
                    onClick={() => {
                      const partnersSection = document.querySelector("#partners");
                      if (partnersSection) {
                        partnersSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    Facility Partner?
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative w-40 h-40 md:w-48 md:h-48">
                <div className="absolute inset-0 bg-gradient-to-br from-hooper-orange to-hooper-brown rounded-full opacity-20 blur-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="url(#grad1)" strokeWidth="3" strokeDasharray="283" strokeDashoffset="100" />
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff6b00" /> {/* Assuming hooper-orange */}
                        <stop offset="100%" stopColor="#8b4513" /> {/* Assuming hooper-brown */}
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <div className="text-5xl font-bold text-white">4K+</div>
                    <div className="text-sm text-gray-300">Users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  feature: {
    title: string;
    icon: React.ElementType;
    description: string;
    color: string;
    image: string;
    features: string[];
  };
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const { title, icon: Icon, description, color, image, features } = feature;

  return (
    <motion.div
      // *** REMOVED overflow-hidden from the root element ***
      className="group relative rounded-3xl bg-hooper-dark-500/90 backdrop-blur-sm border border-white/5 shadow-xl transition-all hover:shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
    >
      {/* *** ADDED overflow-hidden AND rounded-3xl HERE ***
          This div now clips the background image to the card's shape */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center transition-all duration-1000 group-hover:scale-110 group-hover:opacity-30"
          style={{ backgroundImage: `url(${image})` }}
        />
        {/* Gradient overlay remains inside the clipping container */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
      </div>

      {/* Content remains relative with higher z-index */}
      <div className="relative z-20 p-6 md:p-8 h-full flex flex-col">
        <div className={cn(
          "w-12 h-12 rounded-full mb-6 flex items-center justify-center",
          color === "orange"
            ? "bg-gradient-to-br from-hooper-orange to-hooper-orange/60"
            : "bg-gradient-to-br from-hooper-brown to-hooper-brown/60"
        )}>
          <Icon className="h-6 w-6 text-white" />
        </div>

        <h3 className="text-2xl font-bold mb-3 transition-colors group-hover:bg-gradient-to-r group-hover:from-hooper-orange group-hover:via-orange-400 group-hover:to-orange-600 group-hover:bg-clip-text group-hover:text-transparent">
  {title}
</h3>
        <p className="text-gray-300 mb-8">{description}</p>

        <div className="mt-auto">
          <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-4">Key Benefits</h4>
          <ul className="space-y-3">
            {features.map((feature, i) => (
              <motion.li
                key={i}
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 + (i * 0.1) }}
              >
                <CheckCircle2
                  className={cn(
                    "h-5 w-5 mr-2 mt-0.5 flex-shrink-0",
                    color === "orange" ? "text-hooper-orange" : "text-hooper-brown"
                  )}
                />
                <span className="text-gray-200">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* GlowingEffect is positioned absolutely, below content (z-10) but above background.
          Since the PARENT motion.div no longer has overflow-hidden, the glow effect can render outside its bounds. */}
      <div className="absolute inset-0 z-10 rounded-3xl pointer-events-none">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
      </div>
    </motion.div>
  );
}