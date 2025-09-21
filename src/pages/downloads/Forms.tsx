import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Download, FileText, Calendar, Filter, X } from 'lucide-react';
import { Header, Footer, ScrollProgress, GlobalFixes } from "../../components/site-chrome";

interface FormItem {
  _id: string;
  name: string;
  description: string;
  category: string;
  fileUrl: string;
  fileSize: number; // backend sends number (bytes)
  lastUpdated: string;
  downloads: number;
}

const categories = ['All', 'HR', 'Procurement', 'Finance', 'Safety', 'Operations'];

const FormsPage = () => {
  const [forms, setForms] = useState<FormItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch forms from backend
  const fetchForms = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/forms');
      setForms(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const filteredForms = forms.filter(form => {
    const matchesSearch =
      form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || form.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      HR: 'bg-blue-100 text-blue-800',
      Procurement: 'bg-green-100 text-green-800',
      Finance: 'bg-purple-100 text-purple-800',
      Safety: 'bg-red-100 text-red-800',
      Operations: 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <GlobalFixes />
      <ScrollProgress />
      <Header />

      <main className="min-h-[60vh]">
        <section className="mx-auto max-w-7xl px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Company Forms</h1>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Access all essential forms for applications, requests, and company processes. 
              All forms are available for immediate download in PDF format.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search forms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-5 w-5" />
                Filters
                {selectedCategory !== 'All' && (
                  <span className="bg-blue-500 text-white rounded-full w-2 h-2"></span>
                )}
              </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {filteredForms.length} of {forms.length} forms
            </p>
            {(searchTerm || selectedCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <X className="h-4 w-4" />
                Clear filters
              </button>
            )}
          </div>

          {/* Forms Grid */}
          {loading ? (
            <p className="text-center text-gray-600 py-12">Loading forms...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredForms.map(form => (
                <div
                  key={form._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 group"
                >
                  {/* Category Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(form.category)}`}>
                      {form.category}
                    </span>
                    <FileText className="h-6 w-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>

                  {/* Form Info */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {form.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {form.description}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Updated {new Date(form.lastUpdated).toLocaleDateString()}
                    </div>
                    <span>{(form.fileSize / 1024).toFixed(2)} KB</span>
                  </div>

                  {/* Download Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{form.downloads.toLocaleString()} downloads</span>
                    <span>PDF</span>
                  </div>

                  {/* Download Button */}
                  <a
                    href={form.fileUrl}
                    className="flex items-center justify-center gap-2 w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                    download
                  >
                    <Download className="h-4 w-4" />
                    Download Form
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && filteredForms.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No forms found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View all forms
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default FormsPage;
