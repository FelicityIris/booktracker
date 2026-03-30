import React, { useEffect } from 'react'
import { Trash2, AlertTriangle } from 'lucide-react'
import { useBooks } from '../context/BookContext'

export default function DeleteConfirmModal({ book, onClose }) {
  const { theme, deleteBook } = useBooks()
  const dark = theme === 'dark'

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const handleConfirm = () => {
    deleteBook(book.id)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className={`
          w-full max-w-sm rounded-2xl shadow-2xl animate-slide-up p-6
          ${dark ? 'bg-ctp-mantle' : 'bg-latte-mantle'}
        `}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`
              w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
              ${dark ? 'bg-ctp-red/20' : 'bg-latte-red/20'}
            `}
          >
            <AlertTriangle size={20} className={dark ? 'text-ctp-red' : 'text-latte-red'} />
          </div>
          <div>
            <h3 className={`font-display font-semibold ${dark ? 'text-ctp-text' : 'text-latte-text'}`}>
              Delete Book
            </h3>
            <p className={`text-sm mt-0.5 ${dark ? 'text-ctp-subtext0' : 'text-latte-subtext0'}`}>
              This action cannot be undone.
            </p>
          </div>
        </div>

        <p className={`text-sm mb-6 ${dark ? 'text-ctp-subtext1' : 'text-latte-subtext1'}`}>
          Are you sure you want to delete{' '}
          <span className={`font-semibold ${dark ? 'text-ctp-text' : 'text-latte-text'}`}>
            "{book.name}"
          </span>
          {book.author ? ` by ${book.author}` : ''}?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${dark
                ? 'text-ctp-subtext1 hover:text-ctp-text hover:bg-ctp-surface0'
                : 'text-latte-subtext1 hover:text-latte-text hover:bg-latte-surface0'}
            `}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
              transition-all active:scale-95
              ${dark
                ? 'bg-ctp-red text-ctp-base hover:bg-ctp-maroon'
                : 'bg-latte-red text-white hover:bg-latte-maroon'}
            `}
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
