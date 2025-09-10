"use client"

import React from "react"
import { Header, Footer, ScrollProgress, GlobalFixes } from "../../components/site-chrome"

const Overview: React.FC = () => {
  return (
    <>
      <ScrollProgress />
      <Header />

      <main className="bg-gradient-to-br from-sky-50/60 to-blue-50/50">
        <section className="mx-auto max-w-7xl px-4 py-14">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">Company Overview</h1>
          <p className="mt-3 max-w-3xl text-gray-700">
            Yeti Hydropower Company Limited (YHCL) delivers bankable hydropower—from feasibility and design to EPC,
            commissioning, and long-term O&amp;M—meeting lender standards and grid code requirements.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { k: "Founded", v: "2017" },
              { k: "Installed/Delivered", v: "1.2 GW+" },
              { k: "Employees", v: "300+" },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
                <div className="text-sm text-gray-600">{s.k}</div>
                <div className="mt-1 text-2xl font-semibold text-gray-900">{s.v}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">What We Do</h2>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li>Feasibility, ESIA, DPR &amp; permitting</li>
                <li>Civil &amp; Electro-Mechanical EPC</li>
                <li>Grid integration, substations &amp; protection</li>
                <li>O&amp;M, uprates &amp; digitalization</li>
              </ul>
            </div>

            <div className="rounded-2xl overflow-hidden border border-sky-100 bg-white shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1655683975875-28f03121ac89?q=80&w=1200&auto=format&fit=crop"
                alt="Hydropower overview"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <GlobalFixes />
    </>
  )
}

export default Overview
