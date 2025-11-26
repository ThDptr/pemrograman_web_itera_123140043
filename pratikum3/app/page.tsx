"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import Header from "@/components/Header"

// TAMBAHKAN IMPORT UNTUK KOMPONEN YANG AKAN KITA GUNAKAN
import BookFilter from "@/components/BookFilter"
import BookList from "@/components/BookList"
import BookForm from "@/components/BookForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Context setup
interface Book {
  id: string
  title: string
  author: string
  status: "owned" | "reading" | "toBuy"
}

interface BookContextType {
  books: Book[]
  addBook: (book: Omit<Book, "id">) => void
  editBook: (id: string, book: Omit<Book, "id">) => void
  deleteBook: (id: string) => void
  filteredBooks: Book[]
  setFilter: (filter: string) => void
  setSearchQuery: (query: string) => void
  filter: string
  searchQuery: string
}

const BookContext = createContext<BookContextType | undefined>(undefined)

function useBooks() {
  const context = useContext(BookContext)
  if (!context) {
    throw new Error("useBooks must be used within BookProvider")
  }
  return context
}

// Custom hook: useLocalStorage
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoaded(true)
  }, [key])

  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}

// BookProvider component
function BookProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useLocalStorage<Book[]>("books", [
    { id: "1", title: "Atomic Habits", author: "James Clear", status: "reading" },
    { id: "2", title: "Clean Code", author: "Robert Martin", status: "owned" },
    { id: "3", title: "The Pragmatic Programmer", author: "Hunt & Thomas", status: "toBuy" },
  ])
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBooks = books.filter((book) => {
    const matchesFilter = filter === "all" || book.status === filter
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const addBook = (book: Omit<Book, "id">) => {
    const newBook: Book = {
      ...book,
      id: Date.now().toString(),
    }
    setBooks([...books, newBook])
  }

  const editBook = (id: string, updatedBook: Omit<Book, "id">) => {
    setBooks(books.map((book) => (book.id === id ? { ...updatedBook, id } : book)))
  }

  const deleteBook = (id: string) => {
    setBooks(books.filter((book) => book.id !== id))
  }

  return (
    <BookContext.Provider
      value={{
        books,
        addBook,
        editBook,
        deleteBook,
        filteredBooks,
        setFilter,
        setSearchQuery,
        filter,
        searchQuery,
      }}
    >
      {children}
    </BookContext.Provider>
  )
}

// =======================================================================
// PERBAIKAN DIMULAI DI SINI
// Kita definisikan komponen Page yang hilang langsung di file ini
// =======================================================================

/**
 * Komponen HomePage
 * Menggabungkan BookFilter, BookList, dan BookForm sesuai struktur tugas.
 */
function HomePage() {
  return (
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        <BookFilter />
        <BookList />
      </div>
      <div className="space-y-6">
        <BookForm />
      </div>
    </div>
  )
}

/**
 * Komponen StatsPage
 * Halaman placeholder untuk statistik, sesuai dengan tugas.
 */
function StatsPage() {
  const { books } = useBooks() // Menggunakan context untuk data
  
  const readingCount = books.filter(b => b.status === 'reading').length;
  const ownedCount = books.filter(b => b.status === 'owned').length;
  const toBuyCount = books.filter(b => b.status === 'toBuy').length;

  return (
    <div className="container mx-auto px-4">
      <Card>
        <CardHeader>
          <CardTitle>Book Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>Total Books: {books.length}</p>
          <p>Currently Reading: {readingCount}</p>
          <p>Owned: {ownedCount}</p>
          <p>Wishlist (To Buy): {toBuyCount}</p>
        </CardContent>
      </Card>
    </div>
  )
}

// =======================================================================
// KODE ANDA SEBELUMNYA (SEKARANG BERFUNGSI)
// RootApp sekarang bisa menemukan HomePage dan StatsPage karena
// keduanya didefinisikan di atas.
// =======================================================================
export default function RootApp() {
  const [currentPage, setCurrentPage] = useState("home")

  return (
    <BookProvider>
      <div className="min-h-screen bg-background">
        <Header onNavigate={(page: string) => setCurrentPage(page)} />
        <main className="py-8">
          {currentPage === "home" && <HomePage />}
          {currentPage === "stats" && <StatsPage />}
        </main>
      </div>
    </BookProvider>
  )
}

export { BookContext, useBooks, useLocalStorage }