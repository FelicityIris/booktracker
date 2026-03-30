import React from 'react'
import { BookOpen, Plus } from 'lucide-react'
import { useBooks } from '../context/BookContext'
import Timeline from '../components/Timeline'
import { useState } from 'react'
import BookFormModal from '../components/BookFormModal'

export default function Home() {
  const { books, theme } = useBooks()
  const dark = theme === 'dark'
  const [showAdd, setShowAdd] = useState(false)

  const finished   = books.filter(b => b.dateFinished).length
  const inProgress = books.filter(b => b.pagesRead > 0 && !b.dateFinished).length
  const totalPages = books.reduce((s, b) => s + (b.pagesRead || 0), 0)

  return (
    <div className="min-h-[70vh]">
      {/* Hero strip */}
      <div
        className={`
          border-b
          ${dark ? 'border-ctp-surface0' : 'border-latte-surface0'}
        `}
      >
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1
            className={`font-display font-semibold text-3xl mb-1 ${dark ? 'text-ctp-text' : 'text-latte-text'}`}
          >
            My Reading Library
          </h1>
          <p className={`text-sm ${dark ? 'text-ctp-subtext0' : 'text-latte-subtext0'}`}>
            Track the books you've read, are reading, or plan to read.
          </p>

          {books.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-4">
              {[
                { label: 'Total Books',   value: books.length,                         color: dark ? 'text-ctp-mauve'  : 'text-latte-mauve' },
                { label: 'Finished',      value: finished,                             color: dark ? 'text-ctp-green'  : 'text-latte-green' },
                { label: 'In Progress',   value: inProgress,                           color: dark ? 'text-ctp-yellow' : 'text-latte-yellow' },
                { label: 'Pages Read',    value: totalPages.toLocaleString(),          color: dark ? 'text-ctp-sapphire': 'text-latte-sapphire' },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  className={`
                    px-4 py-2.5 rounded-lg
                    ${dark ? 'bg-ctp-surface0' : 'bg-latte-surface0'}
                  `}
                >
                  <p className={`font-mono text-xl font-semibold ${color}`}>{value}</p>
                  <p className={`text-xs ${dark ? 'text-ctp-subtext0' : 'text-latte-subtext0'}`}>{label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="py-10">
        {books.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
            <div
              className={`
                w-20 h-20 rounded-2xl flex items-center justify-center mb-5
                ${dark ? 'bg-ctp-surface0' : 'bg-latte-surface0'}
              `}
            >
              <BookOpen
                size={36}
                className={dark ? 'text-ctp-overlay0' : 'text-latte-overlay0'}
              />
            </div>
            <h2
              className={`font-display font-semibold text-xl mb-2 ${dark ? 'text-ctp-text' : 'text-latte-text'}`}
            >
              No books yet…
            </h2>
            <p className={`text-sm max-w-xs mb-6 ${dark ? 'text-ctp-subtext0' : 'text-latte-subtext0'}`}>
              Start building your reading journal by adding your first book.
            </p>
            <button
              onClick={() => setShowAdd(true)}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
                transition-all active:scale-95
                ${dark
                  ? 'bg-ctp-mauve text-ctp-base hover:bg-ctp-lavender'
                  : 'bg-latte-mauve text-white hover:bg-latte-lavender'}
              `}
            >
              <Plus size={16} strokeWidth={2.5} />
              Add Your First Book
            </button>
          </div>
        ) : (
          <Timeline books={books} />
        )}
      </div>

      {showAdd && <BookFormModal mode="add" onClose={() => setShowAdd(false)} />}
    </div>
  )
}
