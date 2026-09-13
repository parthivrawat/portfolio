import { allLinks, type SocialLink } from '@/data/socialLinks'

interface SocialLinksProps {
  links?: SocialLink[]
  showLabels?: boolean
  iconSize?: number
  className?: string
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  links = allLinks,
  showLabels = true,
  iconSize = 18,
  className = '',
}) => {
  return (
    <nav className={`flex flex-wrap items-center gap-4 ${className}`} aria-label="Social and professional links">
      {links.map((link) => {
        const Icon = link.icon
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            aria-label={link.iconLabel}
          >
            <Icon size={iconSize} aria-hidden="true" />
            {showLabels && <span className="text-sm">{link.name}</span>}
          </a>
        )
      })}
    </nav>
  )
}

export default SocialLinks
