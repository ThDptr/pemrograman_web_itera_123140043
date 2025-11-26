"use client"

import { useContext } from "react"
import { BookContext } from "@/app/page"

export default function BookFilter() {
  const context = useContext(BookContext)

  if (!context) return null

  const { filter, setFilter, searchQuery, setSearchQuery } = context

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-semibold text-primary mb-4">Filter & Pencarian</h2>

      <div className="space-y-4">
        {/* Search Input */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">Cari Buku atau Penulis</label>
          <input
            type="text"
            placeholder="Ketik judul atau nama penulis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input"
          />
        </div>

        {/* Filter Buttons */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">Filter Status</label>
          <div className="flex flex-wrap gap-3">
            {["all", "owned", "reading", "toBuy"].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`btn btn-sm transition-all ${filter === filterOption ? "btn-primary" : "btn-secondary"}`}
              >
                {filterOption === "all" && "Semua"}
                {filterOption === "owned" && "📖 Milik"}
                {filterOption === "reading" && "👀 Sedang Dibaca"}
                {filterOption === "toBuy" && "🛒 Ingin Dibeli"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
