"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import axios from "axios"
import { Droplet, Mountain, Gauge, BatteryCharging, ArrowRight, Play, Pause } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
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
}

const Hero: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([])
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(true)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/slides")
      .then((res) => setSlides(res.data))
      .catch((err) => console.error(err))
  }, [])

  const wrap = (n: number) => (n + slides.length) % slides.length

  const next = useCallback(() => setI((i) => wrap(i + 1)), [slides.length])
  const prev = useCallback(() => setI((i) => wrap(i - 1)), [slides.length])

  useAutoplay(playing && !shouldReduceMotion, AUTOPLAY_MS, next)

  if (slides.length === 0) return <p>Loading slides...</p>

  const s = slides[i]
  const Icon = ICONS[s.icon] || Droplet

  return (
    <section className="relative overflow-hidden bg-gray-50">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={s.image} alt={s.titleA} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" /> {/* dark overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start justify-center max-w-4xl mx-auto px-6 py-20 text-white">
        {/* Tag with icon */}
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm">
          <Icon className="h-4 w-4 text-white" />
          {s.tag}
        </div>

        {/* Titles */}
        <h1 className="text-4xl md:text-6xl font-bold mb-2">{s.titleA}</h1>
        <h2 className="text-2xl md:text-4xl font-semibold mb-4">{s.titleB}</h2>

        {/* Description */}
        <p className="max-w-xl mb-6 text-lg opacity-90">{s.desc}</p>

        {/* CTA */}
        {s.cta?.label && s.cta?.href && (
          <a
            href={s.cta.href}
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white font-medium transition"
          >
            {s.cta.label}
            <ArrowRight className="h-4 w-4" />
          </a>
        )}

        {/* Navigation Buttons */}
        <NavButton side="left" onClick={prev} />
        <NavButton side="right" onClick={next} />
        <button
          onClick={() => setPlaying((p) => !p)}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition absolute bottom-6 right-6"
        >
          {playing ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
        </button>
      </div>
    </section>
  )
}

export default Hero
