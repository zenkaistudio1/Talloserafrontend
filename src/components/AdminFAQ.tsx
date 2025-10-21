"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";

interface FAQItem {
  _id: string;
  q: string;
  a: string;
}

const AdminFAQ: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchFAQs = async () => {
    try {
      const res = await axios.get("https://talloserabackend.onrender.com/api/faqs");
      setFaqs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`https://talloserabackend.onrender.com/api/faqs/${editingId}`, { q, a });
      } else {
        await axios.post("https://talloserabackend.onrender.com/api/faqs", { q, a });
      }
      setQ("");
      setA("");
      setEditingId(null);
      fetchFAQs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (faq: FAQItem) => {
    setQ(faq.q);
    setA(faq.a);
    setEditingId(faq._id);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://talloserabackend.onrender.com/api/faqs/${id}`);
      fetchFAQs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage FAQs</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Question"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />
        <textarea
          placeholder="Answer"
          value={a}
          onChange={(e) => setA(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />
        <button className="px-6 py-3 bg-blue-600 text-white rounded">
          {editingId ? "Update FAQ" : "Add FAQ"}
        </button>
      </form>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <div key={faq._id} className="p-4 bg-white rounded shadow flex justify-between items-center">
            <div>
              <p className="font-medium">{faq.q}</p>
              <p className="text-gray-600">{faq.a}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(faq)}
                className="px-3 py-1 bg-yellow-400 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(faq._id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFAQ;
