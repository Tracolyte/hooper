import { StickyScrollReveal } from "@/components/ui/sticky-scroll-reveal";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";
import { cn } from "@/lib/utils";

const solutionSteps = [
  {
    step: 1,
    title: "Partner Network",
    description: "We partner with gyms, rec centers, and parks to install occupancy sensors and integrate with their systems.",
    color: "orange" as const,
  },
  {
    step: 2,
    title: "Real-Time Data",
    description: "View live court availability, occupancy levels, and scheduled games in your area.",
    color: "brown" as const,
  },
  {
    step: 3,
    title: "One-Click Access",
    description: "Purchase day passes directly through Hooper, find games to join, or create your own.",
    color: "orange" as const,
  },
  {
    step: 4,
    title: "Play & Connect",
    description: "Join the community, improve your game, and never miss court time again.",
    color: "brown" as const,
  },
];

export default function SolutionSection() {
  const { theme } = useTheme();

  return (
    <section className={cn(
      "py-20 md:py-28 transition-colors duration-300",
      theme === 'dark' ? "bg-black" : "bg-white"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold mb-6 relative inline-block transition-colors",
            theme === 'dark' ? "text-white" : "text-gray-900"
          )}>
            <span className="relative z-10">How Hooper Works</span>
            <motion.span 
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-hooper-orange to-hooper-brown/50"
            ></motion.span>
          </h2>
          <p className={cn(
            "text-lg transition-colors",
            theme === 'dark' ? "text-gray-300" : "text-gray-600"
          )}>
            Real-time data meets basketball community in one seamless experience.
          </p>
        </motion.div>
        
        <StickyScrollReveal content={solutionSteps} />
      </div>
    </section>
  );
}
