"use client"

import React, { useState } from "react"
import { Droplet, Facebook, Instagram, Linkedin, Youtube } from "lucide-react"

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

export default Footer