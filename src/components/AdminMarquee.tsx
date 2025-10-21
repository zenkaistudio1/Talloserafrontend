"use client"

import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"

interface MarqueeItem {
  _id: string
  title: string
  link: string
}

const API_URL = "https://talloserabackend.onrender.com/api/marquee" // Ensure this matches your backend

const MarqueeAdmin: React.FC = () => {
  const [items, setItems] = useState<MarqueeItem[]>([])
  const [title, setTitle] = useState("")
  const [link, setLink] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch all items
  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await axios.get(API_URL)
      setItems(res.data)
      setError(null)
    } catch (err: any) {
      console.error(err)
      setError("Failed to fetch marquee items")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  // Add or update item
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !link) return

    setLoading(true)
    try {
      if (editingId) {
        // Update
        await axios.put(`${API_URL}/${editingId}`, { title, link })
      } else {
        // Create
        await axios.post(API_URL, { title, link })
      }
      setTitle("")
      setLink("")
      setEditingId(null)
      await fetchItems()
      setError(null)
    } catch (err: any) {
      console.error(err)
      setError("Failed to save item. Make sure the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  // Edit item
  const handleEdit = (item: MarqueeItem) => {
    setTitle(item.title)
    setLink(item.link)
    setEditingId(item._id)
  }

  // Delete item
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return
    setLoading(true)
    try {
      await axios.delete(`${API_URL}/${id}`)
      await fetchItems()
      setError(null)
    } catch (err: any) {
      console.error(err)
      setError("Failed to delete item.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Marquee Admin Panel</h1>
          <p className="text-slate-600">Manage scrolling marquee content</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-200 mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Add or Update Item</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              className="border-2 border-slate-200 p-3 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Link (PDF or page URL)"
              className="border-2 border-slate-200 p-3 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium disabled:opacity-50"
              disabled={loading}
            >
              {editingId ? "Update Item" : "Add Item"}
            </button>
          </form>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading items...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-md p-8 text-center border border-slate-200">
                <p className="text-slate-500">No items found</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-md border border-slate-200 p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm truncate block mt-1"
                      >
                        {item.link}
                      </a>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg transition-colors font-medium text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors font-medium text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MarqueeAdmin
