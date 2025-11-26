"use client"

import { useContext } from "react"
import { BookContext } from "@/app/page"
import BookItem from "./BookItem"

export default function BookList() {
  const context = useContext(BookContext)

  if (!context) return null

  const { filteredBooks } = context

  if (filteredBooks.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-2xl text-muted-foreground mb-2">📚 Tidak ada buku</p>
        <p className="text-muted-foreground">Coba tambah buku atau ubah filter Anda</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {filteredBooks.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  )
}
