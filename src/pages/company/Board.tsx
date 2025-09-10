"use client"

import React from "react"
import { Header, Footer, ScrollProgress, GlobalFixes } from "../../components/site-chrome"

type Person = { name: string; role: string; photo?: string }

const board: Person[] = [
  { name: "A. Sharma", role: "Chairperson", photo: "/placeholder.svg?height=160&width=160" },
  { name: "B. Gurung", role: "Director", photo: "/placeholder.svg?height=160&width=160" },
  { name: "C. Shrestha", role: "Director", photo: "/placeholder.svg?height=160&width=160" },
  { name: "D. Bista", role: "Director", photo: "/placeholder.svg?height=160&width=160" },
  { name: "E. Koirala", role: "Independent Director", photo: "/placeholder.svg?height=160&width=160" },
]

const Card: React.FC<Person> = ({ name, role, photo }) => (
  <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm hover:shadow-md transition">
    <div className="flex items-center gap-5">
      <div className="h-20 w-20 rounded-full bg-sky-100 overflow-hidden flex-shrink-0">
        <img src={photo} alt={name} className="h-full w-full object-cover" />
      </div>
      <div>
        <div className="font-semibold text-gray-900">{name}</div>
        <div className="text-sm text-sky-700">{role}</div>
      </div>
    </div>
  </div>
)

const Board: React.FC = () => {
  return (
    <>
      <ScrollProgress />
      <Header />

      <main className="bg-white">
        <section className="mx-auto max-w-7xl px-4 py-14">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">Board of Directors</h1>
          <p className="mt-3 max-w-3xl text-gray-700">
            The Board provides strategic direction, governance, and oversight to ensure safe, timely, bankable delivery.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {board.map((p) => <Card key={p.name} {...p} />)}
          </div>
        </section>
      </main>

      <Footer />
      <GlobalFixes />
    </>
  )
}

export default Board
