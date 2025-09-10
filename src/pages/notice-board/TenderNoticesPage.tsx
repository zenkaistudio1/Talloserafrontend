import React, { useState } from 'react';
import { Search, Calendar, Clock, CheckCircle, AlertCircle, FileText, Filter, X, ExternalLink, Download } from 'lucide-react';
import { Header, Footer, ScrollProgress, GlobalFixes } from "../../components/site-chrome";

interface TenderNotice {
  id: string;
  title: string;
  description: string;
  category: string;
  deadline: string;
  status: 'open' | 'closed' | 'awarded' | 'cancelled';
  estimatedValue: string;
  fileUrl: string;
  publishedDate: string;
  bidsReceived?: number;
  location: string;
}

const tenderNotices: TenderNotice[] = [
  {
    id: '1',
    title: 'Supply of High-Efficiency Turbine Components',
    description: 'Procurement of advanced turbine runners, guide vanes, and shaft assemblies for our new 50MW hydropower facility. Components must meet international efficiency standards and include 5-year warranty.',
    category: 'Equipment Supply',
    deadline: '2025-03-15',
    status: 'open',
    estimatedValue: '$2.5M - $3.2M',
    fileUrl: '/files/tender-turbine-components.pdf',
    publishedDate: '2024-01-20',
    bidsReceived: 12,
    location: 'Northern Region Facility'
  },
  {
    id: '2',
    title: 'Civil Construction - Dam Foundation Work',
    description: 'Construction of reinforced concrete foundation for new dam structure including excavation, concrete pouring, and waterproofing. Project requires experienced contractors with hydropower construction background.',
    category: 'Construction',
    deadline: '2025-02-28',
    status: 'open',
    estimatedValue: '$5.8M - $7.2M',
    fileUrl: '/files/tender-dam-foundation.pdf',
    publishedDate: '2024-01-18',
    bidsReceived: 8,
    location: 'Central Dam Site'
  },
  {
    id: '3',
    title: 'Electrical Control Systems Installation',
    description: 'Supply and installation of SCADA systems, control panels, and monitoring equipment for automated power generation control. Must include training and 3-year maintenance contract.',
    category: 'Electrical Systems',
    deadline: '2024-12-20',
    status: 'closed',
    estimatedValue: '$1.8M - $2.1M',
    fileUrl: '/files/tender-electrical-systems.pdf',
    publishedDate: '2024-01-10',
    bidsReceived: 15,
    location: 'Main Control Center'
  },
  {
    id: '4',
    title: 'Environmental Impact Assessment Services',
    description: 'Comprehensive environmental impact study for proposed hydropower expansion project. Requires certified environmental consultants with hydropower project experience.',
    category: 'Consulting Services',
    deadline: '2025-01-30',
    status: 'open',
    estimatedValue: '$450K - $580K',
    fileUrl: '/files/tender-environmental-assessment.pdf',
    publishedDate: '2024-01-15',
    bidsReceived: 6,
    location: 'Expansion Site Alpha'
  },
  {
    id: '5',
    title: 'Heavy Equipment Rental - Construction Phase',
    description: 'Long-term rental of excavators, cranes, and specialized construction equipment for 18-month construction project. Equipment must be less than 3 years old with full maintenance support.',
    category: 'Equipment Rental',
    deadline: '2024-11-15',
    status: 'awarded',
    estimatedValue: '$1.2M - $1.5M',
    fileUrl: '/files/tender-equipment-rental.pdf',
    publishedDate: '2024-01-05',
    location: 'Multiple Sites'
  }
];

const categories = ['All Categories', 'Equipment Supply', 'Construction', 'Electrical Systems', 'Consulting Services', 'Equipment Rental'];
const statuses = ['All Status', 'open', 'closed', 'awarded', 'cancelled'];

const TenderNoticesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [showFilters, setShowFilters] = useState(false);

  const filteredNotices = tenderNotices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || notice.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All Status' || notice.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusConfig = (status: string) => {
    const configs = {
      open: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        icon: CheckCircle,
        label: 'Open for Bids'
      },
      closed: {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        icon: Clock,
        label: 'Closed'
      },
      awarded: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        icon: CheckCircle,
        label: 'Contract Awarded'
      },
      cancelled: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        icon: AlertCircle,
        label: 'Cancelled'
      }
    };
    return configs[status as keyof typeof configs] || configs.closed;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Equipment Supply': 'bg-blue-100 text-blue-800',
      'Construction': 'bg-orange-100 text-orange-800',
      'Electrical Systems': 'bg-purple-100 text-purple-800',
      'Consulting Services': 'bg-green-100 text-green-800',
      'Equipment Rental': 'bg-yellow-100 text-yellow-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const isDeadlineNear = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysUntil <= 7 && daysUntil > 0;
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysUntil;
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
  <h1 className="text-4xl font-bold text-gray-900 mb-4">Tender Notices</h1>
  <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
    Current and past tender opportunities for equipment supply, construction services, 
    and consulting work. Submit your bids for ongoing projects.
  </p>
</div>


          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Open Tenders</p>
                  <p className="text-2xl font-bold text-green-600">
                    {tenderNotices.filter(t => t.status === 'open').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold text-blue-600">$15.2M+</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Closing Soon</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {tenderNotices.filter(t => t.status === 'open' && isDeadlineNear(t.deadline)).length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bids</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {tenderNotices.reduce((sum, t) => sum + (t.bidsReceived || 0), 0)}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search tender notices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-5 w-5" />
                Filters
                {(selectedCategory !== 'All Categories' || selectedStatus !== 'All Status') && (
                  <span className="bg-blue-500 text-white rounded-full w-2 h-2"></span>
                )}
              </button>
            </div>

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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <div className="flex flex-wrap gap-2">
                    {statuses.map(status => (
                      <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                          selectedStatus === status
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {status}
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
              Showing {filteredNotices.length} of {tenderNotices.length} tender notices
            </p>
            {(searchTerm || selectedCategory !== 'All Categories' || selectedStatus !== 'All Status') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Categories');
                  setSelectedStatus('All Status');
                }}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <X className="h-4 w-4" />
                Clear filters
              </button>
            )}
          </div>

          {/* Tender Notices List */}
          <div className="space-y-6">
            {filteredNotices.map(notice => {
              const statusConfig = getStatusConfig(notice.status);
              const StatusIcon = statusConfig.icon;
              const daysUntil = getDaysUntilDeadline(notice.deadline);
              
              return (
                <div
                  key={notice.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{notice.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(notice.category)}`}>
                          {notice.category}
                        </span>
                        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                          <StatusIcon className="h-3 w-3" />
                          {statusConfig.label}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 mb-4">{notice.description}</p>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-gray-500">Estimated Value</p>
                          <p className="font-semibold text-gray-900">{notice.estimatedValue}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Location</p>
                          <p className="font-semibold text-gray-900">{notice.location}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Published</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(notice.publishedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {notice.bidsReceived !== undefined && (
                        <div className="text-sm text-gray-600 mb-4">
                          <span className="font-medium">{notice.bidsReceived}</span> bids received
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end gap-3">
                      {notice.status === 'open' && (
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-1">Submission Deadline</p>
                          <p className={`font-semibold ${isDeadlineNear(notice.deadline) ? 'text-red-600' : 'text-gray-900'}`}>
                            {new Date(notice.deadline).toLocaleDateString()}
                          </p>
                          {daysUntil > 0 && (
                            <p className={`text-xs ${isDeadlineNear(notice.deadline) ? 'text-red-600' : 'text-gray-500'}`}>
                              {daysUntil} days remaining
                            </p>
                          )}
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <a
                          href={notice.fileUrl}
                          className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText className="h-4 w-4" />
                          View Details
                          <ExternalLink className="h-3 w-3" />
                        </a>
                        <a
                          href={notice.fileUrl}
                          className="flex items-center gap-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                          download
                        >
                          <Download className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredNotices.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tender notices found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Categories');
                  setSelectedStatus('All Status');
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View all tender notices
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default TenderNoticesPage;