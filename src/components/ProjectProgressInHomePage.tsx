"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, AlertCircle, ArrowUpRight } from "lucide-react";
import axios from "axios";

interface ProjectPhase {
  _id: string;
  phase: string;
  title: string;
  image?: string;
  progress: number | string;
  status: string;
  description: string;
  milestones?: string[];
}

const STATUS_COLOR_MAP: Record<string, string> = {
  "upcoming": "text-amber-600",
  "in progress": "text-blue-600",
  "nearly complete": "text-emerald-600",
};

const ProjectsSection: React.FC = () => {
  const [projectPhases, setProjectPhases] = useState<ProjectPhase[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch project phases
  const fetchPhases = async () => {
    try {
      const res = await axios.get("https://talloserabackend.onrender.com/api/projects");
      setProjectPhases(res.data);
    } catch (err) {
      console.error("Error fetching project phases:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhases();
  }, []);

  // Helper: get full image URL
  const getImageUrl = (image?: string) => {
    if (!image) return "https://via.placeholder.com/600x338?text=No+Image";
    return `https://talloserabackend.onrender.com/uploads/${image}`;
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-emerald-500";
    if (progress >= 50) return "bg-blue-500";
    return "bg-amber-500";
  };

  const getProgressBgColor = (progress: number) => {
    if (progress >= 80) return "bg-emerald-100";
    if (progress >= 50) return "bg-blue-100";
    return "bg-amber-100";
  };

  const getStatusIcon = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes("complete")) return CheckCircle;
    if (s.includes("progress")) return Clock;
    return AlertCircle;
  };

  const getStatusColor = (status: string) => {
    return STATUS_COLOR_MAP[status.toLowerCase()] || "text-gray-600";
  };

  return (
    <section id="projects" className="py-12 sm:py-16 bg-gradient-to-br from-slate-50 to-sky-50">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-4xl font-semibold text-black mb-2">
            Current Project Progress
          </h2>
          <p className="font-inter text-black/60 max-w-3xl mx-auto text-base sm:text-lg">
            Real-time updates on our 120 MW hydropower development across all major phases.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading projects...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectPhases.map((phase, idx) => {
              const StatusIcon = getStatusIcon(phase.status);
              const progress = Number(phase.progress) || 0;
              const statusColor = getStatusColor(phase.status);

              return (
                <motion.article
                  key={phase._id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all border border-sky-100"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9]">
                    <img
                      src={getImageUrl(phase.image)}
                      alt={phase.title || "Project Phase Image"}
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
                      <StatusIcon className={`${statusColor} h-4 w-4`} />
                      <span className={`${statusColor} font-medium text-sm`}>
                        {phase.status}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-jakarta text-lg font-semibold text-black line-clamp-2">
                      {phase.title}
                    </h3>

                    {/* Progress */}
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

                    {/* Description */}
                    <p className="text-xs text-black/70 line-clamp-2">{phase.description}</p>

                    {/* Milestones */}
                    <div className="flex flex-wrap gap-1">
                      {(phase.milestones && phase.milestones.length > 0
                        ? phase.milestones
                        : ["No milestones yet"]
                      ).map((m, i) => (
                        <span
                          key={`${phase._id}-${i}`}
                          className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* View More Button */}
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
  );
};

export default ProjectsSection;
