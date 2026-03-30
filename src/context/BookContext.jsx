import React, { createContext, useContext, useState, useEffect } from 'react'

const BookContext = createContext(null)

const STORAGE_KEY = 'booktracker_books'
const THEME_KEY   = 'booktracker_theme'

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export function BookProvider({ children }) {
  const [books, setBooks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || 'dark'
  })

  // Persist books to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
  }, [books])

  // Apply theme class to <html>
  useEffect(() => {
    const html = document.documentElement
    if (theme === 'dark') {
      html.classList.remove('light')
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
      html.classList.add('light')
    }
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

  const addBook = (data) => {
    const today = new Date().toISOString().split('T')[0]
    const newBook = {
      id: generateId(),
      name: data.name,
      author: data.author || '',
      year: data.year || '',
      pagesRead: Number(data.pagesRead) || 0,
      totalPages: Number(data.totalPages),
      dateStarted: data.dateStarted || today,
      dateFinished: data.dateFinished || '',
      coverImage: data.coverImage || '',
      createdAt: new Date().toISOString(),
    }
    // Auto-mark finished if pages match
    if (newBook.pagesRead >= newBook.totalPages) {
      newBook.dateFinished = newBook.dateFinished || today
    }
    setBooks(prev => [newBook, ...prev])
  }

  const updateBook = (id, data) => {
    const today = new Date().toISOString().split('T')[0]
    setBooks(prev =>
      prev.map(book => {
        if (book.id !== id) return book
        const updated = {
          ...book,
          ...data,
          pagesRead:  Number(data.pagesRead  ?? book.pagesRead),
          totalPages: Number(data.totalPages ?? book.totalPages),
        }
        // Only auto-set dateFinished if user left it blank and pages are complete
        if (updated.pagesRead >= updated.totalPages && !updated.dateFinished) {
          updated.dateFinished = today
        }
        // Only auto-clear dateFinished if user didn't manually supply one
        // and pages dropped below total
        if (
          updated.pagesRead < updated.totalPages &&
          updated.dateFinished &&
          !data.dateFinished   // user explicitly cleared it in the form
        ) {
          updated.dateFinished = ''
        }
        return updated
      })
    )
  }

  const deleteBook = (id) => {
    setBooks(prev => prev.filter(book => book.id !== id))
  }

  return (
    <BookContext.Provider
      value={{ books, theme, toggleTheme, addBook, updateBook, deleteBook }}
    >
      {children}
    </BookContext.Provider>
  )
}

export function useBooks() {
  const ctx = useContext(BookContext)
  if (!ctx) throw new Error('useBooks must be used within BookProvider')
  return ctx
}
