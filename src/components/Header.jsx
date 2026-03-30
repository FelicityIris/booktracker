import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Plus, Sun, Moon, BookOpen } from 'lucide-react'
import { useBooks } from '../context/BookContext'
import BookFormModal from './BookFormModal'

export default function Header() {
  const { theme, toggleTheme } = useBooks()
  const [showAddModal, setShowAddModal] = useState(false)
  const location = useLocation()
  const dark = theme === 'dark'

  return (
    <>
      <header
        className={`
          sticky top-0 z-40 border-b
          ${dark
            ? 'bg-ctp-mantle border-ctp-surface0 shadow-[0_2px_20px_rgba(0,0,0,0.3)]'
            : 'bg-latte-mantle border-latte-surface0 shadow-[0_2px_20px_rgba(0,0,0,0.08)]'}
        `}
      >
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo + Title */}
          <Link
            to="/"
            className={`flex items-center gap-2.5 group`}
          >
            <div
              className={`
                w-8 h-8 rounded-lg flex items-center justify-center
                ${dark ? 'bg-ctp-surface0' : 'bg-latte-surface0'}
                group-hover:scale-110 transition-transform duration-200
              `}
            >
              <BookOpen
                size={18}
                className={dark ? 'text-ctp-mauve' : 'text-latte-mauve'}
              />
            </div>
            <span
              className={`
                font-display font-semibold text-xl tracking-tight
                ${dark ? 'text-ctp-text' : 'text-latte-text'}
              `}
            >
              BookTracker
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden sm:flex items-center gap-1">
            {[
              { label: 'Library', to: '/' },
              { label: 'About', to: '/about' },
            ].map(({ label, to }) => {
              const active = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  className={`
                    px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150
                    ${active
                      ? dark
                        ? 'bg-ctp-surface0 text-ctp-mauve'
                        : 'bg-latte-surface0 text-latte-mauve'
                      : dark
                        ? 'text-ctp-subtext1 hover:text-ctp-text hover:bg-ctp-surface0'
                        : 'text-latte-subtext1 hover:text-latte-text hover:bg-latte-surface0'}
                  `}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Add book button */}
            <button
              onClick={() => setShowAddModal(true)}
              title="Add book"
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                transition-all duration-150 active:scale-95
                ${dark
                  ? 'bg-ctp-mauve text-ctp-base hover:bg-ctp-lavender'
                  : 'bg-latte-mauve text-white hover:bg-latte-lavender'}
              `}
            >
              <Plus size={16} strokeWidth={2.5} />
              <span className="hidden sm:inline">Add Book</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`
                w-9 h-9 rounded-lg flex items-center justify-center
                transition-all duration-150 active:scale-95
                ${dark
                  ? 'text-ctp-subtext1 hover:text-ctp-yellow hover:bg-ctp-surface0'
                  : 'text-latte-subtext1 hover:text-latte-yellow hover:bg-latte-surface0'}
              `}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div
          className={`
            sm:hidden border-t px-4 py-2 flex gap-2
            ${dark ? 'border-ctp-surface0' : 'border-latte-surface0'}
          `}
        >
          {[
            { label: 'Library', to: '/' },
            { label: 'About', to: '/about' },
          ].map(({ label, to }) => {
            const active = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`
                  px-3 py-1 rounded text-sm font-medium transition-colors
                  ${active
                    ? dark
                      ? 'text-ctp-mauve bg-ctp-surface0'
                      : 'text-latte-mauve bg-latte-surface0'
                    : dark
                      ? 'text-ctp-subtext1'
                      : 'text-latte-subtext1'}
                `}
              >
                {label}
              </Link>
            )
          })}
        </div>
      </header>

      {showAddModal && (
        <BookFormModal
          mode="add"
          onClose={() => setShowAddModal(false)}
        />
      )}
    </>
  )
}
