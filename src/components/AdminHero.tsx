"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"

interface Slide {
  _id?: string
  image: string
  tag: string
  titleA: string
  titleB: string
  desc: string
  cta: { label: string; href: string }
  icon: string
}

const AdminHero: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([])
  const [form, setForm] = useState<Omit<Slide, "_id">>({
    image: "",
    tag: "",
    titleA: "",
    titleB: "",
    desc: "",
    cta: { label: "", href: "" },
    icon: "Droplet",
  })
  const [file, setFile] = useState<File | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const API_URL = "http://localhost:5000/api/slides"

  // Fetch slides
  const fetchSlides = async () => {
    try {
      const response = await axios.get(API_URL)
      setSlides(response.data)
    } catch (err) {
      console.error("Error fetching slides:", err)
    }
  }

  useEffect(() => {
    fetchSlides()
  }, [])

  // Handle form submit (create or update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      if (file) formData.append("image", file)
      formData.append("tag", form.tag)
      formData.append("titleA", form.titleA)
      formData.append("titleB", form.titleB)
      formData.append("desc", form.desc)
      formData.append("cta[label]", form.cta.label)
      formData.append("cta[href]", form.cta.href)
      formData.append("icon", form.icon)

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      } else {
        await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      }

      // Reset form
      setForm({
        image: "",
        tag: "",
        titleA: "",
        titleB: "",
        desc: "",
        cta: { label: "", href: "" },
        icon: "Droplet",
      })
      setFile(null)
      setEditingId(null)
      setIsFormOpen(false)
      fetchSlides()
    } catch (err) {
      console.error("Error saving slide:", err)
    }
  }

  // Delete slide
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      fetchSlides()
    } catch (err) {
      console.error("Error deleting slide:", err)
    }
  }

  // Edit slide
  const handleEdit = (slide: Slide) => {
    setForm({
      image: slide.image,
      tag: slide.tag,
      titleA: slide.titleA,
      titleB: slide.titleB,
      desc: slide.desc,
      cta: slide.cta,
      icon: slide.icon,
    })
    setFile(null) // clear selected file
    setEditingId(slide._id || null)
    setIsFormOpen(true)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Hero Slides</h1>

      {/* Add New Slide Button */}
      <button
        onClick={() => {
          setIsFormOpen(true)
          setEditingId(null)
          setForm({
            image: "",
            tag: "",
            titleA: "",
            titleB: "",
            desc: "",
            cta: { label: "", href: "" },
            icon: "Droplet",
          })
          setFile(null)
        }}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        + Add Slide
      </button>

      {/* Slide Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Slide" : "Add Slide"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="border p-2 rounded"
                required={!editingId}
              />

              {/* Image Preview */}
              {(file || form.image) && (
                <img
                  src={file ? URL.createObjectURL(file) : form.image}
                  alt="Preview"
                  className="mb-2 w-full h-40 object-cover rounded"
                />
              )}

              <input
                placeholder="Tag"
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
                className="border p-2 rounded"
                required
              />
              <input
                placeholder="Title A"
                value={form.titleA}
                onChange={(e) => setForm({ ...form, titleA: e.target.value })}
                className="border p-2 rounded"
                required
              />
              <input
                placeholder="Title B"
                value={form.titleB}
                onChange={(e) => setForm({ ...form, titleB: e.target.value })}
                className="border p-2 rounded"
                required
              />
              <textarea
                placeholder="Description"
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                className="border p-2 rounded"
                required
              />
              <input
                placeholder="CTA Label"
                value={form.cta.label}
                onChange={(e) =>
                  setForm({ ...form, cta: { ...form.cta, label: e.target.value } })
                }
                className="border p-2 rounded"
              />
              <input
                placeholder="CTA Link"
                value={form.cta.href}
                onChange={(e) =>
                  setForm({ ...form, cta: { ...form.cta, href: e.target.value } })
                }
                className="border p-2 rounded"
              />
              <select
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className="border p-2 rounded"
              >
                <option value="Droplet">Droplet</option>
                <option value="Mountain">Mountain</option>
                <option value="Gauge">Gauge</option>
                <option value="BatteryCharging">BatteryCharging</option>
              </select>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {editingId ? "Update Slide" : "Add Slide"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Display Slides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {slides.map((slide) => (
          <div key={slide._id} className="p-4 border rounded shadow bg-white">
            <img
              src={slide.image}
              alt={slide.titleA}
              className="mb-2 w-full h-40 object-cover rounded"
            />
            <p className="font-semibold">{slide.tag}</p>
            <p>
              {slide.titleA} {slide.titleB}
            </p>
            <p className="text-sm text-gray-600">{slide.desc}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(slide)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              {slide._id && (
                <button
                  onClick={() => handleDelete(slide._id!)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminHero
