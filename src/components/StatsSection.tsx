"use client"

import React from "react"
import { motion } from "framer-motion"
import { Droplet, Users, Clock, Award } from "lucide-react"

const StatsSection: React.FC = () => {
  const stats = [
    { icon: Droplet, value: "1.2 GW+", label: "Installed Capacity" },
    { icon: Users, value: "300+", label: "Engineers & Staff" },
    { icon: Clock, value: "20+ yrs", label: "Hydro Experience" },
    { icon: Award, value: "ISO 9001/14001", label: "Certified Systems" },
  ]

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              viewport={{ once: true, margin: "-60px" }}
              className="rounded-2xl border border-sky-100 bg-gradient-to-br from-white to-sky-50 shadow-md hover:shadow-lg transition-all"
            >
              <div className="p-5 flex flex-col">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-sky-100 mb-3">
                  <stat.icon className="h-6 w-6 text-sky-600" />
                </div>
                <div className="font-jakarta text-2xl sm:text-3xl font-semibold text-black leading-none mb-1">
                  {stat.value}
                </div>
                <div className="font-inter text-sm text-black/60">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection;