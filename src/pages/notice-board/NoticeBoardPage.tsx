import React, { useState } from 'react';
import { Search, Calendar, Bell, Pin, FileText, Filter, X, Clock, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Header, Footer, ScrollProgress, GlobalFixes } from "../../components/site-chrome";

interface NoticeItem {
  id: string;
  title: string;
  content: string;
  category: 'tender' | 'announcement' | 'career';
  priority: 'high' | 'medium' | 'low';
  publishDate: string;
  expiryDate?: string;
  isPinned: boolean;
  author: string;
  department: string;
  attachments?: {
    name: string;
    url: string;
    size: string;
  }[];
}

const notices: NoticeItem[] = [
  {
    id: '1',
    title: 'New Tender: Hydroelectric Turbine Maintenance Contract',
    content: 'Yeti Hydropower invites qualified contractors to submit bids for comprehensive maintenance services of our hydroelectric turbines. This includes routine inspections, preventive maintenance, and emergency repairs across all our facilities.',
    category: 'tender',
    priority: 'high',
    publishDate: '2024-01-20',
    expiryDate: '2024-03-15',
    isPinned: true,
    author: 'Procurement Department',
    department: 'Procurement',
    attachments: [
      { name: 'Tender Document.pdf', url: '/files/turbine-maintenance-tender.pdf', size: '2.1 MB' },
      { name: 'Technical Specifications.pdf', url: '/files/tech-specs.pdf', size: '1.8 MB' }
    ]
  },
  {
    id: '2',
    title: 'Annual Safety Training Program - Mandatory Attendance',
    content: 'All employees are required to attend the annual safety training program scheduled for February 2024. The program covers updated safety protocols, emergency procedures, and new equipment handling guidelines.',
    category: 'announcement',
    priority: 'high',
    publishDate: '2024-01-18',
    expiryDate: '2024-02-28',
    isPinned: true,
    author: 'HR Department',
    department: 'Human Resources',
    attachments: [
      { name: 'Training Schedule.pdf', url: '/files/training-schedule.pdf', size: '456 KB' }
    ]
  },
  {
    id: '3',
    title: 'Senior Electrical Engineer Position Available',
    content: 'We are seeking an experienced Senior Electrical Engineer to join our team. The role involves designing, implementing, and maintaining electrical systems for our hydropower facilities. Minimum 8 years of experience required.',
    category: 'career',
    priority: 'medium',
    publishDate: '2024-01-15',
    expiryDate: '2024-02-15',
    isPinned: false,
    author: 'HR Department',
    department: 'Human Resources',
    attachments: [
      { name: 'Job Description.pdf', url: '/files/senior-engineer-jd.pdf', size: '234 KB' }
    ]
  },
  {
    id: '4',
    title: 'Environmental Impact Assessment Results Published',
    content: 'The environmental impact assessment for our new hydropower project in the northern region has been completed. Results show minimal environmental impact with proposed mitigation measures.',
    category: 'announcement',
    priority: 'medium',
    publishDate: '2024-01-12',
    isPinned: false,
    author: 'Environmental Department',
    department: 'Environmental Affairs',
    attachments: [
      { name: 'EIA Report.pdf', url: '/files/eia-report.pdf', size: '5.2 MB' },
      { name: 'Executive Summary.pdf', url: '/files/eia-summary.pdf', size: '892 KB' }
    ]
  },
  {
    id: '5',
    title: 'Tender Notice: Civil Construction Services',
    content: 'Invitation for bids for civil construction services including foundation work, concrete structures, and site preparation for our upcoming hydropower facility expansion project.',
    category: 'tender',
    priority: 'high',
    publishDate: '2024-01-10',
    expiryDate: '2024-02-20',
    isPinned: false,
    author: 'Engineering Department',
    department: 'Engineering',
    attachments: [
      { name: 'Construction Tender.pdf', url: '/files/construction-tender.pdf', size: '3.4 MB' }
    ]
  },
  {
    id: '6',
    title: 'Project Manager - Renewable Energy Division',
    content: 'Exciting opportunity for an experienced Project Manager to lead renewable energy initiatives. The role involves managing multiple hydropower projects from conception to completion.',
    category: 'career',
    priority: 'medium',
    publishDate: '2024-01-08',
    expiryDate: '2024-02-08',
    isPinned: false,
    author: 'HR Department',
    department: 'Human Resources'
  }
];

const categories = [
  { value: 'all', label: 'All Notices', icon: Bell },
  { value: 'tender', label: 'Tender Notices', icon: FileText },
  { value: 'announcement', label: 'Announcements', icon: Info },
  { value: 'career', label: 'Careers', icon: CheckCircle }
];

const NoticeBoardPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const pinnedNotices = filteredNotices.filter(notice => notice.isPinned);
  const regularNotices = filteredNotices.filter(notice => !notice.isPinned);

  const getCategoryConfig = (category: string) => {
    const configs = {
      tender: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        icon: FileText,
        label: 'Tender Notice'
      },
      announcement: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        icon: Info,
        label: 'Announcement'
      },
      career: {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        icon: CheckCircle,
        label: 'Career Opportunity'
      }
    };
    return configs[category as keyof typeof configs] || configs.announcement;
  };

  const getPriorityConfig = (priority: string) => {
    const configs = {
      high: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        icon: AlertCircle,
        label: 'High Priority'
      },
      medium: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        icon: Clock,
        label: 'Medium Priority'
      },
      low: {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        icon: Info,
        label: 'Low Priority'
      }
    };
    return configs[priority as keyof typeof configs] || configs.medium;
  };

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntil = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysUntil <= 7 && daysUntil > 0;
  };

  const getDaysUntilExpiry = (expiryDate?: string) => {
    if (!expiryDate) return null;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntil = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24));
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Notice Board</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest announcements, tender notices, career opportunities, 
              and important information from Yeti Hydropower.
            </p>
          </div>

          {/* Category Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map(category => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.value;
                const count = category.value === 'all' 
                  ? notices.length 
                  : notices.filter(n => n.category === category.value).length;
                
                return (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {category.label}
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search notices..."
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
              </button>
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">Additional filters coming soon...</p>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {filteredNotices.length} of {notices.length} notices
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <X className="h-4 w-4" />
                Clear search
              </button>
            )}
          </div>

          {/* Pinned Notices */}
          {pinnedNotices.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Pin className="h-6 w-6 text-red-500" />
                Pinned Notices
              </h2>
              <div className="space-y-6">
                {pinnedNotices.map(notice => {
                  const categoryConfig = getCategoryConfig(notice.category);
                  const priorityConfig = getPriorityConfig(notice.priority);
                  const CategoryIcon = categoryConfig.icon;
                  const PriorityIcon = priorityConfig.icon;
                  const daysUntil = getDaysUntilExpiry(notice.expiryDate);
                  
                  return (
                    <div
                      key={notice.id}
                      className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl shadow-sm border-l-4 border-yellow-400 p-6 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          {/* Header */}
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <Pin className="h-5 w-5 text-yellow-600" />
                            <h3 className="text-xl font-semibold text-gray-900">{notice.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryConfig.bg} ${categoryConfig.text}`}>
                              <CategoryIcon className="h-3 w-3 inline mr-1" />
                              {categoryConfig.label}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityConfig.bg} ${priorityConfig.text}`}>
                              <PriorityIcon className="h-3 w-3 inline mr-1" />
                              {priorityConfig.label}
                            </span>
                          </div>

                          {/* Content */}
                          <p className="text-gray-700 mb-4">{notice.content}</p>

                          {/* Metadata */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Published: {new Date(notice.publishDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Bell className="h-4 w-4" />
                              {notice.author}
                            </div>
                            {notice.expiryDate && (
                              <div className={`flex items-center gap-1 ${isExpiringSoon(notice.expiryDate) ? 'text-red-600 font-medium' : ''}`}>
                                <Clock className="h-4 w-4" />
                                Expires: {new Date(notice.expiryDate).toLocaleDateString()}
                                {daysUntil !== null && daysUntil > 0 && (
                                  <span className="ml-1">({daysUntil} days left)</span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Attachments */}
                          {notice.attachments && notice.attachments.length > 0 && (
                            <div className="mb-4">
                              <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
                              <div className="flex flex-wrap gap-2">
                                {notice.attachments.map((attachment, index) => (
                                  <a
                                    key={index}
                                    href={attachment.url}
                                    className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
                                    download
                                  >
                                    <FileText className="h-4 w-4 text-blue-500" />
                                    {attachment.name}
                                    <span className="text-gray-500">({attachment.size})</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Expiry Warning */}
                        {isExpiringSoon(notice.expiryDate) && (
                          <div className="bg-red-100 border border-red-200 rounded-lg p-4 text-center">
                            <AlertCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                            <p className="text-red-800 font-medium text-sm">Expiring Soon!</p>
                            <p className="text-red-600 text-xs">{daysUntil} days remaining</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Regular Notices */}
          {regularNotices.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">All Notices</h2>
              <div className="space-y-6">
                {regularNotices.map(notice => {
                  const categoryConfig = getCategoryConfig(notice.category);
                  const priorityConfig = getPriorityConfig(notice.priority);
                  const CategoryIcon = categoryConfig.icon;
                  const PriorityIcon = priorityConfig.icon;
                  const daysUntil = getDaysUntilExpiry(notice.expiryDate);
                  
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
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryConfig.bg} ${categoryConfig.text}`}>
                              <CategoryIcon className="h-3 w-3 inline mr-1" />
                              {categoryConfig.label}
                            </span>
                            {notice.priority === 'high' && (
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityConfig.bg} ${priorityConfig.text}`}>
                                <PriorityIcon className="h-3 w-3 inline mr-1" />
                                {priorityConfig.label}
                              </span>
                            )}
                          </div>

                          {/* Content */}
                          <p className="text-gray-600 mb-4">{notice.content}</p>

                          {/* Metadata */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(notice.publishDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Bell className="h-4 w-4" />
                              {notice.author}
                            </div>
                            {notice.expiryDate && (
                              <div className={`flex items-center gap-1 ${isExpiringSoon(notice.expiryDate) ? 'text-red-600 font-medium' : ''}`}>
                                <Clock className="h-4 w-4" />
                                Expires: {new Date(notice.expiryDate).toLocaleDateString()}
                              </div>
                            )}
                          </div>

                          {/* Attachments */}
                          {notice.attachments && notice.attachments.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
                              <div className="flex flex-wrap gap-2">
                                {notice.attachments.map((attachment, index) => (
                                  <a
                                    key={index}
                                    href={attachment.url}
                                    className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-sm"
                                    download
                                  >
                                    <FileText className="h-4 w-4 text-blue-500" />
                                    {attachment.name}
                                    <span className="text-gray-500">({attachment.size})</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Expiry Warning */}
                        {isExpiringSoon(notice.expiryDate) && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                            <AlertCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                            <p className="text-red-800 font-medium text-sm">Expiring Soon!</p>
                            <p className="text-red-600 text-xs">{daysUntil} days remaining</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredNotices.length === 0 && (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notices found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or category filter
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View all notices
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default NoticeBoardPage;