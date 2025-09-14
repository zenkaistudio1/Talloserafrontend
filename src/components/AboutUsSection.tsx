// components/AboutUsSection.tsx
"use client"

import React from "react"
import BlueCard from "./BlueCard"

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
                The site lies ~750 km west of Kathmandu, contributing to Nepal's renewable energy infrastructure.
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

        {/* Leadership */}
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

export default AboutUsSection