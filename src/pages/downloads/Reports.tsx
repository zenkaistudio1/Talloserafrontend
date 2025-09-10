import React, { useState } from 'react';
import { Search, Download, FileText, Calendar, TrendingUp, BarChart, Filter, X, Eye } from 'lucide-react';
import { Header, Footer, ScrollProgress, GlobalFixes } from "../../components/site-chrome";

interface ReportItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'annual' | 'quarterly' | 'monthly' | 'special';
  publishDate: string;
  period: string;
  fileUrl: string;
  fileSize: string;
  downloads: number;
  featured: boolean;
  pages: number;
}

const reports: ReportItem[] = [
  {
    id: '1',
    title: 'Annual Report 2023',
    description: 'A comprehensive review of company performance, sustainability initiatives, financial highlights, and strategic achievements throughout 2023.',
    category: 'Annual',
    type: 'annual',
    publishDate: '2024-03-15',
    period: '2023',
    fileUrl: '/files/annual-report-2023.pdf',
    fileSize: '2.8 MB',
    downloads: 3456,
    featured: true,
    pages: 84
  },
  {
    id: '2',
    title: 'Q4 2023 Financial Report',
    description: 'Detailed financial analysis covering Q4 2023 performance, revenue growth, operational efficiency, and market position.',
    category: 'Financial',
    type: 'quarterly',
    publishDate: '2024-01-30',
    period: 'Q4 2023',
    fileUrl: '/files/q4-2023-financial.pdf',
    fileSize: '1.2 MB',
    downloads: 2134,
    featured: false,
    pages: 32
  },
  {
    id: '3',
    title: 'Q1 2024 Progress Report',
    description: 'First quarter highlights including project milestones, safety achievements, environmental compliance, and operational updates.',
    category: 'Operational',
    type: 'quarterly',
    publishDate: '2024-04-15',
    period: 'Q1 2024',
    fileUrl: '/files/q1-2024-progress.pdf',
    fileSize: '1.8 MB',
    downloads: 1892,
    featured: true,
    pages: 28
  },
  {
    id: '4',
    title: 'Sustainability Report 2023',
    description: 'Environmental impact assessment, carbon footprint analysis, renewable energy contributions, and sustainability initiatives.',
    category: 'Sustainability',
    type: 'annual',
    publishDate: '2024-02-20',
    period: '2023',
    fileUrl: '/files/sustainability-2023.pdf',
    fileSize: '3.1 MB',
    downloads: 1567,
    featured: true,
    pages: 56
  },
  {
    id: '5',
    title: 'Q2 2024 Safety Report',
    description: 'Comprehensive safety performance metrics, incident analysis, training programs, and safety improvement initiatives.',
    category: 'Safety',
    type: 'quarterly',
    publishDate: '2024-07-15',
    period: 'Q2 2024',
    fileUrl: '/files/q2-2024-safety.pdf',
    fileSize: '945 KB',
    downloads: 987,
    featured: false,
    pages: 24
  },
  {
    id: '6',
    title: 'Technology Innovation Report 2024',
    description: 'Latest technological advancements, digital transformation initiatives, R&D investments, and future technology roadmap.',
    category: 'Technology',
    type: 'special',
    publishDate: '2024-06-10',
    period: '2024',
    fileUrl: '/files/tech-innovation-2024.pdf',
    fileSize: '2.2 MB',
    downloads: 1234,
    featured: false,
    pages: 42
  }
];

const categories = ['All', 'Annual', 'Financial', 'Operational', 'Sustainability', 'Safety', 'Technology'];
const types = ['All', 'annual', 'quarterly', 'monthly', 'special'];

const ReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || report.category === selectedCategory;
    const matchesType = selectedType === 'All' || report.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const featuredReports = reports.filter(report => report.featured);

  const getCategoryColor = (category: string) => {
    const colors = {
      Annual: 'bg-blue-100 text-blue-800',
      Financial: 'bg-green-100 text-green-800',
      Operational: 'bg-orange-100 text-orange-800',
      Sustainability: 'bg-emerald-100 text-emerald-800',
      Safety: 'bg-red-100 text-red-800',
      Technology: 'bg-purple-100 text-purple-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      annual: BarChart,
      quarterly: TrendingUp,
      monthly: Calendar,
      special: FileText
    };
    return icons[type as keyof typeof icons] || FileText;
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
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Company Reports</h1>
      <p className="text-base text-gray-600 max-w-3xl mx-auto">
        Access our comprehensive reports covering financial performance, operational updates, 
        sustainability initiatives, and strategic insights across all business areas.
      </p>
    </div>
 


          {/* Featured Reports Section */}
          {featuredReports.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-blue-500" />
                Featured Reports
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredReports.slice(0, 3).map(report => {
                  const TypeIcon = getTypeIcon(report.type);
                  return (
                    <div
                      key={report.id}
                      className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-sm border border-blue-200 p-6 hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(report.category)}`}>
                          {report.category}
                        </span>
                        <TypeIcon className="h-6 w-6 text-blue-500 group-hover:text-blue-600 transition-colors" />
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {report.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {report.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>{new Date(report.publishDate).toLocaleDateString()}</span>
                        <span>{report.fileSize} • {report.pages} pages</span>
                      </div>

                      <div className="flex gap-2">
                        <a
                          href={report.fileUrl}
                          className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
                          download
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </a>
                        <button className="flex items-center justify-center gap-2 border border-blue-300 text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reports</p>
                  <p className="text-2xl font-bold text-blue-600">{reports.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-green-600">{categories.length - 1}</p>
                </div>
                <BarChart className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {reports.reduce((sum, report) => sum + report.downloads, 0).toLocaleString()}
                  </p>
                </div>
                <Download className="h-8 w-8 text-purple-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Latest Update</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {new Date(Math.max(...reports.map(r => new Date(r.publishDate).getTime()))).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              
              {/* View Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-3 text-sm font-medium transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-3 text-sm font-medium transition-colors ${
                    viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  List
                </button>
              </div>
              
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-5 w-5" />
                Filters
                {(selectedCategory !== 'All' || selectedType !== 'All') && (
                  <span className="bg-blue-500 text-white rounded-full w-2 h-2"></span>
                )}
              </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <div className="flex flex-wrap gap-2">
                    {types.map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                          selectedType === type
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {filteredReports.length} of {reports.length} reports
            </p>
            {(searchTerm || selectedCategory !== 'All' || selectedType !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedType('All');
                }}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <X className="h-4 w-4" />
                Clear filters
              </button>
            )}
          </div>

          {/* Reports Display */}
          {viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map(report => {
                const TypeIcon = getTypeIcon(report.type);
                return (
                  <div
                    key={report.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(report.category)}`}>
                        {report.category}
                      </span>
                      <TypeIcon className="h-6 w-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {report.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {report.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>{new Date(report.publishDate).toLocaleDateString()}</span>
                      <span>{report.fileSize} • {report.pages} pages</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>{report.downloads.toLocaleString()} downloads</span>
                      <span className="capitalize">{report.type}</span>
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={report.fileUrl}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
                        download
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </a>
                      <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-600 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReports.map(report => {
                const TypeIcon = getTypeIcon(report.type);
                return (
                  <div
                    key={report.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(report.category)}`}>
                            {report.category}
                          </span>
                          <TypeIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <p className="text-gray-600 mb-3">{report.description}</p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <span>{new Date(report.publishDate).toLocaleDateString()}</span>
                          <span>{report.fileSize}</span>
                          <span>{report.pages} pages</span>
                          <span>{report.downloads.toLocaleString()} downloads</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={report.fileUrl}
                          className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
                          download
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </a>
                        <button className="flex items-center gap-2 border border-gray-300 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                          <Eye className="h-4 w-4" />
                          Preview
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* No Results */}
          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedType('All');
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View all reports
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ReportsPage;