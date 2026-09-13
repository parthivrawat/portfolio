import React, { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { NewsletterSignup } from '@components'
import ProjectCard from '@/components/organisms/ProjectCard'
import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import { useGitHubRepositories } from '@/hooks/useGitHub'
import { caseStudies as caseStudiesData, type CaseStudy } from '@/data/caseStudies'

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [languageFilter, setLanguageFilter] = useState('')
  const [caseStudyFilter, setCaseStudyFilter] = useState<'all' | NonNullable<CaseStudy['status']>>('all')

  const { repositories, loading, error, refetch, isInitialLoading } = useGitHubRepositories()

  const languages = useMemo(() => {
    if (!repositories) return []
    const langSet = new Set<string>()
    repositories.forEach((repo) => {
      if (repo.language) {
        langSet.add(repo.language)
      }
    })
    return Array.from(langSet).sort()
  }, [repositories])

  const filteredRepos = useMemo(() => {
    if (!repositories) return []
    return repositories.filter((repo) => {
      const matchesSearch =
        !searchTerm ||
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesLanguage = !languageFilter || repo.language === languageFilter
      return matchesSearch && matchesLanguage
    })
  }, [repositories, searchTerm, languageFilter])

  const filteredCaseStudies = useMemo(() => {
    if (caseStudyFilter === 'all') return caseStudiesData
    return caseStudiesData.filter((study) => study.status === caseStudyFilter)
  }, [caseStudyFilter])

  if (isInitialLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner className="h-12 w-12 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">
            Failed to load projects
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {error.message || 'An unexpected error occurred while fetching projects.'}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Projects | Parthiv Rawat</title>
        <meta
          name="description"
          content="Explore a selection of experiments, tools, and production-ready builds spanning frontend, backend, and developer experience."
        />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="max-w-prose mx-auto px-6 py-16">
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Projects
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-12">
            A cross-section of production, in-progress, and exploratory work where I combine cloud-native architecture, 
            AI systems, and modern web technologies.
          </p>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Case Studies
            </h2>

            <div className="flex flex-wrap gap-4 mb-8">
              {(['all', 'in-progress', 'completed', 'exploration'] as const).map((status) => {
                const label = status === 'all' ? 'All' : status.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())
                const active = caseStudyFilter === status
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setCaseStudyFilter(status)}
                    aria-pressed={active}
                    className={`text-sm transition-colors ${
                      active
                        ? 'text-gray-900 dark:text-gray-100 underline'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>

            <div className="space-y-8">
              {filteredCaseStudies.map((study) => (
                <article key={study.id} className="border-b border-gray-200 dark:border-gray-800 pb-8 last:border-0">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      {study.title}
                    </h3>
                    {study.status && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {study.status}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-primary-600 dark:text-primary-400 mb-3">
                    {study.timeframe}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {study.description}
                  </p>
                  {study.technologies && study.technologies.length > 0 && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {study.technologies.join(', ')}
                    </p>
                  )}
                  {study.links.length > 0 && (
                    <div className="flex flex-wrap gap-4 mt-4">
                      {study.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                        >
                          {link.label} →
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              GitHub Repositories
            </h2>

            <div className="space-y-4 mb-8">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search repositories..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Languages</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-6">
              {filteredRepos.map((repo, index) => (
                <ProjectCard key={repo.id} project={repo} index={index} />
              ))}
            </div>

            {filteredRepos.length === 0 && (
              <p
                role="status"
                aria-live="polite"
                className="text-center text-gray-500 dark:text-gray-400 py-8"
              >
                No projects found. Try adjusting your search.
              </p>
            )}
          </section>

          <NewsletterSignup />
        </div>
      </div>
    </>
  )
}

export default Projects
