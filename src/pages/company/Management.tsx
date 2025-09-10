"use client"

import React from "react"
import { Header, Footer, ScrollProgress, GlobalFixes } from "../../components/site-chrome"

type Person = { name: string; role: string; blurb?: string; photo?: string }

const team: Person[] = [
  { name: "Sanjay Sapkota", role: "Chief Executive Officer", blurb: "Portfolio delivery & lender engagement.", photo: "/placeholder.svg?height=160&width=160" },
  { name: "Mandira Khadka", role: "Company Secretary", blurb: "Governance, compliance & stakeholders.", photo: "/placeholder.svg?height=160&width=160" },
  { name: "R. Adhikari", role: "Head, Engineering", blurb: "Civil/EM design, QA/QC & commissioning.", photo: "/placeholder.svg?height=160&width=160" },
  { name: "N. Tamang", role: "Head, HSE", blurb: "Zero-harm systems across sites.", photo: "/placeholder.svg?height=160&width=160" },
  { name: "K. Thapa", role: "Head, Grid & Protection", blurb: "Grid code & protection studies.", photo: "/placeholder.svg?height=160&width=160" },
  { name: "P. Rai", role: "Head, O&M", blurb: "CBM, uprates & digital ops.", photo: "/placeholder.svg?height=160&width=160" },
]

const Tile: React.FC<Person> = ({ name, role, blurb, photo }) => (
  <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm hover:shadow-md transition">
    <div className="flex items-start gap-5">
      <div className="h-20 w-20 rounded-full bg-sky-100 overflow-hidden flex-shrink-0">
        <img src={photo} alt={name} className="h-full w-full object-cover" />
      </div>
      <div>
        <div className="font-semibold text-gray-900">{name}</div>
        <div className="text-sm text-sky-700">{role}</div>
        {blurb && <p className="mt-2 text-sm text-gray-600">{blurb}</p>}
      </div>
    </div>
  </div>
)

const Management: React.FC = () => {
  return (
    <>
      <ScrollProgress />
      <Header />

      <main className="bg-white">
        <section className="mx-auto max-w-7xl px-4 py-14">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">Management Team</h1>
          <p className="mt-3 max-w-3xl text-gray-700">Experienced leadership across engineering, grid, HSE and O&amp;M.</p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map((p) => <Tile key={p.name} {...p} />)}
          </div>
        </section>
      </main>

      <Footer />
      <GlobalFixes />
    </>
  )
}

export default Management
