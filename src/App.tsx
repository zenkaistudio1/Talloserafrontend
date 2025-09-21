import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Main pages
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

// Company sub-pages
import CompanyOverview from "./pages/company/Overview";
import CompanyBoard from "./pages/company/Board";
import CompanyManagement from "./pages/company/Management";
import CompanyPolicies from "./pages/company/Policies";

// Downloads sub-pages
import Forms from "./pages/downloads/Forms";
import Reports from "./pages/downloads/Reports";
import Procurement from "./pages/downloads/Procurement";

// Gallery sub-pages
import GalleryPage from "./pages/gallery/GalleryPage";

// Notice-board sub-pages
import AnnouncementsPage from "./pages/notice-board/AnnouncementsPage";
import CareersNoticePage from "./pages/notice-board/CareersPage";
import NoticeBoardPage from "./pages/notice-board/NoticeBoardPage";
import TenderNoticesPage from "./pages/notice-board/TenderNoticesPage";

// ✅ Admin Panel
import AdminDashboard from "./components/admindashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background font-inter">
          <Routes>
            {/* Landing page */}
            <Route path="/" element={<HomePage />} />

            {/* Other pages */}
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Company */}
            <Route path="/company" element={<CompanyOverview />} />
            <Route path="/company/board" element={<CompanyBoard />} />
            <Route path="/company/management" element={<CompanyManagement />} />
            <Route path="/company/policies" element={<CompanyPolicies />} />

            {/* Downloads */}
            <Route path="/downloads/forms" element={<Forms />} />
            <Route path="/downloads/reports" element={<Reports />} />
            <Route path="/downloads/procurement" element={<Procurement />} />

            {/* Gallery */}
            <Route path="/gallery" element={<GalleryPage />} />

            {/* Notice-board */}
            <Route path="/notice-board/announcements" element={<AnnouncementsPage />} />
            <Route path="/notice-board/careers" element={<CareersNoticePage />} />
            <Route path="/notice-board" element={<NoticeBoardPage />} />
            <Route path="/notice-board/tenders" element={<TenderNoticesPage />} />

            {/* ✅ Admin Panel Nested Routes */}
            <Route path="/admin/*" element={<AdminDashboard />} />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
