import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Heart } from 'lucide-react'
import { useBooks } from '../context/BookContext'

export default function Footer() {
  const { theme, books } = useBooks()
  const dark = theme === 'dark'
  const year = new Date().getFullYear()

  const totalBooks    = books.length
  const finishedBooks = books.filter(b => b.dateFinished).length
  const totalPages    = books.reduce((sum, b) => sum + (b.pagesRead || 0), 0)

  return (
    <footer
      className={`
        border-t mt-16
        ${dark
          ? 'bg-ctp-mantle border-ctp-surface0'
          : 'bg-latte-mantle border-latte-surface0'}
      `}
    >
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen
                size={18}
                className={dark ? 'text-ctp-mauve' : 'text-latte-mauve'}
              />
              <span
                className={`
                  font-display font-semibold
                  ${dark ? 'text-ctp-text' : 'text-latte-text'}
                `}
              >
                BookTracker
              </span>
            </div>
            <p
              className={`text-sm leading-relaxed ${dark ? 'text-ctp-subtext0' : 'text-latte-subtext0'}`}
            >
              A personal reading journal to track your literary journey — one
              page at a time.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-widest mb-3 ${dark ? 'text-ctp-overlay1' : 'text-latte-overlay1'}`}
            >
              Navigation
            </p>
            <ul className="space-y-1.5">
              {[
                { label: 'Library', to: '/' },
                { label: 'About', to: '/about' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={`
                      text-sm transition-colors
                      ${dark
                        ? 'text-ctp-subtext1 hover:text-ctp-mauve'
                        : 'text-latte-subtext1 hover:text-latte-mauve'}
                    `}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-widest mb-3 ${dark ? 'text-ctp-overlay1' : 'text-latte-overlay1'}`}
            >
              Your Stats
            </p>
            <ul className="space-y-1.5">
              {[
                { label: 'Books tracked', value: totalBooks },
                { label: 'Books finished', value: finishedBooks },
                { label: 'Pages read', value: totalPages.toLocaleString() },
              ].map(({ label, value }) => (
                <li
                  key={label}
                  className={`text-sm flex items-center gap-2 ${dark ? 'text-ctp-subtext1' : 'text-latte-subtext1'}`}
                >
                  <span>{label}:</span>
                  <span
                    className={`font-mono font-medium ${dark ? 'text-ctp-mauve' : 'text-latte-mauve'}`}
                  >
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={`
            mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3
            ${dark ? 'border-ctp-surface0' : 'border-latte-surface0'}
          `}
        >
          <p
            className={`text-xs flex items-center gap-1 ${dark ? 'text-ctp-overlay0' : 'text-latte-overlay0'}`}
          >
            Made with{' '}
            <Heart
              size={12}
              className={dark ? 'text-ctp-red' : 'text-latte-red'}
              fill="currentColor"
            />{' '}
            using React &amp; Tailwind · {year}
          </p>
          <p className={`text-xs ${dark ? 'text-ctp-overlay0' : 'text-latte-overlay0'}`}>
            Themed with{' '}
            <span className={dark ? 'text-ctp-mauve' : 'text-latte-mauve'}>
              Catppuccin Mocha
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
