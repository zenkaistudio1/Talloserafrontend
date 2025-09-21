import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search, X, Calendar, MapPin, Eye, Download,
  Grid, List, Camera, Play, FileImage
} from "lucide-react";
import { Header, Footer, ScrollProgress, GlobalFixes } from "../../components/site-chrome";

interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  category: "project" | "facility" | "event" | "construction" | "environment";
  type: "image" | "video";
  imageUrl: string;
  location: string;
  date: string;
  photographer?: string;
  tags?: string[];
  featured?: boolean;
  dimensions?: string;
  fileSize?: string;
}

const categories = [
  { value: "all", label: "All Media", icon: Camera },
  { value: "project", label: "Projects", icon: Grid },
  { value: "facility", label: "Facilities", icon: FileImage },
  { value: "event", label: "Events", icon: Calendar },
  { value: "construction", label: "Construction", icon: Grid },
  { value: "environment", label: "Environment", icon: FileImage },
];

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/gallery");
        setGalleryItems(res.data);
      } catch (err) {
        console.error("Error fetching gallery:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems = galleryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredItems = galleryItems.filter((item) => item.featured);

  const getCategoryColor = (category: string) => {
    const colors = {
      project: "bg-blue-100 text-blue-800",
      facility: "bg-green-100 text-green-800",
      event: "bg-purple-100 text-purple-800",
      construction: "bg-orange-100 text-orange-800",
      environment: "bg-emerald-100 text-emerald-800",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const openLightbox = (item: GalleryItem) => setSelectedItem(item);
  const closeLightbox = () => setSelectedItem(null);

  return (
    <>
      <GlobalFixes />
      <ScrollProgress />
      <Header />

      <main className="min-h-[60vh]">
        <section className="mx-auto max-w-7xl px-4 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h1>
            <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
              Explore our visual journey through images and videos showcasing our facilities, projects, events, and more.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                    selectedCategory === cat.value ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <cat.icon className="h-3 w-3" />
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && <div className="text-center py-12"><p className="text-gray-500">Loading gallery...</p></div>}

          {/* Featured Section */}
          {!loading && featuredItems.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Camera className="h-6 w-6 text-blue-500" />
                Featured Media
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredItems.map(item => (
                  <div
                    key={item._id}
                    className="group relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => openLightbox(item)}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={`http://localhost:5000${item.imageUrl}`}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                      <h3 className="mt-2 text-lg font-bold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                      <div className="mt-2 text-xs text-gray-400 space-y-1">
                        {item.date && <div><Calendar className="inline h-3 w-3 mr-1"/> {item.date}</div>}
                        {item.location && <div><MapPin className="inline h-3 w-3 mr-1"/> {item.location}</div>}
                        {item.photographer && <div>📸 {item.photographer}</div>}
                        {item.dimensions && <div>📐 {item.dimensions}</div>}
                        {item.fileSize && <div>💾 {item.fileSize}</div>}
                        {item.tags && <div>🏷️ {item.tags.join(", ")}</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Display */}
          {!loading && (
            <>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredItems.map(item => (
                    <div
                      key={item._id}
                      className="group relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                      onClick={() => openLightbox(item)}
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={`http://localhost:5000${item.imageUrl}`}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {item.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <Play className="h-8 w-8 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                        <h3 className="mt-2 text-lg font-bold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                        <div className="mt-2 text-xs text-gray-400 space-y-1">
                          {item.date && <div><Calendar className="inline h-3 w-3 mr-1"/> {item.date}</div>}
                          {item.location && <div><MapPin className="inline h-3 w-3 mr-1"/> {item.location}</div>}
                          {item.photographer && <div>📸 {item.photographer}</div>}
                          {item.dimensions && <div>📐 {item.dimensions}</div>}
                          {item.fileSize && <div>💾 {item.fileSize}</div>}
                          {item.tags && <div>🏷️ {item.tags.join(", ")}</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredItems.map(item => (
                    <div
                      key={item._id}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex gap-4 cursor-pointer hover:shadow-md"
                      onClick={() => openLightbox(item)}
                    >
                      <div className="relative w-48 aspect-video overflow-hidden rounded-lg flex-shrink-0">
                        <img
                          src={`http://localhost:5000${item.imageUrl}`}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        {item.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <Play className="h-8 w-8 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{item.title}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded ${getCategoryColor(item.category)}`}>{item.category}</span>
                        </div>
                        <p className="text-gray-600 mb-2">{item.description}</p>
                        <div className="text-xs text-gray-500 flex flex-wrap gap-4">
                          {item.location && <div><MapPin className="inline h-3 w-3 mr-1"/> {item.location}</div>}
                          {item.date && <div><Calendar className="inline h-3 w-3 mr-1"/> {item.date}</div>}
                          {item.photographer && <div>📸 {item.photographer}</div>}
                          {item.dimensions && <div>📐 {item.dimensions}</div>}
                          {item.fileSize && <div>💾 {item.fileSize}</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {!loading && filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No media found</h3>
            </div>
          )}
        </section>
      </main>

      {/* Lightbox */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl">
            <button
              onClick={closeLightbox}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X className="h-7 w-7" />
            </button>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg p-4">
              <img
                src={`http://localhost:5000${selectedItem.imageUrl}`}
                alt={selectedItem.title}
                className="max-h-[50vh] max-w-full object-contain mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{selectedItem.title}</h3>
              <p className="text-gray-600 mb-2">{selectedItem.description}</p>
              <div className="flex items-center gap-4 mb-2">
                <a
                  href={`http://localhost:5000${selectedItem.imageUrl}`}
                  download
                  className="inline-flex items-center gap-1 text-sm font-medium text-blue-500 hover:underline"
                >
                  <Download className="h-4 w-4"/> Download
                </a>
                <span className="text-xs text-gray-400">{selectedItem.fileSize}</span>
              </div>
              <div className="text-sm text-gray-500 space-y-1">
                {selectedItem.category && <div>Category: {selectedItem.category}</div>}
                {selectedItem.date && <div>Date: {selectedItem.date}</div>}
                {selectedItem.location && <div>Location: {selectedItem.location}</div>}
                {selectedItem.photographer && <div>Photographer: {selectedItem.photographer}</div>}
                {selectedItem.dimensions && <div>Dimensions: {selectedItem.dimensions}</div>}
                {selectedItem.tags && <div>Tags: {selectedItem.tags.join(", ")}</div>}
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
