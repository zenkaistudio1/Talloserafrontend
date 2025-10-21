"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { Droplet, Mountain, Gauge, BatteryCharging, ArrowRight, Play, Pause } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import NavButton from "./NavButton"

const ICONS: Record<string, React.ElementType> = {
  Droplet,
  Mountain,
  Gauge,
  BatteryCharging,
}

interface Slide {
  _id: string
  image: string
  tag: string
  titleA: string
  titleB: string
  desc: string
  cta: { label: string; href: string }
  icon: string
}

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
  const [slides, setSlides] = useState<Slide[]>([])
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const heroRef = useRef<HTMLDivElement | null>(null)

  const start = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/slides")
      .then((res) => {
        console.log("[v0] Slides data received:", res.data)
        if (res.data.length > 0) {
          console.log("[v0] First slide CTA:", res.data[0].cta)
        }
        setSlides(res.data)
      })
      .catch((err) => console.error(err))
  }, [])

  useAutoplay(playing && !isHovered && !shouldReduceMotion, AUTOPLAY_MS, () => {
    setI((x) => (x + 1) % (slides.length || 1))
  })

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setI((x) => (x + 1) % (slides.length || 1))
        setPlaying(false)
      } else if (e.key === "ArrowLeft") {
        setI((x) => (x - 1 + slides.length) % (slides.length || 1))
        setPlaying(false)
      } else if (e.key === " ") {
        e.preventDefault()
        setPlaying((p) => !p)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [slides.length])

  useEffect(() => setLoaded(false), [i])

  if (slides.length === 0) return <p className="p-8 text-center">Loading slides...</p>

  const total = slides.length
  const s = slides[i]
  const Icon = ICONS[s.icon] || Droplet
  const slideLabel = `${s.tag} – ${s.titleA} ${s.titleB}`
  const progressEnabled = playing && !isHovered && !shouldReduceMotion

  const onPointerDown = (e: React.PointerEvent) => {
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    start.current = { x: e.clientX, y: e.clientY }
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (!start.current) return
    const dx = e.clientX - start.current.x
    const dy = e.clientY - start.current.y
    start.current = null
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return
    setPlaying(false)
    setI((x) => (x + (dx < 0 ? 1 : -1) + total) % total)
  }

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
          aria-label="Featured slides"
        >
          <div className="relative aspect-[4/3] sm:aspect-[16/9] xl:aspect-[21/9] min-h-[360px]">
            {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
            <AnimatePresence mode="wait">
              <motion.img
                key={s._id}
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

          <motion.div className="absolute inset-0 flex items-end p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full max-w-5xl">
              <motion.div
                key={`content-${s._id}`}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-white pl-6 sm:pl-10"
              >
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 backdrop-blur-sm px-3 py-1 text-xs uppercase tracking-wider text-white/90">
                  <Icon className="h-4 w-4 text-white/90" />
                  {s.tag}
                </div>

                <h2 className="font-jakarta text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white tracking-tight mb-2">
                  {s.titleA}
                </h2>
                <h2 className="font-jakarta text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-sky-400 tracking-tight mb-3">
                  {s.titleB}
                </h2>

                <p className="font-inter text-sm sm:text-base leading-relaxed text-white/90 max-w-lg mb-5">{s.desc}</p>

                {s.cta && (s.cta.label || s.cta.label !== "") && (s.cta.href || s.cta.href !== "") ? (
                  <a
                    href={s.cta.href}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-5 py-2.5 text-sm font-inter text-white transition-all hover:bg-white/20 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-sky-600/20"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-sky-600 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                    <span className="relative">{s.cta.label}</span>
                  </a>
                ) : null}
              </motion.div>

              <div className="hidden sm:flex justify-end items-end">
                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center gap-2">
                    {slides.map((_, di) => (
                      <button
                        key={di}
                        onClick={() => {
                          setI(di)
                          setPlaying(false)
                        }}
                        className={`h-2.5 w-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-600/40 ${
                          di === i ? "bg-sky-600 shadow-md shadow-sky-600/30" : "bg-white/60 hover:bg-white/80"
                        }`}
                        aria-label={`Go to slide ${di + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setPlaying((p) => !p)}
                    className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-200 ${
                      playing
                        ? "border-white/30 bg-white/10 hover:bg-white/20 text-white"
                        : "border-sky-600 bg-sky-600 text-white hover:bg-sky-700 shadow-md shadow-sky-600/30"
                    }`}
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
              key={`progress-${s._id}-${progressEnabled}`}
              className="h-full bg-sky-600"
              initial={{ width: 0 }}
              animate={{ width: progressEnabled ? "100%" : "0%" }}
              transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
            />
          </div>

          <NavButton
            side="left"
            onClick={() => {
              setI((x) => (x - 1 + total) % total)
              setPlaying(false)
            }}
          />
          <NavButton
            side="right"
            onClick={() => {
              setI((x) => (x + 1) % total)
              setPlaying(false)
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
