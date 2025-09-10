import React, { useState } from 'react';
import { Search, Calendar, Clock, CheckCircle, AlertCircle, FileText, Filter, X, ExternalLink } from 'lucide-react';
import { Header, Footer, ScrollProgress, GlobalFixes } from "../../components/site-chrome";

interface TenderItem {
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
}

const tenders: TenderItem[] = [
  {
    id: '1',
    title: 'Supply of Turbine Parts',
    description: 'High-quality turbine components including runners, guide vanes, and shaft assemblies for hydropower generation.',
    category: 'Equipment',
    deadline: '2025-09-15',
    status: 'open',
    estimatedValue: '$2.5M - $3.2M',
    fileUrl: '/files/tender-turbine.pdf',
    publishedDate: '2024-01-15',
    bidsReceived: 8
  },
  {
    id: '2',
    title: 'Electrical Equipment Supply',
    description: 'Complete electrical systems including transformers, control panels, and monitoring equipment.',
    category: 'Equipment',
    deadline: '2024-12-20',
    status: 'closed',
    estimatedValue: '$1.8M - $2.1M',
    fileUrl: '/files/electrical-equipment.pdf',
    publishedDate: '2024-01-05',
    bidsReceived: 12
  },
  {
    id: '3',
    title: 'Civil Construction Services',
    description: 'Construction of intake structures, powerhouse foundations, and access roads.',
    category: 'Construction',
    deadline: '2025-08-30',
    status: 'open',
    estimatedValue: '$5.2M - $6.8M',
    fileUrl: '/files/civil-construction.pdf',
    publishedDate: '2024-01-20',
    bidsReceived: 5
  },
  {
    id: '4',
    title: 'Environmental Monitoring Services',
    description: 'Comprehensive environmental impact assessment and ongoing monitoring services.',
    category: 'Services',
    deadline: '2025-07-15',
    status: 'open',
    estimatedValue: '$450K - $580K',
    fileUrl: '/files/environmental-monitoring.pdf',
    publishedDate: '2024-01-18',
    bidsReceived: 3
  },
  {
    id: '5',
    title: 'IT Infrastructure Upgrade',
    description: 'Complete overhaul of network infrastructure, servers, and cybersecurity systems.',
    category: 'Technology',
    deadline: '2024-11-30',
    status: 'awarded',
    estimatedValue: '$1.2M - $1.5M',
    fileUrl: '/files/it-infrastructure.pdf',
    publishedDate: '2024-01-10'
  }
];

const categories = ['All', 'Equipment', 'Construction', 'Services', 'Technology'];
const statuses = ['All', 'open', 'closed', 'awarded', 'cancelled'];

const ProcurementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTenders = tenders.filter(tender => {
    const matchesSearch = tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tender.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tender.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || tender.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusConfig = (status: string) => {
    const configs = {
      open: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        icon: CheckCircle,
        label: 'Open'
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
        label: 'Awarded'
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
      Equipment: 'bg-blue-100 text-blue-800',
      Construction: 'bg-orange-100 text-orange-800',
      Services: 'bg-green-100 text-green-800',
      Technology: 'bg-purple-100 text-purple-800'
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Procurement Opportunities</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore current tenders, bidding opportunities, and procurement processes. 
              Stay updated on our latest projects and partnership opportunities.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Open Tenders</p>
                  <p className="text-2xl font-bold text-green-600">
                    {tenders.filter(t => t.status === 'open').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold text-blue-600">$12.5M+</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Closing Soon</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {tenders.filter(t => t.status === 'open' && isDeadlineNear(t.deadline)).length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {categories.length - 1}
                  </p>
                </div>
                <Filter className="h-8 w-8 text-purple-500" />
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
                  placeholder="Search tenders..."
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
                {(selectedCategory !== 'All' || selectedStatus !== 'All') && (
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
              Showing {filteredTenders.length} of {tenders.length} opportunities
            </p>
            {(searchTerm || selectedCategory !== 'All' || selectedStatus !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedStatus('All');
                }}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <X className="h-4 w-4" />
                Clear filters
              </button>
            )}
          </div>

          {/* Tenders List */}
          <div className="space-y-6">
            {filteredTenders.map(tender => {
              const statusConfig = getStatusConfig(tender.status);
              const StatusIcon = statusConfig.icon;
              const daysUntil = getDaysUntilDeadline(tender.deadline);
              
              return (
                <div
                  key={tender.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{tender.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(tender.category)}`}>
                          {tender.category}
                        </span>
                        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                          <StatusIcon className="h-3 w-3" />
                          {statusConfig.label}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 mb-4">{tender.description}</p>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Estimated Value</p>
                          <p className="font-semibold text-gray-900">{tender.estimatedValue}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Published</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(tender.publishedDate).toLocaleDateString()}
                          </p>
                        </div>
                        {tender.bidsReceived !== undefined && (
                          <div>
                            <p className="text-gray-500">Bids Received</p>
                            <p className="font-semibold text-gray-900">{tender.bidsReceived}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end gap-3">
                      {tender.status === 'open' && (
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-1">Deadline</p>
                          <p className={`font-semibold ${isDeadlineNear(tender.deadline) ? 'text-red-600' : 'text-gray-900'}`}>
                            {new Date(tender.deadline).toLocaleDateString()}
                          </p>
                          {daysUntil > 0 && (
                            <p className={`text-xs ${isDeadlineNear(tender.deadline) ? 'text-red-600' : 'text-gray-500'}`}>
                              {daysUntil} days remaining
                            </p>
                          )}
                        </div>
                      )}
                      
                      <a
                        href={tender.fileUrl}
                        className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="h-4 w-4" />
                        View Details
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredTenders.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedStatus('All');
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View all opportunities
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ProcurementPage;