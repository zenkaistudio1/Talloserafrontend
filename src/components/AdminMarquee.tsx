"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface MarqueeItem {
  _id: string;
  title: string;
  link: string;
}

const API_URL = "http://localhost:5000/api/marquee"; // Ensure this matches your backend

const MarqueeAdmin: React.FC = () => {
  const [items, setItems] = useState<MarqueeItem[]>([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
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

  // Add or update item
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !link) return;

    setLoading(true);
    try {
      if (editingId) {
        // Update
        await axios.put(`${API_URL}/${editingId}`, { title, link });
      } else {
        // Create
        await axios.post(API_URL, { title, link });
      }
      setTitle("");
      setLink("");
      setEditingId(null);
      await fetchItems();
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Failed to save item. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // Edit item
  const handleEdit = (item: MarqueeItem) => {
    setTitle(item.title);
    setLink(item.link);
    setEditingId(item._id);
  };

  // Delete item
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchItems();
      setError(null);
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

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Form */}
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
          placeholder="Link (PDF or page URL)"
          className="border p-2 rounded"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {editingId ? "Update Item" : "Add Item"}
        </button>
      </form>

      {/* Item List */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">Title</th>
              <th className="border p-2 text-left">Link</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
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
            ))}
            {items.length === 0 && (
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
