import React from "react"

const BlueCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border border-sky-100 bg-gradient-to-br from-white to-sky-50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${className}`}
  >
    <div className="p-6 sm:p-7">{children}</div>
  </div>
)

export default BlueCard;