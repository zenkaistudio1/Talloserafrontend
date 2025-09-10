import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ProjectsPage from "./pages/ProjectsPage";
import ResourcesPage from "./pages/ResourcesPage";
import CareersPage from "./pages/CareersPage";
import NewsPage from "./pages/NewsPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

// company
import CompanyOverview from "./pages/company/Overview";
import CompanyBoard from "./pages/company/Board";
import CompanyManagement from "./pages/company/Management";
import CompanyPolicies from "./pages/company/Policies";

// downloads
import Forms from "./pages/downloads/Forms";
import Reports from "./pages/downloads/Reports";
import Procurement from "./pages/downloads/Procurement";

// gallery
import GalleryPage from "./pages/gallery/GalleryPage";

// notice-board
import AnnouncementsPage from "./pages/notice-board/AnnouncementsPage";
import CareersNoticePage from "./pages/notice-board/CareersPage";
import NoticeBoardPage from "./pages/notice-board/NoticeBoardPage";
import TenderNoticesPage from "./pages/notice-board/TenderNoticesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background font-inter">
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
