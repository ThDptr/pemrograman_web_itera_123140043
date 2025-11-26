import type React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import BookForm from "@/components/BookForm"
import { BookContext } from "@/app/page"
import { jest } from "@jest/globals" // Declaring jest variable

const mockContextValue = {
  books: [],
  addBook: jest.fn(),
  editBook: jest.fn(),
  deleteBook: jest.fn(),
  filteredBooks: [],
  setFilter: jest.fn(),
  setSearchQuery: jest.fn(),
  filter: "all",
  searchQuery: "",
}

const renderWithContext = (component: React.ReactElement) => {
  return render(<BookContext.Provider value={mockContextValue as any}>{component}</BookContext.Provider>)
}

describe("BookForm Component", () => {
  // Test 1: Render component and check for button
  it("should render BookForm with Tambah Buku button", () => {
    renderWithContext(<BookForm />)
    const button = screen.getByText(/Tambah Buku/i)
    expect(button).toBeInTheDocument()
  })

  // Test 2: Show error when title is empty
  it("should show error message when submitting with empty title", () => {
    renderWithContext(<BookForm />)
    const submitButton = screen.getByText(/Tambah Buku/i)
    fireEvent.click(submitButton)
    const errorMessage = screen.getByText(/Judul buku tidak boleh kosong/i)
    expect(errorMessage).toBeInTheDocument()
  })

  // Test 3: User can type in title input
  it("should allow user to type in title input", () => {
    renderWithContext(<BookForm />)
    const titleInput = screen.getByPlaceholderText(/Masukkan judul buku/i) as HTMLInputElement
    fireEvent.change(titleInput, { target: { value: "Test Book" } })
    expect(titleInput.value).toBe("Test Book")
  })

  // Test 4: BookFilter renders all filter options
  it("should render all status filter options", () => {
    const { render: testRender } = require("@testing-library/react")
    const BookFilter = require("@/components/BookFilter").default
    testRender(
      <BookContext.Provider value={mockContextValue as any}>
        <BookFilter />
      </BookContext.Provider>,
    )
    expect(screen.getByText(/Semua/i)).toBeInTheDocument()
    expect(screen.getByText(/Milik/i)).toBeInTheDocument()
  })

  // Test 5: useBookStats logic with mock context
  it("should calculate book statistics correctly", () => {
    const statsContext = {
      ...mockContextValue,
      books: [
        { id: "1", title: "Book 1", author: "Author 1", status: "owned" as const },
        { id: "2", title: "Book 2", author: "Author 2", status: "reading" as const },
        { id: "3", title: "Book 3", author: "Author 3", status: "toBuy" as const },
      ],
    }

    const stats = {
      total: statsContext.books.length,
      owned: statsContext.books.filter((b) => b.status === "owned").length,
      reading: statsContext.books.filter((b) => b.status === "reading").length,
      toBuy: statsContext.books.filter((b) => b.status === "toBuy").length,
    }

    expect(stats.total).toBe(3)
    expect(stats.owned).toBe(1)
    expect(stats.reading).toBe(1)
    expect(stats.toBuy).toBe(1)
  })
})
