"use client"

import { useState } from "react"
import Image from "next/image"

interface HeaderProps {
  onNavigate: (page: string) => void
}

export default function Header({ onNavigate }: HeaderProps) {
  const [activePage, setActivePage] = useState("home")

  const handleNavClick = (page: string) => {
    setActivePage(page)
    onNavigate(page)
  }

  return (
    <header className="bg-white shadow-md border-b-4 border-primary">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Container */}
          <div className="flex items-center gap-3">
            {/* Logo Placeholder - Latar belakang gradient dihapus */}
            <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
              
              <Image
                src="/logo_THD.png"
                alt="Book Manager Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>

            <h1 className="text-2xl font-bold text-primary">Manajemen Buku Tengku HD</h1>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <button
              onClick={() => handleNavClick("home")}
              className={`text-lg font-semibold transition-all ${
                activePage === "home"
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-muted-foreground hover:text-card-foreground"
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => handleNavClick("stats")}
              className={`text-lg font-semibold transition-all ${
                activePage === "stats"
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-muted-foreground hover:text-card-foreground"
              }`}
            >
              Statistik
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}