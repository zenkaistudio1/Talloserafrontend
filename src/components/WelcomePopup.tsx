// components/WelcomePopup.tsx
"use client"

import React, { useState, useEffect } from "react"
import { Droplet } from "lucide-react"

const WelcomePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false) }
    document.addEventListener("keydown", onKey)
    // lock scroll while open
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4"
      onClick={(e) => {
        // close when clicking the dimmed backdrop
        if (e.target === e.currentTarget) setIsOpen(false)
      }}
    >
      <div className="bg-white rounded-xl w-full max-w-md sm:max-w-lg md:max-w-2xl max-h-[85vh] overflow-y-auto relative shadow-2xl">
        {/* Close */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold bg-white rounded-full w-8 h-8 flex items-center justify-center shadow"
          aria-label="Close"
        >
          ×
        </button>

      
<div className="border-b border-gray-200 p-4 sm:p-5">
  <div className="flex flex-col items-center gap-3 sm:gap-4 mb-3">
    {/* Droplet Icon on top */}
    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-sky-600 rounded-full grid place-items-center shadow-lg shadow-sky-600/30">
      <Droplet className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
    </div>

    {/* Text */}
    <div className="text-center">
      <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">Tallosera Hydro limited</h1>
      <h2 className="text-sm sm:text-base text-gray-700">तल्लोसेरा हाइड्रो लिमिटेड</h2>
      <p className="text-xs text-gray-600">कार्यालय, काठमाडौं - ३२</p>
    </div>
  </div>

  <div className="bg-gray-800 text-white text-center py-1.5 px-3 rounded">
    <h3 className="text-sm sm:text-base font-semibold">करार सेवा मा पदपूर्ति सम्बन्धी सूचना</h3>
  </div>
</div>


        {/* Body */}
        <div className="p-4 sm:p-5">
          <div className="w-full h-48 sm:h-56 md:h-64 bg-gray-100 rounded-lg mb-5 flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm font-medium text-gray-600 mb-1">Important Document</p>
              <p className="text-xs text-gray-500">Document image will be loaded from backend</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => setIsOpen(false)}
              className="bg-sky-600 text-white px-5 py-2.5 rounded-lg hover:bg-sky-700 text-sm font-medium"
            >
              View Full Document
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-600 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 text-sm font-medium"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomePopup