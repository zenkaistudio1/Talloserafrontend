"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface MarqueeItem {
  _id: string;
  title: string;
  link: string;
}

const API_URL = "http://localhost:5000/api/marquee";

const MarqueeAdmin: React.FC = () => {
  const [items, setItems] = useState<MarqueeItem[]>([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all items
  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch marquee items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: must have title + (file or link)
    if (!title || (!file && !link)) {
      setError("Please provide a title and either a link or a file.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      if (file) formData.append("file", file);
      if (!file && link) formData.append("link", link); // only append link if no file

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData); // ✅ No manual headers
      } else {
        await axios.post(API_URL, formData); // ✅ No manual headers
      }

      // Reset form
      setTitle("");
      setLink("");
      setFile(null);
      setEditingId(null);
      setError(null);
      await fetchItems();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to save item. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // Edit an item
  const handleEdit = (item: MarqueeItem) => {
    setTitle(item.title);
    setLink(item.link.startsWith("/uploads/") ? "" : item.link); // clear link if it's a file
    setFile(null);
    setEditingId(item._id);
  };

  // Delete an item
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setError(null);
      await fetchItems();
    } catch (err: any) {
      console.error(err);
      setError("Failed to delete item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Marquee Admin Panel</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Link (optional if uploading a file)"
          className="border p-2 rounded"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="border p-2 rounded"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {editingId ? "Update Item" : "Add Item"}
        </button>
      </form>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">Title</th>
              <th className="border p-2 text-left">Link/File</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length ? (
              items.map((item) => (
                <tr key={item._id}>
                  <td className="border p-2">{item.title}</td>
                  <td className="border p-2">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {item.link}
                    </a>
                  </td>
                  <td className="border p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center p-4">
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MarqueeAdmin;
