"use client"

import React from "react"
import { motion } from "framer-motion"

const ProcessSection: React.FC = () => {
  const steps = [
    { title: "Feasibility & ESIA", text: "Hydrology, geotech, environment, and community consultations." },
    { title: "Design & DPR", text: "Optimized civil/EM design, BOQs, and financial modeling." },
    { title: "EPC & Testing", text: "Construction, installation, pre-commissioning, and reliability runs." },
    { title: "Grid Sync & O&M", text: "Grid code compliance, COD, and long-term services." },
  ]
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center font-jakarta text-3xl sm:text-4xl font-semibold tracking-tight text-black mb-12">
          Our Proven Process
        </h2>
        <div className="relative">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-sky-200 via-sky-400 to-sky-600" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {steps.map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative ${idx % 2 === 0 ? "md:text-right md:pr-16" : "md:pl-16"}`}
              >
                <div
                  className={`absolute top-2 h-3 w-3 rounded-full bg-sky-600 shadow-[0_0_0_6px_rgba(56,189,248,0.25)] ${
                    idx % 2 === 0 ? "right-[-7px] md:right-[-9px]" : "left-[-7px] md:left-[-9px]"
                  }`}
                />
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="font-semibold">{s.title}</div>
                  <p className="text-sm text-black/60 mt-1.5">{s.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


export default ProcessSection