import React, { useState } from 'react';
import { Search, MapPin, Clock, Briefcase, GraduationCap, Filter, X, Calendar, Users, DollarSign } from 'lucide-react';
import { Header, Footer, ScrollProgress, GlobalFixes } from "../../components/site-chrome";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  level: 'entry' | 'mid' | 'senior' | 'executive';
  description: string;
  requirements: string[];
  responsibilities: string[];
  salaryRange: string;
  postedDate: string;
  applicationDeadline: string;
  applicationsReceived: number;
  isUrgent: boolean;
}

const jobPostings: JobPosting[] = [
  {
    id: '1',
    title: 'Senior Electrical Engineer',
    department: 'Engineering',
    location: 'Kathmandu, Nepal',
    type: 'full-time',
    level: 'senior',
    description: 'We are seeking an experienced Senior Electrical Engineer to join our hydropower engineering team. The role involves designing, implementing, and maintaining electrical systems for our hydropower facilities, ensuring optimal performance and safety standards.',
    requirements: [
      'Bachelor\'s degree in Electrical Engineering',
      'Minimum 8 years of experience in power systems',
      'Experience with hydropower electrical systems preferred',
      'Professional Engineering license',
      'Strong knowledge of SCADA systems and automation'
    ],
    responsibilities: [
      'Design and oversee electrical system installations',
      'Conduct system analysis and troubleshooting',
      'Ensure compliance with safety and regulatory standards',
      'Lead technical teams and mentor junior engineers',
      'Collaborate with cross-functional project teams'
    ],
    salaryRange: 'NPR 1,200,000 - 1,800,000 annually',
    postedDate: '2024-01-20',
    applicationDeadline: '2024-02-20',
    applicationsReceived: 45,
    isUrgent: false
  },
  {
    id: '2',
    title: 'Project Manager - Renewable Energy',
    department: 'Project Management',
    location: 'Pokhara, Nepal',
    type: 'full-time',
    level: 'senior',
    description: 'Exciting opportunity for an experienced Project Manager to lead renewable energy initiatives. The role involves managing multiple hydropower projects from conception to completion, ensuring timely delivery within budget and quality parameters.',
    requirements: [
      'Bachelor\'s degree in Engineering or Project Management',
      'PMP certification preferred',
      'Minimum 6 years of project management experience',
      'Experience in renewable energy projects',
      'Strong leadership and communication skills'
    ],
    responsibilities: [
      'Lead cross-functional project teams',
      'Develop and manage project schedules and budgets',
      'Coordinate with stakeholders and regulatory bodies',
      'Ensure project quality and safety standards',
      'Prepare project reports and presentations'
    ],
    salaryRange: 'NPR 1,000,000 - 1,500,000 annually',
    postedDate: '2024-01-18',
    applicationDeadline: '2024-02-18',
    applicationsReceived: 32,
    isUrgent: true
  },
  {
    id: '3',
    title: 'Environmental Compliance Specialist',
    department: 'Environmental Affairs',
    location: 'Kathmandu, Nepal',
    type: 'full-time',
    level: 'mid',
    description: 'Join our environmental team to ensure all operations comply with environmental regulations and sustainability standards. This role focuses on environmental impact assessment, monitoring, and implementing conservation measures.',
    requirements: [
      'Master\'s degree in Environmental Science or related field',
      'Minimum 4 years of environmental compliance experience',
      'Knowledge of Nepal environmental regulations',
      'Experience with EIA processes',
      'Strong analytical and reporting skills'
    ],
    responsibilities: [
      'Conduct environmental impact assessments',
      'Monitor compliance with environmental regulations',
      'Develop and implement environmental management plans',
      'Prepare regulatory reports and documentation',
      'Coordinate with government agencies and NGOs'
    ],
    salaryRange: 'NPR 800,000 - 1,200,000 annually',
    postedDate: '2024-01-15',
    applicationDeadline: '2024-02-15',
    applicationsReceived: 28,
    isUrgent: false
  },
  {
    id: '4',
    title: 'Mechanical Maintenance Technician',
    department: 'Operations',
    location: 'Multiple Sites',
    type: 'full-time',
    level: 'mid',
    description: 'We are looking for skilled Mechanical Maintenance Technicians to maintain and repair hydropower equipment. The role requires hands-on experience with turbines, generators, and associated mechanical systems.',
    requirements: [
      'Diploma in Mechanical Engineering or equivalent',
      'Minimum 3 years of maintenance experience',
      'Experience with rotating machinery preferred',
      'Ability to work in challenging environments',
      'Strong problem-solving skills'
    ],
    responsibilities: [
      'Perform preventive and corrective maintenance',
      'Troubleshoot mechanical equipment issues',
      'Maintain maintenance records and reports',
      'Ensure safety protocols are followed',
      'Support emergency repair operations'
    ],
    salaryRange: 'NPR 600,000 - 900,000 annually',
    postedDate: '2024-01-12',
    applicationDeadline: '2024-02-12',
    applicationsReceived: 67,
    isUrgent: false
  },
  {
    id: '5',
    title: 'Engineering Intern - Hydropower Systems',
    department: 'Engineering',
    location: 'Kathmandu, Nepal',
    type: 'internship',
    level: 'entry',
    description: 'Excellent opportunity for engineering students to gain hands-on experience in hydropower systems. Interns will work alongside experienced engineers on real projects and contribute to various engineering activities.',
    requirements: [
      'Currently pursuing Bachelor\'s in Engineering',
      'Strong academic performance',
      'Interest in renewable energy and hydropower',
      'Basic knowledge of engineering software',
      'Excellent communication skills'
    ],
    responsibilities: [
      'Assist in engineering design and analysis',
      'Support field data collection activities',
      'Prepare technical documentation',
      'Participate in project meetings and reviews',
      'Learn industry best practices and standards'
    ],
    salaryRange: 'NPR 25,000 - 35,000 monthly',
    postedDate: '2024-01-10',
    applicationDeadline: '2024-02-10',
    applicationsReceived: 156,
    isUrgent: false
  },
  {
    id: '6',
    title: 'Safety Officer',
    department: 'Health & Safety',
    location: 'Multiple Sites',
    type: 'full-time',
    level: 'mid',
    description: 'We are seeking a dedicated Safety Officer to implement and monitor safety programs across our facilities. The role involves ensuring compliance with safety regulations and promoting a culture of safety excellence.',
    requirements: [
      'Bachelor\'s degree in Safety Engineering or related field',
      'NEBOSH or equivalent safety certification',
      'Minimum 3 years of industrial safety experience',
      'Knowledge of Nepal safety regulations',
      'Strong training and communication skills'
    ],
    responsibilities: [
      'Develop and implement safety programs',
      'Conduct safety inspections and audits',
      'Investigate incidents and prepare reports',
      'Provide safety training to employees',
      'Ensure regulatory compliance'
    ],
    salaryRange: 'NPR 700,000 - 1,000,000 annually',
    postedDate: '2024-01-08',
    applicationDeadline: '2024-02-08',
    applicationsReceived: 41,
    isUrgent: true
  }
];

