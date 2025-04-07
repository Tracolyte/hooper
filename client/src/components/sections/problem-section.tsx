import { Clock, Users, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const problems = [
  {
    icon: <Clock className="h-6 w-6 text-hooper-orange" />,
    title: "Court Availability",
    description: "Wasting time traveling to courts only to find them full or closed. No way to know occupancy before arriving.",
    gradient: "orange",
  },
  {
    icon: <Users className="h-6 w-6 text-hooper-brown" />,
    title: "Coordination Difficulty",
    description: "Group chats failing to organize players. No reliable way to find and join pickup games with the right skill level.",
    gradient: "brown",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-hooper-orange" />,
    title: "Streamlined Access",
    description: "Different payment systems for each gym. Membership barriers when you just want to play a single game.",
    gradient: "orange",
  },
];

export default function ProblemSection() {
  return (
    <section id="problem-section" className="py-20 md:py-28 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
            <span className="relative z-10">We Make it Easy</span>
            <motion.span 
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-hooper-orange to-hooper-brown/50"
            ></motion.span>
          </h2>
          <p className="text-gray-300 text-lg">
            Finding courts shouldn't be hard. Here's how we help:
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-black/40 p-8 rounded-xl hover:bg-white/5 transition-all duration-300 border border-white/10 backdrop-blur-sm relative"
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20, 
                  delay: 0.1 + index * 0.1 
                }}
                className={`w-14 h-14 mb-6 rounded-full bg-gradient-to-br ${
                  problem.gradient === "orange" 
                    ? "from-hooper-orange to-hooper-orange/50" 
                    : problem.gradient === "brown" 
                    ? "from-hooper-brown to-hooper-brown/50"
                    : "from-hooper-orange to-hooper-brown/50"
                } flex items-center justify-center shadow-lg`}
              >
                {problem.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
              <p className="text-gray-400">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
