import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useBooks } from '../context/BookContext'

export default function Layout() {
  const { theme } = useBooks()

  return (
    <div
      className={`
        min-h-screen flex flex-col font-body
        ${theme === 'dark'
          ? 'bg-ctp-base text-ctp-text'
          : 'bg-latte-base text-latte-text'}
      `}
    >
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
