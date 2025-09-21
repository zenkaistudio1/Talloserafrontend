"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import { Droplet } from "lucide-react"

interface PopupData {
  title: string
  subtitle?: string
  description?: string
  fileUrl?: string | null
}

const WelcomePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [data, setData] = useState<PopupData | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch popup data from backend
  const fetchPopup = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/popup")
      if (res.status === 200) {
        setData(res.data)
      } else {
        setData(null)
      }
    } catch (err) {
      console.error("Error fetching popup:", err)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPopup()
  }, [])

  // Handle Escape key and disable body scroll
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen])

  if (!isOpen) return null

  // Helper to detect file type
  const renderPreview = () => {
    if (!data?.fileUrl) {
      return (
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600 mb-1">No Document Available</p>
          <p className="text-xs text-gray-500">Upload a document from the admin panel</p>
        </div>
      )
    }

    const filePath = `http://localhost:5000${data.fileUrl}`
    if (/\.(jpg|jpeg|png|gif)$/i.test(data.fileUrl)) {
      return (
        <img
          src={filePath}
          alt="Popup Document"
          className="w-full h-full object-contain rounded"
        />
      )
    } else if (/\.pdf$/i.test(data.fileUrl)) {
      return (
        <iframe
          src={filePath}
          title="Popup PDF"
          className="w-full h-full rounded"
        />
      )
    } else {
      return (
        <div className="text-center">
          <p className="text-sm text-gray-600">Unsupported file format</p>
        </div>
      )
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false) }}
    >
      <div className="bg-white rounded-xl w-full max-w-md sm:max-w-lg md:max-w-2xl max-h-[85vh] overflow-y-auto relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold bg-white rounded-full w-8 h-8 flex items-center justify-center shadow"
          aria-label="Close"
        >
          ×
        </button>

        {/* Header */}
        <div className="border-b border-gray-200 p-4 sm:p-5">
          <div className="flex flex-col items-center gap-3 sm:gap-4 mb-3">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-sky-600 rounded-full grid place-items-center shadow-lg shadow-sky-600/30">
              <Droplet className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="text-center">
              {loading ? (
                <p className="text-gray-500 text-sm">Loading...</p>
              ) : data ? (
                <>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">{data.title}</h1>
                  {data.subtitle && <h2 className="text-sm sm:text-base text-gray-700">{data.subtitle}</h2>}
                  {data.description && <p className="text-xs text-gray-600">{data.description}</p>}
                </>
              ) : (
                <p className="text-red-500 text-sm">No popup available</p>
              )}
            </div>
          </div>

          <div className="bg-gray-800 text-white text-center py-1.5 px-3 rounded">
            <h3 className="text-sm sm:text-base font-semibold">करार सेवा मा पदपूर्ति सम्बन्धी सूचना</h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5">
          <div className="w-full h-64 sm:h-72 md:h-80 bg-gray-100 rounded-lg mb-5 flex items-center justify-center border border-gray-300 overflow-hidden">
            {renderPreview()}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            {data?.fileUrl ? (
              <a
                href={`http://localhost:5000${data.fileUrl}`}
                download
                className="bg-sky-600 text-white px-5 py-2.5 rounded-lg hover:bg-sky-700 text-sm font-medium text-center"
              >
                Download File
              </a>
            ) : (
              <button
                disabled
                className="bg-sky-600/50 text-white px-5 py-2.5 rounded-lg text-sm font-medium cursor-not-allowed"
              >
                No File Available
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-600 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomePopup
