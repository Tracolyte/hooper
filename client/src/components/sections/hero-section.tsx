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
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-40 -right-40 w-[500px] h-[500px] bg-hooper-orange/10 rounded-full filter blur-[80px]"></div>
        <div className="absolute -bottom-20 -left-40 w-[500px] h-[500px] bg-hooper-brown/10 rounded-full filter blur-[80px]"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
              Find <span className="text-gradient">Basketball Courts</span> & Games in Real-Time
            </h1>
            <p className="text-lg md:text-xl text-hooper-dark-100 mb-8 max-w-3xl mx-auto">
              Hooper connects you to available courts and pickup games nearby. 
              Real-time occupancy data, easy day passes, and player networking in one app.
            </p>
          </div>
          
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
            <div className="absolute -inset-0.5 bg-gradient-to-r from-hooper-orange to-hooper-brown rounded-xl blur opacity-30"></div>
            <HeroParallax 
              imageUrl="https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              className="h-[500px] rounded-xl shadow-2xl overflow-hidden"
              overlayClassName="bg-gradient-to-t from-black via-black/70 to-transparent"
            >
              <div className="h-full"></div>
            </HeroParallax>
          </div>
        </div>
      </div>
    </section>
  );
}
