import React from "react";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import SailentFeaturesSection from "@/components/SailentFeatures";
import LogoMarquee from "@/components/LogoMarquee";
import FAQ from "@/components/FAQ";
import Others from "@/components/Others";
import AboutUsSection from "@/components/AboutUsSection";
import GlobalFixes from "@/components/GlobalFixes";
import WelcomePopup from "@/components/WelcomePopup";
import ProcessSection from "@/components/ProcessSection";
import Footer from "@/components/Footer";
import ProjectsSection from "@/components/ProjectProgressInHomePage";

const HomePage: React.FC = () => {
  return (
    <>
      <ScrollProgress />
      <Header />
      <WelcomePopup />
      <main>
        <Hero />
        <StatsSection />
        <LogoMarquee />
        <AboutUsSection />
        <SailentFeaturesSection />
        <Others />
        <ProcessSection />
        <FAQ/>
         <ProjectsSection />
         <Footer />
       
       
      </main>
      <GlobalFixes />
    </>
  );
};

export default HomePage;
