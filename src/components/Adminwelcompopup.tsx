"use client"

import type React from "react"
import { useState, useEffect, type ChangeEvent, type FormEvent } from "react"
import axios from "axios"

interface PopupData {
  _id: string
  title: string
  subtitle?: string
  description?: string
  nepaliNotice?: string
  fileUrl: string
  fileName: string
}

const AdminPopup: React.FC = () => {
  const [popups, setPopups] = useState<PopupData[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [description, setDescription] = useState("")
  const [nepaliNotice, setNepaliNotice] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const API_BASE = "https://talloserabackend.onrender.com"

  // ---------------- Fetch Latest Popup ----------------
  const fetchPopups = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/popup`)
      setPopups(res.data ? [res.data] : [])
    } catch (err) {
      console.error("Error fetching popups:", err)
      alert("Failed to fetch popups.")
    }
  }

  useEffect(() => {
    fetchPopups()
  }, [])

  // ---------------- File Change ----------------
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]

      if (!selectedFile.name.toLowerCase().endsWith(".pdf")) {
        alert("Please upload only PDF files.")
        return
      }

      setFile(selectedFile)
      setPreviewUrl(URL.createObjectURL(selectedFile))
    }
  }

  // ---------------- Submit New Popup ----------------
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !file) {
      alert("Title and PDF file are required.")
      return
    }

    const formData = new FormData()
    formData.append("title", title)
    formData.append("subtitle", subtitle)
    formData.append("description", description)
    formData.append("nepaliNotice", nepaliNotice)
    formData.append("file", file)

    try {
      setLoading(true)
      await axios.post(`${API_BASE}/api/popup/admin`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      alert("Popup uploaded successfully ✅")
      setTitle("")
      setSubtitle("")
      setDescription("")
      setNepaliNotice("")
      setFile(null)
      setPreviewUrl(null)
      setModalOpen(false)
      fetchPopups()
    } catch (err: any) {
      console.error("Error uploading popup:", err)
      alert(err.response?.data?.message || "Upload failed. Check backend or file type.")
    } finally {
      setLoading(false)
    }
  }

  // ---------------- Delete Popup ----------------
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this popup?")) return
    try {
      await axios.delete(`${API_BASE}/api/popup/admin/${id}`)
      fetchPopups()
    } catch (err: any) {
      console.error("Error deleting popup:", err)
      alert(err.response?.data?.message || "Delete failed. Check backend.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Hydropower Popup Management</h1>
          <p className="text-slate-600">Upload and manage important project notices (PDF only)</p>
        </div>

        {/* Add Button */}
        <button
          onClick={() => setModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium mb-6"
        >
          + Add New Popup
        </button>

        {/* ---------------- Modal ---------------- */}
        {modalOpen && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
          >
            <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                ×
              </button>

              <h2 className="text-2xl font-bold text-slate-900 mb-6">Add New Popup</h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Title *"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-2 border-slate-200 px-4 py-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  required
                />
                <input
                  type="text"
                  placeholder="Subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="border-2 border-slate-200 px-4 py-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border-2 border-slate-200 px-4 py-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                />
                <textarea
                  placeholder="Nepali Notice"
                  value={nepaliNotice}
                  onChange={(e) => setNepaliNotice(e.target.value)}
                  className="border-2 border-slate-200 px-4 py-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                />
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="border-2 border-dashed border-slate-300 px-4 py-3 rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
                  required
                />

                {/* PDF Preview */}
                {previewUrl && (
                  <iframe
                    src={previewUrl}
                    className="w-full h-64 border border-slate-200 rounded-lg mt-2"
                    title="PDF Preview"
                  />
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium disabled:opacity-50"
                >
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ---------------- Existing Popups ---------------- */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Existing Popups</h2>
          {popups.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No popups available yet</p>
          ) : (
            <div className="space-y-4">
              {popups.map((p) => (
                <div key={p._id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{p.title}</p>
                      {p.subtitle && <p className="text-sm text-slate-600 mt-1">{p.subtitle}</p>}
                      {p.description && <p className="text-sm text-slate-500 mt-1">{p.description}</p>}
                      {p.nepaliNotice && <p className="text-sm text-slate-700 mt-1">{p.nepaliNotice}</p>}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <a
                        href={`${API_BASE}${p.fileUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-700 hover:underline text-sm font-medium"
                      >
                        View
                      </a>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="text-red-600 hover:text-red-700 hover:underline text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* PDF Preview */}
                  {p.fileUrl.endsWith(".pdf") && (
                    <iframe
                      src={`${API_BASE}${p.fileUrl}`}
                      className="w-full h-64 border border-slate-200 rounded-lg"
                      title="PDF Preview"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPopup
