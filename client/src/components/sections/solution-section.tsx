import { StickyScrollReveal } from "@/components/ui/sticky-scroll-reveal";

const solutionSteps = [
  {
    step: 1,
    title: "Partner Network",
    description: "We partner with gyms, rec centers, and parks to install occupancy sensors and integrate with their systems.",
    color: "orange",
  },
  {
    step: 2,
    title: "Real-Time Data",
    description: "View live court availability, occupancy levels, and scheduled games in your area.",
    color: "blue",
  },
  {
    step: 3,
    title: "One-Click Access",
    description: "Purchase day passes directly through Hooper, find games to join, or create your own.",
    color: "purple",
  },
  {
    step: 4,
    title: "Play & Connect",
    description: "Join the community, improve your game, and never miss court time again.",
    color: "green",
  },
];

export default function SolutionSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-black to-hooper-dark-500">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How Hooper Works</h2>
          <p className="text-hooper-dark-100 text-lg">
            Real-time data meets basketball community in one seamless experience.
          </p>
        </div>
        
        <StickyScrollReveal content={solutionSteps} />
      </div>
    </section>
  );
}
