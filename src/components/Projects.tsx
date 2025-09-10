"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import {
  Droplet,
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  Calendar,
  MapPin,
  ExternalLink,
  Star,
} from "lucide-react"


/* ===== tiny style fixes & marquee util kept minimal ===== */
export const GlobalFixes = () => (
  <style>{`
    .no-scrollbar::-webkit-scrollbar{display:none}
    .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
  `}</style>
)

/* ===== top progress bar ===== */
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 })
  return <motion.div style={{ scaleX }} className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-sky-600" />
}

/* ===== Header (sky topbar + white row, single ‘Contact Us’ CTA) ===== */
export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState<Record<string, boolean>>({})

  // --- close-delay timer for sticky hover ---
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const openMenu = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActive(key)
  }
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setActive(null), 120)
  }

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (closeTimer.current) clearTimeout(closeTimer.current)
    }
  }, [])

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
      label: "Projects",
      href: "/projects",
      hasDropdown: true,
      dropdownItems: [
        { label: "Run-of-River Plants", href: "/projects" },
        { label: "Reservoir Plants", href: "/projects" },
        { label: "Transmission & Substations", href: "/projects" },
        { label: "O&M & Upgrades", href: "/projects" },
      ],
    },
    {
      label: "Downloads",
      href: "/downloads",
      hasDropdown: true,
      dropdownItems: [
        { label: "Forms", href: "/downloads/forms" },
        { label: "Reports", href: "/downloads/reports" },
        { label: "Procurement", href: "/downloads/procurement" },
      ],
    },
    {
      label: "Notice Board",
      href: "/notice",
      hasDropdown: true,
      dropdownItems: [
        { label: "Tender Notices", href: "/notice/tender" },
        { label: "Announcements", href: "/notice/announcements" },
        { label: "Careers", href: "/notice/careers" },
      ],
    },
    { label: "Gallery", href: "/gallery" },
  ]

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50">
        {/* sky-blue top layer */}
        <div className="hidden md:block bg-sky-600 text-white">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex h-10 items-center justify-end gap-6 text-sm">
              <div className="hidden lg:flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+97714440000" className="hover:text-white/90">+977 1-4440000</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@yetihydro.com" className="hover:text-white/90">info@yetihydro.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* main row */}
        <div className={`bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 transition-all ${isScrolled ? "shadow-sm border-b border-gray-200/70" : "border-b border-transparent"}`}>
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex h-16 lg:h-20 items-center justify-between">
              {/* Logo */}
              <a href="/" className="flex items-center gap-3">
                <div className="grid h-10 w-10 lg:h-12 lg:w-12 place-items-center rounded-xl bg-sky-600 shadow-lg shadow-sky-600/30">
                  <Droplet className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                <div className="leading-tight">
                  <div className="text-lg lg:text-xl font-semibold text-gray-900 tracking-tight">Yeti Hydropower</div>
                  <div className="text-[10px] lg:text-xs text-gray-700 font-medium tracking-wider uppercase">Clean Energy</div>
                </div>
              </a>

              {/* Desktop nav */}
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

                    {/* Sticky dropdown: bridge (pt-3) + close delay */}
                    {item.hasDropdown && active === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.16 }}
                        className="absolute left-0 top-full z-[60] pt-3" /* bridge to prevent gap */
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

              {/* Right: single CTA + mobile toggle */}
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

          {/* Mobile */}
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
                    const has = !!item.hasDropdown
                    const open = !!mobileOpen[item.label]
                    return (
                      <div key={item.label}>
                        <button
                          onClick={() =>
                            has ? setMobileOpen(s => ({ ...s, [item.label]: !s[item.label] })) : (window.location.href = item.href)
                          }
                          className="w-full flex items-center justify-between px-4 py-3 text-left text-base text-gray-700 hover:bg-gray-50"
                        >
                          <span>{item.label}</span>
                          {has && <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />}
                        </button>

                        {has && open && (
                          <div className="bg-gray-50/60 border-l-2 border-sky-600/30 ml-4">
                            {item.dropdownItems?.map((d) => (
                              <a key={d.label} href={d.href} className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                                {d.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                  <div className="px-4 pt-2 pb-4">
                    <a href="/contact" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-700">
                      Contact Us
                    </a>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* spacer to prevent overlap */}
      <div aria-hidden className="h-16 md:h-[104px] lg:h-[120px]" />
    </>
  )
}

/* ============================ Projects (Sky Blue Cards) ============================ */
const ProjectsSection: React.FC = () => {
  const projects = [
    {
      image:
        "https://plus.unsplash.com/premium_photo-1678446510354-5c39e3409c59?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aHlkcm9wb3dlciUyMHByb2plY3R8ZW58MHx8MHx8fDA%3D",
      category: "Reservoir",
      title: "Upper Yeti Reservoir HPP (120 MW)",
      location: "Gandaki Province",
      year: "2024",
      desc: "Concrete gravity dam with Pelton turbines and 132 kV GIS substation for reliable power generation.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1606049910442-36d2f218a5ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aHlkcm9wb3dlciUyMHByb2plY3R8ZW58MHx8MHx8fDA%3D",
      category: "Run-of-River",
      title: "Bhote Koshi RoR HPP (48 MW)",
      location: "Bagmati Province",
      year: "2023",
      desc: "Advanced headrace tunnel design with steel penstock, digital governor and SCADA integration.",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1727344751168-03790785caf2?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Grid Integration",
      title: "Substation & Transmission Line",
      location: "Province 1",
      year: "2022",
      desc: "220/132 kV AIS substation with protection coordination and OPGW fiber integration.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHlkcm9wb3dlciUyMGRhbXxlbnwwfHwwfHx8MA%3D%3D",
      category: "Reservoir",
      title: "Karnali Multi-Purpose HPP (85 MW)",
      location: "Karnali Province",
      year: "2023",
      desc: "Multi-purpose reservoir project with flood control and irrigation benefits for local communities.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aHlkcm9wb3dlciUyMHR1cmJpbmV8ZW58MHx8MHx8fDA%3D",
      category: "Run-of-River",
      title: "Marsyangdi RoR HPP (32 MW)",
      location: "Gandaki Province",
      year: "2022",
      desc: "Environmentally sustainable run-of-river design with fish ladder and minimal ecological impact.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHlkcm9wb3dlciUyMGRhbXxlbnwwfHwwfHx8MA%3D%3D",
      category: "O&M Services",
      title: "Trishuli HPP Upgrade (28 MW)",
      location: "Bagmati Province",
      year: "2024",
      desc: "Complete turbine refurbishment and control system modernization for enhanced efficiency.",
    },
  ]

  return (
    <section id="projects" className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 sm:mb-10">
          <h2 className="font-jakarta text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-black">
            Recent Projects
          </h2>
          <p className="mt-3 font-inter text-black/60 max-w-2xl">
            Clean, reliable hydropower delivered with safety, quality, and community partnership.
          </p>
        </div>

        {/* equal-height cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((p, idx) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              viewport={{ once: true, margin: "-80px" }}
              className="rounded-2xl overflow-hidden border border-sky-100 bg-gradient-to-br from-white to-sky-50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="relative aspect-[16/10]">
                <img
                  src={p.image || "/placeholder.svg"}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute left-4 bottom-3 right-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black backdrop-blur-sm">
                    {p.category}
                  </span>
                  <span className="text-white/90 text-xs inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {p.year}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col h-full">
                <h3 className="font-jakarta font-semibold text-lg text-gray-900 mb-2">{p.title}</h3>
                <div className="font-inter text-sm text-gray-600 flex items-center gap-1.5 mb-3">
                  <MapPin className="h-4 w-4" /> {p.location}
                </div>

                <p className="font-inter text-sm text-gray-700 mb-4 flex-grow">{p.desc}</p>

                <div className="flex items-center justify-between">
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-sm font-inter font-medium text-sky-700 hover:text-sky-800"
                  >
                    Case Study <ExternalLink className="h-4 w-4" />
                  </a>
                  <div className="flex items-center gap-1 text-sky-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================ Footer (same as improved site-wide) ============================ */
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
              <div className="text-lg font-semibold">Yeti Hydropower</div>
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
              <li><a href="/about" className="hover:text-black">About</a></li>
              <li><a href="/#services" className="hover:text-black">Services</a></li>
              <li><a href="/#projects" className="hover:text-black">Projects</a></li>
              <li><a href="/contact" className="hover:text-black">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-black/70">
              <li><a href="#" className="hover:text-black">Whitepapers</a></li>
              <li><a href="#" className="hover:text-black">Case Studies</a></li>
              <li><a href="#" className="hover:text-black">Careers</a></li>
              <li><a href="#" className="hover:text-black">Press</a></li>
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
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-xs text-black/60 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} Yeti Hydropower. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-black">Privacy</a>
            <a href="#" className="hover:text-black">Terms</a>
            <a href="#" className="hover:text-black">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ============================ Page ============================ */
const ProjectsPage: React.FC = () => {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <ProjectsSection />
      </main>
      <Footer />
      <GlobalFixes />
    </>
  )
}

export default ProjectsPage
