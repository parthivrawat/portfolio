import { allLinks } from '@/data/socialLinks'

const profileLinks = allLinks.filter((link) => link.category !== 'package')

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 mt-8">
      <div className="max-w-content mx-auto px-6 py-8 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <img
            src="/Monogram.png"
            alt=""
            width={28}
            height={28}
            className="h-6 w-auto object-contain dark:invert opacity-80"
          />
          <span>© {currentYear} — Parthiv Rawat</span>
        </div>
        <nav className="flex flex-wrap items-center gap-6" aria-label="Social and professional links">
          {profileLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label={link.iconLabel}
              >
                <Icon size={20} aria-hidden="true" />
              </a>
            )
          })}
        </nav>
      </div>
    </footer>
  )
}

export default Footer