const departments = ['All Departments', 'Engineering', 'Project Management', 'Environmental Affairs', 'Operations', 'Health & Safety'];
const jobTypes = ['All Types', 'full-time', 'part-time', 'contract', 'internship'];
const jobLevels = ['All Levels', 'entry', 'mid', 'senior', 'executive'];

const CareersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = jobPostings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All Departments' || job.department === selectedDepartment;
    const matchesType = selectedType === 'All Types' || job.type === selectedType;
    const matchesLevel = selectedLevel === 'All Levels' || job.level === selectedLevel;
    return matchesSearch && matchesDepartment && matchesType && matchesLevel;
  });

  const urgentJobs = filteredJobs.filter(job => job.isUrgent);
  const regularJobs = filteredJobs.filter(job => !job.isUrgent);

  const getTypeColor = (type: string) => {
    const colors = {
      'full-time': 'bg-green-100 text-green-800',
      'part-time': 'bg-blue-100 text-blue-800',
      'contract': 'bg-orange-100 text-orange-800',
      'internship': 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getLevelColor = (level: string) => {
    const colors = {
      'entry': 'bg-green-100 text-green-800',
      'mid': 'bg-blue-100 text-blue-800',
      'senior': 'bg-purple-100 text-purple-800',
      'executive': 'bg-red-100 text-red-800'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
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
  <h1 className="text-4xl font-bold text-gray-900 mb-4">Career Opportunities</h1>
  <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
    Join our team and be part of Nepal's leading hydropower company. 
    We offer exciting career opportunities in a dynamic and growing industry.
  </p>
</div>


          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Open Positions</p>
                  <p className="text-2xl font-bold text-blue-600">{jobPostings.length}</p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Departments</p>
                  <p className="text-2xl font-bold text-green-600">{departments.length - 1}</p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Urgent Hiring</p>
                  <p className="text-2xl font-bold text-red-600">
                    {jobPostings.filter(job => job.isUrgent).length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-red-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Applications</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {jobPostings.reduce((sum, job) => sum + job.applicationsReceived, 0)}
                  </p>
                </div>
                <GraduationCap className="h-8 w-8 text-purple-500" />
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
                  placeholder="Search jobs by title, department, or keywords..."
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
                {(selectedDepartment !== 'All Departments' || selectedType !== 'All Types' || selectedLevel !== 'All Levels') && (
                  <span className="bg-blue-500 text-white rounded-full w-2 h-2"></span>
                )}
              </button>
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <div className="flex flex-wrap gap-2">
                    {departments.map(dept => (
                      <button
                        key={dept}
                        onClick={() => setSelectedDepartment(dept)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedDepartment === dept
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {dept}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                  <div className="flex flex-wrap gap-2">
                    {jobTypes.map(type => (
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                  <div className="flex flex-wrap gap-2">
                    {jobLevels.map(level => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                          selectedLevel === level
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {level}
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
              Showing {filteredJobs.length} of {jobPostings.length} positions
            </p>
            {(searchTerm || selectedDepartment !== 'All Departments' || selectedType !== 'All Types' || selectedLevel !== 'All Levels') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDepartment('All Departments');
                  setSelectedType('All Types');
                  setSelectedLevel('All Levels');
                }}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <X className="h-4 w-4" />
                Clear filters
              </button>
            )}
          </div>

          {/* Urgent Jobs */}
          {urgentJobs.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="h-6 w-6 text-red-500" />
                Urgent Hiring
              </h2>
              <div className="space-y-6">
                {urgentJobs.map(job => {
                  const daysUntil = getDaysUntilDeadline(job.applicationDeadline);
                  
                  return (
                    <div
                      key={job.id}
                      className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl shadow-sm border-l-4 border-red-400 p-6 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          {/* Header */}
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <Clock className="h-5 w-5 text-red-600" />
                            <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(job.type)}`}>
                              {job.type.replace('-', ' ')}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(job.level)}`}>
                              {job.level} level
                            </span>
                          </div>

                          {/* Job Info */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              {job.department}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {job.salaryRange}
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-700 mb-4">{job.description}</p>

                          {/* Key Requirements */}
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900 mb-2">Key Requirements:</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                              {job.requirements.slice(0, 3).map((req, index) => (
                                <li key={index}>{req}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Metadata */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Posted: {new Date(job.postedDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {job.applicationsReceived} applications
                            </div>
                          </div>
                        </div>

                        {/* Application Info */}
                        <div className="flex flex-col items-end gap-3">
                          <div className="text-right">
                            <p className="text-sm text-gray-500 mb-1">Application Deadline</p>
                            <p className={`font-semibold ${isDeadlineNear(job.applicationDeadline) ? 'text-red-600' : 'text-gray-900'}`}>
                              {new Date(job.applicationDeadline).toLocaleDateString()}
                            </p>
                            {daysUntil > 0 && (
                              <p className={`text-xs ${isDeadlineNear(job.applicationDeadline) ? 'text-red-600' : 'text-gray-500'}`}>
                                {daysUntil} days remaining
                              </p>
                            )}
                          </div>
                          
                          <button className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition-colors font-medium">
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Regular Jobs */}
          {regularJobs.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">All Positions</h2>
              <div className="space-y-6">
                {regularJobs.map(job => {
                  const daysUntil = getDaysUntilDeadline(job.applicationDeadline);
                  
                  return (
                    <div
                      key={job.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          {/* Header */}
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(job.type)}`}>
                              {job.type.replace('-', ' ')}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(job.level)}`}>
                              {job.level} level
                            </span>
                          </div>

                          {/* Job Info */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              {job.department}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {job.salaryRange}
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-600 mb-4">{job.description}</p>

                          {/* Key Requirements */}
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-700 mb-2">Key Requirements:</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                              {job.requirements.slice(0, 3).map((req, index) => (
                                <li key={index}>{req}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Metadata */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Posted: {new Date(job.postedDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {job.applicationsReceived} applications
                            </div>
                          </div>
                        </div>

                        {/* Application Info */}
                        <div className="flex flex-col items-end gap-3">
                          <div className="text-right">
                            <p className="text-sm text-gray-500 mb-1">Application Deadline</p>
                            <p className={`font-semibold ${isDeadlineNear(job.applicationDeadline) ? 'text-red-600' : 'text-gray-900'}`}>
                              {new Date(job.applicationDeadline).toLocaleDateString()}
                            </p>
                            {daysUntil > 0 && (
                              <p className={`text-xs ${isDeadlineNear(job.applicationDeadline) ? 'text-red-600' : 'text-gray-500'}`}>
                                {daysUntil} days remaining
                              </p>
                            )}
                          </div>
                          
                          <button className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No positions found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDepartment('All Departments');
                  setSelectedType('All Types');
                  setSelectedLevel('All Levels');
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View all positions
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CareersPage;