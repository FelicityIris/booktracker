import React from 'react'
import BookCard from './BookCard'
import { useBooks } from '../context/BookContext'

export default function Timeline({ books }) {
  const { theme } = useBooks()
  const dark = theme === 'dark'

  return (
    <div className="relative max-w-2xl mx-auto px-4">
      {/* Central vertical line */}
      <div className="timeline-line" />

      <div className="space-y-8 py-4">
        {books.map((book, i) => (
          <div
            key={book.id}
            className="relative animate-card-in"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
          >
            {/* Timeline dot — centered vertically on the card */}
            <div
              className={`
                absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 z-10
                top-1/2 -translate-y-1/2
                ${dark
                  ? 'bg-ctp-mauve border-ctp-base shadow-[0_0_0_3px_rgba(203,166,247,0.2)]'
                  : 'bg-latte-mauve border-latte-base shadow-[0_0_0_3px_rgba(136,57,239,0.15)]'}
              `}
            />
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  )
}
