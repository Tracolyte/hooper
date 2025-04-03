import HeroSection from "@/components/sections/hero-section";
import ProblemSection from "@/components/sections/problem-section";
import SolutionSection from "@/components/sections/solution-section";
import FeaturesOverview from "@/components/sections/features-overview";
import EmailSignup from "@/components/sections/email-signup";
import { Helmet } from 'react-helmet';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Hooper - Find Basketball Courts & Games in Real-Time</title>
        <meta name="description" content="Hooper connects you to available basketball courts and pickup games nearby. Real-time occupancy data, easy day passes, and player networking in one app." />
      </Helmet>
      
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesOverview />
      <EmailSignup />
    </>
  );
}
