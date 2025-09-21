"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

interface ProjectPhase {
  _id?: string;
  phase: string;
  title: string;
  image?: File | string;
  progress: number;
  status: "Upcoming" | "In Progress" | "Nearly Complete";
  statusColor?: string;
  description: string;
  milestones: string[];
}

const AdminProjects: React.FC = () => {
  const [phases, setPhases] = useState<ProjectPhase[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<ProjectPhase>({
    phase: "",
    title: "",
    image: undefined,
    progress: 0,
    status: "Upcoming",
    statusColor: "",
    description: "",
    milestones: [],
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Helper to get full image URL
  const getImageUrl = (image?: string | File) => {
    if (!image) return "https://via.placeholder.com/150x100?text=No+Image";
    if (typeof image === "string") return `http://localhost:5000/uploads/${image}`;
    return URL.createObjectURL(image); // preview for File object
  };

  // Fetch all phases
  const fetchPhases = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects");
      setPhases(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhases();
  }, []);

  const openModal = (phase?: ProjectPhase) => {
    if (phase) {
      setForm({
        ...phase,
        image: phase.image || undefined,
      });
      setEditingId(phase._id!);
    } else {
      setForm({
        phase: "",
        title: "",
        image: undefined,
        progress: 0,
        status: "Upcoming",
        statusColor: "",
        description: "",
        milestones: [],
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, image: e.target.files[0] });
    }
  };

  const handleMilestonesChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const newMilestones = [...form.milestones];
    newMilestones[idx] = e.target.value;
    setForm({ ...form, milestones: newMilestones });
  };

  const addMilestoneField = () => setForm({ ...form, milestones: [...form.milestones, ""] });
  const removeMilestoneField = (idx: number) =>
    setForm({ ...form, milestones: form.milestones.filter((_, i) => i !== idx) });

  // Create or Update
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("phase", form.phase);
      formData.append("title", form.title);
      formData.append("progress", String(form.progress));
      formData.append("status", form.status);
      formData.append("description", form.description);
      formData.append("milestones", JSON.stringify(form.milestones));
      if (form.image instanceof File) formData.append("image", form.image); // only File for upload

      if (editingId) {
        await axios.put(`http://localhost:5000/api/projects/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Phase updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/projects", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Phase added successfully!");
      }

      fetchPhases();
      closeModal();
    } catch (err: any) {
      console.error(err.response || err);
      alert(err.response?.data?.message || "Error saving phase");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this phase?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      fetchPhases();
    } catch (err: any) {
      console.error(err.response || err);
      alert(err.response?.data?.message || "Error deleting phase");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Manage Project Phases</h1>

      <button
        onClick={() => openModal()}
        className="bg-sky-600 text-white px-6 py-2 rounded mb-4"
      >
        Add New Phase
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-xl p-6 rounded-2xl shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-semibold mb-4">
              {editingId ? "Edit Phase" : "Add Phase"}
            </h2>

            <div className="space-y-3">
              <input
                name="phase"
                value={form.phase}
                onChange={handleChange}
                placeholder="Phase (e.g., Phase 1)"
                className="w-full border p-2 rounded"
              />
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border p-2 rounded"
              />

              {/* File input + preview */}
              <input type="file" onChange={handleFileChange} className="w-full border p-2 rounded" />
              {form.image && (
                <img
                  src={getImageUrl(form.image)}
                  alt="Preview"
                  className="w-32 h-20 object-cover rounded mt-2 border"
                />
              )}

              <input
                name="progress"
                type="number"
                value={form.progress}
                onChange={handleChange}
                placeholder="Progress %"
                className="w-full border p-2 rounded"
              />
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="In Progress">In Progress</option>
                <option value="Nearly Complete">Nearly Complete</option>
              </select>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border p-2 rounded"
              />
              <div className="space-y-2">
                {form.milestones.map((m, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      value={m}
                      onChange={(e) => handleMilestonesChange(e, idx)}
                      placeholder={`Milestone ${idx + 1}`}
                      className="w-full border p-2 rounded"
                    />
                    <button
                      onClick={() => removeMilestoneField(idx)}
                      className="bg-red-500 text-white px-2 rounded"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  onClick={addMilestoneField}
                  className="bg-sky-600 text-white px-4 py-2 rounded"
                >
                  Add Milestone
                </button>
              </div>
              <button
                onClick={handleSubmit}
                className="bg-emerald-600 text-white px-6 py-2 rounded w-full"
              >
                {editingId ? "Update Phase" : "Add Phase"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          phases.map((phase) => (
            <div
              key={phase._id}
              className="bg-white p-4 rounded-2xl shadow-md flex justify-between items-center"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={getImageUrl(phase.image)}
                  alt={phase.title}
                  className="w-32 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold">
                    {phase.phase}: {phase.title}
                  </h2>
                  <p className="text-sm text-gray-600">{phase.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(phase)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(phase._id!)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminProjects;
