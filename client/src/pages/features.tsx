import { Helmet } from 'react-helmet';
import EmailSignup from "@/components/sections/email-signup";
import { motion } from "framer-motion"; // Keep motion for other elements
import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect"; // Keep GlowingEffect
import { Shield, MapPin, Gamepad2, Users, CreditCard, UserCircle, Rocket, Coins, Puzzle } from 'lucide-react';

// Import the new Carousel components
import { Carousel, Card as AppleCard, BlurImage, Card as AppleCardType } from "@/components/ui/apple-cards-carousel"; // Renamed Card import to avoid naming conflict if needed

// Mapping features to icons (still needed for modal content)
const featureIcons = {
    "Real-Time Monitoring": <Shield className="h-8 w-8 text-white" />, // Slightly larger for modal
    "Court Discovery": <MapPin className="h-8 w-8 text-white" />,
    "Game Finding & Scheduling": <Gamepad2 className="h-8 w-8 text-white" />,
    "Groups & Communication": <Users className="h-8 w-8 text-white" />,
    "Day Pass Integration": <CreditCard className="h-8 w-8 text-white" />,
    "Optional Profiles": <UserCircle className="h-8 w-8 text-white" />,
};

// Define the feature data (keep original structure for clarity)
const featuresData = [
    {
        title: "Real-Time Monitoring",
        description: "See exactly how many courts are available before you arrive. Our sensors update every few minutes, showing occupancy, waiting players, and even game types in progress.",
        color: "orange" as const,
        icon: featureIcons["Real-Time Monitoring"],
        // Add a placeholder image source for the Carousel Card
        imageSrc: "https://images.unsplash.com/photo-1610704137054-551a6a87ba20?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Example basketball court image
    },
    {
        title: "Court Discovery",
        description: "Find new places to play in your area. Filter for indoor/outdoor, court quality, skill level, peak hours, and amenities like water fountains or bathrooms.",
        color: "brown" as const,
        icon: featureIcons["Court Discovery"],
        imageSrc: "./public/outdoor-court.png" // Example outdoor court
    },
    {
        title: "Game Finding & Scheduling",
        description: "Join pickup games with players at your level or start your own. Public and private game options with skill filtering and simple RSVPs.",
        color: "orange" as const,
        icon: featureIcons["Game Finding & Scheduling"],
        imageSrc: "https://images.unsplash.com/photo-1602105155315-077e218d8654?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Example action shot
    },
    {
        title: "Groups & Communication",
        description: "Create teams and communities of regular players. Organize games, message the group, and track meetups without juggling multiple apps.",
        color: "brown" as const,
        icon: featureIcons["Groups & Communication"],
        imageSrc: "https://images.pexels.com/photos/4863981/pexels-photo-4863981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // Example team huddle
    },
    {
        title: "Day Pass Integration",
        description: "Purchase digital passes for gyms and facilities directly through Hooper at special rates. No memberships required, just play when you want.",
        color: "orange" as const,
        icon: featureIcons["Day Pass Integration"],
        imageSrc: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Example gym interior
    },
    {
        title: "Optional Profiles",
        description: "Track your game history, preferred courts, skill progression, and connect with other players in your area who match your style.",
        color: "brown" as const,
        icon: featureIcons["Optional Profiles"],
        imageSrc: "./public/profiles.jpg" // Example player profile idea
    }
];

// Future features remain the same for the grid below
const futureFeatures = [
    {
        title: "Marketplace",
        description: "Buy, sell, or trade basketball gear within your local community of players.",
        icon: <Coins className="h-6 w-6 text-white" />
    },
    {
        title: "Skill Matching",
        description: "AI-powered matchmaking for finding players and games that perfectly match your skill level.",
        icon: <Puzzle className="h-6 w-6 text-white" />
    },
    {
        title: "League Tools",
        description: "Organize your own leagues with scheduling, stats tracking, and automated standings.",
        icon: <Rocket className="h-6 w-6 text-white" />
    }
];


// Helper function for icon background gradient (still needed for modal)
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


