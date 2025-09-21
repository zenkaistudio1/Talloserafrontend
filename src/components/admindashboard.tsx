import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Routes, Route } from "react-router-dom";
import AdminHero from "./AdminHero"; // Hero slides management page
import AdminFAQ from "./AdminFAQ"; // FAQ management page
import AdminProjects from "./AdminProjects"; // Project Phases management page
import AdminFormPage from "./AdminFormPage"; // New Forms management page

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/dashboard")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          <Link
            to="/admin/dashboard"
            className="px-3 py-2 rounded hover:bg-gray-200 transition"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/hero-slides"
            className="px-3 py-2 rounded hover:bg-gray-200 transition"
          >
            Hero Slides
          </Link>
          <Link
            to="/admin/faqs"
            className="px-3 py-2 rounded hover:bg-gray-200 transition"
          >
            FAQs
          </Link>
          <Link
            to="/admin/projects"
            className="px-3 py-2 rounded hover:bg-gray-200 transition"
          >
            Projects
          </Link>
          <Link
            to="/admin/forms"
            className="px-3 py-2 rounded hover:bg-gray-200 transition"
          >
            Forms
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Routes>
          {/* Dashboard Home */}
          <Route
            path="/dashboard"
            element={
              <>
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                  Admin Dashboard
                </h1>

                {loading ? (
                  <p className="text-gray-500">Loading...</p>
                ) : stats ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Users Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                      <h2 className="text-lg font-semibold text-gray-600">
                        Total Users
                      </h2>
                      <p className="text-3xl font-bold text-blue-600 mt-2">
                        {stats.totalUsers}
                      </p>
                    </div>

                    {/* Orders Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                      <h2 className="text-lg font-semibold text-gray-600">
                        Total Orders
                      </h2>
                      <p className="text-3xl font-bold text-green-600 mt-2">
                        {stats.totalOrders}
                      </p>
                    </div>

                    {/* Revenue Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                      <h2 className="text-lg font-semibold text-gray-600">
                        Total Revenue
                      </h2>
                      <p className="text-3xl font-bold text-purple-600 mt-2">
                        ${stats.totalRevenue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-red-500">Failed to load stats</p>
                )}
              </>
            }
          />

          {/* Hero Slides Page */}
          <Route path="/hero-slides" element={<AdminHero />} />

          {/* FAQs Page */}
          <Route path="/faqs" element={<AdminFAQ />} />

          {/* Projects Page */}
          <Route path="/projects" element={<AdminProjects />} />

          {/* Forms Page */}
          <Route path="/forms" element={<AdminFormPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
