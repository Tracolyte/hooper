import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Button } from "@/components/ui/button";
import { HeroParallax } from "@/components/ui/hero-parallax";

export default function HeroSection() {
  const handleLearnMoreClick = () => {
    const problemSection = document.querySelector("#problem-section");
    if (problemSection) {
      problemSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const handleEarlyAccessClick = () => {
    const emailSignupSection = document.querySelector("#email-signup");
    if (emailSignupSection) {
      emailSignupSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-gradient pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-hooper-orange/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-20 -left-40 w-96 h-96 bg-hooper-blue/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <BackgroundGradientAnimation
            containerClassName="w-full h-auto"
            className="bg-transparent"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-300">
              Find <span className="bg-clip-text text-transparent bg-gradient-to-r from-hooper-orange to-hooper-blue">Basketball Courts</span> & Games in Real-Time
            </h1>
          </BackgroundGradientAnimation>
          <p className="text-lg md:text-xl text-hooper-dark-100 mb-8 max-w-3xl mx-auto">
            Hooper connects you to available courts and pickup games nearby. 
            Real-time occupancy data, easy day passes, and player networking in one app.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={handleEarlyAccessClick}
              className="button-gradient text-white px-8 py-3 h-auto rounded-md font-semibold hover:shadow-lg hover:shadow-hooper-orange/20 transition-all"
            >
              Get Early Access
            </Button>
            <Button
              onClick={handleLearnMoreClick}
              variant="outline"
              className="bg-hooper-dark-300 text-white border-hooper-dark-300 px-8 py-3 h-auto rounded-md font-semibold hover:bg-hooper-dark-400 transition-all"
            >
              Learn More
            </Button>
          </div>
          
          <div className="mt-16 relative">
            <HeroParallax 
              imageUrl="https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              className="h-[500px] rounded-xl shadow-2xl shadow-hooper-orange/5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
