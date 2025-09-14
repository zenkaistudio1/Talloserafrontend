"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const FAQ: React.FC = () => {
  const faqs = [
    {
      q: "Do you provide EPC for both RoR and reservoir projects?",
      a: "Yes, we handle full EPC from civil to electro-mechanical for both plant types.",
    },
    {
      q: "How do you ensure environmental compliance?",
      a: "ESIA, biodiversity plans, and continuous community engagement aligned with national guidelines.",
    },
    {
      q: "Can you support grid code compliance?",
      a: "We execute protection studies, relay settings, and FAT/SAT to meet grid codes.",
    },
    { q: "Do you offer O&M after COD?", a: "Yes, including predictive maintenance, uprates, and remote SCADA." },
  ]
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-center font-jakarta text-3xl sm:text-4xl font-semibold tracking-tight text-black mb-10">
          Frequently Asked Questions
        </h2>
        <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
          {faqs.map((f, idx) => (
            <div key={f.q} className="p-5 sm:p-6">
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