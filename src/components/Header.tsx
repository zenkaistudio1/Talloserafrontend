"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Droplet, Menu, X, Phone, Mail, ChevronDown } from "lucide-react"

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
  { label: "Projects progress", href: "/projects" },
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

  const openMenu = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveDropdown(key)
  }

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120)
  }

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50">
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

        <div className={`bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 transition-all ${isScrolled ? "shadow-sm border-b border-gray-200/70" : "border-b border-transparent"}`}>
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex h-16 lg:h-20 items-center justify-between">
              <a href="/" className="flex items-center gap-3">
                <div className="grid h-10 w-10 lg:h-12 lg:w-12 place-items-center rounded-xl bg-sky-600 shadow-lg shadow-sky-600/30">
                  <Droplet className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                <div className="leading-tight">
                  <div className="text-lg lg:text-xl font-semibold text-gray-900 tracking-tight">Tallosera Hydro limited</div>
                  <div className="text-[10px] lg:text-xs text-gray-700 font-medium tracking-wider uppercase">Sanibheri Uttarganga Hydropower</div>
                </div>
              </a>

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
                      {item.hasDropdown && (<ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />)}
                      <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-sky-600 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                    </a>
                    {item.hasDropdown && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.16 }}
                        className="absolute left-0 top-full z-[60] pt-3"
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
                          {has && (<ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />)}
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

      <div aria-hidden className="h-16 md:h-[104px] lg:h-[120px]" />
    </>
  )
}

export default Header;