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
  AlertCircle,
  Clock,
  CheckCircle,
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
const ProjectsContinuation: React.FC = () => {
  const nextPhases = [
      // Phase 1
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
    // Phase 4
    {
      image: "https://th.bing.com/th/id/R.db1661462b8cc06c463d3c64be24e17c?rik=6usvHpo7Mkrc6w&pid=ImgRaw&r=0",
      phase: "Phase 4",
      title: "Transmission Line & Substation",
      progress: 50,
      status: "In Progress",
      statusIcon: Clock,
      statusColor: "text-blue-600",
      description: "132 kV transmission line erection halfway complete. Substation civil works ongoing. Scheduled to energize by Q4 2024.",
      milestones: ["Line 50% Complete", "Substation 40% Complete", "Energization Prep Started"],
    },
    // Phase 5
    {
      image: "https://www.hahnelec.com.au/wp-content/uploads/2021/10/testing-commisioning.jpg",
      phase: "Phase 5",
      title: "Testing & Commissioning",
      progress: 15,
      status: "Upcoming",
      statusIcon: AlertCircle,
      statusColor: "text-amber-600",
      description: "Electrical and mechanical testing phase. Integration with grid control systems. Expected commissioning Q1 2025.",
      milestones: ["Component Testing Started", "SCADA Integration Pending", "Trial Runs Scheduled"],
    },
    // Phase 6
    {
      image: "https://th.bing.com/th/id/R.525c278c333e2ffb8e03b52fad554ea2?rik=%2fm1w6OVh6v4XlA&pid=ImgRaw&r=0",
      phase: "Phase 6",
      title: "O&M & Upgrades",
      progress: 0,
      status: "Planned",
      statusIcon: AlertCircle,
      statusColor: "text-gray-500",
      description: "Operational optimization, turbine refurbishments, and long-term maintenance planning. Scheduled for 2025–2026.",
      milestones: ["Maintenance Plan Drafted", "Upgrade Scope Defined", "Staff Training Planned"],
    },
  ];

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

        {/* Phase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nextPhases.map((phase, idx) => (
            <motion.article
              key={phase.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all border border-sky-100"
            >
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

              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <phase.statusIcon className={`${phase.statusColor} h-4 w-4`} />
                  <span className={`${phase.statusColor} font-medium text-sm`}>{phase.status}</span>
                </div>

                <h3 className="font-jakarta text-lg font-semibold text-black line-clamp-2">{phase.title}</h3>

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

                <p className="text-xs text-black/70 line-clamp-2">{phase.description}</p>

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
      </div>
    </section>
  );
};

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
        <ProjectsContinuation />
      </main>
      <Footer />
      <GlobalFixes />
    </>
  )
}

export default ProjectsPage
