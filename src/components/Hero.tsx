"use client"

import React, { useState, useEffect, useRef, type ComponentProps } from "react"
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import {
  ArrowRight,
  Droplet,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
  Clock,
  Users,
  Award,
  CheckCircle,
  Star,
  Calendar,
  MapPin,
  ExternalLink,
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ShieldCheck,
  Gauge,
  BatteryCharging,
  Mountain,
  Building,
  Zap,
  AlertCircle
} from "lucide-react"
import { useImagePreloader } from '../hooks/useImagePreloader'
/* ============================ Theme (Sky Blue) ============================ */
const brand = {
  grad: "from-sky-400 to-sky-600",
  solid: "bg-sky-600",
  hover: "hover:bg-sky-700",
  ring: "focus:ring-sky-500/30",
  accent: "text-sky-600",
}
const GlobalFixes = () => (
  <style>{`
    .clamp-2{
      display:-webkit-box;
      -webkit-line-clamp:2;
      -webkit-box-orient:vertical;
      overflow:hidden;
    }
 .clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}

    @keyframes marquee-x {0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    .animate-marquee{animation:marquee-x 22s linear infinite;will-change:transform;}
    @media (prefers-reduced-motion: reduce){.animate-marquee{animation:none!important;transform:none!important}}
    .marquee-edges{-webkit-mask-image:linear-gradient(to right,transparent 0,black 48px,black calc(100% - 48px),transparent 100%);mask-image:linear-gradient(to right,transparent 0,black 48px,black calc(100% - 48px),transparent 100%);}

    /* hide scrollbar for nav overflow (prevents overlap) */
    .no-scrollbar::-webkit-scrollbar{display:none}
    .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
    /* ===== Marquee ===== */
    @keyframes marquee-x {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); } /* because we render 2x content */
    }
    .animate-marquee {
      animation: marquee-x 22s linear infinite;
      will-change: transform;
    }
    /* Respect reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .animate-marquee { animation: none !important; transform: none !important; }
    }

    /* Soft edge fade on marquee lane (works in all modern browsers) */
    .marquee-edges {
      -webkit-mask-image: linear-gradient(to right, transparent 0, black 48px, black calc(100% - 48px), transparent 100%);
              mask-image: linear-gradient(to right, transparent 0, black 48px, black calc(100% - 48px), transparent 100%);
    }
  `}</style>
)



/* ============================ Reusable Card ============================ */
const BlueCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border border-sky-100 bg-gradient-to-br from-white to-sky-50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${className}`}
  >
    <div className="p-6 sm:p-7">{children}</div>
  </div>
)

/* ============================ Scroll Progress ============================ */
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 })
  return <motion.div style={{ scaleX }} className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-sky-600" />
}

/* ============================ Header ============================ */
/* ============================ Header (one CTA + sky topbar) ============================ */
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState<Record<string, boolean>>({})
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // helpers for sticky hover behaviour
  const openMenu = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveDropdown(key)
  }
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120)
  }

  // Center nav items
  const navItems = [
    { label: "Home", href: "/" },
    {
      label: "Company",
      href: "/company",
      hasDropdown: true,
      dropdownItems: [
        { label: "Overview", href: "/company" },
        { label: "Board of Directors", href: "/company/board" },
        { label: "Management Team", href: "/company/management" },
        { label: "Legal & Policies", href: "/company/policies" },
      ],
    },
    {
      label: "Projects progress",
      href: "/projects",
      
    },
    {
      label: "Downloads",
      href: "/downloads/forms",
      hasDropdown: true,
      dropdownItems: [
        { label: "Forms", href: "/downloads/forms" },
        { label: "Reports", href: "/downloads/reports" },
        { label: "Procurement", href: "/downloads/procurement" },
      ],
    },
    {
      label: "Notice Board",
      href: "/notice-board",
      hasDropdown: true,
      dropdownItems: [
        { label: "Tender Notices", href: "/notice-board/tenders" },
        { label: "Announcements", href: "/notice-board/announcements" },
        { label: "Careers", href: "/notice-board/careers" },
      ],
    },
    { label: "Gallery", href: "/gallery" },
  ]

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50">
        {/* Sky-blue top layer */}
        <div className="hidden md:block bg-sky-600 text-white">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex h-10 items-center justify-end gap-6 text-sm">
              <div className="hidden lg:flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+97714440000" className="hover:text-white/90">
                  +977 1-4440000
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@yetihydro.com" className="hover:text-white/90">
                  info@yetihydro.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main row (white, blurred) */}
        <div
          className={`bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 transition-all ${
            isScrolled ? "shadow-sm border-b border-gray-200/70" : "border-b border-transparent"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex h-16 lg:h-20 items-center justify-between">
              {/* Logo */}
              <a href="/" className="flex items-center gap-3">
                <div className="grid h-10 w-10 lg:h-12 lg:w-12 place-items-center rounded-xl bg-sky-600 shadow-lg shadow-sky-600/30">
                  <Droplet className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                 <div className="leading-tight">
                  <div className="text-lg lg:text-xl font-semibold text-gray-900 tracking-tight">Tallosera Hydro limited</div>
                  <div className="text-[10px] lg:text-xs text-gray-700 font-medium tracking-wider uppercase">Sanibheri Uttarganga Hydropower</div>
                
                </div>
              </a>

              {/* Center Nav (desktop) */}
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => item.hasDropdown && openMenu(item.label)}
                    onMouseLeave={() => item.hasDropdown && scheduleClose()}
                  >
                    <a
                      href={item.href}
                      className="group inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      {item.label}
                      {item.hasDropdown && (
                        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                      )}
                      <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-sky-600 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                    </a>

                    {/* Sticky dropdown with padding-bridge + close delay */}
                    {item.hasDropdown && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.16 }}
                        className="absolute left-0 top-full z-[60] pt-3"     /* <- pt-3 = bridge, no gap */
                        onMouseEnter={() => openMenu(item.label)}
                        onMouseLeave={scheduleClose}
                      >
                        <div className="w-64 rounded-xl border border-gray-200/70 bg-white shadow-xl shadow-black/10 py-2">
                          {item.dropdownItems?.map((d) => (
                            <a
                              key={d.label}
                              href={d.href}
                              className="block px-4 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            >
                              {d.label}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Right CTA + mobile toggle */}
              <div className="flex items-center gap-4">
                <a
                  href="/contact"
                  className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500/30 shadow-sm"
                >
                  <Mail className="h-4 w-4" />
                  Contact Us
                </a>

                <button
                  onClick={() => setIsMenuOpen((v) => !v)}
                  className="lg:hidden grid h-10 w-10 place-items-center rounded-lg border border-gray-200/60 bg-white hover:bg-gray-50"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X className="h-5 w-5 text-gray-700" /> : <Menu className="h-5 w-5 text-gray-700" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu (unchanged) */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="lg:hidden border-t border-gray-200/70 bg-white"
              >
                <nav className="py-2">
                  {navItems.map((item) => {
                    const open = !!mobileOpen[item.label]
                    const has = !!item.hasDropdown
                    return (
                      <div key={item.label}>
                        <button
                          onClick={() =>
                            has
                              ? setMobileOpen((s) => ({ ...s, [item.label]: !s[item.label] }))
                              : (window.location.href = item.href)
                          }
                          className="w-full flex items-center justify-between px-4 py-3 text-left text-base text-gray-700 hover:bg-gray-50"
                        >
                          <span className="font-inter">{item.label}</span>
                          {has && (
                            <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
                          )}
                        </button>

                        {has && open && (
                          <div className="bg-gray-50/60 border-l-2 border-sky-600/30 ml-4">
                            {item.dropdownItems?.map((d) => (
                              <a
                                key={d.label}
                                href={d.href}
                                className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                              >
                                {d.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}

                  <div className="px-4 pt-2 pb-4">
                    <a
                      href="/contact"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                    >
                      <Mail className="h-4 w-4" />
                      Contact Us
                    </a>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Spacer equals header height (no overlap) */}
      <div aria-hidden className="h-16 md:h-[104px] lg:h-[120px]" />
    </>
  )
}


/* ============================ Hero ============================ */
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

type MotionButtonProps = ComponentProps<typeof motion.button>
type NavButtonProps = MotionButtonProps & { side: "left" | "right" }

const NavButton = React.forwardRef<HTMLButtonElement, NavButtonProps>(({ side, className = "", ...props }, ref) => (
  <motion.button
    ref={ref}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`absolute ${side === "left" ? "left-3 sm:left-4" : "right-3 sm:right-4"} top-1/2 -translate-y-1/2 grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-white/95 backdrop-blur-sm border border-sky-100 shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400/30 ${className}`}
    {...props}
  >
    {side === "left" ? <ChevronLeft className="h-4 w-4 text-black/70" /> : <ChevronRight className="h-4 w-4 text-black/70" />}
  </motion.button>
))
NavButton.displayName = "NavButton"

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

  // swipe
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

  useEffect(() => setLoaded(false), [i]) // reset loaded on slide change

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

              {/* right controls */}
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

          {/* progress */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
            <motion.div
              key={`progress-${s.id}-${progressEnabled}`}
              className="h-full bg-sky-600"
              initial={{ width: 0 }}
              animate={{ width: progressEnabled ? "100%" : "0%" }}
              transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
            />
          </div>

          {/* arrows */}
          <NavButton side="left" onClick={() => { setI((x) => wrap(x - 1)); setPlaying(false) }} />
          <NavButton side="right" onClick={() => { setI((x) => wrap(x + 1)); setPlaying(false) }} />
        </div>
      </div>
    </section>
  )
}


/* ============================ Logo Marquee ============================ */
const LogoMarquee: React.FC = () => {
  const logos = [
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Siemens-logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/6/6a/ABB_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/2/24/SAP_2011_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/1/1b/Philips_logo_new.svg",
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Logo_TV_2015.png",
  ]
  return (
    <section className="py-10 bg-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="flex gap-16 w-[200%] px-8"
        >
          {[...logos, ...logos].map((src, idx) => (
            <img key={idx} src={src || "/placeholder.svg"} alt="" className="h-8 opacity-70" />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ============================ Stats (BlueCard) ============================ */
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

/* ============================ Others Section (Reusable) ============================ */

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
    
    {/* Section heading */}
    <div className="text-center mb-8 mt-0">
      <h2 className="font-jakarta text-3xl sm:text-4xl font-bold text-black mt-0">
        More from Tallosera Hydropower
      </h2>
      <p className="mt-1 text-black/70 max-w-2xl mx-auto">
        Additional highlights and commitments that ensure sustainable and bankable hydropower delivery.
      </p>
    </div>



        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Headline card */}
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

          {/* Snapshot card */}
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
                <div className="text-xl font-semibold">120+</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-sm text-white/80">Avg. COD Slip</div>
                <div className="text-xl font-semibold">&lt; 3%</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Benefit cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-sky-100 bg-gradient-to-br from-white to-sky-50 shadow-md p-6"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-sky-100 mb-4">
                <b.icon className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="font-semibold text-black">{b.title}</h3>
              <p className="text-sm text-black/70 mt-2">{b.desc}</p>
              <ul className="mt-4 space-y-2">
                {b.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2 text-sm text-black/70">
                    <CheckCircle className="h-4 w-4 text-sky-600" />
                    {pt}
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

/* ============================ Services (BlueCard) ============================ */
const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: Mountain,
      title: "Feasibility, DPR & Permitting",
      desc: "Hydrology, geotech, ESIA, and bankable DPRs with regulatory approvals.",
      features: ["Hydrology & Sediment", "Geotech & Access", "ESIA & Permits", "Financial Models"],
    },
    {
      icon: Droplet,
      title: "Civil & Electro-Mechanical EPC",
      desc: "Weirs, headrace, penstocks, turbines, governors, switchgear—end-to-end EPC.",
      features: ["Intake & Desanding", "Headrace/Tunnel", "Turbine & Generator", "SCADA & Controls"],
    },
    {
      icon: Gauge,
      title: "Grid Integration & Protection",
      desc: "Substations, lines, relay settings, and grid code compliance.",
      features: ["Substation (66–220kV)", "Transmission Lines", "Protection Studies", "Grid Code Compliance"],
    },
    {
      icon: BatteryCharging,
      title: "O&M, Upgrades & Digitalization",
      desc: "Condition monitoring, uprating, efficiency tests, and predictive maintenance.",
      features: ["CM/CBM & Spares", "Turbine Uprates", "Efficiency Audits", "Remote SCADA"],
    },
  ]

  return (
    <section id="services" className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-sky-50 px-3 py-1 text-xs uppercase tracking-wider text-black/70">
            <Droplet className="h-4 w-4 text-sky-600" />
            Our Services
          </div>
          <h2 className="font-jakarta text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-black tracking-tight">
            Hydropower Excellence
          </h2>
          <p className="font-inter text-lg text-black/60 max-w-2xl mx-auto mt-3">
            From river studies to commissioning and long-term O&M.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <BlueCard>
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-sky-100 mb-5">
                  <service.icon className="h-6 w-6 text-sky-600" />
                </div>
                <h3 className="font-jakarta text-xl font-semibold text-black mb-2">{service.title}</h3>
                <p className="font-inter text-sm text-black/60 mb-5 leading-relaxed">{service.desc}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-black/70">
                      <CheckCircle className="h-4 w-4 text-sky-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </BlueCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================ Process Timeline (kept, sky accents) ============================ */
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

/* ============================ Projects (BlueCard) ============================ */
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

/* ============================ Testimonials (BlueCard) ============================ */
const Testimonials: React.FC = () => {
  const items = [
    {
      quote: "Yeti Hydropower delivered our RoR plant on schedule with exceptional safety and grid performance.",
      author: "Kiran Shrestha",
      role: "Project Director, Himalayan Power Ltd.",
      avatar: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=300&auto=format&fit=crop",
    },
    {
      quote: "Their protection studies and substation EPC made grid synchronization smooth and audit-ready.",
      author: "Anita Gurung",
      role: "GM (Transmission), East Grid Co.",
      avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=300&auto=format&fit=crop",
    },
    {
      quote: "Predictive maintenance upgrades improved our capacity factor and reduced forced outages materially.",
      author: "Rahul Bista",
      role: "O&M Head, Green Valley Energy",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
    },
  ]
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center font-jakarta text-3xl sm:text-4xl font-semibold tracking-tight text-black mb-12">
          What Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.blockquote
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <BlueCard>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={t.avatar || "/placeholder.svg"}
                    alt={t.author}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-black">{t.author}</div>
                    <div className="text-xs text-black/60">{t.role}</div>
                  </div>
                </div>
                <p className="text-black/80 leading-relaxed">“{t.quote}”</p>
                <div className="mt-4 flex items-center gap-1 text-sky-600">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </BlueCard>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================ FAQ ============================ */
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

/* ============================ CTA Banner (sky) ============================ */
const CTABanner: React.FC = () => {
  return (
    <section className="py-14 bg-gradient-to-r from-sky-600 to-sky-500">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="text-white text-2xl font-semibold">Ready to power your project?</h3>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90"
          >
            Get a Free Proposal <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}




/* ============================ Footer (sky accents) ============================ */
const Footer: React.FC = () => {
  return (
    <footer className="relative bg-white">
      <div className="h-2 bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600" />
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-sky-600">
                <Droplet className="h-5 w-5 text-white" />
              </div>
              <div className="text-lg font-semibold"> Tallosera Hydro limited</div>
            </div>
            <p className="mt-4 text-sm text-black/70">
              Engineering and delivering clean hydropower across Nepal with safety, quality, and community partnership.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-1 text-[11px] text-black/70">
                ISO 9001
              </span>
              <span className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-1 text-[11px] text-black/70">
                ISO 14001
              </span>
              <span className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-1 text-[11px] text-black/70">
                OHS
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-black/70">
              <li>
                <a href="#about" className="hover:text-black">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-black">
                  Services
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-black">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-black">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-black/70">
              <li>
                <a href="#" className="hover:text-black">
                  Whitepapers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Press
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Stay Updated</h4>
            <p className="text-sm text-black/70">Monthly insights on hydro, grid, and O&M.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-3 flex items-center gap-2">
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full rounded-lg bg-white border border-gray-300 px-3 py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              />
              <button className="rounded-lg bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700">
                Join
              </button>
            </form>

            <div className="mt-4 flex items-center gap-3 text-black/70">
              <a href="#" aria-label="Facebook" className="rounded-md p-2 hover:bg-gray-100">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="rounded-md p-2 hover:bg-gray-100">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="rounded-md p-2 hover:bg-gray-100">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" aria-label="YouTube" className="rounded-md p-2 hover:bg-gray-100">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-xs text-black/60 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} Tallosera Hydro limited. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-black">
              Privacy
            </a>
            <a href="#" className="hover:text-black">
              Terms
            </a>
            <a href="#" className="hover:text-black">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ============================ Marquee Text Component ============================ */
const MarqueeText: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gray-100 border-y border-gray-200 py-2 overflow-hidden relative">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 z-10 text-lg font-bold"
      >
        ×
      </button>
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Duplicate the content multiple times for seamless scrolling */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex whitespace-nowrap">
            <span className="text-sm text-gray-700 mx-8 flex items-center">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              करार सेवा दरखास्त फारम
            </span>
            <span className="text-sm text-gray-700 mx-8 flex items-center">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
              करार सेवामा पदपूर्ति सम्बन्धी सूचना
            </span>
            <span className="text-sm text-gray-700 mx-8 flex items-center">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10a2 2 0 002 2h4a2 2 0 002-2V11m-6 0h6"
                />
              </svg>
              आर्थिक वर्ष २०८२-०८३ को लागि सूची दर्ता गराउने सम्बन्धी सूचना !
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ============================ Popup Component ============================ */
const WelcomePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false) }
    document.addEventListener("keydown", onKey)
    // lock scroll while open
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4"
      onClick={(e) => {
        // close when clicking the dimmed backdrop
        if (e.target === e.currentTarget) setIsOpen(false)
      }}
    >
      <div className="bg-white rounded-xl w-full max-w-md sm:max-w-lg md:max-w-2xl max-h-[85vh] overflow-y-auto relative shadow-2xl">
        {/* Close */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold bg-white rounded-full w-8 h-8 flex items-center justify-center shadow"
          aria-label="Close"
        >
          ×
        </button>

      
<div className="border-b border-gray-200 p-4 sm:p-5">
  <div className="flex flex-col items-center gap-3 sm:gap-4 mb-3">
    {/* Droplet Icon on top */}
    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-sky-600 rounded-full grid place-items-center shadow-lg shadow-sky-600/30">
      <Droplet className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
    </div>

    {/* Text */}
    <div className="text-center">
      <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">Tallosera Hydro limited</h1>
      <h2 className="text-sm sm:text-base text-gray-700">तल्लोसेरा हाइड्रो लिमिटेड</h2>
      <p className="text-xs text-gray-600">कार्यालय, काठमाडौं - ३२</p>
    </div>
  </div>

  <div className="bg-gray-800 text-white text-center py-1.5 px-3 rounded">
    <h3 className="text-sm sm:text-base font-semibold">करार सेवा मा पदपूर्ति सम्बन्धी सूचना</h3>
  </div>
</div>


        {/* Body */}
        <div className="p-4 sm:p-5">
          <div className="w-full h-48 sm:h-56 md:h-64 bg-gray-100 rounded-lg mb-5 flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm font-medium text-gray-600 mb-1">Important Document</p>
              <p className="text-xs text-gray-500">Document image will be loaded from backend</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => setIsOpen(false)}
              className="bg-sky-600 text-white px-5 py-2.5 rounded-lg hover:bg-sky-700 text-sm font-medium"
            >
              View Full Document
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-600 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 text-sm font-medium"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


/* ============================ About Us Section ============================ */
/* ============================ About Us Section (compact, aligned) ============================ */
const AboutUsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-sky-50 to-blue-50">
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm font-medium text-sky-600 tracking-wide uppercase">Welcome to</p>
          <h2 className="font-jakarta text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-2">
            Sanibheri Uttarganga Hydropower
          </h2>
          <p className="mt-2 text-base sm:text-lg text-gray-600">
            सानीबेरी उत्तरगंगा लघु जलविद्युत आयोजना
          </p>
        </div>

        {/* Two-column content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: copy + CTAs (compact) */}
          <BlueCard className="p-6 sm:p-8">
            <div className="space-y-5">
  <p className="text-gray-700 leading-relaxed">
    Tallosera Hydropower Company Limited (THCL) is a subsidiary of Vidhyut Utpadan Company Limited (VUCL),
    established in 2017 to develop the Peaking Run-of-River Hydroelectric Project (PRoRHEP).
  </p>
  <p className="text-gray-700 leading-relaxed">
    The site lies ~750 km west of Kathmandu, contributing to Nepal’s renewable energy infrastructure.
  </p>



              {/* Actions – compact pill buttons */}
              <div className="pt-1 flex flex-wrap items-center gap-3">
               
                <a
                  href="/projects"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                             border border-sky-200 bg-white text-sky-700 hover:border-sky-300 hover:bg-sky-50
                             focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  View Projects progress
                </a>
              </div>
            </div>
          </BlueCard>

          {/* Right: project image */}
          <BlueCard className="overflow-hidden">
            <div className="relative aspect-[16/10] sm:aspect-[16/9]">
              <img
                src="https://cdn-jppij.nitrocdn.com/sFgdDglQkYqdBOYEqQzqsAyZgAuSbmou/assets/images/optimized/rev-fcfdc61/nepalhydro.org/wp-content/uploads/2023/08/news-1.jpg"
                alt="Jagdulla Hydroelectric Project"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </BlueCard>
        </div>

        {/* Leadership (consistent height + alignment) */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <BlueCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-sky-100 overflow-hidden flex-shrink-0">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="Sanjay Sapkota"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Sanjay Sapkota</div>
                <div className="text-sm text-sky-600 font-medium">Chief Executive Officer</div>
              </div>
            </div>
          </BlueCard>

          <BlueCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-sky-100 overflow-hidden flex-shrink-0">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="Mandira Khadka"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Mandira Khadka</div>
                <div className="text-sm text-sky-600 font-medium">Company Secretary</div>
              </div>
            </div>
          </BlueCard>
        </div>
      </div>
    </section>
  )
}


/* ============================ Salient Features Section ============================ */
const SalientFeaturesSection: React.FC = () => {
  const features = [
    {
      title: "HYDROLOGY",
      icon: Droplet,
      specs: [
        { label: "Catchment Area", value: "633.83 Sq. Km" },
        { label: "Design Discharge", value: "16.20 m3/s" },
        { label: "Minimum Monthly Discharge", value: "4.67 m3/s" },
        { label: "Design Flood (Q1000)", value: "1141 m3/s" },
      ],
    },
    {
      title: "HEADWORKS",
      icon: Building,
      specs: [
        { label: "Location", value: "Hurikot -1, Dolpa (Karnali Province)" },
        { label: "Dam", value: "Dam (3 nos. opening) with emergency spillway" },
        { label: "Dam Crest Level", value: "2678.00 masl" },
        { label: "Spillway Crest Level", value: "2696.00 masl" },
      ],
    },
    {
      title: "POWERHOUSE",
      icon: Zap,
      specs: [
        { label: "Location", value: "Mudkechula -4, Dolpa (Karnali Province)" },
        { label: "Headrace Tunnel Length", value: "6.135 Km (3.8m Dia)" },
        { label: "Pressure Shaft", value: "1406.69m (2.1m Diameter)" },
        { label: "Powerhouse", value: "Underground (77.8 m (L) x14 m (B) x33.45 m (H))" },
      ],
    },
  ]

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-sky-600 mb-2">
            TALLOSERA PEAKING RUN-OF-RIVER HYDROELECTRIC PROJECT
          </p>
          <h2 className="font-jakarta text-3xl sm:text-4xl font-bold text-black">Salient Features</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <BlueCard className="h-full">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sky-100 mb-4">
                    <feature.icon className="w-8 h-8 text-sky-600" />
                  </div>
                  <h3 className="font-jakarta text-xl font-bold text-black">{feature.title}</h3>
                </div>

                <div className="space-y-4">
                  {feature.specs.map((spec, specIndex) => (
                    <div key={specIndex} className="border-b border-sky-100 pb-3 last:border-b-0">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-600 flex-1">{spec.label}:</span>
                        <span className="text-sm text-black font-medium text-right flex-1 ml-2">{spec.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </BlueCard>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center px-8 py-3 rounded-full border-2 border-sky-600 text-sky-600 font-medium hover:bg-sky-600 hover:text-white transition-all duration-300">
            MORE SALIENT FEATURES
          </button>
        </div>
      </div>
    </section>
  )
}


/* ============================ Page ============================ */
const YetiHydroHome: React.FC = () => {
  return (
    <>
      <ScrollProgress />
      <Header />
      <WelcomePopup />
      <main>
        <Hero />
        <StatsSection />
        <MarqueeText />
        <AboutUsSection />
        <SalientFeaturesSection />
        <LogoMarquee />
        
        <Others />
        
        <ProcessSection />
        <ProjectsSection />
        
        <FAQ />
        
        
      </main>
      <Footer />
      <GlobalFixes />
    </>
  )
}

export default YetiHydroHome
