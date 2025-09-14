"use client"

import React from "react"
import { motion } from "framer-motion"
import { Droplet, Building, Zap } from "lucide-react"
import BlueCard from "./BlueCard"

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

export default SalientFeaturesSection;