"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface MarqueeItem {
  _id: string;
  title: string;
  link: string;
}

const MarqueeText: React.FC = () => {
  const [items, setItems] = useState<MarqueeItem[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch marquee items from backend
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/marquee");
        setItems(res.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch marquee items:", err);
        setError("Failed to load marquee items.");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-gray-100 border-y border-gray-200 py-2 overflow-hidden relative">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 z-10 text-lg font-bold"
      >
        ×
      </button>

      {loading ? (
        <p className="text-center text-gray-500">Loading marquee...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-500">No marquee items found.</p>
      ) : (
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="flex whitespace-nowrap">
              {items.map((item) => (
                <a
                  key={item._id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-700 mx-8 flex items-center hover:text-blue-600"
                >
                  <svg
                    className="w-4 h-4 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  {item.title}
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarqueeText;
