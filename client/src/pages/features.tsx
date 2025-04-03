import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Helmet } from 'react-helmet';
import EmailSignup from "@/components/sections/email-signup";

const features = [
  {
    title: "Real-Time Monitoring",
    description: "See exactly how many courts are available before you arrive. Our sensors update every few minutes, showing occupancy, waiting players, and even game types in progress.",
    color: "orange"
  },
  {
    title: "Court Discovery",
    description: "Find new places to play in your area. Filter for indoor/outdoor, court quality, skill level, peak hours, and amenities like water fountains or bathrooms.",
    color: "blue"
  },
  {
    title: "Game Finding & Scheduling",
    description: "Join pickup games with players at your level or start your own. Public and private game options with skill filtering and simple RSVPs.",
    color: "purple"
  },
  {
    title: "Groups & Communication",
    description: "Create teams and communities of regular players. Organize games, message the group, and track meetups without juggling multiple apps.",
    color: "green"
  },
  {
    title: "Day Pass Integration",
    description: "Purchase digital passes for gyms and facilities directly through Hooper at special rates. No memberships required, just play when you want.",
    color: "orange"
  },
  {
    title: "Optional Profiles",
    description: "Track your game history, preferred courts, skill progression, and connect with other players in your area who match your style.",
    color: "blue"
  }
];

const futureFeatures = [
  {
    title: "Marketplace",
    description: "Buy, sell, or trade basketball gear within your local community of players.",
  },
  {
    title: "Skill Matching",
    description: "AI-powered matchmaking for finding players and games that perfectly match your skill level.",
  },
  {
    title: "League Tools",
    description: "Organize your own leagues with scheduling, stats tracking, and automated standings.",
  }
];

export default function Features() {
  return (
    <>
      <Helmet>
        <title>Hooper Features - Basketball Court Finding App</title>
        <meta name="description" content="Explore Hooper's features for finding basketball courts, joining games, and connecting with players in your area." />
      </Helmet>
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <BackgroundGradientAnimation containerClassName="w-full py-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Hooper Features</h1>
              <p className="text-xl text-hooper-dark-100 max-w-3xl mx-auto">
                Everything you need to find courts, join games, and never miss playing time.
              </p>
            </div>
          </BackgroundGradientAnimation>
          
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-hooper-dark-500 p-8 rounded-xl border border-hooper-dark-300 hover:border-hooper-dark-200 transition-all"
              >
                <h2 className="text-2xl font-bold mb-4">
                  <span className={`inline-block w-3 h-3 rounded-full ${
                    feature.color === "orange" 
                      ? "bg-hooper-orange" 
                      : feature.color === "blue" 
                      ? "bg-hooper-blue"
                      : feature.color === "purple"
                      ? "bg-purple-500"
                      : "bg-green-500"
                  } mr-2`}></span>
                  {feature.title}
                </h2>
                <p className="text-hooper-dark-100">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-24">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Coming Soon</h2>
              <p className="text-hooper-dark-100 mb-12">
                We're just getting started. Here's what's on our roadmap:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {futureFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-br from-hooper-dark-400 to-hooper-dark-500 p-6 rounded-xl border border-hooper-dark-300"
                >
                  <div className="flex items-center mb-4">
                    <svg className="w-6 h-6 text-hooper-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-hooper-dark-100">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <EmailSignup />
    </>
  );
}
