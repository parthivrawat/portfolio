import { formatRelativeTime } from '@/utils/formatRelativeTime'
import type { Repository } from '@/types/github'

interface ProjectCardProps {
  project: Repository
  index?: number
}

const languageColors: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-400',
  HTML: 'bg-orange-500',
  CSS: 'bg-blue-600',
  Python: 'bg-blue-700',
  Java: 'bg-red-600',
  'C++': 'bg-pink-600',
  'C#': 'bg-purple-600',
  Ruby: 'bg-red-500',
  PHP: 'bg-purple-400',
  Go: 'bg-cyan-500',
  Rust: 'bg-orange-600',
  Swift: 'bg-orange-400',
  Kotlin: 'bg-purple-500',
  Dart: 'bg-blue-400',
}

const ProjectCard = ({ project }: ProjectCardProps): JSX.Element => {
  const lastUpdated = formatRelativeTime(project.updated_at)

  const displayName =
    project.name
      .split(/[-_\s]+/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') || 'Unnamed Project'

  const repo = project as { homepage?: string | null; [key: string]: unknown }
  const homepage =
    typeof repo.homepage === 'string' ? repo.homepage : null

  return (
    <article className="border-b border-gray-200 dark:border-gray-800 pb-8 last:border-0">
      <div className="flex items-baseline justify-between gap-4 mb-2 flex-wrap">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {displayName}
        </h3>
        {project.language && (
          <span className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${languageColors[project.language] || 'bg-gray-400'}`} />
            {project.language}
          </span>
        )}
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-3">
        {project.description || 'No description available'}
      </p>
      <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-500">
        <span>★ {project.stargazers_count.toLocaleString()}</span>
        <span>{project.forks_count.toLocaleString()} forks</span>
        <span>
          Updated <time dateTime={project.updated_at}>{lastUpdated}</time>
        </span>
      </div>
      <div className="flex gap-4 mt-4">
        <a
          href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          Source →
        </a>
        {homepage && (
          <a
            href={homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
          >
            Live →
          </a>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
