import React, { useState, useEffect, useRef } from 'react'
import { X, Upload, BookOpen } from 'lucide-react'
import { useBooks } from '../context/BookContext'

const today = () => new Date().toISOString().split('T')[0]

const EMPTY = {
  name: '',
  author: '',
  year: '',
  pagesRead: '0',
  totalPages: '',
  dateStarted: today(),
  dateFinished: '',
  coverImage: '',
}

export default function BookFormModal({ mode = 'add', book = null, onClose }) {
  const { theme, addBook, updateBook } = useBooks()
  const dark = theme === 'dark'
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [coverPreview, setCoverPreview] = useState('')
  const fileRef = useRef()
  const firstFieldRef = useRef()

  // Pre-populate when editing
  useEffect(() => {
    if (mode === 'edit' && book) {
      setForm({
        name:         book.name || '',
        author:       book.author || '',
        year:         book.year || '',
        pagesRead:    String(book.pagesRead ?? 0),
        totalPages:   String(book.totalPages || ''),
        dateStarted:  book.dateStarted || today(),
        dateFinished: book.dateFinished || '',
        coverImage:   book.coverImage || '',
      })
      setCoverPreview(book.coverImage || '')
    }
    // Focus first field
    setTimeout(() => firstFieldRef.current?.focus(), 50)
  }, [mode, book])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const set = (field) => (e) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleImageFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const dataUrl = ev.target.result
      setForm(prev => ({ ...prev, coverImage: dataUrl }))
      setCoverPreview(dataUrl)
    }
    reader.readAsDataURL(file)
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim())   errs.name = 'Book name is required.'
    if (!form.totalPages || isNaN(Number(form.totalPages)) || Number(form.totalPages) <= 0)
      errs.totalPages = 'Total pages must be a positive number.'
    if (isNaN(Number(form.pagesRead)) || Number(form.pagesRead) < 0)
      errs.pagesRead = 'Pages read must be 0 or more.'
    if (Number(form.pagesRead) > Number(form.totalPages))
      errs.pagesRead = 'Pages read cannot exceed total pages.'
    if (form.year && (isNaN(Number(form.year)) || form.year.length > 4))
      errs.year = 'Enter a valid year.'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    if (mode === 'add') {
      addBook(form)
    } else {
      updateBook(book.id, form)
    }
    onClose()
  }

  // Shared input classes
  const inputCls = `
    w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors border
    ${dark
      ? 'bg-ctp-surface0 border-ctp-surface1 text-ctp-text placeholder-ctp-overlay0 focus:border-ctp-mauve focus:ring-1 focus:ring-ctp-mauve'
      : 'bg-latte-surface0 border-latte-surface1 text-latte-text placeholder-latte-overlay0 focus:border-latte-mauve focus:ring-1 focus:ring-latte-mauve'}
  `

  const labelCls = `block text-xs font-semibold uppercase tracking-wider mb-1.5 ${dark ? 'text-ctp-subtext0' : 'text-latte-subtext0'}`
  const errCls   = `text-xs mt-1 ${dark ? 'text-ctp-red' : 'text-latte-red'}`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className={`
          relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl
          animate-slide-up
          ${dark ? 'bg-ctp-mantle' : 'bg-latte-mantle'}
        `}
      >
        {/* Header */}
        <div
          className={`
            sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b
            ${dark ? 'bg-ctp-mantle border-ctp-surface0' : 'bg-latte-mantle border-latte-surface0'}
          `}
        >
          <div className="flex items-center gap-2">
            <BookOpen size={18} className={dark ? 'text-ctp-mauve' : 'text-latte-mauve'} />
            <h2 className={`font-display font-semibold text-lg ${dark ? 'text-ctp-text' : 'text-latte-text'}`}>
              {mode === 'add' ? 'Add a New Book' : 'Update Book'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`
              w-8 h-8 rounded-lg flex items-center justify-center transition-colors
              ${dark
                ? 'text-ctp-subtext1 hover:text-ctp-text hover:bg-ctp-surface0'
                : 'text-latte-subtext1 hover:text-latte-text hover:bg-latte-surface0'}
            `}
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">

          {/* Cover image */}
          <div>
            <label className={labelCls}>Cover Image <span className={`normal-case font-normal ${dark ? 'text-ctp-overlay0' : 'text-latte-overlay0'}`}>(optional)</span></label>
            <div className="flex items-center gap-3">
              <div
                className={`
                  w-16 h-20 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center
                  ${dark ? 'bg-ctp-surface0' : 'bg-latte-surface0'}
                `}
              >
                {coverPreview
                  ? <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                  : <BookOpen size={22} className={dark ? 'text-ctp-overlay0' : 'text-latte-overlay0'} />
                }
              </div>
              <div className="flex-1">
                <button
                  type="button"
                  onClick={() => fileRef.current.click()}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border
                    transition-colors w-full justify-center
                    ${dark
                      ? 'border-ctp-surface1 text-ctp-subtext1 hover:border-ctp-mauve hover:text-ctp-mauve hover:bg-ctp-surface0'
                      : 'border-latte-surface1 text-latte-subtext1 hover:border-latte-mauve hover:text-latte-mauve hover:bg-latte-surface0'}
                  `}
                >
                  <Upload size={14} />
                  {coverPreview ? 'Change Image' : 'Upload Image'}
                </button>
                {coverPreview && (
                  <button
                    type="button"
                    onClick={() => { setCoverPreview(''); setForm(p => ({ ...p, coverImage: '' })) }}
                    className={`text-xs mt-1.5 w-full text-center ${dark ? 'text-ctp-red hover:text-ctp-maroon' : 'text-latte-red hover:text-latte-maroon'}`}
                  >
                    Remove image
                  </button>
                )}
              </div>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageFile}
            />
          </div>

          {/* Name */}
          <div>
            <label className={labelCls}>
              Book Title <span className={dark ? 'text-ctp-red' : 'text-latte-red'}>*</span>
            </label>
            <input
              ref={firstFieldRef}
              type="text"
              value={form.name}
              onChange={set('name')}
              placeholder="e.g. The Name of the Wind"
              className={inputCls}
            />
            {errors.name && <p className={errCls}>{errors.name}</p>}
          </div>

          {/* Author + Year */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Author <span className={`normal-case font-normal ${dark ? 'text-ctp-overlay0' : 'text-latte-overlay0'}`}>(optional)</span></label>
              <input
                type="text"
                value={form.author}
                onChange={set('author')}
                placeholder="Author name"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Year <span className={`normal-case font-normal ${dark ? 'text-ctp-overlay0' : 'text-latte-overlay0'}`}>(optional)</span></label>
              <input
                type="number"
                value={form.year}
                onChange={set('year')}
                placeholder="e.g. 2007"
                min="1000"
                max="2099"
                className={inputCls}
              />
              {errors.year && <p className={errCls}>{errors.year}</p>}
            </div>
          </div>

          {/* Pages */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>
                Pages Read <span className={dark ? 'text-ctp-red' : 'text-latte-red'}>*</span>
              </label>
              <input
                type="number"
                value={form.pagesRead}
                onChange={set('pagesRead')}
                min="0"
                placeholder="0"
                className={inputCls}
              />
              {errors.pagesRead && <p className={errCls}>{errors.pagesRead}</p>}
            </div>
            <div>
              <label className={labelCls}>
                Total Pages <span className={dark ? 'text-ctp-red' : 'text-latte-red'}>*</span>
              </label>
              <input
                type="number"
                value={form.totalPages}
                onChange={set('totalPages')}
                min="1"
                placeholder="e.g. 662"
                className={inputCls}
              />
              {errors.totalPages && <p className={errCls}>{errors.totalPages}</p>}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Date Started <span className={`normal-case font-normal ${dark ? 'text-ctp-overlay0' : 'text-latte-overlay0'}`}>(optional)</span></label>
              <input
                type="date"
                value={form.dateStarted}
                onChange={set('dateStarted')}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Date Finished <span className={`normal-case font-normal ${dark ? 'text-ctp-overlay0' : 'text-latte-overlay0'}`}>(optional)</span></label>
              <input
                type="date"
                value={form.dateFinished}
                onChange={set('dateFinished')}
                className={inputCls}
              />
              <p className={`text-xs mt-1 ${dark ? 'text-ctp-overlay0' : 'text-latte-overlay0'}`}>
                Auto-set when pages complete
              </p>
            </div>
          </div>

          {/* Actions */}
          <div
            className={`flex justify-end gap-3 pt-2 border-t ${dark ? 'border-ctp-surface0' : 'border-latte-surface0'}`}
          >
            <button
              type="button"
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
              type="submit"
              className={`
                px-5 py-2 rounded-lg text-sm font-semibold transition-all active:scale-95
                ${dark
                  ? 'bg-ctp-mauve text-ctp-base hover:bg-ctp-lavender'
                  : 'bg-latte-mauve text-white hover:bg-latte-lavender'}
              `}
            >
              {mode === 'add' ? 'Add Book' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
