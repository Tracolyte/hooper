import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import PartnersSection from "@/components/sections/partners-section";
import { Helmet } from 'react-helmet';

const howItWorks = [
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

export default function Partners() {
  return (
    <>
      <Helmet>
        <title>Hooper for Partners - Facility Management & Insights</title>
        <meta name="description" content="Partner with Hooper to increase revenue and utilization at your basketball courts. Get valuable insights and reach more players." />
      </Helmet>
      
      <div className="pt-32 pb-20 bg-black">
        <BackgroundGradientAnimation containerClassName="w-full">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Increase Utilization, Revenue, and Insights
            </h1>
            <p className="text-xl text-hooper-dark-100 max-w-3xl mx-auto">
              Join our network of partner facilities and connect with basketball players looking for places to play.
            </p>
          </div>
        </BackgroundGradientAnimation>
        
        <div className="container mx-auto px-4 md:px-6 mt-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How It Works</h2>
            
            <div className="space-y-8">
              {howItWorks.map((step, index) => (
                <div key={index} className="bg-hooper-dark-500 p-6 rounded-xl border border-hooper-dark-300 relative overflow-hidden">
                  <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-hooper-orange via-hooper-blue to-purple-500"></div>
                  <div className="pl-4">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-hooper-dark-400 flex items-center justify-center text-lg font-bold mr-3">
                        {step.step}
                      </div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-hooper-dark-100 ml-11">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <PartnersSection />
    </>
  );
}
