import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Placeholder components from user's request
const Navigation = () => (
  <nav className="p-4 bg-gray-800 text-white flex justify-center space-x-4">
    <Link to="/" className="hover:underline">Home</Link>
    <Link to="/services" className="hover:underline">Services</Link>
    <Link to="/projects" className="hover:underline">Projects</Link>
    <Link to="/resources" className="hover:underline">Resources</Link>
    <Link to="/careers" className="hover:underline">Careers</Link>
    <Link to="/news" className="hover:underline">News</Link>
    <Link to="/contact" className="hover:underline">Contact</Link>
    <Link to="/company" className="hover:underline">Company</Link>
    <Link to="/downloads/forms" className="hover:underline">Forms</Link>
    <Link to="/gallery" className="hover:underline">Gallery</Link>
    <Link to="/notice-board" className="hover:underline">Notice Board</Link>
  </nav>
);
const Hero = () => <div className="p-16 text-center text-4xl font-bold bg-gray-200">Hero Section</div>;
const About = () => <div className="p-16 text-center text-2xl bg-white">About Us Section</div>;
const Services = () => <div className="p-16 text-center text-2xl bg-gray-100">Services Section</div>;
const Projects = () => <div className="p-16 text-center text-2xl bg-white">Projects Section</div>;
const Resources = () => <div className="p-16 text-center text-2xl bg-gray-100">Resources Section</div>;
const Careers = () => <div className="p-16 text-center text-2xl bg-white">Careers Section</div>;
const News = () => <div className="p-16 text-center text-2xl bg-gray-100">News Section</div>;
const Contact = () => <div className="p-16 text-center text-2xl bg-white">Contact Section</div>;

// Main pages
const HomePage = () => (
  <>
    <Hero />
    <About />
    <Services />
    <Projects />
    <Resources />
    <Careers />
    <News />
    <Contact />
  </>
);
const AboutPage = () => <div className="p-8 text-center text-2xl font-bold">About Us Page Content</div>;
const ServicesPage = () => <div className="p-8 text-center text-2xl font-bold">Services Page Content</div>;
const ProjectsPage = () => <div className="p-8 text-center text-2xl font-bold">Projects Page Content</div>;
const ResourcesPage = () => <div className="p-8 text-center text-2xl font-bold">Resources Page Content</div>;
const CareersPage = () => <div className="p-8 text-center text-2xl font-bold">Careers Page Content</div>;
const NewsPage = () => <div className="p-8 text-center text-2xl font-bold">News Page Content</div>;
const ContactPage = () => <div className="p-8 text-center text-2xl font-bold">Contact Page Content</div>;
const NotFound = () => <div className="p-8 text-center text-2xl font-bold">404 - Page Not Found</div>;

// Company sub-pages
const CompanyOverview = () => <div className="p-8 text-center text-2xl font-bold">Company Overview Page Content</div>;
const CompanyBoard = () => <div className="p-8 text-center text-2xl font-bold">Company Board Page Content</div>;
const CompanyManagement = () => <div className="p-8 text-center text-2xl font-bold">Company Management Page Content</div>;
const CompanyPolicies = () => <div className="p-8 text-center text-2xl font-bold">Company Policies Page Content</div>;

// Downloads sub-pages
const Forms = () => <div className="p-8 text-center text-2xl font-bold">Forms Page Content</div>;
const Reports = () => <div className="p-8 text-center text-2xl font-bold">Reports Page Content</div>;
const Procurement = () => <div className="p-8 text-center text-2xl font-bold">Procurement Page Content</div>;

// Gallery sub-pages
const GalleryPage = () => <div className="p-8 text-center text-2xl font-bold">Gallery Page Content</div>;

// Notice-board sub-pages
const AnnouncementsPage = () => <div className="p-8 text-center text-2xl font-bold">Announcements Page Content</div>;
const CareersNoticePage = () => <div className="p-8 text-center text-2xl font-bold">Careers Notice Page Content</div>;
const NoticeBoardPage = () => <div className="p-8 text-center text-2xl font-bold">Notice Board Page Content</div>;
const TenderNoticesPage = () => <div className="p-8 text-center text-2xl font-bold">Tender Notices Page Content</div>;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background font-inter">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />

            {/* company */}
            <Route path="/company" element={<CompanyOverview />} />
            <Route path="/company/board" element={<CompanyBoard />} />
            <Route path="/company/management" element={<CompanyManagement />} />
            <Route path="/company/policies" element={<CompanyPolicies />} />

            {/* downloads */}
            <Route path="/downloads/forms" element={<Forms />} />
            <Route path="/downloads/reports" element={<Reports />} />
            <Route path="/downloads/procurement" element={<Procurement />} />

            {/* gallery */}
            <Route path="/gallery" element={<GalleryPage />} />

            {/* notice-board */}
            <Route path="/notice-board/announcements" element={<AnnouncementsPage />} />
            <Route path="/notice-board/careers" element={<CareersNoticePage />} />
            <Route path="/notice-board" element={<NoticeBoardPage />} />
            <Route path="/notice-board/tenders" element={<TenderNoticesPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
