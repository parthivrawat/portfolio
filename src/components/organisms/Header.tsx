import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiSun, HiMoon } from 'react-icons/hi'
import { ROUTES } from '@/constants/routes'

interface NavItem {
  name: string
  href: string
}

const navigation: NavItem[] = [
  { name: 'Essays', href: ROUTES.ESSAYS },
  { name: 'Projects', href: ROUTES.PROJECTS },
  { name: 'About', href: ROUTES.ABOUT },
  { name: 'Contact', href: ROUTES.CONTACT },
]

const Header: React.FC<{ id?: string }> = ({ id }) => {
  const location = useLocation()
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <header
      id={id}
      role="banner"
      className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
    >
      <div className="max-w-content mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            to={ROUTES.HOME}
            className="inline-block"
            aria-label="Parthiv Rawat home"
          >
            <img
              src="/Monogram.png"
              alt="Parthiv Rawat"
              width={48}
              height={48}
              className="h-10 w-auto object-contain dark:invert opacity-90 hover:opacity-100 transition-opacity"
            />
          </Link>

          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6" aria-label="Main navigation">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`transition-colors text-base ${
                      isActive
                        ? 'text-gray-900 dark:text-gray-100 font-medium'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            <button
              type="button"
              onClick={toggleTheme}
              aria-pressed={isDark}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {isDark ? (
                <HiSun size={20} aria-hidden="true" />
              ) : (
                <HiMoon size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
