"use client"

import type React from "react"

import { useState, useContext } from "react"
import { BookContext } from "@/app/page"

export default function BookForm() {
  const context = useContext(BookContext)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [status, setStatus] = useState<"owned" | "reading" | "toBuy">("owned")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  if (!context) return null

  const { addBook } = context

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!title.trim()) {
      setError("Judul buku tidak boleh kosong")
      return
    }

    if (!author.trim()) {
      setError("Nama penulis tidak boleh kosong")
      return
    }

    addBook({
      title: title.trim(),
      author: author.trim(),
      status,
    })

    setTitle("")
    setAuthor("")
    setStatus("owned")
    setSuccess("Buku berhasil ditambahkan!")
    setTimeout(() => setSuccess(""), 3000)
  }

  return (
    <div className="card mb-6">
      <div className="card-header">
        <h2 className="card-title">Tambah Buku Baru</h2>
        <p className="card-subtitle">Tambahkan buku ke koleksi Anda</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">Judul Buku *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul buku..."
            className="input"
          />
        </div>

        {/* Author Input */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">Nama Penulis *</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Masukkan nama penulis..."
            className="input"
          />
        </div>

        {/* Status Select */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "owned" | "reading" | "toBuy")}
            className="select"
          >
            <option value="owned">📖 Sudah Dimiliki</option>
            <option value="reading">👀 Sedang Dibaca</option>
            <option value="toBuy">🛒 Ingin Dibeli</option>
          </select>
        </div>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Success Message */}
        {success && <div className="success-message">{success}</div>}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          ➕ Tambah Buku
        </button>
      </form>
    </div>
  )
}
