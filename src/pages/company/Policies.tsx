"use client"

import React from "react"
import { Header, Footer, ScrollProgress, GlobalFixes } from "../../components/site-chrome"
import { FileText, ShieldCheck, ScrollText } from "lucide-react"

const docs = [
  { icon: ShieldCheck, title: "HSE Policy", desc: "Zero-harm commitment at site and office.", href: "#" },
  { icon: ScrollText, title: "Code of Conduct", desc: "Ethics, conflict of interest, anti-bribery.", href: "#" },
  { icon: FileText, title: "Environmental & Social Policy", desc: "ESIA, biodiversity & community engagement.", href: "#" },
  { icon: FileText, title: "Quality Policy (ISO 9001)", desc: "QA/QC, audits and continual improvement.", href: "#" },
]

const Policies: React.FC = () => {
  return (
    <>
      <ScrollProgress />
      <Header />

      <main className="bg-gradient-to-br from-sky-50/60 to-blue-50/50">
        <section className="mx-auto max-w-7xl px-4 py-14">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">Legal &amp; Policies</h1>
          <p className="mt-3 max-w-3xl text-gray-700">
            Download our key governance, safety, environmental and quality frameworks that guide every project.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {docs.map((d) => (
              <a key={d.title} href={d.href} className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm hover:shadow-md transition group">
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 grid place-items-center rounded-xl bg-sky-100 text-sky-700 flex-shrink-0">
                    <d.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-gray-950">{d.title}</div>
                    <p className="text-sm text-gray-600 mt-1">{d.desc}</p>
                    <div className="mt-2 text-xs text-sky-700">Download</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <GlobalFixes />
    </>
  )
}

export default Policies
