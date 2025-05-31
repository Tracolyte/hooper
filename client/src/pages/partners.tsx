"use client"; // Assuming this page component can be a client component for framer-motion

import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import PartnersSectionComponent from "@/components/sections/partners-section"; // Renamed import
import { Helmet } from 'react-helmet';
import { motion } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const howItWorksData = [
  {
    step: 1,
    title: "Initial Contact",
    description: "Submit your interest through our partner form. Our team will reach out to discuss how Hooper can work with your facility."
  },
  {
    step: 2,
    title: "Partnership Agreement",
    description: "We'll work together to create a custom plan that fits your facility's needs, including revenue shares and marketing opportunities."
  },
  {
    step: 3,
    title: "Simple Installation",
    description: "Our team handles the quick installation of occupancy sensors and integration with your existing systems."
  },
  {
    step: 4,
    title: "Go Live",
    description: "Your facility appears in the Hooper app, bringing new players, enhanced data insights, and increased utilization."
  }
];

// Card variants similar to those in PartnersSectionComponent for consistency
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ // Accepts custom prop 'i' for stagger
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
  hover: {
    y: -5,
    scale: 1.02, // Slight scale effect on hover
    transition: { duration: 0.3 }
  }
};

export default function PartnersPage() {
  return (
    <>
      <Helmet>
        <title>Hooper for Partners - Facility Management & Insights</title>
        <meta name="description" content="Partner with Hooper to increase revenue and utilization at your basketball courts. Get valuable insights and reach more players." />
      </Helmet>
      
      <section className="relative pt-32 pb-20 md:pb-32 bg-black overflow-hidden">
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
          {/* Header Part */}
          <div className="text-center mb-20 md:mb-28">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              <span className="bg-gradient-to-r from-hooper-orange to-orange-400 bg-clip-text text-transparent">Increase</span> Utilization, Revenue, and Insights
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Join our network of partner facilities and connect with basketball players looking for places to play.
            </motion.p>
          </div>

          {/* How It Works Part */}
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold mb-12 md:mb-16 text-center"
            >
              <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent">How It Works</span>
            </motion.h2>
            
            <div className="space-y-8 md:space-y-10">
              {howItWorksData.map((step, index) => (
                <motion.div
                  key={step.step}
                  custom={index} // Used by variants for staggered delay
                  initial="hidden"
                  whileInView="visible" // Animates when card comes into view
                  whileHover="hover"    // Hover animation
                  viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% of card is visible
                  variants={cardVariants}
                  className="group relative rounded-3xl bg-black/80 backdrop-blur-sm border border-white/10 shadow-xl transition-all hover:shadow-2xl hover:shadow-hooper-orange/20"
                >
                  <GlowingEffect
                    spread={30} // Adjusted spread
                    glow={true}
                    disabled={false}
                    proximity={60} // Adjusted proximity
                    inactiveZone={0.1}
                    className="rounded-3xl" // Ensure glow effect matches card rounding
                  />
                  
                  <div className="relative z-10 p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center">
                    <motion.div
                      // Animate step number similar to icons in benefit cards
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.2 + index * 0.1 // Stagger slightly after card appears
                      }}
                      viewport={{ once: true }}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full mr-4 sm:mr-6 flex-shrink-0 flex items-center justify-center shadow-lg bg-gradient-to-br from-hooper-orange to-hooper-orange/70 mb-4 sm:mb-0"
                      // Using Hooper Orange gradient for the step circle
                    >
                      <span className="text-xl md:text-2xl font-bold text-white">{step.step}</span>
                    </motion.div>

                    <div className="flex-grow">
                      <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 group-hover:text-hooper-orange transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* The form section from PartnersSection.tsx */}
      <PartnersSectionComponent /> 
    </>
  );
}