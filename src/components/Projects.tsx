"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { CheckCircle, Clock, AlertCircle, ArrowUpRight } from "lucide-react"
import { ScrollProgress, Header, Footer, GlobalFixes } from "../components/site-chrome"

interface Phase {
  _id?: string
  image?: string
  phase: string
  title: string
  progress: number
  status: string
  description: string
  milestones?: string[]
}

const ProjectsContinuation: React.FC = () => {
  const [phases, setPhases] = useState<Phase[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchPhases = async () => {
      try {
        // ⚡ Update the URL if backend is on a different port
        const res = await axios.get("http://localhost:5000/api/projects")
        console.log("Backend response:", res.data)

        let dataArray: Phase[] = []

        // Handle different possible backend structures
        if (Array.isArray(res.data)) {
          dataArray = res.data
        } else if (res.data.projects && Array.isArray(res.data.projects)) {
          dataArray = res.data.projects
        } else if (res.data.data && Array.isArray(res.data.data)) {
          dataArray = res.data.data
        } else {
          console.warn("Unexpected backend response format:", res.data)
          setError("Backend returned unexpected data format")
          return
        }

        const safeData: Phase[] = dataArray.map((phase: any) => ({
          _id: phase._id,
          image: phase.image || "",
          phase: phase.phase || "Phase",
          title: phase.title || "Untitled",
          progress: Number(phase.progress) || 0,
          status: phase.status || "Upcoming",
          description: phase.description || "",
          milestones: Array.isArray(phase.milestones) ? phase.milestones : [],
        }))

        setPhases(safeData)
      } catch (err: any) {
        console.error("Failed to fetch project phases:", err)
        setError("Failed to load project data")
      } finally {
        setLoading(false)
      }
    }

    fetchPhases()
  }, [])

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

  const getStatusIcon = (status: string) => {
    const s = status.toLowerCase()
    if (s.includes("complete")) return CheckCircle
    if (s.includes("progress")) return Clock
    return AlertCircle
  }

  const getStatusColor = (status: string) => {
    const map: Record<string, string> = {
      "upcoming": "text-amber-600",
      "in progress": "text-blue-600",
      "nearly complete": "text-emerald-600",
    }
    return map[status.toLowerCase()] || "text-gray-600"
  }

  const getImageUrl = (image?: string) =>
    image ? `http://localhost:5000/uploads/${image}` : "https://via.placeholder.com/600x338?text=No+Image"

  if (loading) return <div className="text-center py-20 text-gray-500">Loading projects...</div>
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>

  return (
    <section id="projects" className="py-12 sm:py-16 bg-gradient-to-br from-slate-50 to-sky-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-4xl font-semibold text-black mb-2">
            Project Progress Overview
          </h2>
          <p className="font-inter text-black/60 max-w-3xl mx-auto text-base sm:text-lg">
            Real-time updates on all phases of our 120 MW hydropower development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phases.map((phase, idx) => {
            const StatusIcon = getStatusIcon(phase.status)
            const statusColor = getStatusColor(phase.status)
            const progress = phase.progress

            return (
              <motion.article
                key={phase._id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all border border-sky-100"
              >
                <div className="relative aspect-[16/9]">
                  <img
                    src={getImageUrl(phase.image)}
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

                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <StatusIcon className={`${statusColor} h-4 w-4`} />
                    <span className={`${statusColor} font-medium text-sm`}>{phase.status}</span>
                  </div>

                  <h3 className="font-jakarta text-lg font-semibold text-black line-clamp-2">{phase.title}</h3>

                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-black/70 font-medium">Progress</span>
                      <span className="text-xs font-bold text-black">{progress}%</span>
                    </div>
                    <div className={`w-full ${getProgressBgColor(progress)} rounded-full h-2`}>
                      <motion.div
                        className={`${getProgressColor(progress)} h-2 rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progress}%` }}
                        transition={{ duration: 1.2, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-black/70 line-clamp-2">{phase.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {(phase.milestones && phase.milestones.length > 0
                      ? phase.milestones
                      : ["No milestones yet"]
                    ).map((m, i) => (
                      <span key={`${phase._id}-${i}`} className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <motion.a
            href="/projects"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-white font-medium hover:bg-sky-700 transition-colors shadow cursor-pointer"
          >
            View more <ArrowUpRight className="h-4 w-4" />
          </motion.a>
        </div>
      </div>
    </section>
  )
}

const ProjectsPage: React.FC = () => {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <ProjectsContinuation />
      </main>
      <Footer />
      <GlobalFixes />
    </>
  )
}

export default ProjectsPage
