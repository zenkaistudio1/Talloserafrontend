"use client"

import React from "react"
import { motion } from "framer-motion"
import { CheckCircle, Clock, AlertCircle, ArrowUpRight } from "lucide-react"

const ProjectsSection: React.FC = () => {
  const projectPhases = [
    {
      image: "https://westernexcavationnd.com/wp-content/uploads/2022/08/Site-development-3-1024x683.jpeg",
      phase: "Phase 1",
      title: "Site Development & Infrastructure",
      progress: 85,
      status: "Nearly Complete",
      statusIcon: CheckCircle,
      statusColor: "text-emerald-600",
      description: "Dam construction, access roads, and primary infrastructure completed. Final safety inspections in progress.",
      milestones: ["Foundation Complete", "Access Roads Built", "Safety Systems Installed"]
    },
    {
      image: "https://www.enerpac.com/ccstore/v1/images/?source=/file/v1448728257236948400/products/Turbine-Installation-SBL1100-Gantry-20141114_110327.jpg",
      phase: "Phase 2",
      title: "Turbine Installation & Power House",
      progress: 68,
      status: "In Progress",
      statusIcon: Clock,
      statusColor: "text-blue-600",
      description: "Turbine assembly 70% complete. Electrical systems and control room setup underway. On schedule for Q2 completion.",
      milestones: ["Turbines 70% Installed", "Control Room Setup", "Testing Phase Initiated"]
    },
    {
      image: "https://a57.foxnews.com/media.foxbusiness.com/BrightCove/854081161001/201608/851/0/0/854081161001_5079800206001_solar-panels-ap1.jpg?ve=1&tl=1",
      phase: "Phase 3",
      title: "Grid Connection & Commissioning",
      progress: 32,
      status: "Upcoming",
      statusIcon: AlertCircle,
      statusColor: "text-amber-600",
      description: "Substation construction started. Grid integration planning complete. Expected commissioning by Q3 2024.",
      milestones: ["Substation 30% Complete", "Grid Planning Done", "Testing Protocols Ready"]
    },
  ]

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-emerald-500"
    if (progress >= 50) return "bg-blue-500"
    return "bg-amber-500"
  }

  const getProgressBgColor = (progress: number) => {
    if (progress >= 80) return "bg-emerald-100"
    if (progress >= 50) return "bg-blue-100"
    return "bg-amber-100"
  }

  return (
    <section id="projects" className="py-12 sm:py-16 bg-gradient-to-br from-slate-50 to-sky-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-4xl font-semibold text-black mb-2">
            Current Project Progress
          </h2>
          <p className="font-inter text-black/60 max-w-3xl mx-auto text-base sm:text-lg">
            Real-time updates on our 120 MW hydropower development across all major phases.
          </p>
        </div>

        {/* Phase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectPhases.map((phase, idx) => (
            <motion.article
              key={phase.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all border border-sky-100"
            >
              {/* Image */}
              <div className="relative aspect-[16/9]">
                <img
                  src={phase.image}
                  alt={phase.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-2 left-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-black backdrop-blur-sm shadow">
                    {phase.phase}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                {/* Status */}
                <div className="flex items-center gap-2 text-sm">
                  <phase.statusIcon className={`${phase.statusColor} h-4 w-4`} />
                  <span className={`${phase.statusColor} font-medium text-sm`}>{phase.status}</span>
                </div>

                <h3 className="font-jakarta text-lg font-semibold text-black line-clamp-2">{phase.title}</h3>

                {/* Progress bar */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-black/70 font-medium">Progress</span>
                    <span className="text-xs font-bold text-black">{phase.progress}%</span>
                  </div>
                  <div className={`w-full ${getProgressBgColor(phase.progress)} rounded-full h-2`}>
                    <motion.div
                      className={`${getProgressColor(phase.progress)} h-2 rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${phase.progress}%` }}
                      transition={{ duration: 1.2, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-black/70 line-clamp-2">{phase.description}</p>

                {/* Milestones inline */}
                <div className="flex flex-wrap gap-1">
                  {phase.milestones.map((m, i) => (
                    <span key={i} className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-8 text-center">
  <motion.a
    href="/projects"  // updated link
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    viewport={{ once: true }}
    className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-white font-medium hover:bg-sky-700 transition-colors shadow"
  >
    View more <ArrowUpRight className="h-4 w-4" />
  </motion.a>
</div>

      </div>
    </section>
  )
}


export default ProjectsSection