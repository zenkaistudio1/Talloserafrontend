"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { Droplet, Mountain, Gauge, BatteryCharging, Play, Pause, ArrowRight } from "lucide-react"
import NavButton from "./NavButton"

const SLIDES = [
  {
    id: 1,
    image: "https://powerefficiency.com/wp-content/uploads/2023/06/bigstock-Hydroelectric-Power-Station-On-463557553.jpg",
    tag: "Run-of-River",
    titleA: "Powering Nepal",
    titleB: "With Clean Water",
    desc: "High-efficiency RoR projects engineered for reliable output and minimal footprint.",
    icon: Droplet,
    cta: { label: "View Projects", href: "/projects" },
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1503754163129-a02a0c097de0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Reservoir",
    titleA: "Energy Storage",
    titleB: "That Scales",
    desc: "Reservoir hydropower with robust civil works, optimized turbines, and grid-ready dispatch.",
    icon: Mountain,
    cta: { label: "Explore Reservoir", href: "/projects#reservoir" },
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1606050309588-741702cceb9b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Grid Integration",
    titleA: "From River",
    titleB: "To Grid",
    desc: "Substations and lines EPC for seamless synchronization and stability.",
    icon: Gauge,
    cta: { label: "Grid Portfolio", href: "/projects#grid" },
  },
  {
    id: 4,
    image: "https://plus.unsplash.com/premium_photo-1678167657597-665c6589a3a6?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "O&M & Upgrades",
    titleA: "Uptime You",
    titleB: "Can Trust",
    desc: "Predictive maintenance and uprates for higher capacity factors.",
    icon: BatteryCharging,
    cta: { label: "O&M Services", href: "/projects#om" },
  },
]

const AUTOPLAY_MS = 6000

function useAutoplay(enabled: boolean, delay: number, cb: () => void) {
  const t = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    if (!enabled) return
    if (t.current) clearTimeout(t.current)
    t.current = setTimeout(cb, delay)
    return () => t.current && clearTimeout(t.current)
  }, [enabled, delay, cb])

  useEffect(() => {
    const onVis = () => {
      if (document.hidden && t.current) clearTimeout(t.current)
    }
    document.addEventListener("visibilitychange", onVis)
    return () => document.removeEventListener("visibilitychange", onVis)
  }, [])
}

const Hero: React.FC = () => {
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const total = SLIDES.length
  const wrap = (n: number) => (n + total) % total

  const s = SLIDES[i]
  const slideLabel = `${s.tag} – ${s.titleA} ${s.titleB}`
  const progressEnabled = playing && !isHovered && !shouldReduceMotion

  const heroRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] })
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -20])

  const start = useRef<{ x: number; y: number } | null>(null)
  const onPointerDown = (e: React.PointerEvent) => { (e.target as Element).setPointerCapture?.(e.pointerId); start.current = { x: e.clientX, y: e.clientY } }
  const onPointerUp = (e: React.PointerEvent) => {
    if (!start.current) return
    const dx = e.clientX - start.current.x
    const dy = e.clientY - start.current.y
    start.current = null
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return
    setPlaying(false)
    setI((x) => wrap(x + (dx < 0 ? 1 : -1)))
  }

  useAutoplay(playing && !isHovered && !shouldReduceMotion, AUTOPLAY_MS, () => setI((x) => wrap(x + 1)))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { setI((x) => wrap(x + 1)); setPlaying(false) }
      else if (e.key === "ArrowLeft") { setI((x) => wrap(x - 1)); setPlaying(false) }
      else if (e.key === " ") { e.preventDefault(); setPlaying((p) => !p) }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => setLoaded(false), [i])

  return (
    <section id="top" className="relative pt-12 sm:pt-14 pb-12 sm:pb-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4">
        <div
          ref={heroRef}
          className="relative overflow-hidden rounded-[24px] lg:rounded-[28px] border border-gray-200 bg-white shadow-[0_8px_50px_-12px_rgba(0,0,0,0.25)]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured hydropower projects"
        >
          <div className="relative aspect-[4/3] sm:aspect-[16/9] xl:aspect-[21/9] min-h-[360px]">
            {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
            <AnimatePresence mode="wait">
              <motion.img
                key={s.id}
                src={s.image}
                alt={slideLabel}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                onLoad={() => setLoaded(true)}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
          </div>

          <motion.div style={{ y: yParallax }} className="absolute inset-0 flex items-end p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full max-w-5xl">
              <motion.div
                key={`content-${s.id}`}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-white pl-6 sm:pl-10"
              >
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 backdrop-blur-sm px-3 py-1 text-xs uppercase tracking-wider text-white/90">
                  <s.icon className="h-4 w-4 text-white/90" />
                  {s.tag}
                </div>
                <h2 className="font-jakarta text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white tracking-tight mb-2">{s.titleA}</h2>
                <h2 className="font-jakarta text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-sky-400 tracking-tight mb-3">{s.titleB}</h2>
                <p className="font-inter text-sm sm:text-base leading-relaxed text-white/90 max-w-lg mb-5">{s.desc}</p>
                <a href={s.cta.href} className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-5 py-2.5 text-sm font-inter text-white transition-all hover:bg-white/20 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-sky-600/20">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-sky-600 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  <span className="relative">{s.cta.label}</span>
                </a>
              </motion.div>

              <div className="hidden sm:flex justify-end items-end">
                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center gap-2">
                    {SLIDES.map((_, di) => (
                      <button
                        key={di}
                        onClick={() => { setI(di); setPlaying(false) }}
                        className={`h-2.5 w-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-600/40 ${di === i ? "bg-sky-600 shadow-md shadow-sky-600/30" : "bg-white/60 hover:bg-white/80"}`}
                        aria-label={`Go to slide ${di + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setPlaying((p) => !p)}
                    className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-200 ${playing ? "border-white/30 bg-white/10 hover:bg-white/20 text-white" : "border-sky-600 bg-sky-600 text-white hover:bg-sky-700 shadow-md shadow-sky-600/30"}`}
                    aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                  >
                    {playing ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4 ml-0.5" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
            <motion.div
              key={`progress-${s.id}-${progressEnabled}`}
              className="h-full bg-sky-600"
              initial={{ width: 0 }}
              animate={{ width: progressEnabled ? "100%" : "0%" }}
              transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
            />
          </div>

          <NavButton side="left" onClick={() => { setI((x) => wrap(x - 1)); setPlaying(false) }} />
          <NavButton side="right" onClick={() => { setI((x) => wrap(x + 1)); setPlaying(false) }} />
        </div>
      </div>
    </section>
  )
}

export default Hero;