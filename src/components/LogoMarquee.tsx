"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"

  const MarqueeText: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gray-100 border-y border-gray-200 py-2 overflow-hidden relative">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 z-10 text-lg font-bold"
      >
        ×
      </button>
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Duplicate the content multiple times for seamless scrolling */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex whitespace-nowrap">
            <span className="text-sm text-gray-700 mx-8 flex items-center">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              करार सेवा दरखास्त फारम
            </span>
            <span className="text-sm text-gray-700 mx-8 flex items-center">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
              करार सेवामा पदपूर्ति सम्बन्धी सूचना
            </span>
            <span className="text-sm text-gray-700 mx-8 flex items-center">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10a2 2 0 002 2h4a2 2 0 002-2V11m-6 0h6"
                />
              </svg>
              आर्थिक वर्ष २०८२-०८३ को लागि सूची दर्ता गराउने सम्बन्धी सूचना !
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}


export default MarqueeText;