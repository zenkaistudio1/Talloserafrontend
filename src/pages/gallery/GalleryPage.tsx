import React, { useState } from 'react';
import { Search, Filter, X, Calendar, MapPin, Eye, Download, Grid, List, Camera, Play, FileImage } from 'lucide-react';
import { Header, Footer, ScrollProgress, GlobalFixes } from "../../components/site-chrome";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'project' | 'facility' | 'event' | 'construction' | 'environment';
  type: 'image' | 'video';
  url: string;
  thumbnailUrl: string;
  location: string;
  date: string;
  photographer?: string;
  tags: string[];
  featured: boolean;
  dimensions?: string;
  fileSize?: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Main Hydropower Facility - Aerial View',
    description: 'Stunning aerial photograph showcasing our primary hydropower generation facility nestled in the mountainous terrain.',
    category: 'facility',
    type: 'image',
    url: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?w=400&h=300&fit=crop',
    location: 'Northern Region, Nepal',
    date: '2024-01-15',
    photographer: 'Yeti Engineering Team',
    tags: ['hydropower', 'facility', 'aerial', 'mountains'],
    featured: true,
    dimensions: '4000x3000',
    fileSize: '2.8 MB'
  },
  {
    id: '2',
    title: 'Turbine Installation Process',
    description: 'Time-lapse video documenting the precision installation of our latest hydroelectric turbine system.',
    category: 'construction',
    type: 'video',
    url: 'https://images.pexels.com/photos/2850287/pexels-photo-2850287.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/2850287/pexels-photo-2850287.jpeg?w=400&h=300&fit=crop',
    location: 'Central Facility',
    date: '2024-01-10',
    photographer: 'Construction Team',
    tags: ['turbine', 'installation', 'construction', 'engineering'],
    featured: true,
    fileSize: '45.2 MB'
  },
  {
    id: '3',
    title: 'Environmental Conservation Area',
    description: 'Protected wildlife habitat surrounding our hydropower facility, demonstrating our commitment to environmental stewardship.',
    category: 'environment',
    type: 'image',
    url: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?w=400&h=300&fit=crop',
    location: 'Conservation Zone',
    date: '2024-01-08',
    photographer: 'Environmental Team',
    tags: ['environment', 'conservation', 'wildlife', 'sustainability'],
    featured: false,
    dimensions: '3840x2160',
    fileSize: '3.2 MB'
  },
  {
    id: '4',
    title: 'Annual Safety Training Event',
    description: 'Comprehensive safety training session for all facility personnel, emphasizing our commitment to workplace safety.',
    category: 'event',
    type: 'image',
    url: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?w=400&h=300&fit=crop',
    location: 'Training Center',
    date: '2024-01-05',
    photographer: 'HR Department',
    tags: ['safety', 'training', 'employees', 'education'],
    featured: false,
    dimensions: '2400x1600',
    fileSize: '1.9 MB'
  },
  {
    id: '5',
    title: 'New Project Groundbreaking Ceremony',
    description: 'Official groundbreaking ceremony for our latest hydropower expansion project, attended by government officials and community leaders.',
    category: 'event',
    type: 'image',
    url: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?w=400&h=300&fit=crop',
    location: 'Project Site Alpha',
    date: '2023-12-20',
    photographer: 'Media Team',
    tags: ['groundbreaking', 'ceremony', 'expansion', 'community'],
    featured: true,
    dimensions: '3200x2400',
    fileSize: '2.5 MB'
  },
  {
    id: '6',
    title: 'Control Room Operations',
    description: 'State-of-the-art control room where our engineers monitor and manage power generation across all facilities.',
    category: 'facility',
    type: 'image',
    url: 'https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?w=400&h=300&fit=crop',
    location: 'Main Control Center',
    date: '2023-12-15',
    photographer: 'Operations Team',
    tags: ['control room', 'operations', 'monitoring', 'technology'],
    featured: false,
    dimensions: '2880x1920',
    fileSize: '2.1 MB'
  },
  {
    id: '7',
    title: 'Dam Construction Progress',
    description: 'Construction progress of our new dam structure, showcasing advanced engineering and construction techniques.',
    category: 'construction',
    type: 'image',
    url: 'https://images.pexels.com/photos/162539/architecture-building-amsterdam-blue-sky-162539.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/162539/architecture-building-amsterdam-blue-sky-162539.jpeg?w=400&h=300&fit=crop',
    location: 'Dam Site Beta',
    date: '2023-12-10',
    photographer: 'Construction Team',
    tags: ['dam', 'construction', 'progress', 'engineering'],
    featured: false,
    dimensions: '4096x2730',
    fileSize: '3.8 MB'
  },
  {
    id: '8',
    title: 'Community Engagement Program',
    description: 'Local community members participating in our educational program about renewable energy and environmental conservation.',
    category: 'event',
    type: 'image',
    url: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?w=400&h=300&fit=crop',
    location: 'Community Center',
    date: '2023-12-05',
    photographer: 'Community Relations',
    tags: ['community', 'education', 'engagement', 'outreach'],
    featured: false,
    dimensions: '3000x2000',
    fileSize: '2.3 MB'
  }
];

const categories = [
  { value: 'all', label: 'All Media', icon: Camera },
  { value: 'project', label: 'Projects', icon: Grid },
  { value: 'facility', label: 'Facilities', icon: FileImage },
  { value: 'event', label: 'Events', icon: Calendar },
  { value: 'construction', label: 'Construction', icon: Grid },
  { value: 'environment', label: 'Environment', icon: FileImage }
];

const GalleryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredItems = galleryItems.filter(item => item.featured);

  const getCategoryColor = (category: string) => {
    const colors = {
      project: 'bg-blue-100 text-blue-800',
      facility: 'bg-green-100 text-green-800',
      event: 'bg-purple-100 text-purple-800',
      construction: 'bg-orange-100 text-orange-800',
      environment: 'bg-emerald-100 text-emerald-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
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
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h1>
    <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
      Explore our visual journey through images and videos showcasing our hydropower facilities, 
      construction projects, environmental initiatives, and community engagement activities.
    </p>
          </div>

          {/* Featured Section */}
          {featuredItems.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Camera className="h-6 w-6 text-blue-500" />
                Featured Media
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredItems.slice(0, 3).map(item => (
                  <div
                    key={item.id}
                    className="group relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => openLightbox(item)}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Play className="h-12 w-12 text-white" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Eye className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {item.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(item.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          

        

          {/* Gallery Display */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => openLightbox(item)}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    )}
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Eye className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-900 mb-1 text-sm group-hover:text-blue-600 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </span>
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  onClick={() => openLightbox(item)}
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative w-full md:w-48 aspect-video overflow-hidden rounded-lg">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{item.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {item.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(item.date).toLocaleDateString()}
                        </div>
                        {item.photographer && (
                          <div className="flex items-center gap-1">
                            <Camera className="h-4 w-4" />
                            {item.photographer}
                          </div>
                        )}
                        {item.fileSize && (
                          <span>{item.fileSize}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No media found</h3>
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
                View all media
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Lightbox Modal */}
{selectedItem && (
  <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
    <div className="relative w-full max-w-xl"> {/* much smaller modal (max ~640px) */}
      <button
        onClick={closeLightbox}
        className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
      >
        <X className="h-7 w-7" />
      </button>

      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="relative flex items-center justify-center p-4">
          <img
            src={selectedItem.url}
            alt={selectedItem.title}
            className="max-h-[50vh] max-w-full object-contain rounded-md" 
          />
          {selectedItem.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Play className="h-12 w-12 text-white" />
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            {selectedItem.title}
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getCategoryColor(
                selectedItem.category
              )}`}
            >
              {selectedItem.category}
            </span>
          </h3>

          <p className="text-gray-600 text-sm mt-2">{selectedItem.description}</p>

          <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
            <div>
              <p className="text-gray-500">Location</p>
              <p className="font-medium">{selectedItem.location}</p>
            </div>
            <div>
              <p className="text-gray-500">Date</p>
              <p className="font-medium">
                {new Date(selectedItem.date).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <a
              href={selectedItem.url}
              download
              className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1.5 rounded-md text-xs hover:bg-blue-600"
            >
              <Download className="h-3 w-3" />
              Download
            </a>
            <button
              onClick={closeLightbox}
              className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md text-xs hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

      <Footer />
    </>
  );
};

export default GalleryPage;