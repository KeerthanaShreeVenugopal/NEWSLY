import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import NavigatorSection from "@/components/NavigatorSection";
import DashboardSection from "@/components/DashboardSection";
import StoryArcSection from "@/components/StoryArcSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <NavigatorSection />
      <DashboardSection />
      <StoryArcSection />
      <FooterSection />
    </div>
  );
};

export default Index;
