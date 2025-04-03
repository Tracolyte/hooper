import { Shield, Users, CreditCard, MessageSquare } from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";

const features = [
  {
    title: "Real-Time Occupancy",
    icon: <Shield className="h-6 w-6 text-white" />,
    description: "Live data showing which courts are open, how many players are present, and estimated wait times.",
    gradient: "orange",
    features: [
      "Live court occupancy sensors",
      "Predicted peak times",
      "Court conditions and features"
    ]
  },
  {
    title: "Game Finding",
    icon: <Users className="h-6 w-6 text-white" />,
    description: "Join existing games or create your own. Filter by skill level, game type, and more.",
    gradient: "brown",
    features: [
      "Skill-level matching",
      "Game scheduling",
      "Player ratings and reviews"
    ]
  },
  {
    title: "Easy Day Passes",
    icon: <CreditCard className="h-6 w-6 text-white" />,
    description: "Purchase digital day passes for partner facilities directly through the app with no membership required.",
    gradient: "orange",
    features: [
      "One-click payments",
      "Digital entry passes",
      "Special discounts and offers"
    ]
  },
  {
    title: "Player Groups",
    icon: <MessageSquare className="h-6 w-6 text-white" />,
    description: "Create and join groups of players with similar schedules, skill levels, or location preferences.",
    gradient: "brown",
    features: [
      "Group messaging",
      "Game scheduling",
      "Skill development tracking"
    ]
  }
];

export default function FeaturesOverview() {
  return (
    <section id="features" className="py-20 md:py-28 bg-hooper-dark-500">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Key Features</h2>
          <p className="text-hooper-dark-100 text-lg">
            Everything you need to find games, meet players, and never miss court time.
          </p>
        </div>
        
        <BentoGrid>
          {features.map((feature, index) => (
            <BentoCard
              key={index}
              title={feature.title}
              icon={feature.icon}
              description={feature.description}
              gradient={feature.gradient as any}
              features={feature.features}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
