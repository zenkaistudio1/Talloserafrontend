import React, { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  imageUrl: string;
  location?: string;
  date?: string;
  photographer?: string;
  tags?: string[];
  featured?: boolean;
}

interface GalleryFormData {
  title: string;
  description: string;
  category: string;
  type: string;
  image: File | null;
  location?: string;
  date?: string;
  photographer?: string;
  tags: string;
  featured: boolean;
}

const categories = ["project", "facility", "event", "construction", "environment"];
const types = ["image", "video"];

const AdminGallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState<GalleryFormData>({
    title: "",
    description: "",
    category: "",
    type: "image",
    image: null,
    location: "",
    date: "",
    photographer: "",
    tags: "",
    featured: false,
  });
  const [saving, setSaving] = useState(false);

  // Fetch gallery items
  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://talloserabackend.onrender.com/api/gallery");
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Reset and close modal
  const closeModal = () => {
    setModalOpen(false);
    setEditItem(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      type: "image",
      image: null,
      location: "",
      date: "",
      photographer: "",
      tags: "",
      featured: false,
    });
  };

  // Open Add Modal
  const openAddModal = () => {
    closeModal();
    setModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (item: GalleryItem) => {
    setEditItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      type: item.type,
      image: null,
      location: item.location || "",
      date: item.date ? item.date.slice(0, 10) : "",
      photographer: item.photographer || "",
      tags: item.tags?.join(",") || "",
      featured: item.featured || false,
    });
    setModalOpen(true);
  };

  // Handle form change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files ? files[0] : null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("type", formData.type);
    if (formData.image) data.append("image", formData.image);
    if (formData.location) data.append("location", formData.location);
    if (formData.date) data.append("date", new Date(formData.date).toISOString());
    if (formData.photographer) data.append("photographer", formData.photographer);
    data.append("tags", formData.tags);
    data.append("featured", formData.featured ? "true" : "false");

    try {
      if (editItem) {
        await axios.put(`https://talloserabackend.onrender.com/api/gallery/${editItem._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("https://talloserabackend.onrender.com/api/gallery", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      await fetchItems();
      closeModal();
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data || err.message);
      } else {
        console.error(err);
      }
    } finally {
      setSaving(false);
    }
  };

  // Delete gallery item
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure to delete?")) return;
    try {
      await axios.delete(`https://talloserabackend.onrender.com/api/gallery/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Error deleting gallery item:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Gallery</h1>
      <button
        onClick={openAddModal}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add New
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Title</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td className="border p-2">{item.title}</td>
                <td className="border p-2">{item.category}</td>
                <td className="border p-2">{item.type}</td>
                <td className="border p-2">
                  <img
                    src={`https://talloserabackend.onrender.com${item.imageUrl}`}
                    alt={item.title}
                    className="h-16 w-24 object-cover"
                  />
                </td>
                <td className="border p-2 flex gap-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
            <button onClick={closeModal} className="absolute top-2 right-2">
              <X />
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {editItem ? "Edit" : "Add"} Gallery Item
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
                required
              >
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <input type="file" name="image" onChange={handleChange} />
              <input
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              />
              <input
                name="photographer"
                placeholder="Photographer"
                value={formData.photographer}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              />
              <input
                name="tags"
                placeholder="Tags (comma separated)"
                value={formData.tags}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                Featured
              </label>
              <button
                type="submit"
                className={`bg-blue-500 text-white px-4 py-2 rounded ${saving ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={saving}
              >
                {saving ? "Saving..." : editItem ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
