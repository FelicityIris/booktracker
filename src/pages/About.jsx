import React from 'react'
import {
  BookOpen, Code2, Palette, Database, Zap, Heart, User, Globe
} from 'lucide-react'
import { useBooks } from '../context/BookContext'

const TECH = [
  {
    icon: <Code2 size={18} />,
    name: 'React 18',
    desc: 'Component-based UI with hooks and context for state management.',
    color: 'blue',
  },
  {
    icon: <Palette size={18} />,
    name: 'Tailwind CSS v3',
    desc: 'Utility-first CSS with custom color tokens.',
    color: 'sky',
  },
  {
    icon: <Zap size={18} />,
    name: 'Vite',
    desc: 'Lightning-fast dev server and build tool.',
    color: 'yellow',
  },
  {
    icon: <Globe size={18} />,
    name: 'React Router v6',
    desc: 'Client-side routing for a seamless SPA experience.',
    color: 'green',
  },
  {
    icon: <Database size={18} />,
    name: 'localStorage',
    desc: 'Browser-side persistence.',
    color: 'peach',
  },
  {
    icon: <BookOpen size={18} />,
    name: 'Lucide React',
    desc: 'Crisp, consistent icon set used throughout the interface.',
    color: 'lavender',
  },
]

export default function About() {
  const { theme } = useBooks()
  const dark = theme === 'dark'

  const colorMap = {
    blue:     dark ? 'text-ctp-blue bg-ctp-blue/10'         : 'text-latte-blue bg-latte-blue/10',
    sky:      dark ? 'text-ctp-sky bg-ctp-sky/10'           : 'text-latte-sky bg-latte-sky/10',
    yellow:   dark ? 'text-ctp-yellow bg-ctp-yellow/10'     : 'text-latte-yellow bg-latte-yellow/10',
    green:    dark ? 'text-ctp-green bg-ctp-green/10'       : 'text-latte-green bg-latte-green/10',
    peach:    dark ? 'text-ctp-peach bg-ctp-peach/10'       : 'text-latte-peach bg-latte-peach/10',
    lavender: dark ? 'text-ctp-lavender bg-ctp-lavender/10' : 'text-latte-lavender bg-latte-lavender/10',
    mauve:    dark ? 'text-ctp-mauve bg-ctp-mauve/10'       : 'text-latte-mauve bg-latte-mauve/10',
    teal:     dark ? 'text-ctp-teal bg-ctp-teal/10'         : 'text-latte-teal bg-latte-teal/10',
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 animate-fade-in">

      {/* Hero */}
      <div className="mb-12 text-center">
        <div
          className={`
            inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-4
            ${dark ? 'bg-ctp-surface0' : 'bg-latte-surface0'}
          `}
        >
          <BookOpen size={30} className={dark ? 'text-ctp-mauve' : 'text-latte-mauve'} />
        </div>
        <h1
          className={`font-display font-semibold text-3xl mb-3 ${dark ? 'text-ctp-text' : 'text-latte-text'}`}
        >
          About BookTracker
        </h1>
        <p className={`text-base max-w-md mx-auto leading-relaxed ${dark ? 'text-ctp-subtext1' : 'text-latte-subtext1'}`}>
          A personal reading journal that lives entirely in your browser — no
          accounts, no servers, no fuss. Track your books, watch your progress,
          and every page turned.
        </p>
      </div>

      {/* Project overview */}
      <section className="mb-10">
        <h2
          className={`font-display font-semibold text-xl mb-4 ${dark ? 'text-ctp-text' : 'text-latte-text'}`}
        >
          The Project
        </h2>
        <div
          className={`
            rounded-xl border p-5 space-y-3 text-sm leading-relaxed
            ${dark
              ? 'bg-ctp-surface0 border-ctp-surface1 text-ctp-subtext1'
              : 'bg-latte-surface0 border-latte-surface1 text-latte-subtext1'}
          `}
        >
          <p>
            BookTracker is a college-level frontend project built to demonstrate
            proficiency in modern React development, component architecture,
            context-based state management, and utility-first CSS design.
          </p>
          <p>
            The app supports adding, editing, and deleting book entries with rich
            metadata — including cover images, reading progress, and date tracking.
            A progress bar auto-calculates reading completion, and the finish date
            is automatically set the moment you mark the last page read.
          </p>
          <p>
            All data is persisted to <span className={`font-mono text-xs px-1.5 py-0.5 rounded ${dark ? 'bg-ctp-surface1' : 'bg-latte-surface1'}`}>localStorage</span> — so your library
            is safe even after a refresh. The interface ships with Catppuccin
            Mocha (dark) and Catppuccin Latte (light) themes, switchable at any
            time.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="mb-10">
        <h2
          className={`font-display font-semibold text-xl mb-4 ${dark ? 'text-ctp-text' : 'text-latte-text'}`}
        >
          Features
        </h2>
        <ul className="space-y-2.5">
          {[
            ['Timeline view',       'Books displayed as a vertical timeline, newest first.'],
            ['Add / Edit / Delete', 'Full CRUD with modal forms and delete confirmation.'],
            ['Cover images',        'Upload a local image as the book\'s cover art.'],
            ['Progress tracking',   'Visual progress bar with auto-completion detection.'],
            ['Date management',     'Tracks start date; auto-sets finish date when done.'],
            ['Persistent storage',  'localStorage keeps your data between sessions.'],
            ['Dark & light theme',  'Catppuccin Mocha and Latte — toggled in one click.'],
            ['Reading stats',       'Live counts of books, pages read, and status breakdown.'],
          ].map(([title, desc]) => (
            <li
              key={title}
              className={`
                flex items-start gap-3 text-sm
                ${dark ? 'text-ctp-subtext1' : 'text-latte-subtext1'}
              `}
            >
              <span
                className={`
                  mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0
                  ${dark ? 'bg-ctp-mauve' : 'bg-latte-mauve'}
                `}
              />
              <span>
                <strong className={dark ? 'text-ctp-text' : 'text-latte-text'}>{title}</strong>
                {' — '}{desc}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Tech stack */}
      <section className="mb-10">
        <h2
          className={`font-display font-semibold text-xl mb-4 ${dark ? 'text-ctp-text' : 'text-latte-text'}`}
        >
          Tech Stack
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TECH.map(({ icon, name, desc, color }) => (
            <div
              key={name}
              className={`
                rounded-xl border p-4 flex items-start gap-3
                ${dark
                  ? 'bg-ctp-surface0 border-ctp-surface1'
                  : 'bg-latte-surface0 border-latte-surface1'}
              `}
            >
              <div
                className={`
                  w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
                  ${colorMap[color]}
                `}
              >
                {icon}
              </div>
              <div>
                <p className={`text-sm font-semibold ${dark ? 'text-ctp-text' : 'text-latte-text'}`}>{name}</p>
                <p className={`text-xs mt-0.5 leading-relaxed ${dark ? 'text-ctp-subtext0' : 'text-latte-subtext0'}`}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Developer */}
      <section>
        <h2
          className={`font-display font-semibold text-xl mb-4 ${dark ? 'text-ctp-text' : 'text-latte-text'}`}
        >
          Developer
        </h2>
        <div
          className={`
            rounded-xl border p-5 flex items-center gap-4
            ${dark
              ? 'bg-ctp-surface0 border-ctp-surface1'
              : 'bg-latte-surface0 border-latte-surface1'}
          `}
        >
          <div
            className={`
              w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0
              ${dark ? 'bg-ctp-mauve/20' : 'bg-latte-mauve/20'}
            `}
          >
            <User size={26} className={dark ? 'text-ctp-mauve' : 'text-latte-mauve'} />
          </div>
          <div>
            <p className={`font-display font-semibold text-lg ${dark ? 'text-ctp-text' : 'text-latte-text'}`}>
             Ajitesh
            </p>
            <p className={`text-sm ${dark ? 'text-ctp-subtext0' : 'text-latte-subtext0'}`}>
              Computer Science Student
            </p>
            <p className={`text-xs mt-1.5 leading-relaxed ${dark ? 'text-ctp-subtext0' : 'text-latte-subtext0'}`}>
              Built BookTracker as a college project to explore React, context
              management, and thoughtful UI design. 
            </p>
          </div>
        </div>

        <p
          className={`
            mt-5 text-center text-sm flex items-center justify-center gap-1.5
            ${dark ? 'text-ctp-overlay1' : 'text-latte-overlay1'}
          `}
        >
          Built using React & Tailwind
        </p>
      </section>
    </div>
  )
}
