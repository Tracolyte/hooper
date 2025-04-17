import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
    import { Helmet } from 'react-helmet';
    import EmailSignup from "@/components/sections/email-signup";
    import { motion } from "framer-motion";
    import { cn } from "@/lib/utils";
    import { GlowingEffect } from "@/components/ui/glowing-effect"; // Import GlowingEffect
    import { Shield, MapPin, Gamepad2, Users, CreditCard, UserCircle, Rocket, Coins, Puzzle } from 'lucide-react'; // Import potential icons

    // Mapping features to icons
    const featureIcons = {
      "Real-Time Monitoring": <Shield className="h-6 w-6 text-white" />,
      "Court Discovery": <MapPin className="h-6 w-6 text-white" />,
      "Game Finding & Scheduling": <Gamepad2 className="h-6 w-6 text-white" />,
      "Groups & Communication": <Users className="h-6 w-6 text-white" />,
      "Day Pass Integration": <CreditCard className="h-6 w-6 text-white" />,
      "Optional Profiles": <UserCircle className="h-6 w-6 text-white" />,
    };

    const features = [
      {
        title: "Real-Time Monitoring",
        description: "See exactly how many courts are available before you arrive. Our sensors update every few minutes, showing occupancy, waiting players, and even game types in progress.",
        color: "orange" as const,
        icon: featureIcons["Real-Time Monitoring"]
      },
      {
        title: "Court Discovery",
        description: "Find new places to play in your area. Filter for indoor/outdoor, court quality, skill level, peak hours, and amenities like water fountains or bathrooms.",
        color: "brown" as const, // Changed color for variety
        icon: featureIcons["Court Discovery"]
      },
      {
        title: "Game Finding & Scheduling",
        description: "Join pickup games with players at your level or start your own. Public and private game options with skill filtering and simple RSVPs.",
        color: "orange" as const, // Changed color for variety
        icon: featureIcons["Game Finding & Scheduling"]
      },
      {
        title: "Groups & Communication",
        description: "Create teams and communities of regular players. Organize games, message the group, and track meetups without juggling multiple apps.",
        color: "brown" as const,
        icon: featureIcons["Groups & Communication"]
      },
      {
        title: "Day Pass Integration",
        description: "Purchase digital passes for gyms and facilities directly through Hooper at special rates. No memberships required, just play when you want.",
        color: "orange" as const,
        icon: featureIcons["Day Pass Integration"]
      },
      {
        title: "Optional Profiles",
        description: "Track your game history, preferred courts, skill progression, and connect with other players in your area who match your style.",
        color: "brown" as const, // Changed color for variety
        icon: featureIcons["Optional Profiles"]
      }
    ];

    const futureFeatures = [
      {
        title: "Marketplace",
        description: "Buy, sell, or trade basketball gear within your local community of players.",
        icon: <Coins className="h-6 w-6 text-hooper-orange" />
      },
      {
        title: "Skill Matching",
        description: "AI-powered matchmaking for finding players and games that perfectly match your skill level.",
        icon: <Puzzle className="h-6 w-6 text-hooper-brown" />
      },
      {
        title: "League Tools",
        description: "Organize your own leagues with scheduling, stats tracking, and automated standings.",
        icon: <Rocket className="h-6 w-6 text-hooper-orange" />
      }
    ];

    export default function Features() {
      const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.1,
            duration: 0.5,
          },
        }),
        hover: {
          y: -5,
          scale: 1.02,
          transition: { duration: 0.3 }
        }
      };

      const getGradientClass = (color?: "orange" | "brown") => {
        switch (color) {
          case "orange":
            return "from-hooper-orange to-hooper-orange/50";
          case "brown":
            return "from-hooper-brown to-hooper-brown/50";
          default:
            return "from-hooper-orange to-hooper-brown/50"; // Default gradient
        }
      };

      return (
        <>
          <Helmet>
            <title>Hooper Features - Basketball Court Finding App</title>
            <meta name="description" content="Explore Hooper's features for finding basketball courts, joining games, and connecting with players in your area." />
          </Helmet>

          {/* Use standard padding and background like home page sections */}
          <div className="pt-32 pb-20 bg-black">
            <div className="container mx-auto px-4 md:px-6">
              {/* Removed BackgroundGradientAnimation, using simple text alignment */}
              <div className="text-center mb-20">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-hooper-orange to-orange-400 bg-clip-text text-transparent" // Added text gradient
                >
                  Hooper Features
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto" // Matched home page paragraph styling
                >
                  Everything you need to find courts, join games, and never miss playing time.
                </motion.p>
              </div>

              {/* Feature Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover" // Added hover animation
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                    // Card styling mimicking ProblemSection/FeaturesOverview cards
                    className="bg-black/40 p-6 md:p-8 rounded-xl hover:bg-white/5 transition-all duration-300 border border-white/10 backdrop-blur-sm relative"
                  >
                    <GlowingEffect // Added Glowing Effect
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                    />
                    {/* Icon styling similar to ProblemSection */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1 + index * 0.1
                      }}
                      viewport={{ once: true }}
                      className={cn(
                        `w-14 h-14 mb-6 rounded-full bg-gradient-to-br flex items-center justify-center shadow-lg`,
                        getGradientClass(feature.color)
                      )}
                    >
                      {feature.icon || <Shield className="h-6 w-6 text-white" />} {/* Fallback icon */}
                    </motion.div>
                    <h2 className="text-xl md:text-2xl font-bold mb-3 text-white">{feature.title}</h2>
                    <p className="text-gray-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Coming Soon Section - applying similar card styling */}
              <div className="mt-24 md:mt-32">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center max-w-3xl mx-auto"
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
                    <span className="relative z-10">Coming Soon</span>
                    <motion.span
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-hooper-orange to-hooper-brown/50"
                    ></motion.span>
                  </h2>
                  <p className="text-gray-300 text-lg mb-12 md:mb-16">
                    We're just getting started. Here's what's on our roadmap:
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {futureFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      custom={index + features.length} // Continue delay index
                      initial="hidden"
                      whileInView="visible"
                      whileHover="hover"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={cardVariants}
                      // Consistent card styling
                      className="bg-black/40 p-6 md:p-8 rounded-xl hover:bg-white/5 transition-all duration-300 border border-white/10 backdrop-blur-sm relative"
                    >
                       <GlowingEffect // Added Glowing Effect
                        spread={40}
                        glow={true}
                        disabled={false}
                        proximity={64}
                        inactiveZone={0.01}
                      />
                      <div className="flex items-center mb-4">
                         <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.1 + (index + features.length) * 0.1
                          }}
                          viewport={{ once: true }}
                          className={cn(
                            `w-12 h-12 mr-4 rounded-full bg-gradient-to-br flex items-center justify-center shadow-md`,
                            index % 2 === 0 ? getGradientClass("orange") : getGradientClass("brown") // Alternate gradient
                          )}
                        >
                           {feature.icon}
                        </motion.div>
                        <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                      </div>
                      <p className="text-gray-400">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <EmailSignup />
        </>
      );
    }