export default function Features() {

    // --- PREPARE DATA FOR CAROUSEL ---
    // Transform featuresData into the format expected by AppleCard
    const carouselCardData: AppleCardType[] = featuresData.map((feature) => ({
        src: feature.imageSrc, // Use the added image source
        title: feature.title,
        category: "Hooper Feature", // Define a category for the card subtitle
        content: ( // Define the content for the modal view
            <div className="flex flex-col md:flex-row items-start gap-6 text-neutral-600 dark:text-neutral-400">
                {/* Icon Display in Modal */}
                <div className="flex-shrink-0"> {/* Prevent icon container from shrinking */}
                    <div className={cn(
                        `w-16 h-16 mb-4 md:mb-0 rounded-full bg-gradient-to-br flex items-center justify-center shadow-lg`,
                        getGradientClass(feature.color)
                    )}>
                        {/* Clone element to potentially modify props if needed, or just render directly */}
                        {feature.icon}
                    </div>
                </div>
                {/* Description in Modal */}
                <p className="text-base md:text-lg">{feature.description}</p>
            </div>
        )
    }));

    // --- CREATE CAROUSEL ITEMS (JSX Elements with Glowing Effect) ---
    const carouselElements = carouselCardData.map((cardData, index) => (
        // Wrapper div for applying GlowingEffect around each card
        // NOTE: Positioning might need adjustments depending on GlowingEffect's implementation details
        // to ensure it doesn't interfere with card interactions.
        <div key={`carousel-item-${index}`} className="relative group">
            {/* Apply Glowing Effect Here */}
            <GlowingEffect
                // Apply effect properties
                spread={40}
                borderWidth={2}
                glow={true}
                disabled={false}
                proximity={80} // Adjusted proximity slightly
                inactiveZone={0.05}
                // Add className to potentially help with positioning or targeting
                // The rounded-3xl ensures the glow follows the card shape
                className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            {/* Render the AppleCard component, passing the transformed data */}
            {/* layout={true} enables the smooth animation */}
            <AppleCard card={cardData} index={index} layout={true} />
        </div>
    ));

    // Card Variants for "Coming Soon" section (can keep this separate)
    const futureCardVariants = {
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

    return (
        <>
            <Helmet>
                <title>Hooper Features - Basketball Court Finding App</title>
                <meta name="description" content="Explore Hooper's features for finding basketball courts, joining games, and connecting with players in your area." />
            </Helmet>

            <div className="pt-32 pb-20 bg-black">
                <div className="container mx-auto px-4 md:px-6">
                    {/* --- HERO SECTION --- */}
                    <div className="text-center"> {/* Adjusted margin */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6" // Ensure base text color is white or similar
                            >
                              The{" "}
                              <span className="bg-gradient-to-r from-hooper-orange via-orange-500 to-orange-600 bg-clip-text text-transparent">
                                Hooper
                              </span> Advantage

                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-lg md:text-2xl text-gray-300 max-w-4xl mx-auto"
                        >
                            Everything you need to find courts, join games, and never miss playing time.
                        </motion.p>
                    </div>

                    {/* --- FEATURE CAROUSEL --- */}
                    {/* Render the Carousel component, passing the generated elements */}
                    <div className="mb-24 md:mb-32"> {/* Add margin below carousel */}
                        <Carousel items={carouselElements} />
                    </div>


                    {/* --- COMING SOON SECTION (Remains largely the same) --- */}
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
                                    custom={index} // Use simple index for delay
                                    initial="hidden"
                                    whileInView="visible"
                                    whileHover="hover"
                                    viewport={{ once: true, amount: 0.3 }}
                                    variants={futureCardVariants} // Use specific variants for this section
                                    // Consistent card styling
                                    className="bg-black/40 p-6 md:p-8 rounded-xl hover:bg-white/5 transition-all duration-300 border border-white/10 backdrop-blur-sm relative"
                                >
                                    {/* You can also add GlowingEffect here if desired */}
                                    {/* <GlowingEffect ... /> */}
                                    <div className="flex items-center mb-4">
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

// Make sure BlurImage is also exported from apple-carousel.tsx if it's not already
// Or import it separately if it's in its own file.
// The AppleCard component uses BlurImage internally.