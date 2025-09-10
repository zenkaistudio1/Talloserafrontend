"use client"

import React, { useEffect, useRef, useState, type ComponentProps } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { Droplet, Menu, X, ChevronDown, Phone, Mail, MapPin, Clock } from "lucide-react"



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

/* ============================ Footer (EXACT from your snippet) ============================ */
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
              <div className="text-lg font-semibold">Tallosera Hydropower Limited</div>
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

/* ============================ Contact Page Content ============================ */
const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const contactInfo = [
    { icon: MapPin, title: "Office Address", info: "Kathmandu, Nepal", detail: "Serving Nepal & South Asia" },
    { icon: Phone, title: "Phone Number", info: "+977 1-4440000", detail: "Mon - Fri, 9:00 AM - 6:00 PM" },
    { icon: Mail, title: "Email Address", info: "info@yetihydro.com", detail: "24/7 Support Available" },
    { icon: Clock, title: "Business Hours", info: "Mon - Fri: 9:00 AM - 6:00 PM", detail: "Saturday: 9:00 AM - 2:00 PM" },
  ]

  return (
    <>
      <ScrollProgress />
      <Header />

      <main>
        <section id="contact" className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              <div className="w-24 h-1 bg-sky-600 mx-auto mb-6" />
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Ready to start your next hydropower project? Contact our expert team for consultation and planning.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 xl:gap-16">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-semibold text-gray-900">Contact Information</h3>
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
                      <item.icon className="text-sky-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-900 font-medium mb-1">{item.info}</p>
                      <p className="text-gray-600 text-sm">{item.detail}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Map placeholder */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="mt-2"
                >
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-4">Our Location</h4>
                    <div className="bg-gray-100 rounded-2xl h-48 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="text-sky-600 mx-auto mb-2" size={32} />
                        <p className="text-gray-600">Interactive Map</p>
                        <p className="text-sm text-gray-500">Kathmandu, Nepal</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-8">Send us a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                        placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 px-6 rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default ContactPage
