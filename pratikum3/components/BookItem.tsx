"use client"

import { useContext } from "react"
import { BookContext } from "@/app/page"

interface BookItemProps {
  book: {
    id: string
    title: string
    author: string
    status: "owned" | "reading" | "toBuy"
  }
}

export default function BookItem({ book }: BookItemProps) {
  const context = useContext(BookContext)

  if (!context) return null

  const { deleteBook } = context

  const statusEmoji = {
    owned: "📖",
    reading: "👀",
    toBuy: "🛒",
  }

  const statusLabel = {
    owned: "Sudah Dimiliki",
    reading: "Sedang Dibaca",
    toBuy: "Ingin Dibeli",
  }

  return (
    <div className="card flex items-center justify-between">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-card-foreground">{book.title}</h3>
        <p className="text-sm text-muted-foreground">oleh {book.author}</p>
        <span className="inline-block mt-2 text-xs font-medium text-primary">
          {statusEmoji[book.status]} {statusLabel[book.status]}
        </span>
      </div>

      <button onClick={() => deleteBook(book.id)} className="btn btn-danger btn-sm">
        🗑️ Hapus
      </button>
    </div>
  )
}
