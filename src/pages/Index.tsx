import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Resources from '@/components/Resources';
import Careers from '@/components/Careers';
import News from '@/components/News';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Resources />
      <Careers />
      <News />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
