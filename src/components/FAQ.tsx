"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import axios from "axios"

interface FAQItem {
  _id: string
  q: string
  a: string
}

const FAQ: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([])
  const [open, setOpen] = useState<number | null>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get("https://talloserabackend.onrender.com/api/faqs") // Fetch FAQs from backend
      .then((res) => {
        setFaqs(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching FAQs:", err)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="text-center py-16 text-gray-500">Loading FAQs...</p>
  if (faqs.length === 0) return <p className="text-center py-16 text-gray-500">No FAQs available.</p>

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-center font-jakarta text-3xl sm:text-4xl font-semibold tracking-tight text-black mb-10">
          Frequently Asked Questions
        </h2>
        <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
          {faqs.map((f, idx) => (
            <div key={f._id} className="p-5 sm:p-6">
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="font-medium">{f.q}</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${open === idx ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {open === idx && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-sm text-black/70">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
