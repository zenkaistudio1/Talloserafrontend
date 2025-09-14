"use client"

import React from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Gauge, BatteryCharging, CheckCircle } from "lucide-react"

const Others: React.FC = () => {
  const pills = [
    { label: "Bankable DPRs" },
    { label: "Lender Standards" },
    { label: "Zero-Harm Safety" },
    { label: "Grid Code Ready" },
  ]

  const benefits = [
    {
      icon: ShieldCheck,
      title: "Risk-Controlled Delivery",
      desc: "Stage-gated schedules, QA/QC plans, and HSE playbooks reduce delays and rework.",
      points: ["Detailed risk registers", "Independent QA/QC", "HSE audits"],
    },
    {
      icon: Gauge,
      title: "High Capacity Factors",
      desc: "Hydrology, EM selection, and protection studies tuned for reliable output.",
      points: ["Hydro & sediment studies", "Optimal turbine selection", "Relay coordination"],
    },
    {
      icon: BatteryCharging,
      title: "Lower OpEx Over Life",
      desc: "Predictive maintenance and uprates extend asset life and cut outages.",
      points: ["CBM & spares strategy", "Efficiency testing", "SCADA & remote ops"],
    },
  ]

  return (
    <section className="pt-4 sm:pt-6 pb-16 sm:pb-24 bg-gradient-to-b from-white to-sky-50/40">
      <div className="mx-auto max-w-7xl px-4 mt-0">
       <div className="text-center mb-8 mt-12 sm:mt-16">
  <h2 className="font-jakarta text-3xl sm:text-4xl font-bold text-black">
    More from Tallosera Hydropower
  </h2>
  <p className="mt-1 text-black/70 max-w-2xl mx-auto">
    Additional highlights and commitments that ensure sustainable and bankable hydropower delivery.
  </p>
</div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-2 rounded-3xl border border-sky-100 bg-white shadow-md p-8 sm:p-10"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 text-sky-700 px-3 py-1 text-xs font-medium mb-4">
              Snapshot
            </div>
            <h3 className="font-jakarta text-2xl sm:text-3xl font-semibold tracking-tight text-black">
              Bankable hydropower.{" "}
              <span className="text-sky-600">Built for the grid.</span>
            </h3>
            <p className="mt-3 text-black/70 max-w-2xl">
              From feasibility to COD and O&M, we deliver lender-grade documentation, safe execution,
              and dispatch-ready plants that perform across projects.
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              {pills.map((p) => (
                <span
                  key={p.label}
                  className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50/60 px-3 py-1 text-xs text-sky-800"
                >
                  {p.label}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-3xl bg-gradient-to-br from-sky-600 to-sky-500 text-white p-8 sm:p-10 shadow-md"
          >
            <div className="text-white/90 text-sm">Snapshot</div>
            <div className="mt-2 text-3xl font-semibold">1.2 GW+</div>
            <div className="text-white/90">Installed Capacity</div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-sm text-white/80">Projects</div>
                <div className="text-xl font-semibold">10+</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-sm text-white/80">Power Generation</div>
                <div className="text-xl font-semibold">45 GWh/yr</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, index) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
              className="rounded-2xl border border-sky-100 bg-white shadow-md p-6 sm:p-7 flex flex-col items-start"
            >
              <div className="grid h-12 w-12 place-items-center rounded-full bg-sky-100 mb-4">
                <b.icon className="h-6 w-6 text-sky-600" />
              </div>
              <h4 className="font-jakarta text-xl font-semibold tracking-tight text-black mb-1">{b.title}</h4>
              <p className="font-inter text-sm text-black/70 mb-4">{b.desc}</p>
              <ul className="list-none space-y-1 mt-auto">
                {b.points.map((p) => (
                  <li key={p} className="flex items-center text-sm text-black/80">
                    <CheckCircle className="h-4 w-4 text-sky-600 mr-2 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Others;