import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BookProvider } from './context/BookContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'

export default function App() {
  return (
    <BookProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BookProvider>
  )
}
