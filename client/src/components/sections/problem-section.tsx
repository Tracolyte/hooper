import { Clock, Users, CreditCard } from "lucide-react";

const problems = [
  {
    icon: <Clock className="h-6 w-6 text-white" />,
    title: "Court Availability",
    description: "Wasting time traveling to courts only to find them full or closed. No way to know occupancy before arriving.",
    gradient: "orange",
  },
  {
    icon: <Users className="h-6 w-6 text-white" />,
    title: "Coordination Difficulty",
    description: "Group chats failing to organize players. No reliable way to find and join pickup games with the right skill level.",
    gradient: "blue",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-white" />,
    title: "Fragmented Access",
    description: "Different payment systems for each gym. Membership barriers when you just want to play a single game.",
    gradient: "purple",
  },
];

export default function ProblemSection() {
  return (
    <section id="problem-section" className="py-20 md:py-28 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The Basketball Problem</h2>
          <p className="text-hooper-dark-100 text-lg">
            Finding a place to play shouldn't be this hard. Here's what we're solving:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div key={index} className="bg-hooper-dark-500 p-8 rounded-xl hover:bg-hooper-dark-400 transition-all duration-300 border border-hooper-dark-300">
              <div className={`w-14 h-14 mb-6 rounded-full bg-gradient-to-br ${
                problem.gradient === "orange" 
                  ? "from-hooper-orange to-hooper-orange/50" 
                  : problem.gradient === "blue" 
                  ? "from-hooper-blue to-hooper-blue/50"
                  : "from-purple-500 to-purple-500/50"
              } flex items-center justify-center`}>
                {problem.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
              <p className="text-hooper-dark-100">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
