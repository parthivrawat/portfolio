import type { ReactNode } from 'react'

export interface PageSectionHeaderProps {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  className?: string
}

export interface PageSectionProps {
  id?: string
  className?: string
  header?: PageSectionHeaderProps
  children?: ReactNode
}

export const PageSection: React.FC<PageSectionProps> = ({
  id,
  className,
  header,
  children,
}) => {
  return (
    <section id={id} className={className}>
      <div className="max-w-content mx-auto px-6">
        {header && (
          <header className={header.className ?? 'mb-12'}>
            {header.eyebrow && (
              <span className="text-sm text-gray-500 dark:text-gray-500 uppercase tracking-wide">
                {header.eyebrow}
              </span>
            )}
            {typeof header.title === 'string' ? (
              <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mt-2 mb-4">
                {header.title}
              </h1>
            ) : (
              header.title
            )}
            {header.subtitle && (
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                {header.subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}

export default PageSection
