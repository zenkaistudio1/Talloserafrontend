import React, { useState } from 'react';
import { Search, Calendar, Bell, Info, AlertCircle, CheckCircle, Filter, X, Clock } from 'lucide-react';
import { Header, Footer, ScrollProgress, GlobalFixes } from "../../components/site-chrome";

interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'general' | 'safety' | 'policy' | 'maintenance' | 'event';
  priority: 'high' | 'medium' | 'low';
  publishDate: string;
  expiryDate?: string;
  author: string;
  department: string;
  isPinned: boolean;
}

const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Annual Safety Training Program - Mandatory Attendance',
    content: 'All employees are required to attend the comprehensive annual safety training program scheduled for February 2024. The program covers updated safety protocols, emergency procedures, new equipment handling guidelines, and regulatory compliance requirements. Sessions will be conducted in multiple batches to accommodate all departments. Attendance certificates will be issued upon completion.',
    category: 'safety',
    priority: 'high',
    publishDate: '2024-01-20',
    expiryDate: '2024-02-28',
    author: 'Safety Department',
    department: 'Health & Safety',
    isPinned: true
  },
  {
    id: '2',
    title: 'New Environmental Compliance Policy Implementation',
    content: 'Effective immediately, all operations must comply with the updated environmental protection guidelines. This includes new waste management procedures, water quality monitoring protocols, and biodiversity conservation measures. Department heads are responsible for ensuring their teams are briefed on these changes. Compliance audits will begin next month.',
    category: 'policy',
    priority: 'high',
    publishDate: '2024-01-18',
    expiryDate: '2024-03-31',
    author: 'Environmental Affairs',
    department: 'Environmental',
    isPinned: true
  },
  {
    id: '3',
    title: 'Scheduled Maintenance - Power Generation Unit 3',
    content: 'Power Generation Unit 3 will undergo scheduled maintenance from February 15-20, 2024. During this period, power output will be reduced by approximately 25%. All departments should plan accordingly and implement energy conservation measures. Emergency backup systems will be on standby throughout the maintenance period.',
    category: 'maintenance',
    priority: 'medium',
    publishDate: '2024-01-15',
    expiryDate: '2024-02-25',
    author: 'Operations Team',
    department: 'Operations',
    isPinned: false
  },
  {
    id: '4',
    title: 'Employee Recognition Program Launch',
    content: 'We are excited to announce the launch of our new Employee Recognition Program. This initiative aims to acknowledge outstanding performance, innovation, and dedication across all departments. Monthly awards will be given for various categories including safety excellence, environmental stewardship, and operational efficiency. Nominations open February 1st.',
    category: 'general',
    priority: 'medium',
    publishDate: '2024-01-12',
    author: 'Human Resources',
    department: 'HR',
    isPinned: false
  },
  {
    id: '5',
    title: 'Community Engagement Event - Open House',
    content: 'Join us for our annual Community Open House event on March 10, 2024. Local residents, students, and stakeholders are invited to tour our facilities, learn about hydropower generation, and participate in environmental education activities. Volunteers needed from all departments to help with presentations and guided tours.',
    category: 'event',
    priority: 'medium',
    publishDate: '2024-01-10',
    expiryDate: '2024-03-15',
    author: 'Community Relations',
    department: 'Public Affairs',
    isPinned: false
  },
  {
    id: '6',
    title: 'Updated IT Security Protocols',
    content: 'New cybersecurity measures are now in effect to protect our critical infrastructure systems. All employees must complete mandatory cybersecurity training by January 31st. New password requirements, two-factor authentication, and VPN access procedures are detailed in the attached security manual. Contact IT support for assistance.',
    category: 'policy',
    priority: 'high',
    publishDate: '2024-01-08',
    expiryDate: '2024-01-31',
    author: 'IT Security Team',
    department: 'Information Technology',
    isPinned: false
  }
];

const categories = [
  { value: 'all', label: 'All Announcements', icon: Bell },
  { value: 'general', label: 'General', icon: Info },
  { value: 'safety', label: 'Safety', icon: AlertCircle },
  { value: 'policy', label: 'Policy Updates', icon: CheckCircle },
  { value: 'maintenance', label: 'Maintenance', icon: Clock },
  { value: 'event', label: 'Events', icon: Calendar }
];

const AnnouncementsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || announcement.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const pinnedAnnouncements = filteredAnnouncements.filter(announcement => announcement.isPinned);
  const regularAnnouncements = filteredAnnouncements.filter(announcement => !announcement.isPinned);

  const getCategoryConfig = (category: string) => {
    const configs = {
      general: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        icon: Info,
        label: 'General'
      },
      safety: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        icon: AlertCircle,
        label: 'Safety'
      },
      policy: {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        icon: CheckCircle,
        label: 'Policy'
      },
      maintenance: {
        bg: 'bg-orange-100',
        text: 'text-orange-800',
        icon: Clock,
        label: 'Maintenance'
      },
      event: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        icon: Calendar,
        label: 'Event'
      }
    };
    return configs[category as keyof typeof configs] || configs.general;
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
        icon: Info,
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
  <h1 className="text-4xl font-bold text-gray-900 mb-4">Company Announcements</h1>
  <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
    Stay informed with the latest company news, policy updates, safety notices, 
    and important announcements from all departments.
  </p>
</div>


          {/* Category Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map(category => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.value;
                const count = category.value === 'all' 
                  ? announcements.length 
                  : announcements.filter(a => a.category === category.value).length;
                
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
                  placeholder="Search announcements..."
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
              Showing {filteredAnnouncements.length} of {announcements.length} announcements
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

          {/* Pinned Announcements */}
          {pinnedAnnouncements.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Bell className="h-6 w-6 text-red-500" />
                Important Announcements
              </h2>
              <div className="space-y-6">
                {pinnedAnnouncements.map(announcement => {
                  const categoryConfig = getCategoryConfig(announcement.category);
                  const priorityConfig = getPriorityConfig(announcement.priority);
                  const CategoryIcon = categoryConfig.icon;
                  const PriorityIcon = priorityConfig.icon;
                  const daysUntil = getDaysUntilExpiry(announcement.expiryDate);
                  
                  return (
                    <div
                      key={announcement.id}
                      className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl shadow-sm border-l-4 border-red-400 p-6 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          {/* Header */}
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <Bell className="h-5 w-5 text-red-600" />
                            <h3 className="text-xl font-semibold text-gray-900">{announcement.title}</h3>
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
                          <p className="text-gray-700 mb-4">{announcement.content}</p>

                          {/* Metadata */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Published: {new Date(announcement.publishDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Info className="h-4 w-4" />
                              {announcement.author}
                            </div>
                            {announcement.expiryDate && (
                              <div className={`flex items-center gap-1 ${isExpiringSoon(announcement.expiryDate) ? 'text-red-600 font-medium' : ''}`}>
                                <Clock className="h-4 w-4" />
                                Expires: {new Date(announcement.expiryDate).toLocaleDateString()}
                                {daysUntil !== null && daysUntil > 0 && (
                                  <span className="ml-1">({daysUntil} days left)</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Expiry Warning */}
                        {isExpiringSoon(announcement.expiryDate) && (
                          <div className="bg-red-100 border border-red-200 rounded-lg p-4 text-center">
                            <AlertCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                            <p className="text-red-800 font-medium text-sm">Action Required!</p>
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

          {/* Regular Announcements */}
          {regularAnnouncements.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Announcements</h2>
              <div className="space-y-6">
                {regularAnnouncements.map(announcement => {
                  const categoryConfig = getCategoryConfig(announcement.category);
                  const priorityConfig = getPriorityConfig(announcement.priority);
                  const CategoryIcon = categoryConfig.icon;
                  const PriorityIcon = priorityConfig.icon;
                  const daysUntil = getDaysUntilExpiry(announcement.expiryDate);
                  
                  return (
                    <div
                      key={announcement.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          {/* Header */}
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <h3 className="text-xl font-semibold text-gray-900">{announcement.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryConfig.bg} ${categoryConfig.text}`}>
                              <CategoryIcon className="h-3 w-3 inline mr-1" />
                              {categoryConfig.label}
                            </span>
                            {announcement.priority === 'high' && (
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityConfig.bg} ${priorityConfig.text}`}>
                                <PriorityIcon className="h-3 w-3 inline mr-1" />
                                {priorityConfig.label}
                              </span>
                            )}
                          </div>

                          {/* Content */}
                          <p className="text-gray-600 mb-4">{announcement.content}</p>

                          {/* Metadata */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(announcement.publishDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Info className="h-4 w-4" />
                              {announcement.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Bell className="h-4 w-4" />
                              {announcement.department}
                            </div>
                            {announcement.expiryDate && (
                              <div className={`flex items-center gap-1 ${isExpiringSoon(announcement.expiryDate) ? 'text-red-600 font-medium' : ''}`}>
                                <Clock className="h-4 w-4" />
                                Expires: {new Date(announcement.expiryDate).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Expiry Warning */}
                        {isExpiringSoon(announcement.expiryDate) && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                            <AlertCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                            <p className="text-red-800 font-medium text-sm">Action Required!</p>
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
          {filteredAnnouncements.length === 0 && (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements found</h3>
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
                View all announcements
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AnnouncementsPage;