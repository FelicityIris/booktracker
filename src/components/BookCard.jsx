import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { Pencil, Trash2, BookOpen } from 'lucide-react'
import { useBooks } from '../context/BookContext'
import BookFormModal from './BookFormModal'
import DeleteConfirmModal from './DeleteConfirmModal'

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const [y, m, d] = dateStr.split('-')
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${months[parseInt(m, 10) - 1]} ${parseInt(d, 10)}, ${y}`
}

export default function BookCard({ book }) {
  const { theme } = useBooks()
  const dark = theme === 'dark'
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  const pagesRead   = book.pagesRead  || 0
  const totalPages  = book.totalPages || 1
  const progress    = Math.min(100, Math.round((pagesRead / totalPages) * 100))
  const isFinished  = !!book.dateFinished
  const inProgress  = pagesRead > 0 && !isFinished
  const notStarted  = pagesRead === 0

  const statusColor = isFinished
    ? dark ? 'text-ctp-green' : 'text-latte-green'
    : inProgress
      ? dark ? 'text-ctp-yellow' : 'text-latte-yellow'
      : dark ? 'text-ctp-overlay1' : 'text-latte-overlay1'

  const statusLabel = isFinished ? 'Finished' : inProgress ? 'Reading' : 'Not started'

  const progressColor = isFinished
    ? dark ? 'bg-ctp-green' : 'bg-latte-green'
    : inProgress
      ? dark ? 'bg-ctp-yellow' : 'bg-latte-yellow'
      : dark ? 'bg-ctp-overlay1' : 'bg-latte-overlay1'

  return (
    <>
      <div
        className={`
          book-card relative group rounded-xl overflow-hidden border
          animate-card-in transition-all duration-200
          ${dark
            ? 'bg-ctp-surface0 border-ctp-surface1 hover:border-ctp-mauve/50 hover:shadow-[0_4px_24px_rgba(203,166,247,0.1)]'
            : 'bg-latte-surface0 border-latte-surface1 hover:border-latte-mauve/50 hover:shadow-[0_4px_24px_rgba(136,57,239,0.08)]'}
        `}
      >
        {/* Edit / Delete – revealed on hover */}
        <div className="card-actions absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={() => setShowEdit(true)}
            title="Edit book"
            className={`
              w-7 h-7 rounded-lg flex items-center justify-center transition-colors
              ${dark
                ? 'bg-ctp-mantle/90 text-ctp-subtext1 hover:text-ctp-blue hover:bg-ctp-mantle'
                : 'bg-latte-mantle/90 text-latte-subtext1 hover:text-latte-blue hover:bg-latte-mantle'}
            `}
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => setShowDelete(true)}
            title="Delete book"
            className={`
              w-7 h-7 rounded-lg flex items-center justify-center transition-colors
              ${dark
                ? 'bg-ctp-mantle/90 text-ctp-subtext1 hover:text-ctp-red hover:bg-ctp-mantle'
                : 'bg-latte-mantle/90 text-latte-subtext1 hover:text-latte-red hover:bg-latte-mantle'}
            `}
          >
            <Trash2 size={13} />
          </button>
        </div>

        <div className="flex">
          {/* Cover image */}
          <div
            className={`
              w-24 flex-shrink-0 relative
              ${dark ? 'bg-ctp-base' : 'bg-latte-base'}
            `}
            style={{ minHeight: '140px' }}
          >
            {book.coverImage ? (
              <img
                src={book.coverImage}
                alt={`Cover of ${book.name}`}
                className="w-full h-full object-cover absolute inset-0"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-2">
                <BookOpen
                  size={24}
                  className={dark ? 'text-ctp-overlay0' : 'text-latte-overlay0'}
                />
                <p
                  className={`text-center text-xs leading-tight font-medium ${dark ? 'text-ctp-overlay0' : 'text-latte-overlay0'}`}
                  style={{ fontSize: '10px' }}
                >
                  No Cover
                </p>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 p-4 min-w-0">

            {/* Line 1: Title, Author, Year */}
            <div className="mb-3">
              <div className="flex items-start gap-2 flex-wrap pr-14">
                <div className="min-w-0">
                  <p
                    className={`text-xs font-semibold uppercase tracking-wider mb-0.5 ${dark ? 'text-ctp-overlay1' : 'text-latte-overlay1'}`}
                  >
                    Title &amp; Author
                  </p>
                  <h3
                    className={`font-display font-semibold leading-snug ${dark ? 'text-ctp-text' : 'text-latte-text'}`}
                    style={{ fontSize: '15px' }}
                  >
                    {book.name}
                  </h3>
                  <p className={`text-sm ${dark ? 'text-ctp-subtext0' : 'text-latte-subtext0'}`}>
                    {book.author
                      ? <>{book.author}{book.year ? <span className={`ml-1.5 font-mono text-xs ${dark ? 'text-ctp-overlay1' : 'text-latte-overlay1'}`}>· {book.year}</span> : ''}</>
                      : book.year
                        ? <span className={`font-mono text-xs ${dark ? 'text-ctp-overlay1' : 'text-latte-overlay1'}`}>{book.year}</span>
                        : <span className={dark ? 'text-ctp-overlay0' : 'text-latte-overlay0'}>Unknown Author</span>
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Line 2: Pages */}
            <div className="mb-3">
              <p
                className={`text-xs font-semibold uppercase tracking-wider mb-1 ${dark ? 'text-ctp-overlay1' : 'text-latte-overlay1'}`}
              >
                Progress
              </p>
              <div className="flex items-center gap-2">
                <div
                  className={`
                    flex-1 h-1.5 rounded-full overflow-hidden
                    ${dark ? 'bg-ctp-surface1' : 'bg-latte-surface1'}
                  `}
                >
                  <div
                    className={`h-full rounded-full progress-bar-fill ${progressColor}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className={`font-mono text-xs whitespace-nowrap ${dark ? 'text-ctp-subtext0' : 'text-latte-subtext0'}`}>
                  {pagesRead.toLocaleString()} / {totalPages.toLocaleString()} pp
                </span>
                <span className={`text-xs font-semibold whitespace-nowrap ${statusColor}`}>
                  {progress}%
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <span
                  className={`
                    inline-block w-1.5 h-1.5 rounded-full
                    ${isFinished
                      ? dark ? 'bg-ctp-green' : 'bg-latte-green'
                      : inProgress
                        ? dark ? 'bg-ctp-yellow' : 'bg-latte-yellow'
                        : dark ? 'bg-ctp-overlay1' : 'bg-latte-overlay1'}
                  `}
                />
                <span className={`text-xs ${statusColor}`}>{statusLabel}</span>
              </div>
            </div>

            {/* Line 3: Dates */}
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-wider mb-1 ${dark ? 'text-ctp-overlay1' : 'text-latte-overlay1'}`}
              >
                Dates
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5">
                <span className={`text-xs flex items-center gap-1 ${dark ? 'text-ctp-subtext0' : 'text-latte-subtext0'}`}>
                  <span className={`text-[10px] font-semibold uppercase ${dark ? 'text-ctp-overlay0' : 'text-latte-overlay0'}`}>Started</span>
                  &nbsp;{formatDate(book.dateStarted)}
                </span>
                {(isFinished || book.dateFinished) && (
                  <span className={`text-xs flex items-center gap-1 ${dark ? 'text-ctp-green' : 'text-latte-green'}`}>
                    <span className={`text-[10px] font-semibold uppercase ${dark ? 'text-ctp-overlay0' : 'text-latte-overlay0'}`}>Finished</span>
                    &nbsp;{formatDate(book.dateFinished)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showEdit && createPortal(
        <BookFormModal
          mode="edit"
          book={book}
          onClose={() => setShowEdit(false)}
        />, document.body
      )}
      {showDelete && createPortal(
        <DeleteConfirmModal
          book={book}
          onClose={() => setShowDelete(false)}
        />, document.body
      )}
    </>
  )
}
