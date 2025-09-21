"use client"

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface PopupData {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  fileUrl: string;
  fileName: string;
}

const AdminPopup: React.FC = () => {
  const [popups, setPopups] = useState<PopupData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch latest popup
  const fetchPopups = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/popup");
      setPopups(res.data ? [res.data] : []);
    } catch (err) {
      console.error("Error fetching popups:", err);
      alert("Failed to fetch popups");
    }
  };

  useEffect(() => {
    fetchPopups();
  }, []);

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) setFile(e.target.files[0]);
  };

  // Handle popup submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !file) return alert("Title and file are required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("description", description);
    formData.append("file", file);

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/popup/admin", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Reset form
      setTitle("");
      setSubtitle("");
      setDescription("");
      setFile(null);
      setModalOpen(false);

      fetchPopups();
    } catch (err: any) {
      console.error("Error uploading popup:", err);
      if (err.response) {
        alert(`Upload failed: ${err.response.data.message}`);
      } else {
        alert("Upload failed. Check backend or file type.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this popup?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/popup/admin/${id}`);
      fetchPopups();
    } catch (err: any) {
      console.error("Error deleting popup:", err);
      if (err.response) {
        alert(`Delete failed: ${err.response.data.message}`);
      } else {
        alert("Delete failed. Check backend.");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Popup Management</h1>

      {/* Button to open modal */}
      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Add New Popup
      </button>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4"
          onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
        >
          <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold bg-white rounded-full w-8 h-8 flex items-center justify-center shadow"
              aria-label="Close"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold mb-4">Add New Popup</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Title *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="border px-3 py-2 rounded"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border px-3 py-2 rounded"
              />
              <input type="file" onChange={handleFileChange} />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Existing Popups */}
      <div className="bg-white shadow-sm rounded-lg p-4 mt-4">
        <h2 className="text-lg font-semibold mb-3">Existing Popups</h2>
        {popups.length === 0 ? (
          <p>No popups available.</p>
        ) : (
          popups.map((p) => (
            <div key={p._id} className="border-b py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{p.title}</p>
                  {p.subtitle && <p className="text-sm text-gray-600">{p.subtitle}</p>}
                  {p.description && <p className="text-sm text-gray-500">{p.description}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`http://localhost:5000${p.fileUrl}`}
                    target="_blank"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* File Preview */}
              <div className="mt-3">
                {/* Image Preview */}
                {/\.(jpg|jpeg|png)$/i.test(p.fileUrl) && (
                  <img
                    src={`http://localhost:5000${p.fileUrl}`}
                    alt={p.title}
                    className="max-w-sm rounded border"
                  />
                )}

                {/* PDF Preview */}
                {p.fileUrl.endsWith(".pdf") && (
                  <iframe
                    src={`http://localhost:5000${p.fileUrl}`}
                    className="w-full h-64 border rounded"
                    title="PDF Preview"
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPopup;
